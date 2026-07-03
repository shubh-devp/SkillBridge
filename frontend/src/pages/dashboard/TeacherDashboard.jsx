import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, GraduationCap, ClipboardList, DollarSign,
  ArrowUp, ArrowDown, Star, Calendar, Clock, Video, Plus,
  FileText, ChevronRight, TrendingUp, Activity,
  Award, Target, Pencil,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
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

const quickStats = [
  { label: 'Total Courses', value: 12, icon: BookOpen, trend: 2 },
  { label: 'Active Students', value: 345, icon: Users, trend: 18 },
  { label: 'Active Batches', value: 8, icon: GraduationCap, trend: 0 },
  { label: 'Pending Reviews', value: 23, icon: ClipboardList, trend: -5 },
];

const myCourses = [
  { id: 1, title: 'IIT-JEE Advanced Physics 2026', students: 128, rating: 4.8, revenue: '₹4,82,000', status: 'published' },
  { id: 2, title: 'NEET Biology Crash Course', students: 94, rating: 4.6, revenue: '₹2,35,000', status: 'published' },
  { id: 3, title: 'CBSE Class 12 Mathematics', students: 156, rating: 4.9, revenue: '₹3,12,000', status: 'published' },
  { id: 4, title: 'JEE Advanced Chemistry - Organic', students: 67, rating: 4.7, revenue: '₹1,89,000', status: 'draft' },
];

const recentSubmissions = [
  { id: 1, student: 'Arjun Mehta', course: 'IIT-JEE Advanced Physics', assignment: 'Problem Set: Electrostatics', date: '2 Jul 2026', status: 'graded', score: '85/100', initials: 'AM' },
  { id: 2, student: 'Priya Sharma', course: 'NEET Biology', assignment: 'Lab Report: Chemical Kinetics', date: '1 Jul 2026', status: 'pending', score: null, initials: 'PS' },
  { id: 3, student: 'Rahul Verma', course: 'CBSE Class 12 Mathematics', assignment: 'Assignment: Integration', date: '30 Jun 2026', status: 'graded', score: '92/100', initials: 'RV' },
  { id: 4, student: 'Sneha Patel', course: 'IIT-JEE Advanced Physics', assignment: 'Problem Set: Thermodynamics', date: '29 Jun 2026', status: 'pending', score: null, initials: 'SP' },
];

const upcomingClasses = [
  { id: 1, batch: 'IIT-JEE Physics - Batch A', topic: 'Electrostatics: Gauss Law', date: '3 Jul 2026', time: '10:00 AM', students: 42, type: 'live' },
  { id: 2, batch: 'NEET Biology - Batch C', topic: 'Human Physiology', date: '4 Jul 2026', time: '2:00 PM', students: 38, type: 'live' },
  { id: 3, batch: 'CBSE Math - Batch B', topic: 'Calculus: Applications', date: '5 Jul 2026', time: '8:00 AM', students: 56, type: 'recorded' },
];

const revenueData = [
  { month: 'Aug', amount: 185000 }, { month: 'Sep', amount: 220000 },
  { month: 'Oct', amount: 195000 }, { month: 'Nov', amount: 278000 },
  { month: 'Dec', amount: 312000 }, { month: 'Jan', amount: 265000 },
  { month: 'Feb', amount: 342000 }, { month: 'Mar', amount: 398000 },
  { month: 'Apr', amount: 356000 }, { month: 'May', amount: 421000 },
  { month: 'Jun', amount: 387000 }, { month: 'Jul', amount: 445000 },
];

const enrollmentChartData = [
  { month: 'Feb', students: 42 }, { month: 'Mar', students: 58 },
  { month: 'Apr', students: 51 }, { month: 'May', students: 74 },
  { month: 'Jun', students: 68 }, { month: 'Jul', students: 89 },
];

const popularCourses = [
  { name: 'CBSE Class 12 Mathematics', students: 156, revenue: '₹3,12,000' },
  { name: 'IIT-JEE Advanced Physics 2026', students: 128, revenue: '₹4,82,000' },
  { name: 'NEET Biology Crash Course', students: 94, revenue: '₹2,35,000' },
];

