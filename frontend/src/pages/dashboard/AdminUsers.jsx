import { useState } from 'react';
import { Search, Users, Mail, Calendar, MoreHorizontal, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const users = [
  { id: 1, name: 'Rohit Sharma', email: 'rohit.sharma@example.com', role: 'student', status: 'active', joined: '1 Jul 2026', courses: 4, initials: 'RS' },
  { id: 2, name: 'Dr. Vikram Rathore', email: 'vikram.rathore@skillbridge.in', role: 'teacher', status: 'active', joined: '28 Jun 2026', courses: 3, initials: 'VR' },
  { id: 3, name: 'Priya Mehta', email: 'priya.mehta@example.com', role: 'student', status: 'active', joined: '25 Jun 2026', courses: 2, initials: 'PM' },
  { id: 4, name: 'Ananya Gupta', email: 'ananya.gupta@example.com', role: 'student', status: 'inactive', joined: '20 Jun 2026', courses: 1, initials: 'AG' },
  { id: 5, name: 'Prof. Sunita Mehta', email: 'sunita.mehta@skillbridge.in', role: 'teacher', status: 'active', joined: '15 Jun 2026', courses: 2, initials: 'SM' },
  { id: 6, name: 'Amit Verma', email: 'amit.verma@skillbridge.in', role: 'admin', status: 'active', joined: '10 Jun 2026', courses: 0, initials: 'AV' },
  { id: 7, name: 'Neha Kapoor', email: 'neha.kapoor@example.com', role: 'student', status: 'active', joined: '8 Jun 2026', courses: 3, initials: 'NK' },
  { id: 8, name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@skillbridge.in', role: 'teacher', status: 'active', joined: '5 Jun 2026', courses: 5, initials: 'RK' },
];

const roleBadge = { student: 'default', teacher: 'accent', admin: 'success' };

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{users.length} total users</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 w-56 text-sm" />
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs"><Download className="w-3.5 h-3.5" /> Export</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/60 bg-muted/20">
              <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3">User</th>
              <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3 hidden sm:table-cell">Email</th>
              <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3">Role</th>
              <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3 hidden md:table-cell">Status</th>
              <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3 hidden lg:table-cell">Joined</th>
              <th className="w-10 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground/70">{u.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-[180px] hidden sm:table-cell">{u.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={roleBadge[u.role]} size="sm" className="capitalize">{u.role}</Badge>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <span className={cn('w-1.5 h-1.5 rounded-full', u.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground/40')} />
                    <span className="text-sm text-muted-foreground capitalize">{u.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{u.joined}</td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[130px]">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
