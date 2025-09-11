import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const ids: string[] = body?.ids || []
    const user = body?.user

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: 'ids array is required' }, { status: 400 })
    }
    if (!user || !user.id || (!user.username && !user.email)) {
      return NextResponse.json({ message: 'user { id, username|email } is required' }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const objectIds = ids
      .map((id) => {
        try { return new ObjectId(id) } catch { return null }
      })
      .filter((v): v is ObjectId => Boolean(v))

    if (objectIds.length === 0) {
      return NextResponse.json({ message: 'No valid ids provided' }, { status: 400 })
    }

    const now = new Date()
    const result = await db.collection('training_applications').updateMany(
      { _id: { $in: objectIds } },
      {
        $set: {
          opened: true,
          openedAt: now,
          openedBy: {
            id: user.id,
            username: user.username || null,
            email: user.email || null,
          },
          updatedAt: now,
        },
      }
    )

    return NextResponse.json({ success: true, matched: result.matchedCount, modified: result.modifiedCount })
  } catch (error) {
    console.error('Failed to mark training applications opened:', error)
    return NextResponse.json({ message: 'Failed to mark opened', error: 'SERVER_ERROR' }, { status: 500 })
  }
}


