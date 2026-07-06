import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, FileText, Calendar, Users, Eye, Pencil } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const assignments = [
  { id: 1, title: 'Problem Set: Electrostatics', course: 'IIT-JEE Advanced Physics 2026', dueDate: '5 Jul 2026', submissions: 45, total: 128, status: 'active' },
  { id: 2, title: 'Lab Report: Chemical Kinetics', course: 'NEET Biology Crash Course', dueDate: '8 Jul 2026', submissions: 32, total: 94, status: 'active' },
  { id: 3, title: 'Essay: Indian Freedom Movement', course: 'UPSC Civil Services Foundation', dueDate: '10 Jul 2026', submissions: 0, total: 67, status: 'draft' },
  { id: 4, title: 'Integration Problems', course: 'CBSE Class 12 Mathematics', dueDate: '28 Jun 2026', submissions: 145, total: 156, status: 'grading' },
  { id: 5, title: 'Genetics Worksheet', course: 'NEET Biology Crash Course', dueDate: '22 Jun 2026', submissions: 88, total: 94, status: 'completed' },
];

export default function TeacherAssignments() {
  const [tab, setTab] = useState('all');
  const filtered = tab === 'all' ? assignments : assignments.filter(a => a.status === tab);

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Assignments</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{assignments.filter(a => a.status === 'active' || a.status === 'grading').length} in progress</p>
        </div>
        <Button size="sm" className="h-9 gap-1.5 text-xs" onClick={() => toast.success('New assignment form coming soon')}><Plus className="w-3.5 h-3.5" /> New Assignment</Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({assignments.filter(a => a.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="grading">Grading ({assignments.filter(a => a.status === 'grading').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({assignments.filter(a => a.status === 'completed').length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({assignments.filter(a => a.status === 'draft').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-2">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">No assignments</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">Create your first assignment</p>
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
                      <Badge variant={a.status === 'completed' ? 'success' : a.status === 'active' ? 'accent' : a.status === 'grading' ? 'warning' : 'default'} size="sm" className="capitalize">{a.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">{a.course}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground/50 mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Due {a.dueDate}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {a.submissions}/{a.total} submitted</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => toast.success('Opening submissions...')}><Eye className="w-3.5 h-3.5" /></Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => toast.success('Edit mode coming soon')}><Pencil className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
