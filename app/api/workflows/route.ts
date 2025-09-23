import { NextRequest, NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import path from 'path'

// Database connection
let db: Database.Database | null = null

function getDatabase() {
  if (!db) {
    // Point to the SQLite file in the public directory
    const dbPath = path.join(process.cwd(), 'public', 'workflows.sqlite')
    db = new Database(dbPath, { readonly: true })
  }
  return db
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || 'All'
    const limit = parseInt(searchParams.get('limit') || '20')

    const database = getDatabase()

    let sql = `
      SELECT
        id,
        name,
        summary,
        category,
        node_types,
        estimated_time_savings_hours,
        estimated_annual_roi,
        business_outcome,
        complexity_score
      FROM workflows
      WHERE 1=1
    `

    const params: any[] = []

    // Add search filter
    if (query.trim()) {
      sql += ` AND (
        LOWER(name) LIKE LOWER(?) OR
        LOWER(summary) LIKE LOWER(?) OR
        LOWER(business_outcome) LIKE LOWER(?)
      )`
      const searchTerm = `%${query}%`
      params.push(searchTerm, searchTerm, searchTerm)
    }

    // Add category filter
    if (category !== 'All') {
      sql += ` AND LOWER(category) LIKE LOWER(?)`
      params.push(`%${category}%`)
    }

    sql += ` ORDER BY estimated_annual_roi DESC LIMIT ?`
    params.push(limit)

    const stmt = database.prepare(sql)
    const rows = stmt.all(...params)

    // Format the results for the frontend
    const workflows = rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      summary: row.summary,
      category: row.category || 'General',
      nodeTypes: row.node_types ? row.node_types.split(',') : [],
      timeSavings: row.estimated_time_savings_hours || 0,
      annualROI: row.estimated_annual_roi || 0,
      businessOutcome: row.business_outcome || '',
      complexity: row.complexity_score || 'Medium'
    }))

    return NextResponse.json({
      workflows,
      total: rows.length,
      query,
      category
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}