import { useState } from 'react';
import { Plus, Calendar, Clock, BarChart3, Users, Eye, Pencil } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const tests = [
  { id: 1, title: 'Weekly Mock Test #5', course: 'IIT-JEE Advanced Physics 2026', date: '4 Jul 2026', duration: '3h', questions: 75, submissions: 98, status: 'scheduled' },
  { id: 2, title: 'Chapter Test: Thermodynamics', course: 'NEET Biology Crash Course', date: '6 Jul 2026', duration: '1.5h', questions: 45, submissions: 0, status: 'draft' },
  { id: 3, title: 'Monthly Assessment: Calculus', course: 'CBSE Class 12 Mathematics', date: '2 Jul 2026', duration: '2h', questions: 60, submissions: 142, status: 'active' },
  { id: 4, title: 'Full Syllabus Test', course: 'GATE Computer Science 2026', date: '12 Jul 2026', duration: '3h', questions: 100, submissions: 65, status: 'scheduled' },
  { id: 5, title: 'Weekly Mock Test #4', course: 'IIT-JEE Advanced Physics 2026', date: '27 Jun 2026', duration: '3h', questions: 75, submissions: 112, status: 'completed' },
];

export default function TeacherTests() {
  const [tab, setTab] = useState('all');
  const filtered = tab === 'all' ? tests : tests.filter(t => t.status === tab);

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Tests & Assessments</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{tests.length} total tests</p>
        </div>
        <Button size="sm" className="h-9 gap-1.5 text-xs"><Plus className="w-3.5 h-3.5" /> Create Test</Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({tests.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled ({tests.filter(t => t.status === 'scheduled').length})</TabsTrigger>
          <TabsTrigger value="active">Active ({tests.filter(t => t.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({tests.filter(t => t.status === 'draft').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({tests.filter(t => t.status === 'completed').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-2">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <BarChart3 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">No tests found</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">Create your first test</p>
            </Card>
          ) : filtered.map((test) => (
            <Card key={test.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-medium text-sm text-foreground">{test.title}</h3>
                    <Badge variant={test.status === 'completed' ? 'success' : test.status === 'active' ? 'accent' : test.status === 'draft' ? 'warning' : 'default'} size="sm" className="capitalize">{test.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/70">{test.course}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/50 mt-1.5">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {test.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration}</span>
                    <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {test.questions} questions</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {test.submissions} submissions</span>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Eye className="w-3.5 h-3.5" /></Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Pencil className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
