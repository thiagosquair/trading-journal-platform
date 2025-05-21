"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  BarChart2,
  BookOpen,
  LineChart,
  Brain,
  RefreshCw,
  Target,
  Shield,
  ArrowUpRight,
  BrainCircuit,
} from "lucide-react"
import HeroVideo from "@/components/hero-video"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 text-center relative">
        <p className="text-sm font-medium">
          New MT5 Live Account Integration is now available! 🚀{" "}
          <Link href="/trading-accounts/connect-mt5" className="underline ml-1">
            Connect your account now
          </Link>
        </p>
      </div>

      {/* Header/Navigation */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <LineChart className="h-6 w-6 mr-2 text-blue-600" />
            <span className="text-xl font-bold text-blue-900">TradeLinx</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline">
              Login
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    <span className="block">Elevate Your Trading with</span>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      AI and Data-Driven Insights
                    </span>
                  </h1>
                  <p className="mt-6 text-lg text-slate-600 max-w-2xl">
                    TradeLinx helps you discover patterns in your trading behavior, identify your strengths, and
                    overcome weaknesses with powerful analytics and AI-powered journaling tools. Connect your MT5
                    account for real-time performance tracking.
                  </p>
                </div>
                <div>
                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      asChild
                    >
                      <Link href="/register">
                        Start Journaling Free <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/demo">View Demo</Link>
                    </Button>
                  </div>
                  <div className="mt-6 text-sm text-slate-500">
                    No credit card required • Free plan available • Cancel anytime
                  </div>
                </div>
              </div>
              <div className="h-full flex items-center">
                <HeroVideo />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Essential
                </span>{" "}
                Trading Features
              </h2>
              <p className="mt-4 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive suite of tools helps you track, analyze, and improve your trading performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-slate-600">
                  Gain deep insights into your trading patterns with comprehensive performance metrics.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trading Journal</h3>
                <p className="text-slate-600">Document your thoughts, strategies, and emotions for each trade.</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Psychology Tools</h3>
                <p className="text-slate-600">Track and manage your emotional states to improve trading decisions.</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <RefreshCw className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">MT5 Integration</h3>
                <p className="text-slate-600">
                  Connect directly to your MT5 accounts for automatic trade synchronization.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Performance Goals</h3>
                <p className="text-slate-600">
                  Set and track trading goals to measure your progress and stay accountable.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Risk Analysis</h3>
                <p className="text-slate-600">
                  Analyze your risk management with detailed risk metrics and suggestions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Trade Analysis Section */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm">
                  NEW FEATURE
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI-Powered
                  </span>{" "}
                  Trade Analysis
                </h2>
                <p className="mt-4 text-slate-600 max-w-xl">
                  Upload your chart screenshots and get instant AI analysis of your trade setups, including pattern
                  recognition, support/resistance levels, and risk/reward calculations.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-indigo-100 rounded-full p-1">
                      <BrainCircuit className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-slate-700">Automatic pattern recognition and trend analysis</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-indigo-100 rounded-full p-1">
                      <Target className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-slate-700">Optimal entry and exit point suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-indigo-100 rounded-full p-1">
                      <Shield className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-slate-700">Risk/reward calculation and position sizing advice</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    asChild
                  >
                    <Link href="/trade-analysis">
                      Try AI Analysis <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200">
                  <Image
                    src="/ai-analysis-interface.png"
                    alt="AI Trade Analysis Example"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MT5 Integration Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200">
                  <Image
                    src="/trading-dashboard.png"
                    alt="MT5 Integration"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
              <div>
                <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                  NEW FEATURE
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    MetaTrader 5
                  </span>{" "}
                  Live Integration
                </h2>
                <p className="mt-4 text-slate-600 max-w-xl">
                  Connect your MT5 trading accounts directly to TradeLinx for automatic trade synchronization and
                  real-time performance tracking.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                      <RefreshCw className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-slate-700">Real-time account synchronization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                      <BarChart2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-slate-700">Automatic performance tracking and analytics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-slate-700">Secure read-only access to your trading accounts</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    asChild
                  >
                    <Link href="/trading-accounts/connect-mt5">
                      Connect Your MT5 Account <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Trading?
            </h2>
            <p className="mt-4 mx-auto max-w-[700px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of traders who are using TradeLinx's advanced analytics and AI-powered insights to improve
              their performance and achieve consistent results.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100" asChild>
                <Link href="/register">
                  Get Started Free <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 bg-slate-900 text-slate-400">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">TradeLinx</h3>
              <p className="text-sm">The ultimate trading journal and analytics platform for serious traders.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-white transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© {new Date().getFullYear()} TradeLinx. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white transition-colors">
                  Twitter
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
