import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, Star, Filter, ChevronRight, GraduationCap, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/store/auth-context';

const enrolledCourses = [
  { id: 1, title: 'IIT-JEE Advanced Physics 2026', instructor: 'Dr. Vikram Rathore', progress: 72, total: 24, done: 17, category: 'Engineering', rating: 4.8, nextClass: 'Today, 4:00 PM' },
  { id: 2, title: 'NEET Biology Crash Course', instructor: 'Prof. Sunita Mehta', progress: 45, total: 18, done: 8, category: 'Medical', rating: 4.6, nextClass: 'Tomorrow, 10:00 AM' },
  { id: 3, title: 'CBSE Class 12 Mathematics', instructor: 'Dr. Rajesh Kumar', progress: 88, total: 15, done: 13, category: 'Board Exams', rating: 4.9, nextClass: 'Fri, 2:00 PM' },
  { id: 4, title: 'GATE Computer Science 2026', instructor: 'Prof. Ananya Sharma', progress: 34, total: 30, done: 10, category: 'Postgraduate', rating: 4.7, nextClass: 'Not scheduled' },
  { id: 5, title: 'UPSC Civil Services Foundation', instructor: 'Mr. Arvind Singh', progress: 15, total: 40, done: 6, category: 'Civil Services', rating: 4.5, nextClass: 'Mon, 8:00 AM' },
];

export default function StudentCourses() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const filtered = enrolledCourses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">My Courses</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{enrolledCourses.length} courses enrolled</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 w-56 text-sm"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5" /> Filter
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">No courses found</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">Try searching with different keywords</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <Card key={course.id} className="p-0 overflow-hidden group">
              <div className="h-28 bg-gradient-to-br from-primary/10 to-primary/5 p-4 flex flex-col justify-between">
                <Badge variant="secondary" size="sm" className="self-start">{course.category}</Badge>
                <div>
                  <h3 className="font-semibold text-foreground leading-tight line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{course.instructor}</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground/70">{course.done}/{course.total} modules</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-foreground">{course.rating}</span>
                  </div>
                </div>
                <Progress value={course.progress} className="h-1.5" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                  <Clock className="w-3 h-3" />
                  <span>Next: {course.nextClass}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1 h-8 text-xs gap-1">
                    <Play className="w-3 h-3" /> Continue
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
