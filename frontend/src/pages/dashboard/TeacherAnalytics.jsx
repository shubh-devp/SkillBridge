import { DollarSign, Users, BookOpen, Star, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const metrics = [
  { label: 'Total Revenue', value: '₹34,56,000', icon: DollarSign, change: 18.2 },
  { label: 'Active Students', value: 445, icon: Users, change: 12.5 },
  { label: 'Course Completion', value: '76%', icon: BookOpen, change: 5.3 },
  { label: 'Avg Rating', value: 4.7, icon: Star, change: 0.2 },
];

const monthlyData = [
  { month: 'Jan', revenue: 265000, students: 320 },
  { month: 'Feb', revenue: 342000, students: 358 },
  { month: 'Mar', revenue: 398000, students: 385 },
  { month: 'Apr', revenue: 356000, students: 370 },
  { month: 'May', revenue: 421000, students: 412 },
  { month: 'Jun', revenue: 387000, students: 398 },
  { month: 'Jul', revenue: 445000, students: 445 },
];

const categoryData = [
  { name: 'Engineering', students: 195, revenue: '₹9,67,000' },
  { name: 'Medical', students: 142, revenue: '₹5,23,000' },
  { name: 'Board Exams', students: 108, revenue: '₹3,89,000' },
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

export default function TeacherAnalytics() {
  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground/70 mt-0.5">Your teaching performance overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const TrendIcon = m.change >= 0 ? ArrowUp : ArrowDown;
          return (
            <Card key={m.label} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</p>
                <div className="p-2 rounded-lg bg-muted">
                  <m.icon className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <p className="text-xl font-bold text-foreground">{m.value}</p>
              <div className={cn('flex items-center gap-1 text-xs font-medium mt-1', m.change >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                <TrendIcon className="w-3 h-3" />
                <span>{Math.abs(m.change)}%</span>
                <span className="text-muted-foreground/50 font-normal">vs last month</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-foreground mb-1">Revenue Trend</h2>
          <p className="text-xs text-muted-foreground/70 mb-4">Monthly earnings from your courses</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="taGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221 83% 48%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(221 83% 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTooltip prefix="₹" />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(221 83% 48%)" strokeWidth={2} fill="url(#taGrad)" dot={{ r: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold text-foreground mb-1">Student Growth</h2>
          <p className="text-xs text-muted-foreground/70 mb-4">Active students over time</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                <Bar dataKey="students" radius={[4, 4, 0, 0]} fill="hsl(221 83% 48%)" maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Category Performance</h2>
        <p className="text-xs text-muted-foreground/70 mb-4">Breakdown by course category</p>
        <div className="space-y-3">
          {categoryData.map((cat) => (
            <div key={cat.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm font-medium text-foreground">{cat.name}</span>
              <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {cat.students}</span>
                <span className="font-semibold text-foreground">{cat.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
