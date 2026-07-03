import { useState } from 'react';
import { Search, Users, Mail, Star, MoreHorizontal, GraduationCap, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const students = [
  { id: 1, name: 'Arjun Mehta', email: 'arjun.mehta@example.com', courses: 3, progress: 78, avgScore: 85, status: 'active', lastActive: '2h ago', initials: 'AM' },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@example.com', courses: 2, progress: 62, avgScore: 78, status: 'active', lastActive: '5h ago', initials: 'PS' },
  { id: 3, name: 'Rahul Verma', email: 'rahul.verma@example.com', courses: 4, progress: 91, avgScore: 92, status: 'active', lastActive: '1d ago', initials: 'RV' },
  { id: 4, name: 'Sneha Patel', email: 'sneha.patel@example.com', courses: 2, progress: 45, avgScore: 72, status: 'inactive', lastActive: '5d ago', initials: 'SP' },
  { id: 5, name: 'Ananya Gupta', email: 'ananya.gupta@example.com', courses: 3, progress: 55, avgScore: 80, status: 'active', lastActive: '3h ago', initials: 'AG' },
  { id: 6, name: 'Vikram Singh', email: 'vikram.singh@example.com', courses: 1, progress: 30, avgScore: 65, status: 'at-risk', lastActive: '2w ago', initials: 'VS' },
];

const statusVariants = { active: 'success', inactive: 'secondary', 'at-risk': 'destructive' };

export default function TeacherStudents() {
  const [search, setSearch] = useState('');
  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">My Students</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{students.length} total students</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
          <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 w-56 text-sm" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">No students found</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">Students will appear once they enroll in your courses</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60 bg-muted/20">
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3">Student</th>
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3 hidden md:table-cell">Courses</th>
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3 hidden sm:table-cell">Progress</th>
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3 hidden lg:table-cell">Avg. Score</th>
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase px-4 py-3">Status</th>
                <th className="w-10 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground/70">{s.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground/70">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground hidden md:table-cell">{s.courses}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground hidden lg:table-cell">{s.avgScore}%</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariants[s.status]} size="sm" className="capitalize">{s.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[130px]">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
