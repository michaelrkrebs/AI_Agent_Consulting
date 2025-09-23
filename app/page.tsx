'use client'

import { useState } from 'react'
import { Search, ArrowRight, CheckCircle, Star, TrendingUp, Users, DollarSign } from 'lucide-react'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Sample top performing agents from your database
  const featuredAgents = [
    {
      name: "Sales Pipeline Automation",
      category: "Sales",
      description: "Automatically qualifies leads, scores prospects, and schedules follow-ups",
      roi: "$156,000",
      timeSaved: "32 hrs/week",
      successRate: "94%",
      companies: 127
    },
    {
      name: "Customer Support Intelligence",
      category: "Support",
      description: "Handles 80% of customer inquiries with AI-powered responses",
      roi: "$89,000",
      timeSaved: "25 hrs/week",
      successRate: "91%",
      companies: 89
    },
    {
      name: "Content Generation Engine",
      category: "Marketing",
      description: "Creates personalized marketing content across all channels",
      roi: "$67,000",
      timeSaved: "18 hrs/week",
      successRate: "88%",
      companies: 156
    }
  ]

  const categories = ['All', 'Sales', 'Marketing', 'Support', 'Operations', 'Finance', 'HR']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                <span className="text-red-600">THE AMERICAN</span>
                <br />
                <span className="text-blue-900">AI AGENT COMPANY</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#catalog" className="text-gray-700 hover:text-red-600 font-medium">Catalog</a>
              <a href="#consultation" className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700">
                Request Consultation
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-red-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              AMERICAN
              <br />
              <span className="text-red-300">AI DOMINANCE</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              We've analyzed <strong>2,046 enterprise workflows</strong> and built the definitive catalog of AI agents
              that American businesses need to compete and win in the global marketplace.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="bg-white/10 px-8 py-4 rounded-lg backdrop-blur">
                <div className="text-3xl font-bold text-red-300">2,046</div>
                <div className="text-sm uppercase tracking-wide">Workflows Analyzed</div>
              </div>
              <div className="bg-white/10 px-8 py-4 rounded-lg backdrop-blur">
                <div className="text-3xl font-bold text-red-300">98.4%</div>
                <div className="text-sm uppercase tracking-wide">Success Rate</div>
              </div>
              <div className="bg-white/10 px-8 py-4 rounded-lg backdrop-blur">
                <div className="text-3xl font-bold text-red-300">$2.1M</div>
                <div className="text-sm uppercase tracking-wide">Avg ROI Generated</div>
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
              <div key={index} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 hover:border-red-600 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
                    {agent.category}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{agent.successRate}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {agent.name}
                </h3>

                <p className="text-gray-600 mb-6">
                  {agent.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-red-600">{agent.roi}</div>
                    <div className="text-sm text-gray-500">Annual ROI</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{agent.timeSaved}</div>
                    <div className="text-sm text-gray-500">Time Saved</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  {agent.companies} companies using this agent
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Search */}
      <section id="catalog" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              THE COMPLETE CATALOG
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Search our comprehensive database of AI agents. If we don't have what you need,
              we'll build it from scratch using proven enterprise methodologies.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for AI agents (e.g., 'sales automation', 'customer support')"
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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

            {/* Search Results Placeholder */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-8 text-center">
              <div className="text-gray-500 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                Enter a search term to explore our catalog of 2,046 AI agents
              </div>
              <p className="text-sm text-gray-400">
                Or request a consultation below to discuss custom agent development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              REQUEST CONSULTATION
            </h2>
            <p className="text-xl text-blue-200">
              Let's discuss how AI agents can transform your business operations and drive American competitiveness.
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