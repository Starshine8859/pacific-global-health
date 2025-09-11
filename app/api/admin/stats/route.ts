import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

type DailyCount = { date: string; contacts: number; trainings: number }

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export async function GET(_req: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    const usersCol = db.collection('users')
    const contactsCol = db.collection('contacts')
    const trainingCol = db.collection('training_applications')
    const loginLogsCol = db.collection('login_logs')

    const unopenedFilter = { 
      $and: [
        { $or: [ { opened: false }, { opened: null }, { opened: { $exists: false } } ] },
        { $or: [ { openedAt: null }, { openedAt: { $exists: false } } ] }
      ]
    }
    const todayStart = startOfDay(new Date())
    const [totalUsers, unopenedContacts, unopenedTrainings, latestLogin, todayLogins] = await Promise.all([
      usersCol.countDocuments({}),
      contactsCol.countDocuments(unopenedFilter),
      trainingCol.countDocuments(unopenedFilter),
      loginLogsCol.find({ success: true }).sort({ timestamp: -1 }).limit(1).toArray(),
      loginLogsCol.countDocuments({ success: true, timestamp: { $gte: todayStart } }),
    ])

    // Build daily series for last 14 days
    const days = 14
    const since = new Date()
    since.setDate(since.getDate() - (days - 1))
    since.setHours(0, 0, 0, 0)

    const pipeline = (field: 'contacts' | 'trainings') => [
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $project: { _id: 0, date: '$_id', count: 1 } },
    ]

    const [contactsSeries, trainingsSeries] = await Promise.all([
      contactsCol.aggregate(pipeline('contacts')).toArray(),
      trainingCol.aggregate(pipeline('trainings')).toArray(),
    ])

    const dateKeys: string[] = []
    for (let i = 0; i < days; i++) {
      const d = new Date(since)
      d.setDate(since.getDate() + i)
      dateKeys.push(d.toISOString().slice(0, 10))
    }
    const byDateContacts = new Map(contactsSeries.map((r: any) => [r.date, r.count]))
    const byDateTrainings = new Map(trainingsSeries.map((r: any) => [r.date, r.count]))
    const daily: DailyCount[] = dateKeys.map((d) => ({
      date: d,
      contacts: byDateContacts.get(d) || 0,
      trainings: byDateTrainings.get(d) || 0,
    }))

    // Recent activity: 10 most recent across collections
    const [recentUsers, recentContacts, recentTrainings] = await Promise.all([
      usersCol.find({}).project({ email: 1, username: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(10).toArray(),
      contactsCol.find({}).project({ name: 1, email: 1, createdAt: 1, subject: 1 }).sort({ createdAt: -1 }).limit(10).toArray(),
      trainingCol.find({}).project({ name: 1, email: 1, createdAt: 1, course: 1 }).sort({ createdAt: -1 }).limit(10).toArray(),
    ])

    type Activity = { type: string; title: string; time: string }
    const activities: Activity[] = [
      ...recentUsers.map((u: any) => ({ type: 'user', title: `New user: ${u.username || u.email}`, time: u.createdAt })),
      ...recentContacts.map((c: any) => ({ type: 'contact', title: `Contact: ${c.name || c.email}`, time: c.createdAt })),
      ...recentTrainings.map((t: any) => ({ type: 'training', title: `Training: ${t.name || t.email}`, time: t.createdAt })),
    ]
      .filter((a) => !!a.time)
      .sort((a, b) => (new Date(b.time as any).getTime() - new Date(a.time as any).getTime()))
      .slice(0, 10)

    return NextResponse.json({
      totals: {
        users: totalUsers,
        usersTodayLogins: todayLogins,
        todayContacts: unopenedContacts,
        todayTrainings: unopenedTrainings,
      },
      currentLogin: latestLogin?.[0] || null,
      daily,
      activities,
    })
  } catch (e) {
    console.error('Admin stats error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


