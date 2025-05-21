import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, LineChart, Brain, Shield, TrendingUp, BarChart3, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Trading Courses | TradeLinx",
  description: "Free comprehensive trading courses to help you become a funded and consistent trader",
}

export default function CoursesPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">TradeLinx Trading Academy</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Free comprehensive trading education to help you become a funded and consistent trader
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Why Learn with TradeLinx?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <span>
                <strong>Comprehensive Curriculum:</strong> From basics to advanced strategies
              </span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <span>
                <strong>Practical Focus:</strong> Real-world examples and applications
              </span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <span>
                <strong>Integrated Learning:</strong> Apply concepts directly in your journal
              </span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <span>
                <strong>Community Support:</strong> Learn alongside other traders
              </span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <span>
                <strong>Always Free:</strong> No hidden costs or upsells
              </span>
            </li>
          </ul>
          <Button className="mt-6" asChild>
            <Link href="/courses/getting-started">
              Start Learning Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="relative rounded-xl overflow-hidden h-[300px]">
          <Image src="/trader-charts-office.png" alt="Trading education" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-2xl font-bold mb-2">From Beginner to Funded Trader</h3>
            <p className="text-white/90">Our structured curriculum takes you through every step of the journey</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Course Catalog</h2>
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course 1 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Beginner</div>
                  <div className="text-sm text-muted-foreground">8 Modules</div>
                </div>
                <CardTitle>Trading Fundamentals</CardTitle>
                <CardDescription>Master the essential concepts every trader needs to know</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Market Structure & Price Action</li>
                  <li>• Support & Resistance</li>
                  <li>• Trend Analysis</li>
                  <li>• Chart Patterns</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/courses/fundamentals">
                    Start Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course 2 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Beginner</div>
                  <div className="text-sm text-muted-foreground">6 Modules</div>
                </div>
                <CardTitle>Risk Management Mastery</CardTitle>
                <CardDescription>Learn to protect your capital and manage risk effectively</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Position Sizing</li>
                  <li>• Stop Loss Strategies</li>
                  <li>• Risk-Reward Ratios</li>
                  <li>• Portfolio Management</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/courses/risk-management">
                    Start Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course 3 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Beginner</div>
                  <div className="text-sm text-muted-foreground">7 Modules</div>
                </div>
                <CardTitle>Trading Psychology</CardTitle>
                <CardDescription>Develop the mindset of successful traders</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Emotional Control</li>
                  <li>• Cognitive Biases</li>
                  <li>• Discipline & Patience</li>
                  <li>• Performance Under Pressure</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/courses/psychology">
                    Start Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course 4 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Intermediate
                  </div>
                  <div className="text-sm text-muted-foreground">9 Modules</div>
                </div>
                <CardTitle>Technical Analysis Deep Dive</CardTitle>
                <CardDescription>Advanced chart reading and technical indicators</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Advanced Chart Patterns</li>
                  <li>• Indicator Combinations</li>
                  <li>• Divergence Trading</li>
                  <li>• Volume Analysis</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/courses/technical-analysis">
                    Start Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course 5 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Intermediate
                  </div>
                  <div className="text-sm text-muted-foreground">8 Modules</div>
                </div>
                <CardTitle>Strategy Development</CardTitle>
                <CardDescription>Create, test, and optimize your trading strategies</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Strategy Components</li>
                  <li>• Backtesting Techniques</li>
                  <li>• Performance Metrics</li>
                  <li>• Strategy Optimization</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/courses/strategy-development">
                    Start Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course 6 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Advanced</div>
                  <div className="text-sm text-muted-foreground">10 Modules</div>
                </div>
                <CardTitle>Becoming a Funded Trader</CardTitle>
                <CardDescription>Prepare for and pass prop firm challenges</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Prop Firm Selection</li>
                  <li>• Challenge Preparation</li>
                  <li>• Risk Management for Challenges</li>
                  <li>• Scaling with Funded Accounts</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/courses/funded-trader">
                    Start Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="beginner" className="mt-0">
          {/* Beginner courses would be shown here */}
        </TabsContent>

        <TabsContent value="intermediate" className="mt-0">
          {/* Intermediate courses would be shown here */}
        </TabsContent>

        <TabsContent value="advanced" className="mt-0">
          {/* Advanced courses would be shown here */}
        </TabsContent>
      </Tabs>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Learning Paths</h2>
            <p className="mb-6">
              Not sure where to start? Follow our structured learning paths designed for different trading goals and
              experience levels.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2">Beginner Trader Path</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Perfect for those just starting their trading journey
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/courses/paths/beginner">
                    View Path <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2">Prop Firm Challenge Path</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Focused on preparing for and passing prop firm evaluations
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/courses/paths/prop-firm">
                    View Path <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2">Consistency Builder Path</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  For traders looking to improve consistency and reduce drawdowns
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/courses/paths/consistency">
                    View Path <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Course Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-1 bg-blue-100 p-1.5 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Comprehensive Lessons</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed explanations with real-world examples and case studies
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mr-3 mt-1 bg-green-100 p-1.5 rounded-full">
                  <LineChart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Interactive Charts</h3>
                  <p className="text-sm text-muted-foreground">
                    Practice with interactive chart examples to reinforce concepts
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mr-3 mt-1 bg-amber-100 p-1.5 rounded-full">
                  <Target className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Practical Exercises</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply what you've learned with hands-on exercises and challenges
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mr-3 mt-1 bg-purple-100 p-1.5 rounded-full">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Knowledge Checks</h3>
                  <p className="text-sm text-muted-foreground">Test your understanding with quizzes and assessments</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          All courses are completely free and available to TradeLinx users. Track your progress, earn certificates, and
          apply what you learn directly in your trading.
        </p>
        <Button size="lg" asChild>
          <Link href="/courses/getting-started">
            Begin Your Trading Education <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
