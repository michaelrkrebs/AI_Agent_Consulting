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
      <section className="py-24 bg-white nasa-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-nasa text-black mb-8 tracking-widest">
              PROVEN AI AGENTS
            </h2>
            <p className="text-xl text-black max-w-4xl mx-auto font-light leading-relaxed">
              These agents have generated millions in value for American businesses.
              Built from real enterprise workflows, not academic theory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAgents.map((agent, index) => (
              <div key={index} className="bg-black border-4 border-red-600 p-8 hover:border-white transition-colors group">
                <div className="flex items-center justify-between mb-8">
                  <span className="bg-red-600 text-white px-4 py-2 text-xs font-nasa-mono tracking-widest">
                    {agent.category}
                  </span>
                  <div className="text-right">
                    <span className="text-sm text-red-600 font-nasa-mono">{agent.successRate}</span>
                  </div>
                </div>

                <h3 className="text-xl font-nasa text-white mb-6 leading-tight">
                  {agent.name}
                </h3>

                <p className="text-white mb-10 font-light leading-relaxed">
                  {agent.description}
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center border-r border-red-600 pr-4">
                    <div className="text-3xl font-nasa-mono text-red-600 mb-2">{agent.roi}</div>
                    <div className="text-xs font-nasa text-white">ANNUAL ROI</div>
                  </div>
                  <div className="text-center pl-4">
                    <div className="text-3xl font-nasa-mono text-red-600 mb-2">{agent.timeSaved}</div>
                    <div className="text-xs font-nasa text-white">TIME SAVED</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-nasa text-white mb-8 tracking-widest">
              MISSION SPECIALISTS
            </h2>
            <p className="text-xl text-white max-w-4xl mx-auto font-light leading-relaxed">
              Former enterprise automation engineers who've seen what works at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Michael Krebs */}
            <div className="text-center border-4 border-red-600 bg-white p-8">
              <div className="w-32 h-32 mx-auto mb-8 bg-black border-2 border-red-600 flex items-center justify-center">
                <div className="text-4xl text-red-600 font-nasa-mono">MK</div>
              </div>
              <h3 className="text-2xl font-nasa text-black mb-8 tracking-widest">
                MICHAEL KREBS
              </h3>
              <p className="text-black leading-relaxed font-light">
                Former automation architect at Fortune 500 companies. Built workflow optimization systems
                that saved over $50M annually across enterprise clients. Specialized in n8n automation
                platforms and AI integration strategies for mid-market businesses.
              </p>
            </div>

            {/* Thomas Baker */}
            <div className="text-center border-4 border-red-600 bg-white p-8">
              <div className="w-32 h-32 mx-auto mb-8 bg-black border-2 border-red-600 flex items-center justify-center">
                <div className="text-4xl text-red-600 font-nasa-mono">TB</div>
              </div>
              <h3 className="text-2xl font-nasa text-black mb-8 tracking-widest">
                THOMAS BAKER
              </h3>
              <p className="text-black leading-relaxed font-light">
                15+ years designing business process automation for SMB growth companies. Expert in
                translating complex operational requirements into streamlined AI workflows. Previously
                led digital transformation initiatives for 200+ mid-market organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Search */}
      <section id="catalog" className="py-24 bg-white nasa-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-nasa text-black mb-8 tracking-widest">
              AGENT CATALOG
            </h2>
            <p className="text-xl text-black max-w-4xl mx-auto font-light leading-relaxed">
              Browse 2,046 proven automation workflows. Each one tested in real businesses,
              with clear ROI data and implementation timelines. No guesswork, just results.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 w-6 h-6" />
              <input
                type="text"
                placeholder="SEARCH FOR AI AGENTS (E.G., 'SALES AUTOMATION', 'CUSTOMER SUPPORT')"
                className="w-full pl-12 pr-32 py-6 text-lg border-4 border-black bg-white focus:border-red-600 focus:outline-none font-nasa-mono tracking-wider uppercase text-black placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={searchWorkflows}
                disabled={!searchQuery.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-6 py-3 font-nasa-mono text-sm tracking-widest hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed border-2 border-red-600"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SEARCH'}
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 font-nasa-mono text-sm tracking-widest border-2 transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-black border-black hover:bg-red-600 hover:text-white hover:border-red-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Results */}
            <div className="bg-white border-4 border-black">
              {!hasSearched ? (
                <div className="p-12 text-center">
                  <div className="mb-6">
                    <Search className="w-16 h-16 mx-auto mb-6 text-red-600" />
                    <p className="font-nasa text-black tracking-wider">ENTER A SEARCH TERM TO EXPLORE OUR CATALOG OF 2,046 AI AGENTS</p>
                  </div>
                  <p className="text-sm text-black font-nasa-mono tracking-widest">
                    OR REQUEST A CONSULTATION BELOW TO DISCUSS CUSTOM AGENT DEVELOPMENT
                  </p>
                </div>
              ) : isLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-6 text-red-600" />
                  <p className="text-black font-nasa tracking-wider">SEARCHING WORKFLOW DATABASE...</p>
                </div>
              ) : workflows.length > 0 ? (
                <div className="divide-y-4 divide-red-600">
                  {workflows.map((workflow, index) => (
                    <div key={workflow.id || index} className="p-8 hover:bg-red-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-nasa text-black tracking-widest">{workflow.name}</h3>
                        <span className="bg-red-600 text-white px-4 py-2 text-xs font-nasa-mono tracking-widest">
                          {workflow.category}
                        </span>
                      </div>
                      <p className="text-black font-light leading-relaxed text-lg">{workflow.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-black font-nasa tracking-wider mb-2">NO WORKFLOWS FOUND FOR "{searchQuery}"</p>
                  <p className="text-sm text-black font-nasa-mono tracking-widest">TRY A DIFFERENT SEARCH TERM OR REQUEST A CUSTOM CONSULTATION</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-24 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-nasa text-white mb-8 tracking-widest">
              MISSION CONTROL
            </h2>
            <p className="text-xl text-white font-light leading-relaxed max-w-4xl mx-auto">
              Ready to implement AI that actually works? Let's design your automation strategy.
            </p>
          </div>

          <form className="bg-white border-4 border-red-600 p-12 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-nasa-mono text-black mb-4 tracking-widest">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-4 border-2 border-black bg-white focus:border-red-600 focus:outline-none font-nasa-mono tracking-wider"
                />
              </div>
              <div>
                <label className="block text-sm font-nasa-mono text-black mb-4 tracking-widest">
                  COMPANY *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-4 border-2 border-black bg-white focus:border-red-600 focus:outline-none font-nasa-mono tracking-wider"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-nasa-mono text-black mb-4 tracking-widest">
                  EMAIL *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-6 py-4 border-2 border-black bg-white focus:border-red-600 focus:outline-none font-nasa-mono tracking-wider"
                />
              </div>
              <div>
                <label className="block text-sm font-nasa-mono text-black mb-4 tracking-widest">
                  COMPANY SIZE
                </label>
                <select className="w-full px-6 py-4 border-2 border-black bg-white focus:border-red-600 focus:outline-none font-nasa-mono tracking-wider">
                  <option>SELECT COMPANY SIZE</option>
                  <option>1-10 EMPLOYEES</option>
                  <option>11-50 EMPLOYEES</option>
                  <option>51-200 EMPLOYEES</option>
                  <option>201-500 EMPLOYEES</option>
                  <option>500+ EMPLOYEES</option>
                </select>
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-sm font-nasa-mono text-black mb-4 tracking-widest">
                WHAT BUSINESS PROCESS NEEDS AI AUTOMATION? *
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-6 py-4 border-2 border-black bg-white focus:border-red-600 focus:outline-none font-nasa-mono tracking-wider"
                placeholder="DESCRIBE THE MANUAL PROCESSES EATING UP YOUR TEAM'S TIME..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-6 px-8 font-nasa text-xl hover:bg-black transition-colors flex items-center justify-center tracking-widest border-2 border-red-600"
            >
              REQUEST CONSULTATION
              <ArrowRight className="ml-4 w-6 h-6" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-nasa mb-8 tracking-widest">
              <span className="text-red-600">THE AMERICAN</span>
              <br />
              <span className="text-white">AI AGENT COMPANY</span>
            </div>
            <p className="text-white mb-8 font-light text-lg max-w-3xl mx-auto leading-relaxed">
              Building the future of American business through intelligent automation.
            </p>
            <div className="border-t-2 border-red-600 pt-8">
              <div className="text-sm font-nasa-mono text-white tracking-widest">
                © 2025 THE AMERICAN AI AGENT COMPANY. BUILT FOR AMERICAN COMPETITIVENESS.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}