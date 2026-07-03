import { useState } from 'react';
import { Search, FileText, Plus, Eye, Calendar, MessageSquare, ThumbsUp, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const blogs = [
  { id: 1, title: 'How to Crack IIT-JEE in 6 Months', author: 'Dr. Vikram Rathore', date: '1 Jul 2026', views: 12450, comments: 48, likes: 892, status: 'published' },
  { id: 2, title: 'NEET 2026: Complete Study Plan', author: 'Prof. Sunita Mehta', date: '28 Jun 2026', views: 8920, comments: 32, likes: 654, status: 'published' },
  { id: 3, title: 'CBSE Board Exam Tips from Toppers', author: 'Admin', date: '25 Jun 2026', views: 15670, comments: 56, likes: 1023, status: 'published' },
  { id: 4, title: 'GATE 2026: What Changed This Year', author: 'Prof. Ananya Sharma', date: '20 Jun 2026', views: 5430, comments: 18, likes: 321, status: 'draft' },
  { id: 5, title: 'The Future of Online Education in India', author: 'Admin', date: '15 Jun 2026', views: 0, comments: 0, likes: 0, status: 'draft' },
];

export default function AdminBlogs() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const filtered = blogs.filter(b => {
    if (tab !== 'all' && b.status !== tab) return false;
    if (search && !b.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Blog Management</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">{blogs.length} blog posts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 w-48 text-sm" />
          </div>
          <Button size="sm" className="h-9 gap-1.5 text-xs"><Plus className="w-3.5 h-3.5" /> New Post</Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({blogs.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({blogs.filter(b => b.status === 'published').length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({blogs.filter(b => b.status === 'draft').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-2">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">No blog posts</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">Create your first blog post</p>
            </Card>
          ) : filtered.map((post) => (
            <Card key={post.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-medium text-sm text-foreground">{post.title}</h3>
                    <Badge variant={post.status === 'published' ? 'success' : 'warning'} size="sm" className="capitalize">{post.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/70">By {post.author} &middot; {post.date}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground/50 mt-1.5">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views.toLocaleString()} views</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {post.comments}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {post.likes}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button size="sm" variant="outline" className="h-8 text-xs gap-1"><Eye className="w-3 h-3" /> Preview</Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
