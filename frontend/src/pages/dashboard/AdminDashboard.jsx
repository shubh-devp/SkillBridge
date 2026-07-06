import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, DollarSign, TrendingUp, Activity,
  ArrowUp, ArrowDown, ChevronRight, Calendar,
  BarChart3, GraduationCap, Target, Server, UserPlus,
  FileText, PieChart, LineChart as LineChartIcon,
  MoreHorizontal, Globe,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/store/auth-context';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const keyMetrics = [
  { label: 'Total Users', value: 28450, icon: Users, change: 12.5 },
  { label: 'Active Students', value: 12350, icon: GraduationCap, change: -3.1 },
  { label: 'Total Revenue', value: 8450000, icon: DollarSign, change: 22.7, prefix: '₹' },
  { label: 'Total Courses', value: 184, icon: BookOpen, change: 8.3 },
];

const monthlyRevenue = [
  { month: 'Aug', revenue: 520000, students: 1250 },
  { month: 'Sep', revenue: 580000, students: 1380 },
  { month: 'Oct', revenue: 645000, students: 1420 },
  { month: 'Nov', revenue: 590000, students: 1350 },
  { month: 'Dec', revenue: 720000, students: 1580 },
  { month: 'Jan', revenue: 680000, students: 1520 },
  { month: 'Feb', revenue: 760000, students: 1650 },
  { month: 'Mar', revenue: 820000, students: 1780 },
  { month: 'Apr', revenue: 785000, students: 1720 },
  { month: 'May', revenue: 890000, students: 1850 },
  { month: 'Jun', revenue: 845000, students: 1800 },
  { month: 'Jul', revenue: 935000, students: 1950 },
];

const userGrowth = [
  { month: 'Aug', users: 21000 }, { month: 'Sep', users: 22000 },
  { month: 'Oct', users: 22800 }, { month: 'Nov', users: 23700 },
  { month: 'Dec', users: 24800 }, { month: 'Jan', users: 25400 },
  { month: 'Feb', users: 26200 }, { month: 'Mar', users: 27000 },
  { month: 'Apr', users: 27500 }, { month: 'May', users: 28000 },
  { month: 'Jun', users: 28200 }, { month: 'Jul', users: 28450 },
];

const coursesByCategory = [
  { name: 'Engineering', count: 48, color: 'hsl(221 83% 53%)' },
  { name: 'Medical', count: 36, color: 'hsl(160 84% 39%)' },
  { name: 'Board Exams', count: 32, color: 'hsl(271 76% 53%)' },
  { name: 'Civil Services', count: 28, color: 'hsl(38 92% 50%)' },
  { name: 'Postgraduate', count: 22, color: 'hsl(330 67% 52%)' },
  { name: 'Skill Dev.', count: 18, color: 'hsl(187 85% 43%)' },
];

const userRoleDistribution = [
  { name: 'Students', value: 78, color: 'hsl(221 83% 53%)' },
  { name: 'Teachers', value: 15, color: 'hsl(32 100% 55%)' },
  { name: 'Admins', value: 7, color: 'hsl(160 84% 39%)' },
];

const recentUsers = [
  { id: 1, name: 'Rohit Sharma', email: 'rohit.sharma@example.com', role: 'student', status: 'active', joined: '1 Jul 2026', initials: 'RS' },
  { id: 2, name: 'Dr. Vikram Rathore', email: 'vikram.rathore@skillbridge.in', role: 'teacher', status: 'active', joined: '28 Jun 2026', initials: 'VR' },
  { id: 3, name: 'Priya Mehta', email: 'priya.mehta@example.com', role: 'student', status: 'active', joined: '25 Jun 2026', initials: 'PM' },
  { id: 4, name: 'Ananya Gupta', email: 'ananya.gupta@example.com', role: 'student', status: 'inactive', joined: '20 Jun 2026', initials: 'AG' },
  { id: 5, name: 'Prof. Sunita Mehta', email: 'sunita.mehta@skillbridge.in', role: 'teacher', status: 'active', joined: '15 Jun 2026', initials: 'SM' },
  { id: 6, name: 'Amit Verma', email: 'amit.verma@skillbridge.in', role: 'admin', status: 'active', joined: '10 Jun 2026', initials: 'AV' },
];

