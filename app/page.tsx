'use client'

import { useState, useEffect } from 'react'
import { Search, ArrowRight, CheckCircle, Star, TrendingUp, Users, DollarSign, Loader2, Bot, Zap, Target } from 'lucide-react'

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

  // Core service areas
  const serviceAreas = [
    {
      icon: Bot,
      title: "Custom AI Agents",
      description: "We build AI agents tailored to your specific business needs - from customer service bots to data processing agents."
    },
    {
      icon: Zap,
      title: "Process Automation",
      description: "Turn time-consuming manual tasks into automated workflows that run 24/7 without human intervention."
    },
    {
      icon: Target,
      title: "Business Integration",
      description: "Connect your AI agents with existing tools and systems to create seamless, efficient operations."
    }
  ]

  const categories = ['All', 'Sales', 'Marketing', 'Support', 'Operations', 'Finance', 'HR']

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                Gold Star Workflows
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600 font-medium">Services</a>
              <a href="#catalog" className="text-gray-600 hover:text-blue-600 font-medium">Catalog</a>
              <a href="#team" className="text-gray-600 hover:text-blue-600 font-medium">Team</a>
              <a href="#contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Get Started
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              We Build AI Agents That
              <span className="text-blue-600"> Improve Your Business</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Custom AI agents that handle repetitive tasks, streamline operations,
              and free up your team to focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="#catalog" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Browse Workflows
              </a>
              <a href="#contact" className="bg-white text-gray-900 px-8 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors font-medium">
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We design and build AI agents that take over repetitive work,
              so your team can focus on growing the business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceAreas.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've spent years building automation systems for large companies.
              Now we help smaller businesses get the same advantages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Michael Krebs */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="text-2xl font-semibold text-blue-600">MK</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Michael Krebs
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Michael Krebs was the first bizops hire at a unicorn where he built the operational infrastructure for a billion-dollar business, later serving as Business Strategy Lead at Blue Origin's innovation lab. A serial entrepreneur who sold his first company in college, he currently runs DataFresh, a profitable business that operates autonomously through AI agents. His expertise spans business operations, business intelligence, and revenue operations, with a proven track record of building systems that drive measurable business impact. Michael specializes in designing business infrastructure and architecture specifically optimized for AI agent deployment, understanding how to structure processes, data flows, and decision frameworks that enable autonomous operations.
              </p>
            </div>

            {/* Thomas Baker */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="text-2xl font-semibold text-blue-600">TB</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Thomas Baker
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Thomas Baker is an Executive Fellow and Instructor at Harvard Business School teaching AI strategy to senior executives, and former CTO of Applied General Intelligence where he architected the Arx agent and AGI pipelines that outperformed top LLMs on industry benchmarks. He previously served as Engineering Lead for Advanced Concepts at Blue Origin, integrating generative AI into orbital mission planning, and led experimental vehicle development at LTA Research & Exploration. Currently, he shapes secure, decentralized AI architectures at MIT's Decentralized AI Lab while serving as AI Fellow at C10 Labs and Technical Fellow at Type One Ventures. With deep technical roots from Silicon Valley and experience spanning SpaceX Hyperloop to autonomous systems, Thomas mentors startups through Techstars and contributes to the Future of Defense Task Force.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Search */}
      <section id="catalog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Workflow Catalog
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Search through automation workflows we've analyzed and built.
              Find ideas for your business or see what's possible.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search workflows (e.g., 'sales automation', 'customer support')"
                className="w-full pl-12 pr-24 py-4 text-lg border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={searchWorkflows}
                disabled={!searchQuery.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
              </button>
            </div>


            {/* Search Results */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {!hasSearched ? (
                <div className="p-12 text-center">
                  <div className="mb-6">
                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Search our workflow database to find automation solutions</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Or contact us to discuss building custom AI agents for your business
                  </p>
                </div>
              ) : isLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600">Searching workflows...</p>
                </div>
              ) : workflows.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {workflows.map((workflow, index) => (
                    <div key={workflow.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full">
                          {workflow.category}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{workflow.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-600 mb-2">No workflows found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-500">Try a different search term or contact us for custom solutions</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Describe the manual work that's slowing your team down.
              We'll show you how AI agents can take it over.
            </p>
          </div>

          <form className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20">
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
                What business processes would you like to automate? *
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                placeholder="Tell us about the repetitive tasks or manual processes that take up your team's time..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Send Message
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-4">
              Gold Star Workflows
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We build AI agents that automate business processes and improve operations.
            </p>
            <div className="text-sm text-gray-500">
              © 2025 Gold Star Workflows
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}