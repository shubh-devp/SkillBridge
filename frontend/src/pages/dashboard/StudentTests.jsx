import { useState } from 'react';
import { Calendar, Clock, BarChart3, ChevronRight, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const allTests = [
  { id: 1, title: 'Weekly Mock Test #5', course: 'IIT-JEE Advanced Physics 2026', date: '4 Jul 2026', duration: '3h', marks: 300, status: 'upcoming', score: null },
  { id: 2, title: 'Chapter Test: Thermodynamics', course: 'NEET Biology Crash Course', date: '6 Jul 2026', duration: '1.5h', marks: 180, status: 'upcoming', score: null },
  { id: 3, title: 'Monthly Assessment: Calculus', course: 'CBSE Class 12 Mathematics', date: '2 Jul 2026', duration: '2h', marks: 100, status: 'missed', score: null },
  { id: 4, title: 'Full Syllabus Test', course: 'GATE Computer Science 2026', date: '12 Jul 2026', duration: '3h', marks: 200, status: 'upcoming', score: null },
  { id: 5, title: 'Weekly Mock Test #4', course: 'IIT-JEE Advanced Physics 2026', date: '27 Jun 2026', duration: '3h', marks: 300, status: 'completed', score: '276/300' },
  { id: 6, title: 'Chapter Test: Electrostatics', course: 'IIT-JEE Advanced Physics 2026', date: '20 Jun 2026', duration: '1h', marks: 120, status: 'completed', score: '108/120' },
  { id: 7, title: 'Mid-Term Assessment', course: 'CBSE Class 12 Mathematics', date: '15 Jun 2026', duration: '2h', marks: 100, status: 'completed', score: '88/100' },
  { id: 8, title: 'Diagnostic Test', course: 'NEET Biology Crash Course', date: '10 Jun 2026', duration: '2h', marks: 200, status: 'completed', score: '172/200' },
];

const statusLabels = { upcoming: 'Upcoming', completed: 'Completed', missed: 'Missed' };
const statusVariants = { upcoming: 'accent', completed: 'success', missed: 'destructive' };

export default function StudentTests() {
  const [tab, setTab] = useState('all');

  const filtered = tab === 'all' ? allTests : allTests.filter(t => t.status === tab);

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Tests & Assessments</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{allTests.length} total tests</p>
        </div>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
          <Filter className="w-3.5 h-3.5" /> Filter
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({allTests.length})</TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({allTests.filter(t => t.status === 'upcoming').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({allTests.filter(t => t.status === 'completed').length})
          </TabsTrigger>
          <TabsTrigger value="missed">
            Missed ({allTests.filter(t => t.status === 'missed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-2">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">No tests found</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">No tests in this category</p>
            </Card>
          ) : filtered.map((test) => (
            <Card key={test.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-medium text-sm text-foreground">{test.title}</h3>
                    <Badge variant={statusVariants[test.status]} size="sm">{statusLabels[test.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/70">{test.course}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/50 mt-1.5">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {test.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration}</span>
                    <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {test.marks} marks</span>
                    {test.score && <span className="font-semibold text-primary">Score: {test.score}</span>}
                  </div>
                </div>
                <Button size="sm" className="h-8 shrink-0 text-xs" variant={test.status === 'completed' ? 'outline' : 'default'}>
                  {test.status === 'completed' ? 'Review' : test.status === 'missed' ? 'Retake' : 'Start'}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