const recentActivities = [
  { id: 1, user: 'Dr. Vikram Rathore', action: 'published a new course', target: 'IIT-JEE Advanced Physics 2026', time: '2h ago', initials: 'VR' },
  { id: 2, user: 'Rohit Sharma', action: 'enrolled in', target: 'NEET Biology Crash Course', time: '4h ago', initials: 'RS' },
  { id: 3, user: 'Prof. Sunita Mehta', action: 'uploaded material for', target: 'CBSE Class 12 Mathematics', time: '6h ago', initials: 'SM' },
  { id: 4, user: 'Ananya Gupta', action: 'completed', target: 'Weekly Mock Test #4 with 89%', time: '1d ago', initials: 'AG' },
  { id: 5, user: 'Amit Verma', action: 'created a new test', target: 'GATE CS Full Syllabus Test', time: '1d ago', initials: 'AV' },
];

const systemHealth = [
  { label: 'Server Uptime', value: '99.97%', status: 'good' },
  { label: 'Avg Response Time', value: '142ms', status: 'good' },
  { label: 'Active Sessions', value: '2,847', status: 'good' },
  { label: 'Error Rate', value: '0.02%', status: 'good' },
  { label: 'Storage Used', value: '68%', status: 'warning' },
  { label: 'Memory Usage', value: '72%', status: 'warning' },
];

