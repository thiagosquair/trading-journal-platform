"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, BookOpen, Brain, Target, TrendingUp, Users, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  const [expandedFeatures, setExpandedFeatures] = useState(false)

  const toggleExpandFeatures = () => {
    setExpandedFeatures(!expandedFeatures)
  }

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Advanced Analytics",
      description: "Gain deep insights into your trading patterns with comprehensive performance metrics.",
      expandedDescription:
        "Track win rates, profit factors, Sharpe ratios, and detailed performance breakdowns. Analyze your trading patterns with advanced statistical metrics, risk-adjusted returns, and comprehensive reporting tools that help you understand your strengths and weaknesses as a trader.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Trading Journal",
      description: "Document your thoughts, strategies, and emotions for each trade.",
      expandedDescription:
        "Upload chart screenshots, add detailed trade notes, tag trades by strategy, and track your emotional state. Our comprehensive journaling system helps you identify patterns in your decision-making process and improve your trading psychology over time.",
    },
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "Psychology Tools",
      description: "Track your trading psychology and emotional patterns.",
      expandedDescription:
        "Monitor confidence levels, stress indicators, and emotional triggers. Access guided meditation exercises, pre-trade checklists, and psychological assessments designed specifically for traders to help you maintain optimal mental performance.",
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Performance Goals",
      description: "Set and track SMART trading goals with progress monitoring.",
      expandedDescription:
        "Create specific, measurable, achievable, relevant, and time-bound goals. Track your progress with visual indicators, receive personalized recommendations, and adjust your targets based on your performance data and market conditions.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Risk Analysis",
      description: "Monitor your risk exposure and position sizing.",
      expandedDescription:
        "Calculate optimal position sizes, monitor leverage usage, track maximum drawdown, and analyze risk-adjusted returns. Our risk management tools help you maintain consistent position sizing and protect your capital.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Trade Reporting",
      description: "Generate detailed reports to track your progress over time.",
      expandedDescription:
        "Create comprehensive monthly and yearly reports, export data for tax purposes, generate performance summaries for investors, and track your progress with detailed analytics and visualizations.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TradingJournal</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            🚀 New: AI-Powered Trade Analysis
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Your Trading with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ai and Data-Driven Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your trading performance with our comprehensive journal and analytics platform. Track, analyze,
            and improve your trading decisions with powerful insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">Essential</span> Trading Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you track, analyze, and improve your trading performance.
            </p>

            <div className="mt-8">
              <Button
                variant="outline"
                onClick={toggleExpandFeatures}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                {expandedFeatures ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Collapse All
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Expand All
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                {expandedFeatures && (
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed">{feature.expandedDescription}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See Your Trading Performance at a Glance</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intuitive dashboard gives you instant insights into your trading performance
            </p>
          </div>
          <div className="relative">
            <Image
              src="/trading-dashboard.png"
              alt="Trading Dashboard Preview"
              width={1200}
              height={800}
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Trading?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of traders who have improved their performance with our platform. Start your free trial
            today.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/register">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">TradingJournal</span>
              </div>
              <p className="text-gray-400">The complete trading analytics platform for serious traders.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-white">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-white">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TradingJournal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
