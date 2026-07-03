import { useState } from 'react';
import { FileText, Calendar, Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const assignments = [
  { id: 1, title: 'Problem Set: Electrostatics', course: 'IIT-JEE Advanced Physics 2026', dueDate: '5 Jul 2026', status: 'pending', type: 'Problem Set' },
  { id: 2, title: 'Lab Report: Chemical Kinetics', course: 'NEET Biology Crash Course', dueDate: '8 Jul 2026', status: 'pending', type: 'Lab Report' },
  { id: 3, title: 'Essay: Indian Freedom Movement', course: 'UPSC Civil Services Foundation', dueDate: '10 Jul 2026', status: 'pending', type: 'Essay' },
  { id: 4, title: 'Integration Problems', course: 'CBSE Class 12 Mathematics', dueDate: '28 Jun 2026', status: 'submitted', type: 'Problem Set' },
  { id: 5, title: 'Organic Chemistry Problem Set', course: 'IIT-JEE Advanced Physics 2026', dueDate: '25 Jun 2026', status: 'graded', score: '92/100', type: 'Problem Set' },
  { id: 6, title: 'Genetics Worksheet', course: 'NEET Biology Crash Course', dueDate: '22 Jun 2026', status: 'graded', score: '88/100', type: 'Worksheet' },
];

const statusVariants = { pending: 'accent', submitted: 'warning', graded: 'success' };
const statusLabels = { pending: 'Pending', submitted: 'Submitted', graded: 'Graded' };

export default function StudentAssignments() {
  const [tab, setTab] = useState('pending');

  const filtered = tab === 'all' ? assignments : assignments.filter(a => a.status === tab);

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Assignments</h1>
        <p className="text-sm text-muted-foreground/70 mt-0.5">{assignments.filter(a => a.status === 'pending').length} pending</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({assignments.filter(a => a.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({assignments.filter(a => a.status === 'submitted').length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({assignments.filter(a => a.status === 'graded').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-2">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">All caught up!</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">No assignments in this category</p>
            </Card>
          ) : filtered.map((a) => (
            <Card key={a.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="p-2 rounded-lg bg-muted shrink-0">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm text-foreground">{a.title}</h3>
                      <Badge variant={statusVariants[a.status]} size="sm">{statusLabels[a.status]}{a.score ? ` - ${a.score}` : ''}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">{a.course}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/50 mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Due {a.dueDate}</span>
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {a.type}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant={a.status === 'graded' ? 'outline' : 'default'} className="h-8 shrink-0 text-xs">
                  {a.status === 'graded' ? 'View Feedback' : a.status === 'submitted' ? 'View' : 'Submit'}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
