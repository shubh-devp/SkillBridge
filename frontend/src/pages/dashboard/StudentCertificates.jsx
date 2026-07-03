import { Award, Download, Share2, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const certificates = [
  { id: 1, title: 'Advanced Mathematics Proficiency', issuer: 'SkillBridge', date: '15 Jun 2026', grade: 'A', type: 'Course Completion' },
  { id: 2, title: 'Physics Fundamentals', issuer: 'SkillBridge', date: '20 May 2026', grade: 'A+', type: 'Course Completion' },
  { id: 3, title: 'NEET Mock Test Series - Top 10%', issuer: 'SkillBridge', date: '10 Apr 2026', grade: 'Top 10%', type: 'Achievement' },
  { id: 4, title: 'Weekly Challenge: Chemistry', issuer: 'SkillBridge', date: '5 Mar 2026', grade: 'Gold', type: 'Achievement' },
];

export default function StudentCertificates() {
  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Certificates</h1>
        <p className="text-sm text-muted-foreground/70 mt-0.5">{certificates.length} certificates earned</p>
      </div>

      {certificates.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <Award className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">No certificates yet</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">Complete courses to earn certificates</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <Card key={cert.id} className="p-0 overflow-hidden group">
              <div className="h-32 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 flex flex-col items-center justify-center border-b border-border/40">
                <Award className="w-8 h-8 text-amber-500 mb-1" />
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Certificate of {cert.type}</p>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm text-foreground">{cert.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                  <span>Issued: {cert.date}</span>
                  <Badge variant="success" size="sm">{cert.grade}</Badge>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1">
                    <Download className="w-3 h-3" /> Download
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Share2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <ExternalLink className="w-3.5 h-3.5" />
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