function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-surface px-3 py-2 shadow-sm">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
          {formatter ? formatter(p.value, p.name) : p.value}
        </p>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const adminName = user?.name || 'Admin';
  const greeting = getGreeting();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const roleBadge = (role) => {
    const map = { student: 'default', teacher: 'accent', admin: 'success' };
    return map[role] || 'default';
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map(i => <Skeleton key={i} className="h-64 rounded-lg" />)}
        </div>
        <Skeleton className="h-48 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><Skeleton className="h-44 rounded-lg" /></div>
          <div><Skeleton className="h-44 rounded-lg" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">{greeting}, {adminName}</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total Users</p>
            <p className="text-lg font-bold text-foreground">28.5K</p>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-lg font-bold text-foreground">₹84.5L</p>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Platform Overview</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => navigate('/dashboard/admin/analytics')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 text-xs text-foreground hover:bg-muted/80 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            1,950 new enrollments this month
          </button>
          <button onClick={() => navigate('/dashboard/admin/teachers')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 text-xs text-foreground hover:bg-muted/80 transition-colors">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            6 pending teacher approvals
          </button>
          <button onClick={() => navigate('/dashboard/admin/courses')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 text-xs text-foreground hover:bg-muted/80 transition-colors">
            <span className="w-2 h-2 rounded-full bg-primary" />
            3 new course publish requests
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => {
          const TrendIcon = metric.change >= 0 ? ArrowUp : ArrowDown;
          return (
            <button key={metric.label} onClick={() => {
              const paths = { 'Total Users': '/dashboard/admin/users', 'Active Students': '/dashboard/admin/users', 'Total Revenue': '/dashboard/admin/analytics', 'Total Courses': '/dashboard/admin/courses' };
              navigate(paths[metric.label]);
            }} className="w-full text-left">
              <Card className="p-4 hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</p>
                  <div className="p-2 rounded-lg bg-muted">
                    <metric.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-foreground">
                    {metric.prefix ? `${metric.prefix}${metric.value.toLocaleString()}` : metric.value.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className={cn('flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold', metric.change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500')}>
                      <TrendIcon className="w-2.5 h-2.5" />
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground/50">vs last month</span>
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Revenue Trend</h2>
              <p className="text-xs text-muted-foreground/70">Monthly platform revenue</p>
            </div>
            <Badge variant="success" size="sm">+22.7% YoY</Badge>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221 83% 48%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(221 83% 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTooltip formatter={(v) => `₹${v.toLocaleString()}`} />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(221 83% 48%)" strokeWidth={2} fill="url(#adminRevenueGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">User Growth</h2>
              <p className="text-xs text-muted-foreground/70">Monthly active user growth</p>
            </div>
            <Badge variant="success" size="sm">+12.5% YoY</Badge>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTooltip formatter={(v) => v.toLocaleString()} />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                <Line type="monotone" dataKey="users" stroke="hsl(32 100% 55%)" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <div>
              <h2 className="text-sm font-semibold text-foreground">Courses by Category</h2>
              <p className="text-xs text-muted-foreground/70">{coursesByCategory.reduce((s, c) => s + c.count, 0)} total courses</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursesByCategory} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: 'hsl(var(--foreground))' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={14}>
                  {coursesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-muted-foreground" />
            <div>
              <h2 className="text-sm font-semibold text-foreground">User Distribution</h2>
              <p className="text-xs text-muted-foreground/70">Role-wise platform users</p>
            </div>
          </div>
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {userRoleDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
                <Legend verticalAlign="bottom" height={24} iconType="circle" iconSize={8}
                  formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Recent Users</h2>
            <p className="text-xs text-muted-foreground/70">Latest registrations</p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => navigate('/dashboard/admin/users')}>Manage <ChevronRight className="w-3 h-3 ml-0.5" /></Button>
        </div>
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-2.5">User</th>
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-2.5 hidden sm:table-cell">Email</th>
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-2.5">Role</th>
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-2.5 hidden md:table-cell">Status</th>
                <th className="text-right text-[10px] font-medium text-muted-foreground uppercase px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {recentUsers.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="text-[10px] bg-muted text-muted-foreground/70">{u.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-[140px] truncate hidden sm:table-cell">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={roleBadge(u.role)} size="sm" className="capitalize">{u.role}</Badge>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className={cn('w-1.5 h-1.5 rounded-full', u.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground/40')} />
                      <span className="text-sm text-muted-foreground capitalize">{u.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[130px]">
                        <DropdownMenuItem onClick={() => navigate('/dashboard/admin/users')}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/dashboard/admin/users')}>Edit Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => toast.success('User suspended (demo)')}>Suspend</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Recent Activities</h2>
              <p className="text-xs text-muted-foreground/70">Platform-wide updates</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => toast.success('Full activity log coming soon')}>View all <ChevronRight className="w-3 h-3 ml-0.5" /></Button>
          </div>
          <div className="divide-y divide-border/40">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 py-3">
                <Avatar className="w-7 h-7 shrink-0 mt-0.5">
                  <AvatarFallback className="text-[10px] bg-muted text-muted-foreground/70">{act.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{act.user}</span>
                    {' '}{act.action}{' '}
                    <span className="font-medium text-primary">{act.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground/50 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">System Health</h2>
            </div>
            <Card className="p-3 space-y-1">
              {systemHealth.map((s) => (
                <div key={s.label} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className={cn('w-2 h-2 rounded-full shrink-0', s.status === 'good' ? 'bg-emerald-500' : 'bg-amber-500')} />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{s.value}</span>
                </div>
              ))}
            </Card>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Create Course', icon: UserPlus, to: '/dashboard/admin/courses' },
                { label: 'Add Teacher', icon: GraduationCap, to: '/dashboard/admin/teachers' },
                { label: 'Publish Blog', icon: FileText, to: '/dashboard/admin/blogs' },
                { label: 'View Reports', icon: BarChart3, to: '/dashboard/admin/analytics' },
              ].map((action) => (
                <button key={action.label} onClick={() => navigate(action.to)} className="w-full">
                  <Card className="p-3 cursor-pointer hover:bg-muted/30 transition-colors hover:border-primary/30">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="p-2 rounded-lg bg-muted">
                        <action.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-[10px] font-semibold text-foreground">{action.label}</p>
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
