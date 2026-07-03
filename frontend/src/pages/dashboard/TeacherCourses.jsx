import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Star, Users, Pencil, Eye, Filter, DollarSign, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/store/auth-context';

const courses = [
  { id: 1, title: 'IIT-JEE Advanced Physics 2026', students: 128, rating: 4.8, revenue: '₹4,82,000', status: 'published', lectures: 48, category: 'Engineering' },
  { id: 2, title: 'NEET Biology Crash Course', students: 94, rating: 4.6, revenue: '₹2,35,000', status: 'published', lectures: 36, category: 'Medical' },
  { id: 3, title: 'CBSE Class 12 Mathematics', students: 156, rating: 4.9, revenue: '₹3,12,000', status: 'published', lectures: 42, category: 'Board Exams' },
  { id: 4, title: 'JEE Advanced Chemistry - Organic', students: 67, rating: 4.7, revenue: '₹1,89,000', status: 'draft', lectures: 24, category: 'Engineering' },
];

export default function TeacherCourses() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const filtered = courses.filter(c => {
    if (tab !== 'all' && c.status !== tab) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">My Courses</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{courses.length} total courses</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 w-48 text-sm" />
          </div>
          <Button size="sm" className="h-9 gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" /> New Course
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({courses.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({courses.filter(c => c.status === 'published').length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({courses.filter(c => c.status === 'draft').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">No courses found</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">Create your first course to get started</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((course) => (
                <Card key={course.id} className="p-0 overflow-hidden">
                  <div className="h-24 bg-gradient-to-br from-primary/10 to-primary/5 p-4 flex items-start justify-between">
                    <Badge variant={course.status === 'published' ? 'success' : 'warning'} size="sm" className="capitalize">{course.status}</Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2">{course.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.students}</span>
                      <span className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /> {course.rating}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {course.revenue}</span>
                    </div>
                    <p className="text-xs text-muted-foreground/70">{course.lectures} lectures</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 h-7 text-xs gap-1"><Pencil className="w-3 h-3" /> Edit</Button>
                      <Button size="sm" className="flex-1 h-7 text-xs gap-1"><Eye className="w-3 h-3" /> Preview</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
