import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, Star, BookOpen, Users, Mail, MoreHorizontal, CheckCircle, XCircle, UserPlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const teachers = [
  { id: 1, name: 'Dr. Vikram Rathore', email: 'vikram.rathore@skillbridge.in', courses: 3, students: 195, rating: 4.8, status: 'active', expertise: 'Physics', initials: 'VR' },
  { id: 2, name: 'Prof. Sunita Mehta', email: 'sunita.mehta@skillbridge.in', courses: 2, students: 142, rating: 4.6, status: 'active', expertise: 'Biology', initials: 'SM' },
  { id: 3, name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@skillbridge.in', courses: 5, students: 312, rating: 4.9, status: 'active', expertise: 'Mathematics', initials: 'RK' },
  { id: 4, name: 'Prof. Ananya Sharma', email: 'ananya.sharma@skillbridge.in', courses: 1, students: 67, rating: 4.7, status: 'pending', expertise: 'Computer Science', initials: 'AS' },
  { id: 5, name: 'Mr. Arvind Singh', email: 'arvind.singh@skillbridge.in', courses: 1, students: 83, rating: 4.5, status: 'active', expertise: 'History', initials: 'AS' },
];

export default function AdminTeachers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const filtered = teachers.filter(t => {
    if (tab !== 'all' && t.status !== tab) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Teachers</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{teachers.length} educators on the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <Input placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 w-48 text-sm" />
          </div>
          <Button size="sm" className="h-9 gap-1.5 text-xs" onClick={() => toast.success('Teacher invitation form coming soon')}><UserPlus className="w-3.5 h-3.5" /> Add Teacher</Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({teachers.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({teachers.filter(t => t.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({teachers.filter(t => t.status === 'pending').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-2">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">No teachers found</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">Invite educators to join the platform</p>
            </Card>
          ) : filtered.map((t) => (
            <Card key={t.id} className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/5 text-primary text-sm font-semibold">{t.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm text-foreground">{t.name}</h3>
                    <Badge variant={t.status === 'active' ? 'success' : 'warning'} size="sm" className="capitalize">{t.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/70">{t.email} &middot; {t.expertise}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground/50 mt-1">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {t.courses} courses</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {t.students}</span>
                    <span className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /> {t.rating}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  {t.status === 'pending' && (
                    <>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-emerald-600 border-emerald-200 hover:bg-emerald-50" onClick={() => toast.success('Teacher approved')}><CheckCircle className="w-3.5 h-3.5" /></Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50" onClick={() => toast.success('Teacher request rejected')}><XCircle className="w-3.5 h-3.5" /></Button>
                    </>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[130px]">
                      <DropdownMenuItem onClick={() => navigate('/dashboard/admin/teachers')}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/admin/courses')}>View Courses</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => toast.success('Teacher removed (demo)')}>Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
