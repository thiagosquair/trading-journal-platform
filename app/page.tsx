"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  BarChart2,
  BookOpen,
  FileText,
  Calendar,
  RefreshCw,
  Play,
  LineChart,
  Brain,
  Shield,
  Sparkles,
  Bot,
  MessageSquare,
  Lightbulb,
  Zap,
  UserCircle,
  BrainCircuit,
  TrendingUp,
  Target,
  BarChart,
  ArrowUpRight,
} from "lucide-react"
import FeatureCard from "@/components/feature-card"
import HeroVideo from "@/components/hero-video"
import BrokerConnectionsVideo from "@/components/broker-connections-video"
import { motion } from "framer-motion"
import TraderDevelopmentCard from "@/components/trader-development-card"
import PlatformIntegrationsCarousel from "@/components/platform-integrations-carousel"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 text-center relative">
        <p className="text-sm font-medium">
          TradeLinx Pro is now live! 🚀{" "}
          <Link href="/pricing" className="underline ml-1">
            Check it out here!
          </Link>
        </p>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" aria-label="Close">
          &times;
        </button>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-7xl">
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
                  TradeLinx is the ultimate tool that every trader has been waiting for. Our platform helps you discover
                  patterns in your trading behavior, identify your strengths, and overcome weaknesses with powerful
                  analytics and AI-powered journaling tools. Whether you're a beginner or a seasoned professional,
                  TradeLinx transforms your trading journey with data-driven insights that lead to consistent
                  profitability.
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
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Essential
              </span>{" "}
              Trading Features
            </motion.h2>
            <motion.p
              className="mt-4 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Our comprehensive suite of tools helps you track, analyze, and improve your trading performance.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10" />}
              title="Advanced Analytics"
              description="Gain deep insights into your trading patterns with comprehensive performance metrics."
              longDescription="Our analytics engine processes your trading data to reveal hidden patterns, strengths, and weaknesses. Track your win rate, profit factor, average win/loss, drawdowns, and dozens of other metrics across different timeframes, markets, and strategies."
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10" />}
              title="Trading Journal"
              description="Document your thoughts, strategies, and emotions for each trade."
              longDescription="Our structured journaling system helps you record not just what happened, but why it happened. Document your pre-trade analysis, execution quality, and post-trade reflections. Tag entries, add screenshots, and link directly to specific trades for comprehensive record-keeping."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10" />}
              title="Trade Reporting"
              description="Generate detailed reports to track your progress over time."
              longDescription="Create customizable reports that highlight your performance across any timeframe. Export to PDF or CSV for sharing with mentors or keeping offline records. Schedule automated reports to be delivered to your email to maintain accountability and track long-term progress."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10" />}
              title="Trade Calendar"
              description="Visualize your trading activity and performance on a calendar view."
              longDescription="Our interactive calendar provides a visual representation of your trading activity. Quickly identify your most profitable days, weeks, or months. Spot patterns in your trading frequency and performance to optimize your trading schedule and capitalize on market conditions."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10" />}
              title="Psychology Tools"
              description="Track and manage your emotional states to improve trading decisions."
              longDescription="Our psychology tools help you understand the emotional factors affecting your trading. Track your mood, stress, and focus levels before and after trades. Identify emotional triggers that lead to poor decisions and develop strategies to maintain discipline during challenging market conditions."
            />
            <FeatureCard
              icon={<RefreshCw className="h-10 w-10" />}
              title="Broker Integration"
              description="Automatically import trades from your broker for seamless tracking."
              longDescription="Connect directly to your trading platforms including MetaTrader, cTrader, dxTrade, MatchTrade, and TradeLocker. Automatically import all your trades with no manual data entry required. Keep your journal in perfect sync with your actual trading activity across multiple accounts and brokers."
            />
            <FeatureCard
              icon={<Play className="h-10 w-10" />}
              title="Trade Replay"
              description="Review your trades with a visual replay to learn from past decisions."
              longDescription="Our trade replay feature allows you to watch how your trades unfolded in a step-by-step visual replay. See exactly what happened before, during, and after your entry and exit points. Identify missed opportunities and mistakes to refine your strategy and improve future execution."
            />
            <FeatureCard
              icon={<LineChart className="h-10 w-10" />}
              title="Performance Projection"
              description="Visualize your potential future returns based on current trading metrics."
              longDescription="Our projection tools use your actual trading statistics to forecast potential future performance. See how small improvements in win rate or risk management could compound over time. Set realistic goals based on your trading history and track your progress toward achieving them."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10" />}
              title="Risk Analysis"
              description="Analyze your risk management with detailed risk metrics and suggestions."
              longDescription="Our risk analysis tools help you maintain proper position sizing and account risk. Calculate optimal position sizes based on your risk tolerance. Track risk-to-reward ratios, maximum drawdown, and risk-adjusted returns to ensure you're protecting your capital while maximizing growth potential."
            />
          </div>
        </div>
      </section>

      {/* AI Trade Analysis Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto max-w-7xl">
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
                    <Sparkles className="h-4 w-4 text-indigo-600" />
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
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-indigo-100 rounded-full p-1">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-slate-700">Save analysis directly to your trading journal</span>
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

      {/* Performance Goals Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200">
                <Image
                  src="/performance-analytics.png"
                  alt="Performance Goals Dashboard"
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
                  Performance
                </span>{" "}
                Goals & Analytics
              </h2>
              <p className="mt-4 text-slate-600 max-w-xl">
                Set measurable trading goals and track your progress with our comprehensive analytics dashboard.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Set win rate, profit, and risk/reward ratio targets</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                    <BarChart className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Track progress with visual dashboards and reports</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Set timeframes for short and long-term objectives</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Receive personalized guidance to achieve your goals</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  asChild
                >
                  <Link href="/goals">
                    Set Your Goals <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Platform Integration Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <PlatformIntegrationsCarousel />
        </div>
      </section>

      {/* Trader Development Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Trader</span>{" "}
              Development Features
            </motion.h2>
            <motion.p
              className="mt-4 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Track your growth as a trader with our comprehensive development tools
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TraderDevelopmentCard
              icon={<UserCircle className="h-10 w-10" />}
              title="Trader Profile"
              description="Build a comprehensive profile to track your trading journey."
              longDescription="Our trader profile system helps you document your trading evolution over time. Track your progress across key trading skills, identify your strengths and weaknesses, and set personalized development goals. The profile includes skill assessments, personality insights, and customizable metrics that matter most to your trading style."
            />
            <TraderDevelopmentCard
              icon={<BrainCircuit className="h-10 w-10" />}
              title="Weekly Reflections"
              description="Regular self-reflection prompts to develop trading mindfulness."
              longDescription="Our guided reflection system provides structured prompts to help you process your trading experiences. Answer questions designed by trading psychologists to uncover emotional patterns, cognitive biases, and decision-making flaws. Track your psychological progress over time and receive personalized suggestions to improve your trading mindset."
            />
            <TraderDevelopmentCard
              icon={<TrendingUp className="h-10 w-10" />}
              title="Development Tracking"
              description="Visualize your growth across key trading skills."
              longDescription="Our development tracking system uses radar charts and progress indicators to visualize your growth across critical trading competencies. See how your discipline, risk management, technical analysis, and other skills improve over time. Set benchmarks, track milestones, and celebrate your progress as you evolve into a more complete trader."
            />
            <TraderDevelopmentCard
              icon={<BookOpen className="h-10 w-10" />}
              title="Learning Resources"
              description="Access curated educational content based on your needs."
              longDescription="Our personalized learning system recommends articles, videos, and exercises based on your specific development needs. If you're struggling with emotional control, we'll suggest relevant psychology resources. If technical analysis is your weakness, we'll provide targeted chart reading exercises. All content is organized by skill level and trading style."
            />
            <TraderDevelopmentCard
              icon={<MessageSquare className="h-10 w-10" />}
              title="Community Feedback"
              description="Get constructive feedback from experienced traders."
              longDescription="Share your trades and thought processes with our community of traders for valuable feedback. Our moderated environment ensures constructive criticism rather than toxic commentary. Experienced mentors regularly review community discussions to add professional insights. Build relationships with traders who share your goals and challenges."
            />
            <TraderDevelopmentCard
              icon={<LineChart className="h-10 w-10" />}
              title="Progress Reports"
              description="Receive detailed monthly reports on your development."
              longDescription="Our comprehensive progress reports provide an objective view of your trading development. See how your skills, psychology, and performance metrics have changed month-to-month and year-to-year. Identify trends in your development, celebrate milestones, and pinpoint areas that still need attention. Each report includes personalized action items for continued growth."
            />
          </div>
        </div>
      </section>

      {/* AI Analysis Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Trade Analysis
            </motion.h2>
            <motion.p
              className="mt-4 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Leverage the power of artificial intelligence to analyze your trades, identify patterns, and receive
              personalized recommendations.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="h-10 w-10" />}
              title="AI Trade Analysis"
              description="Get AI-powered insights on your trade ideas before you execute them."
              longDescription="Our AI analyzes your trade setups, evaluates risk-reward ratios, identifies potential pitfalls, and provides objective feedback on your trading ideas. Submit your trade ideas and receive instant analysis to improve your decision-making process."
            />
            <FeatureCard
              icon={<Sparkles className="h-10 w-10" />}
              title="Pattern Recognition"
              description="Automatically identify recurring patterns in your trading behavior."
              longDescription="Our advanced AI algorithms analyze your historical trades to identify patterns in your winning and losing trades. Discover which setups work best for you, which market conditions favor your strategy, and what common mistakes are affecting your performance."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10" />}
              title="Custom AI Templates"
              description="Create personalized AI prompts tailored to your trading strategy."
              longDescription="Build custom AI analysis templates that focus on the aspects of trading most important to you. Whether you need technical analysis, fundamental insights, or risk management advice, customize your AI assistant to provide exactly the guidance you need."
            />
            <FeatureCard
              icon={<Lightbulb className="h-10 w-10" />}
              title="Trading Insights"
              description="Receive personalized suggestions to improve your trading performance."
              longDescription="Based on your trading history and journal entries, our AI generates actionable insights to help you improve. Get personalized recommendations on position sizing, entry timing, exit strategies, and emotional control tailored to your specific trading style."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10" />}
              title="Real-time Feedback"
              description="Get instant analysis on your trades as you journal them."
              longDescription="As you record your trades, our AI provides immediate feedback on your execution, risk management, and adherence to your trading plan. This real-time guidance helps you identify and correct mistakes quickly, accelerating your learning curve."
            />
            <FeatureCard
              icon={<LineChart className="h-10 w-10" />}
              title="Performance Prediction"
              description="Forecast potential outcomes based on your trading patterns."
              longDescription="Our AI analyzes your historical performance to predict how your current strategies might perform in various market conditions. Identify which approaches are likely to succeed long-term and which might need refinement before risking real capital."
            />
          </div>
        </div>
      </section>

      {/* Trading Platform Integration Section */}
      {/*
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm">
              NEW INTEGRATIONS
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Trading Platform
              </span>{" "}
              Integrations
            </h2>
            <p className="mt-4 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connect your trading accounts directly to TradeLinx for automatic trade synchronization and real-time
              performance tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Repeat className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">MetaTrader 4/5</h3>
                <p className="text-slate-600 mb-4">
                  Connect your MT4 or MT5 accounts for automatic trade synchronization and performance tracking.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span className="text-slate-700 text-sm">Secure API connection</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span className="text-slate-700 text-sm">Real-time trade synchronization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span className="text-slate-700 text-sm">Historical trade import</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/trading-accounts/new-account">Connect Account</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">DXtrade</h3>
                <p className="text-slate-600 mb-4">
                  Connect your DXtrade Standard or Pro accounts for seamless trade tracking and analysis.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span className="text-slate-700 text-sm">OAuth authentication</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span className="text-slate-700 text-sm">Automatic position tracking</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span className="text-slate-700 text-sm">Account performance metrics</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/trading-accounts/test-integration">Connect Account</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Gauge className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">TradingView</h3>
                <p className="text-slate-600 mb-4">
                  Import your TradingView charts and analysis directly into your trading journal.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span className="text-slate-700 text-sm">Chart screenshot import</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span className="text-slate-700 text-sm">Pine Script strategy import</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span className="text-slate-700 text-sm">Indicator settings sync</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/trading-accounts">Connect Account</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              asChild
            >
              <Link href="/trading-accounts">
                View All Integrations <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      */}

      {/* Broker Integrations Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Seamless</span>{" "}
              Broker Integrations
            </h2>
            <p className="mt-4 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connect TradeLinx with your favorite trading platforms. Import your trades automatically and keep your
              journal in sync with your actual trading activity.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-xl border bg-background p-2 shadow-lg">
              <BrokerConnectionsVideo />
            </div>

            <div className="mt-8 flex justify-center">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Link href="/broker-support">
                  View All Supported Brokers <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Trusted</span>{" "}
              by Traders Worldwide
            </h2>
            <p className="mt-4 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our users are saying about how TradeLinx has transformed their trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial cards would go here */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-slate-500">Forex Trader</p>
                </div>
              </div>
              <p className="text-slate-600">
                "TradeLinx has completely transformed my trading. The analytics helped me identify patterns I never
                noticed before, and my win rate has improved by 15% in just two months."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  AS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Alice Smith</h4>
                  <p className="text-sm text-slate-500">Options Trader</p>
                </div>
              </div>
              <p className="text-slate-600">
                "The journaling feature has been a game-changer for me. Being able to document my thought process and
                emotions has helped me overcome psychological barriers in my trading."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  RJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-slate-500">Crypto Trader</p>
                </div>
              </div>
              <p className="text-slate-600">
                "The backtesting and strategy builder tools have allowed me to refine my approach and develop a trading
                system that works consistently. Worth every penny!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-7xl text-center">
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
                <li>
                  <Link href="/roadmap" className="hover:text-white transition-colors">
                    Roadmap
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
                <li>
                  <Link href="/api" className="hover:text-white transition-colors">
                    API
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
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
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
              <p>© 2023 TradeLinx. All rights reserved.</p>
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
                <Link href="#" className="hover:text-white transition-colors">
                  YouTube
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
