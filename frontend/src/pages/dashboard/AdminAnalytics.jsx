import { useState } from 'react';
import { Users, BookOpen, DollarSign, TrendingUp, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const metrics = [
  { label: 'Platform Revenue', value: '₹84.5L', icon: DollarSign, change: 22.7 },
  { label: 'Active Users', value: '12,350', icon: Users, change: 12.5 },
  { label: 'Total Enrollments', value: '8,420', icon: BookOpen, change: 18.3 },
  { label: 'Completion Rate', value: '76%', icon: Activity, change: 4.2 },
];

const revenueData = [
  { month: 'Jan', revenue: 520000, cost: 380000 },
  { month: 'Feb', revenue: 580000, cost: 410000 },
  { month: 'Mar', revenue: 645000, cost: 430000 },
  { month: 'Apr', revenue: 590000, cost: 400000 },
  { month: 'May', revenue: 720000, cost: 460000 },
  { month: 'Jun', revenue: 680000, cost: 440000 },
  { month: 'Jul', revenue: 760000, cost: 480000 },
  { month: 'Aug', revenue: 820000, cost: 500000 },
  { month: 'Sep', revenue: 785000, cost: 490000 },
  { month: 'Oct', revenue: 890000, cost: 520000 },
  { month: 'Nov', revenue: 845000, cost: 510000 },
  { month: 'Dec', revenue: 935000, cost: 540000 },
];

const platformData = [
  { category: 'Course Sales', value: 65, color: 'hsl(221 83% 53%)' },
  { category: 'Test Series', value: 20, color: 'hsl(160 84% 39%)' },
  { category: 'Subscriptions', value: 15, color: 'hsl(32 100% 55%)' },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-surface px-3 py-2 shadow-sm">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name === 'revenue' || p.name === 'cost' ? `₹${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  );
}

export default function AdminAnalytics() {
  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground/70 mt-0.5">Full platform analytics & reporting</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const TrendIcon = m.change >= 0 ? ArrowUp : ArrowDown;
          return (
            <Card key={m.label} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</p>
                <div className="p-2 rounded-lg bg-muted"><m.icon className="w-4 h-4 text-muted-foreground" /></div>
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

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Revenue vs Cost</h2>
            <p className="text-xs text-muted-foreground/70">Monthly financial overview</p>
          </div>
          <Badge variant="success" size="sm">+22.7% YoY</Badge>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(221 83% 48%)" stopOpacity={0.2} /><stop offset="95%" stopColor="hsl(221 83% 48%)" stopOpacity={0} /></linearGradient>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(32 100% 55%)" stopOpacity={0.1} /><stop offset="95%" stopColor="hsl(32 100% 55%)" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(221 83% 48%)" strokeWidth={2} fill="url(#revGrad)" dot={false} name="revenue" />
              <Area type="monotone" dataKey="cost" stroke="hsl(32 100% 55%)" strokeWidth={2} fill="url(#costGrad)" dot={false} name="cost" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Revenue by Category</h2>
          <div className="space-y-3">
            {platformData.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{item.category}</span>
                  <span className="font-semibold text-foreground">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-1">Monthly Enrollments</h2>
          <p className="text-xs text-muted-foreground/70 mb-4">Student enrollment trend</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData.slice(-6)} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]} fill="hsl(221 83% 48%)" maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
