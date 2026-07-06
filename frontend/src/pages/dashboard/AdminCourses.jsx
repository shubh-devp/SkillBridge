import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, BookOpen, Users, DollarSign, Star, Eye, MoreHorizontal, Plus } from 'lucide-react';
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

const courses = [
  { id: 1, slug: 'jee-advanced-physics-2026', title: 'IIT-JEE Advanced Physics 2026', instructor: 'Dr. Vikram Rathore', category: 'Engineering', students: 128, rating: 4.8, revenue: '₹4,82,000', status: 'published', price: '₹4,999' },
  { id: 2, slug: 'neet-ug-biology-masterclass', title: 'NEET Biology Crash Course', instructor: 'Prof. Sunita Mehta', category: 'Medical', students: 94, rating: 4.6, revenue: '₹2,35,000', status: 'published', price: '₹3,499' },
  { id: 3, slug: 'jee-main-mathematics-intensive', title: 'CBSE Class 12 Mathematics', instructor: 'Dr. Rajesh Kumar', category: 'Board Exams', students: 156, rating: 4.9, revenue: '₹3,12,000', status: 'published', price: '₹2,499' },
  { id: 4, slug: 'python-data-science-ai', title: 'GATE Computer Science 2026', instructor: 'Prof. Ananya Sharma', category: 'Postgraduate', students: 67, rating: 4.7, revenue: '₹1,89,000', status: 'draft', price: '₹5,999' },
  { id: 5, slug: 'upsc-foundation-course', title: 'UPSC Civil Services Foundation', instructor: 'Mr. Arvind Singh', category: 'Civil Services', students: 83, rating: 4.5, revenue: '₹2,98,000', status: 'published', price: '₹3,999' },
  { id: 6, slug: 'jee-advanced-chemistry', title: 'JEE Advanced Chemistry - Organic', instructor: 'Dr. Vikram Rathore', category: 'Engineering', students: 67, rating: 4.7, revenue: '₹1,89,000', status: 'pending', price: '₹4,499' },
];

export default function AdminCourses() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const filtered = courses.filter(c => {
    if (tab !== 'all' && c.status !== tab) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.instructor.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalRevenue = courses.reduce((s, c) => s + parseInt(c.revenue.replace(/[₹,]/g, '')), 0);

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Courses</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{courses.length} courses &middot; ₹{totalRevenue.toLocaleString()} total revenue</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 w-48 text-sm" />
          </div>
          <Button size="sm" className="h-9 gap-1.5 text-xs" onClick={() => toast.success('Course creation form coming soon')}><Plus className="w-3.5 h-3.5" /> Add Course</Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({courses.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({courses.filter(c => c.status === 'published').length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({courses.filter(c => c.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({courses.filter(c => c.status === 'draft').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">No courses found</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search or filters</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((course) => (
                <Card key={course.id} className="p-0 overflow-hidden">
                  <div className="h-24 bg-gradient-to-br from-primary/10 to-primary/5 p-4 flex items-start justify-between">
                    <Badge variant={course.status === 'published' ? 'success' : course.status === 'pending' ? 'warning' : 'default'} size="sm" className="capitalize">{course.status}</Badge>
                    <Badge variant="secondary" size="sm">{course.category}</Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2">{course.title}</h3>
                    <p className="text-xs text-muted-foreground/70">{course.instructor}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.students}</span>
                      <span className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /> {course.rating}</span>
                      <span className="font-semibold text-foreground">{course.price}</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" variant="outline" className="flex-1 h-7 text-xs gap-1" onClick={() => navigate(`/courses/${course.slug}`)}><Eye className="w-3 h-3" /> View</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[130px]">
                          <DropdownMenuItem onClick={() => toast.success('Edit mode coming soon')}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success('Assign teacher dialog coming soon')}>Assign Teacher</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => toast.success('Course archived (demo)')}>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
