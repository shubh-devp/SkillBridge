import { useState } from 'react';
import { Search, Mail, MessageSquare, Send, Paperclip, Star, Trash2, Inbox } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const conversations = [
  { id: 1, name: 'Dr. Vikram Rathore', email: 'vikram.rathore@eduserve.in', lastMsg: 'I need to update the course syllabus for the new batch', time: '5m ago', unread: 2, initials: 'VR', online: true },
  { id: 2, name: 'Rohit Sharma', email: 'rohit.sharma@example.com', lastMsg: 'When will the next mock test be available?', time: '2h ago', unread: 0, initials: 'RS', online: false },
  { id: 3, name: 'Prof. Sunita Mehta', email: 'sunita.mehta@eduserve.in', lastMsg: 'The new NEET material is ready for review', time: '1d ago', unread: 1, initials: 'SM', online: true },
  { id: 4, name: 'Ananya Gupta', email: 'ananya.gupta@example.com', lastMsg: 'Thank you for the scholarship information', time: '3d ago', unread: 0, initials: 'AG', online: false },
];

export default function AdminMessages() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  return (
    <div className="pb-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Messages</h1>
          <p className="text-sm text-muted-foreground/70 mt-0.5">Platform communications</p>
        </div>
        <Button size="sm" className="h-9 gap-1.5 text-xs"><Send className="w-3.5 h-3.5" /> Compose</Button>
      </div>

      <Card className="flex h-[600px] overflow-hidden">
        <div className="w-80 border-r border-border/60 flex flex-col shrink-0">
          <div className="p-3 border-b border-border/60">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
              <Input placeholder="Search messages..." className="pl-9 h-9 text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={cn(
                  'w-full text-left p-3.5 border-b border-border/40 hover:bg-muted/30 transition-colors',
                  selected?.id === c.id && 'bg-muted/40',
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="text-xs bg-primary/5 text-primary font-semibold">{c.initials}</AvatarFallback>
                    </Avatar>
                    {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1 ring-surface" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                      <span className="text-[10px] text-muted-foreground/50 shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground/70 truncate mt-0.5">{c.lastMsg}</p>
                  </div>
                  {c.unread > 0 && (
                    <Badge variant="accent" size="sm" className="rounded-full px-1.5 min-w-[18px] text-center shrink-0">{c.unread}</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Select a conversation</h3>
            <p className="text-sm text-muted-foreground/70 mt-1">Choose a message to view the conversation</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
