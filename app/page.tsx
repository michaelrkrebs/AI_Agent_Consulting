'use client'

import { useState, useEffect } from 'react'
import { Search, ArrowRight, CheckCircle, Star, TrendingUp, Users, DollarSign, Loader2 } from 'lucide-react'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [workflows, setWorkflows] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Fetch workflows from our API
  const searchWorkflows = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        category: selectedCategory,
        limit: '10'
      })

      const response = await fetch(`/api/workflows?${params}`)
      const data = await response.json()

      if (data.workflows) {
        setWorkflows(data.workflows)
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchWorkflows()
    }
  }

  // Sample top performing agents from your database
  const featuredAgents = [
    {
      name: "Sales Pipeline Automation",
      category: "Sales",
      description: "Automatically qualifies leads, scores prospects, and schedules follow-ups",
      roi: "$156,000",
      timeSaved: "32 hrs/week",
      successRate: "94%"
    },
    {
      name: "Customer Support Intelligence",
      category: "Support",
      description: "Handles 80% of customer inquiries with AI-powered responses",
      roi: "$89,000",
      timeSaved: "25 hrs/week",
      successRate: "91%"
    },
    {
      name: "Content Generation Engine",
      category: "Marketing",
      description: "Creates personalized marketing content across all channels",
      roi: "$67,000",
      timeSaved: "18 hrs/week",
      successRate: "88%"
    }
  ]

  const categories = ['All', 'Sales', 'Marketing', 'Support', 'Operations', 'Finance', 'HR']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center">
              <div className="text-3xl font-nasa text-white">
                <span className="text-red-500">AI AGENT</span>
                <br />
                <span className="text-white">CONSULTING</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-12">
              <a href="#catalog" className="text-white hover:text-red-500 font-nasa text-sm">CATALOG</a>
              <a href="#team" className="text-white hover:text-red-500 font-nasa text-sm">TEAM</a>
              <a href="#consultation" className="bg-red-600 text-white px-8 py-3 font-nasa text-sm hover:bg-red-700 border border-red-600">
                REQUEST CONSULTATION
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white nasa-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-nasa text-black mb-8 leading-none">
              AI AGENTS
              <br />
              <span className="text-red-600">FOR SMB LEADERS</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-black font-light">
              The smartest CEOs are using AI to get ahead, but most have no clue how to actually do it.
              We've analyzed <strong className="font-nasa-mono text-red-600">2,013 enterprise workflows</strong> to build
              ready-to-deploy AI agents that save time and drive results.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-black border-4 border-red-600 px-6 py-8">
                <div className="text-4xl font-nasa-mono text-red-600 mb-2">2,013</div>
                <div className="text-xs font-nasa text-white">WORKFLOWS ANALYZED</div>
              </div>
              <div className="bg-black border-4 border-red-600 px-6 py-8">
                <div className="text-4xl font-nasa-mono text-red-600 mb-2">98.4%</div>
                <div className="text-xs font-nasa text-white">SUCCESS RATE</div>
              </div>
              <div className="bg-black border-4 border-red-600 px-6 py-8">
                <div className="text-4xl font-nasa-mono text-red-600 mb-2">$156K</div>
                <div className="text-xs font-nasa text-white">AVG ANNUAL ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              PROVEN AI AGENTS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These agents have generated millions in value for American businesses.
              Built from real enterprise workflows, not academic theory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAgents.map((agent, index) => (
              <div key={index} className="bg-white border border-slate-300 p-8 hover:border-cyan-400 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-slate-900 text-cyan-400 px-4 py-1 text-xs font-mono tracking-widest uppercase">
                    {agent.category}
                  </span>
                  <div className="text-right">
                    <span className="text-sm text-slate-500 font-mono">{agent.successRate}</span>
                  </div>
                </div>

                <h3 className="text-lg font-mono uppercase tracking-wider text-slate-900 mb-4 leading-tight">
                  {agent.name}
                </h3>

                <p className="text-slate-600 mb-8 font-light leading-relaxed">
                  {agent.description}
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-mono text-cyan-600 mb-1">{agent.roi}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">ANNUAL ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono text-cyan-600 mb-1">{agent.timeSaved}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">TIME SAVED</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4 tracking-wider">
              MISSION SPECIALISTS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Former enterprise automation engineers who've seen what works at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Michael Krebs */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-slate-200 rounded-full flex items-center justify-center">
                <div className="text-6xl text-slate-400">👤</div>
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide">
                MICHAEL KREBS
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Former automation architect at Fortune 500 companies. Built workflow optimization systems
                that saved over $50M annually across enterprise clients. Specialized in n8n automation
                platforms and AI integration strategies for mid-market businesses.
              </p>
            </div>

            {/* Thomas Baker */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-slate-200 rounded-full flex items-center justify-center">
                <div className="text-6xl text-slate-400">👤</div>
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide">
                THOMAS BAKER
              </h3>
              <p className="text-gray-600 leading-relaxed">
                15+ years designing business process automation for SMB growth companies. Expert in
                translating complex operational requirements into streamlined AI workflows. Previously
                led digital transformation initiatives for 200+ mid-market organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Search */}
      <section id="catalog" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4 tracking-wider">
              AGENT CATALOG
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Browse 2,046 proven automation workflows. Each one tested in real businesses,
              with clear ROI data and implementation timelines. No guesswork, just results.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for AI agents (e.g., 'sales automation', 'customer support')"
                className="w-full pl-12 pr-24 py-4 text-lg border-2 border-slate-300 rounded focus:border-cyan-500 focus:outline-none font-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={searchWorkflows}
                disabled={!searchQuery.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cyan-500 text-slate-900 px-4 py-2 rounded font-medium hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SEARCH'}
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Results */}
            <div className="bg-white rounded border border-slate-300">
              {!hasSearched ? (
                <div className="p-8 text-center">
                  <div className="text-slate-500 mb-4">
                    <Search className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <p className="font-light">Enter a search term to explore our catalog of 2,046 AI agents</p>
                  </div>
                  <p className="text-sm text-slate-400">
                    Or request a consultation below to discuss custom agent development
                  </p>
                </div>
              ) : isLoading ? (
                <div className="p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyan-500" />
                  <p className="text-slate-600 font-light">Searching workflow database...</p>
                </div>
              ) : workflows.length > 0 ? (
                <div className="divide-y divide-slate-200">
                  {workflows.map((workflow, index) => (
                    <div key={workflow.id || index} className="p-6 border-b border-slate-200 hover:bg-slate-50">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-nasa-mono uppercase tracking-wider text-slate-900 font-medium">{workflow.name}</h3>
                        <span className="nasa-badge text-cyan-400 px-3 py-1 text-xs font-nasa-mono tracking-widest">
                          {workflow.category}
                        </span>
                      </div>
                      <p className="text-slate-600 font-light leading-relaxed">{workflow.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-slate-600 font-light">No workflows found for "{searchQuery}"</p>
                  <p className="text-sm text-slate-400 mt-2">Try a different search term or request a custom consultation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 tracking-wider">
              MISSION CONTROL
            </h2>
            <p className="text-xl text-cyan-300 font-light">
              Ready to implement AI that actually works? Let's design your automation strategy.
            </p>
          </div>

          <form className="bg-white rounded-lg p-8 text-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none">
                  <option>Select company size</option>
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-500 employees</option>
                  <option>500+ employees</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What business process needs AI automation? *
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                placeholder="Describe the manual processes eating up your team's time..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              REQUEST CONSULTATION
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">
              <span className="text-red-400">THE AMERICAN</span>
              <br />
              <span className="text-blue-300">AI AGENT COMPANY</span>
            </div>
            <p className="text-gray-400 mb-6">
              Building the future of American business through intelligent automation.
            </p>
            <div className="text-sm text-gray-500">
              © 2025 The American AI Agent Company. Built for American competitiveness.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}