function ChartTooltip({ active, payload, label, prefix }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-surface px-3 py-2 shadow-sm">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
          {prefix || ''}{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const teacherName = user?.name || 'Prof. Sharma';
  const greeting = getGreeting();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const pendingCount = recentSubmissions.filter(s => s.status === 'pending').length;

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
          <div className="lg:col-span-2"><Skeleton className="h-64 rounded-lg" /></div>
          <div><Skeleton className="h-64 rounded-lg" /></div>
        </div>
        <Skeleton className="h-48 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">{greeting}, {teacherName}</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-lg font-bold text-foreground">₹3,86,500</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Rating</p>
            <p className="text-lg font-bold text-foreground">4.8</p>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Today's Focus</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {pendingCount > 0 && (
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 text-xs text-foreground">
              <span className="w-2 h-2 rounded-full bg-accent" />
              {pendingCount} submission{pendingCount > 1 ? 's' : ''} pending review
            </span>
          )}
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 text-xs text-foreground">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {upcomingClasses.length} class{upcomingClasses.length > 1 ? 'es' : ''} today
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 text-xs text-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Revenue up 18.2% this month
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const TrendIcon = stat.trend >= 0 ? ArrowUp : ArrowDown;
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className={cn('flex items-center gap-1 text-xs font-medium mt-1', stat.trend >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                    <TrendIcon className="w-3 h-3" />
                    <span>{Math.abs(stat.trend)}</span>
                    <span className="text-muted-foreground/50 font-normal">this month</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Revenue Overview</h2>
              <p className="text-xs text-muted-foreground/70">Monthly earnings</p>
            </div>
            <Badge variant="success" size="sm">+18.2% vs last year</Badge>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="teacherRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221 83% 48%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(221 83% 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTooltip prefix="₹" />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                <Area type="monotone" dataKey="amount" stroke="hsl(221 83% 48%)" strokeWidth={2} fill="url(#teacherRevenueGrad)" dot={{ r: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div>
              <h2 className="text-sm font-semibold text-foreground">New Enrollments</h2>
              <p className="text-xs text-muted-foreground/70">Last 6 months</p>
            </div>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentChartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                <Bar dataKey="students" radius={[4, 4, 0, 0]} fill="hsl(221 83% 48%)" maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
            <span className="text-muted-foreground/70">Total this period</span>
            <span className="font-semibold text-foreground">382 students</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">My Courses</h2>
              <p className="text-xs text-muted-foreground/70">{myCourses.length} courses</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7" asChild>
              <Link to="/dashboard/courses">View all <ChevronRight className="w-3 h-3 ml-0.5" /></Link>
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none">
            {myCourses.map((course) => (
              <div key={course.id} className="snap-start shrink-0 w-[220px]">
                <Card className="p-0 overflow-hidden">
                  <div className="h-20 bg-primary/10 flex items-start justify-between p-3">
                    <Badge variant={course.status === 'published' ? 'success' : 'warning'} size="sm" className="capitalize">{course.status}</Badge>
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2">{course.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.students}</span>
                      <span className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /> {course.rating}</span>
                    </div>
                    <p className="text-xs font-semibold text-foreground">{course.revenue}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 h-7 text-xs"><Pencil className="w-3 h-3" /> Edit</Button>
                      <Button size="sm" className="flex-1 h-7 text-xs">View</Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
            <div className="snap-start shrink-0 flex items-center">
              <Button variant="outline" className="h-full min-h-[180px] w-[100px] border-dashed flex flex-col gap-2" asChild>
                <Link to="/dashboard/courses/create">
                  <Plus className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground font-medium">New Course</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Top Performing</h2>
          </div>
          <Card className="p-3 space-y-1">
            {popularCourses.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-xs font-semibold text-muted-foreground/40 w-4">{i + 1}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground/50">{c.students} students</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-foreground shrink-0 ml-3">{c.revenue}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Recent Submissions</h2>
              <p className="text-xs text-muted-foreground/70">{pendingCount} pending review</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7">View all <ChevronRight className="w-3 h-3 ml-0.5" /></Button>
          </div>
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-2.5">Student</th>
                  <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-2.5 hidden sm:table-cell">Assignment</th>
                  <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-2.5">Status</th>
                  <th className="text-right text-[10px] font-medium text-muted-foreground uppercase px-4 py-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="text-[10px] bg-muted text-muted-foreground/70">{sub.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium text-foreground">{sub.student}</span>
                          <p className="text-xs text-muted-foreground/70 hidden sm:block">{sub.course}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-[140px] hidden sm:table-cell">{sub.assignment}</td>
                    <td className="px-4 py-3">
                      {sub.status === 'graded' ? (
                        <Badge variant="success" size="sm">{sub.score}</Badge>
                      ) : (
                        <Badge variant="warning" size="sm">Pending</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="outline" className="h-7 text-xs px-3">
                        {sub.status === 'graded' ? 'View' : 'Review'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Schedule</h2>
              </div>
            </div>
            <div className="space-y-2">
              {upcomingClasses.map((cls) => (
                <Card key={cls.id} className="p-3.5">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={cls.type === 'live' ? 'accent' : 'secondary'} size="sm" className="uppercase text-[10px]">{cls.type}</Badge>
                    <span className="text-[10px] text-muted-foreground/50">{cls.date}</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground">{cls.batch}</p>
                  <p className="text-[11px] text-muted-foreground/70 mt-0.5">{cls.topic}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground/70">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {cls.time}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {cls.students}</span>
                    </div>
                    <Button size="sm" className="h-6 text-[10px] px-2.5 gap-1">
                      <Video className="w-3 h-3" /> Join
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
