import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  BookOpen, ClipboardList, FileText, Award, ArrowUp, ArrowDown,
  Play, Star, Calendar, Clock, ChevronRight, Activity,
  Flame, Target, CheckCircle,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/store/auth-context';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const overallProgress = 78;

const quickStats = [
  { label: 'Enrolled Courses', value: 8, icon: BookOpen, trend: 12.5 },
  { label: 'Tests Taken', value: 24, icon: ClipboardList, trend: 8.3 },
  { label: 'Assignments Done', value: 31, icon: FileText, trend: -3.1 },
  { label: 'Certificates Earned', value: 4, icon: Award, trend: 25 },
];

const enrolledCourses = [
  { id: 1, slug: 'jee-advanced-physics-2026', title: 'IIT-JEE Advanced Physics 2026', instructor: 'Dr. Vikram Rathore', progress: 72, total: 24, done: 17, category: 'Engineering' },
  { id: 2, slug: 'neet-ug-biology-masterclass', title: 'NEET Biology Crash Course', instructor: 'Prof. Sunita Mehta', progress: 45, total: 18, done: 8, category: 'Medical' },
  { id: 3, slug: 'jee-main-mathematics-intensive', title: 'CBSE Class 12 Mathematics', instructor: 'Dr. Rajesh Kumar', progress: 88, total: 15, done: 13, category: 'Board Exams' },
  { id: 4, slug: 'python-data-science-ai', title: 'GATE Computer Science 2026', instructor: 'Prof. Ananya Sharma', progress: 34, total: 30, done: 10, category: 'Postgraduate' },
  { id: 5, slug: 'upsc-foundation-course', title: 'UPSC Civil Services Foundation', instructor: 'Mr. Arvind Singh', progress: 15, total: 40, done: 6, category: 'Civil Services' },
];

const upcomingTests = [
  { id: 1, title: 'Weekly Mock Test #5', course: 'IIT-JEE Advanced Physics 2026', date: '4 Jul 2026', duration: '3h', marks: 300, status: 'scheduled' },
  { id: 2, title: 'Chapter Test: Thermodynamics', course: 'NEET Biology Crash Course', date: '6 Jul 2026', duration: '1.5h', marks: 180, status: 'today' },
  { id: 3, title: 'Monthly Assessment: Calculus', course: 'CBSE Class 12 Mathematics', date: '2 Jul 2026', duration: '2h', marks: 100, status: 'overdue' },
  { id: 4, title: 'Full Syllabus Test', course: 'GATE Computer Science 2026', date: '12 Jul 2026', duration: '3h', marks: 200, status: 'scheduled' },
];

const pendingAssignments = [
  { id: 1, title: 'Problem Set: Electrostatics', course: 'IIT-JEE Advanced Physics 2026', dueDate: '5 Jul 2026' },
  { id: 2, title: 'Lab Report: Chemical Kinetics', course: 'NEET Biology Crash Course', dueDate: '8 Jul 2026' },
  { id: 3, title: 'Essay: Indian Freedom Movement', course: 'UPSC Civil Services Foundation', dueDate: '10 Jul 2026' },
];

const recentActivity = [
  { id: 1, action: 'Enrolled in', target: 'IIT-JEE Advanced Physics 2026', time: '2h ago', icon: BookOpen },
  { id: 2, action: 'Completed', target: 'Weekly Mock Test #4 with 92%', time: 'Yesterday', icon: CheckCircle },
  { id: 3, action: 'Earned certificate', target: 'Advanced Mathematics Proficiency', time: '2 days ago', icon: Award },
  { id: 4, action: 'Submitted', target: 'Organic Chemistry Problem Set', time: '3 days ago', icon: FileText },
];

const weeklyProgress = [
  { day: 'Mon', hrs: 3.5 }, { day: 'Tue', hrs: 4.2 }, { day: 'Wed', hrs: 2.8 },
  { day: 'Thu', hrs: 5.1 }, { day: 'Fri', hrs: 3.9 }, { day: 'Sat', hrs: 6.0 }, { day: 'Sun', hrs: 4.5 },
];

const studyGoals = [
  { label: 'Today\'s Goal', current: 5.5, target: 8, unit: 'hours' },
  { label: 'Weekly Goal', current: 30, target: 40, unit: 'hours' },
  { label: 'Tests This Week', current: 2, target: 4, unit: 'tests' },
];

