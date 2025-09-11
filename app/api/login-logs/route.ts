import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const skip = (page - 1) * limit
    const email = searchParams.get('email')
    const success = searchParams.get('success')

    const collection = db.collection('login_logs')
    
    // Build query
    const query: any = {}
    if (email) {
      query.email = { $regex: email, $options: 'i' }
    }
    if (success !== null && success !== undefined) {
      query.success = success === 'true'
    }

    const [total, logs] = await Promise.all([
      collection.countDocuments(query),
      collection
        .find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
    ])

    return NextResponse.json({
      logs,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Failed to fetch login logs:', error)
    return NextResponse.json(
      { message: 'Failed to fetch login logs', error: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}
