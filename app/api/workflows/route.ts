import { NextRequest, NextResponse } from 'next/server'

// Mock data for now - we'll switch to a different approach
const mockWorkflows = [
  {
    id: 'activecampaign-1',
    name: 'ActiveCampaign Create Triggered',
    summary: 'Receive updates when a new account is added by an admin in ActiveCampaign',
    category: 'Marketing',
    nodeTypes: ['webhook', 'activecampaign'],
    timeSavings: 5,
    annualROI: 25000,
    businessOutcome: 'Automates trigger for improved efficiency',
    complexity: 'Low'
  },
  {
    id: 'slack-notification',
    name: 'Slack Team Notifications',
    summary: 'Automatically sends notifications to Slack channels based on workflow triggers',
    category: 'Communication',
    nodeTypes: ['slack', 'webhook'],
    timeSavings: 10,
    annualROI: 50000,
    businessOutcome: 'Automates notifications for improved efficiency',
    complexity: 'Medium'
  },
  {
    id: 'salesforce-sync',
    name: 'Salesforce Data Synchronization',
    summary: 'Synchronizes customer data between multiple systems and Salesforce',
    category: 'Sales',
    nodeTypes: ['salesforce', 'database', 'api'],
    timeSavings: 15,
    annualROI: 100000,
    businessOutcome: 'Automates data sync for improved efficiency',
    complexity: 'High'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || 'All'
    const limit = parseInt(searchParams.get('limit') || '20')

    // Filter workflows based on search criteria
    let filteredWorkflows = [...mockWorkflows]

    // Add search filter
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filteredWorkflows = filteredWorkflows.filter(workflow =>
        workflow.name.toLowerCase().includes(searchTerm) ||
        workflow.summary.toLowerCase().includes(searchTerm) ||
        workflow.businessOutcome.toLowerCase().includes(searchTerm)
      )
    }

    // Add category filter
    if (category !== 'All') {
      filteredWorkflows = filteredWorkflows.filter(workflow =>
        workflow.category.toLowerCase().includes(category.toLowerCase())
      )
    }

    // Sort by ROI and limit results
    filteredWorkflows = filteredWorkflows
      .sort((a, b) => b.annualROI - a.annualROI)
      .slice(0, limit)

    // Format the results for the frontend
    const workflows = filteredWorkflows.map(workflow => ({
      id: workflow.id,
      name: workflow.name,
      summary: workflow.summary,
      category: workflow.category,
      nodeTypes: workflow.nodeTypes,
      timeSavings: workflow.timeSavings,
      annualROI: workflow.annualROI,
      businessOutcome: workflow.businessOutcome,
      complexity: workflow.complexity
    }))

    return NextResponse.json({
      workflows,
      total: workflows.length,
      query,
      category
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}