function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-surface px-3 py-2 shadow-sm">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
          {formatter ? formatter(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const studentName = user?.name || 'Rohit';
  const greeting = getGreeting();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 pb-8 max-w-7xl mx-auto">
        <div className="space-y-1">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 rounded-lg" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-40 rounded-lg" />
            <Skeleton className="h-56 rounded-lg" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-44 rounded-lg" />
            <Skeleton className="h-44 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">{greeting}, {studentName}</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Streak</p>
            <p className="text-lg font-bold text-foreground">28 days</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Overall</p>
            <p className="text-lg font-bold text-foreground">{overallProgress}%</p>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Today's Focus</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => navigate('/dashboard/student/tests')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-muted/80 transition-colors">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs text-foreground">Weekly Mock Test #5 today</span>
          </button>
          <button onClick={() => navigate('/dashboard/student/assignments')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-muted/80 transition-colors">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-xs text-foreground">Calculus assessment overdue</span>
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const TrendIcon = stat.trend >= 0 ? ArrowUp : ArrowDown;
          return (
            <button key={stat.label} onClick={() => {
              const paths = { 'Enrolled Courses': '/dashboard/student/courses', 'Tests Taken': '/dashboard/student/tests', 'Assignments Done': '/dashboard/student/assignments', 'Certificates Earned': '/dashboard/student/certificates' };
              navigate(paths[stat.label]);
            }} className="w-full text-left">
              <Card className="p-4 hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <div className={cn('flex items-center gap-1 text-xs font-medium mt-1', stat.trend >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                      <TrendIcon className="w-3 h-3" />
                      <span>{Math.abs(stat.trend)}%</span>
                      <span className="text-muted-foreground/50 font-normal">vs last month</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-muted">
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Continue Learning</h2>
                <p className="text-xs text-muted-foreground/70">Pick up where you left off</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7" asChild>
                <Link to="/courses">View all <ChevronRight className="w-3 h-3 ml-0.5" /></Link>
              </Button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="snap-start shrink-0 w-[260px]">
                  <Card className="p-0 overflow-hidden">
                    <div className="h-24 bg-primary/10 flex flex-col justify-end p-3">
                      <Badge variant="secondary" className="self-start mb-1">{course.category}</Badge>
                      <h3 className="font-semibold text-sm text-foreground leading-tight">{course.title}</h3>
                      <p className="text-xs text-muted-foreground/70">{course.instructor}</p>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{course.done}/{course.total} modules</span>
                        <span className="font-semibold text-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                      <Button size="sm" className="w-full h-8 text-xs gap-1" onClick={(e) => { e.stopPropagation(); navigate(`/courses/${course.slug}`); }}>
                        <Play className="w-3 h-3" /> Continue
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Upcoming Tests</h2>
                <p className="text-xs text-muted-foreground/70">{upcomingTests.length} tests scheduled</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => navigate('/dashboard/student/tests')}>View all <ChevronRight className="w-3 h-3 ml-0.5" /></Button>
            </div>
            <div className="space-y-2">
              {upcomingTests.map((test) => (
                <Card key={test.id} className="p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-medium text-sm text-foreground">{test.title}</h3>
                        <Badge variant={
                          test.status === 'today' ? 'accent' : test.status === 'overdue' ? 'destructive' : 'default'
                        } size="sm">{test.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground/70">{test.course}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground/50 mt-1.5">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {test.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration}</span>
                      </div>
                    </div>
                    <Button size="sm" className="h-8 shrink-0 text-xs" onClick={() => navigate('/dashboard/student/tests')}>Start</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Pending Assignments</h2>
                <p className="text-xs text-muted-foreground/70">{pendingAssignments.length} need attention</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => navigate('/dashboard/student/assignments')}>View all <ChevronRight className="w-3 h-3 ml-0.5" /></Button>
            </div>
            <Card className="divide-y divide-border/40">
              {pendingAssignments.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">{a.course} &middot; Due {a.dueDate}</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs px-3 shrink-0 ml-3" onClick={() => navigate('/dashboard/student/assignments')}>Submit</Button>
                </div>
              ))}
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Study Goals</h2>
            </div>
            <div className="space-y-3">
              {studyGoals.map((goal) => {
                const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100);
                return (
                  <div key={goal.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{goal.label}</span>
                      <span className="text-xs font-semibold text-foreground">{goal.current}/{goal.target} {goal.unit}</span>
                    </div>
                    <Progress value={pct} className={cn('h-1.5', pct >= 80 ? 'bg-emerald-200' : pct >= 50 ? 'bg-amber-200' : '')} indicatorClassName={
                      pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : ''
                    } />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-border/60">
              <div className="flex items-center justify-between text-xs text-muted-foreground/70 mb-2">
                <span>Weekly study time</span>
                <span className="font-semibold text-foreground">30.0 hours</span>
              </div>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyProgress} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="studyMiniGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(221 83% 48%)" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="hsl(221 83% 48%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip content={<ChartTooltip formatter={v => `${v}h`} />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                    <Area type="monotone" dataKey="hrs" stroke="hsl(221 83% 48%)" strokeWidth={2} fill="url(#studyMiniGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
            </div>
            <Card className="p-4 space-y-3">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex gap-3">
                  <div className="p-1.5 rounded-lg bg-muted shrink-0 mt-0.5">
                    <act.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{act.action}</span>{' '}
                      {act.target}
                    </p>
                    <p className="text-xs text-muted-foreground/50 mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
