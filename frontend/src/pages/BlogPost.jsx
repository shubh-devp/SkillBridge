import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Calendar, Clock, Eye, ArrowLeft, BookOpen,
  Facebook, Twitter, Linkedin, Link as LinkIcon, Copy,
  ThumbsUp, MessageSquare, ChevronRight, Check, Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Section from '@/components/shared/Section';
import { cn } from '@/lib/utils';

const blogPost = {
  slug: 'jee-advanced-2027-preparation-strategy',
  title: 'JEE Advanced 2027: Complete Preparation Strategy & Study Plan',
  excerpt: 'A comprehensive month-by-month preparation strategy for JEE Advanced 2027. Learn how to balance school, coaching, and self-study effectively.',
  category: 'JEE Advanced',
  author: 'Dr. Rajesh Kumar',
  authorInitials: 'RK',
  authorBio: 'Ph.D. Physics, IIT Delhi. 18+ years of teaching experience. Former faculty at IIT Delhi.',
  authorAvatar: null,
  date: 'Jun 28, 2026',
  readTime: '8 min read',
  views: 12400,
  tags: ['JEE', 'Preparation Strategy', 'Study Plan', 'Physics', 'Mathematics'],
  tableOfContents: [
    { id: 'why-start-early', label: 'Why Start Early?' },
    { id: 'month-by-month-strategy', label: 'Month-by-Month Strategy' },
    { id: 'months-1-3-foundation-building', label: 'Months 1-3: Foundation Building' },
    { id: 'months-4-6-advanced-concepts', label: 'Months 4-6: Advanced Concepts' },
    { id: 'months-7-9-intensive-practice', label: 'Months 7-9: Intensive Practice' },
    { id: 'months-10-12-mock-test-phase', label: 'Months 10-12: Mock Test Phase' },
    { id: 'subject-wise-tips', label: 'Subject-Wise Tips' },
    { id: 'common-mistakes-to-avoid', label: 'Common Mistakes to Avoid' },
    { id: 'final-words', label: 'Final Words' },
  ],
  content: [
    { type: 'paragraph', text: 'Starting your JEE Advanced 2027 preparation early is the smartest decision you can make. With the increasing competition and the vast syllabus, a well-structured study plan is essential for success.' },
    { type: 'heading', level: 2, text: 'Why Start Early?', id: 'why-start-early' },
    { type: 'paragraph', text: 'The JEE Advanced exam tests not just your knowledge but your conceptual depth and problem-solving speed. Starting early gives you:' },
    { type: 'list', items: [
      'More time for conceptual clarity — Rushing through topics leads to surface-level understanding. Early starters can focus on building strong foundations.',
      'Multiple revision cycles — The key to retention is revision. Starting early allows you to revise each topic multiple times.',
      'Time for mock tests and analysis — Practice tests are crucial. You need time to take and analyze at least 20-25 full-length mock tests.',
      'Buffer for difficult topics — Some topics take longer to master. Early preparation gives you the flexibility to spend extra time where needed.',
    ]},
    { type: 'heading', level: 2, text: 'Month-by-Month Strategy', id: 'month-by-month-strategy' },
    { type: 'paragraph', text: 'Here is a detailed month-by-month breakdown of your preparation journey:' },
    { type: 'heading', level: 3, text: 'Months 1-3: Foundation Building (April - June 2026)', id: 'months-1-3-foundation-building' },
    { type: 'paragraph', text: 'Focus on building a strong foundation in all three subjects. This phase is about understanding the basics thoroughly.' },
    { type: 'blockquote', text: 'A strong foundation is the key to mastering advanced concepts. Do not rush through this phase.' },
    { type: 'paragraph', text: 'Physics: Start with Mechanics and Thermodynamics as they form the backbone of the subject. Focus on understanding the derivations and the physics behind each concept.' },
    { type: 'paragraph', text: 'Chemistry: Begin with Physical Chemistry as it involves calculations and a systematic approach. Follow up with Inorganic Chemistry, focusing on periodic trends and chemical bonding.' },
    { type: 'paragraph', text: 'Mathematics: Start with Algebra and Trigonometry. These topics require practice and form the foundation for Calculus.' },
    { type: 'heading', level: 3, text: 'Months 4-6: Advanced Concepts (July - September 2026)', id: 'months-4-6-advanced-concepts' },
    { type: 'paragraph', text: 'Once your basics are strong, move to advanced topics.' },
    { type: 'paragraph', text: 'Physics: Cover Electrodynamics, Optics, and Modern Physics. These topics have high weightage in JEE Advanced.' },
    { type: 'paragraph', text: 'Chemistry: Dive into Organic Chemistry. Focus on reaction mechanisms, named reactions, and their applications.' },
    { type: 'paragraph', text: 'Mathematics: Start Calculus and Coordinate Geometry. These are high-weightage topics that require extensive practice.' },
    { type: 'heading', level: 3, text: 'Months 7-9: Intensive Practice (October - December 2026)', id: 'months-7-9-intensive-practice' },
    { type: 'paragraph', text: 'This phase is all about application and practice.' },
    { type: 'list', items: [
      'Solve chapter-wise question banks for each subject',
      'Practice previous year JEE Advanced papers (last 10 years)',
      'Identify weak areas and work on them systematically',
      'Start giving topic-wise tests and track your progress',
      'Maintain an error log to avoid repeating mistakes',
    ]},
    { type: 'heading', level: 3, text: 'Months 10-12: Mock Test Phase (January - March 2027)', id: 'months-10-12-mock-test-phase' },
    { type: 'paragraph', text: 'The final phase before the exam is all about refinement:' },
    { type: 'list', items: [
      'Take full-length mock tests every weekend under exam conditions',
      'Analyze each test thoroughly — identify pattern of mistakes',
      'Work on time management and question selection strategy',
      'Focus on revision and formula recall in the final weeks',
      'Take one day off every week to avoid burnout',
    ]},
    { type: 'heading', level: 2, text: 'Subject-Wise Tips', id: 'subject-wise-tips' },
    { type: 'heading', level: 3, text: 'Physics' },
    { type: 'list', items: [
      'Focus on conceptual understanding rather than memorization of formulas',
      'Practice derivations — they help in understanding the underlying logic',
      'Pay special attention to Electrodynamics and Modern Physics (high weightage)',
      'Use diagrams and free body diagrams for mechanics problems',
      'Solve HC Verma and IE Irodov for advanced practice',
    ]},
    { type: 'heading', level: 3, text: 'Chemistry' },
    { type: 'list', items: [
      'Physical Chemistry: Master the formulas and practice numericals daily',
      'Organic Chemistry: Understand mechanisms, not just memorize reactions',
      'Inorganic Chemistry: Use mnemonics and periodic trends for retention',
      'Practice balanced equations and stoichiometry regularly',
    ]},
    { type: 'heading', level: 3, text: 'Mathematics' },
    { type: 'list', items: [
      'Practice is the key — solve at least 10 problems per topic daily',
      'Focus on Calculus — it has the highest weightage in JEE Advanced',
      'Master problem-solving techniques and time-saving shortcuts',
      'Maintain a formula book for quick revision before exams',
    ]},
    { type: 'heading', level: 2, text: 'Common Mistakes to Avoid', id: 'common-mistakes-to-avoid' },
    { type: 'ordered-list', items: [
      'Ignoring NCERT: While JEE Advanced goes beyond NCERT, the basics are still from NCERT. Do not skip it.',
      'Not practicing enough: Reading and understanding is not enough. You must solve problems daily.',
      'Skipping revisions: Regular revision is crucial for long-term retention of concepts.',
      'Neglecting weak areas: Focus on improving weaknesses rather than only practicing strengths.',
      'Poor time management: Balance between school, coaching, and self-study is essential for success.',
    ]},
    { type: 'heading', level: 2, text: 'Final Words', id: 'final-words' },
    { type: 'blockquote', text: 'Remember, JEE Advanced is not just about hard work — it is about smart work. A well-structured plan, consistent effort, and regular self-assessment are the keys to success.' },
    { type: 'paragraph', text: 'Start today, stay disciplined, and believe in yourself. With the right strategy and dedication, you can achieve any goal. All the best for your JEE Advanced 2027 preparation!' },
  ],
  relatedPosts: [
    { id: 5, slug: 'jee-main-2027-mathematics-tips', title: 'JEE Main 2027: Mathematics Preparation Guide for 99+ Percentile', category: 'JEE Main', date: 'Jun 18, 2026', readTime: '9 min read' },
    { id: 7, slug: 'jee-advanced-physics-tips', title: 'JEE Advanced Physics: How to Improve from 60% to 95% in 4 Months', category: 'JEE Advanced', date: 'Jun 12, 2026', readTime: '7 min read' },
    { id: 11, slug: 'cbse-class-10-math-tips', title: 'CBSE Class 10 Mathematics: How to Score 100/100', category: 'CBSE', date: 'Jun 2, 2026', readTime: '7 min read' },
  ],
  comments: [
    { id: 1, name: 'Arjun Singh', initials: 'AS', date: 'Jun 29, 2026', text: 'Excellent article! The month-by-month breakdown is very helpful. I was wondering if you could recommend a specific daily routine to follow during the foundation building phase.', likes: 12 },
    { id: 2, name: 'Priya Verma', initials: 'PV', date: 'Jun 28, 2026', text: 'Thank you for this comprehensive guide. I started my preparation last month and this confirms I am on the right track. The tips about avoiding common mistakes are particularly useful.', likes: 8 },
    { id: 3, name: 'Rahul Sharma', initials: 'RS', date: 'Jun 27, 2026', text: 'Great article Dr. Rajesh! Your advice on maintaining an error log has helped me a lot. Would love to see a follow-up article on specific daily routines.', likes: 5 },
  ],
};

function ContentRenderer({ content }) {
  return (
    <div className="space-y-5">
      {content.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i} className="text-muted-foreground leading-relaxed text-base">
                {block.text}
              </p>
            );
          case 'heading':
            if (block.level === 2) {
              return (
                <h2 key={i} id={block.id} className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">
                  {block.text}
                </h2>
              );
            }
            return (
              <h3 key={i} className="text-xl font-semibold text-foreground mt-8 mb-3">
                {block.text}
              </h3>
            );
          case 'list':
            return (
              <ul key={i} className="space-y-2 ml-5">
                {block.items.map((item, j) => (
                  <li key={j} className="text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case 'ordered-list':
            return (
              <ol key={i} className="space-y-2 ml-5 list-decimal marker:text-primary">
                {block.items.map((item, j) => (
                  <li key={j} className="text-muted-foreground leading-relaxed pl-2">
                    {item}
                  </li>
                ))}
              </ol>
            );
          case 'blockquote':
            return (
              <div key={i} className="relative border-l-4 border-primary bg-primary/5 rounded-r-xl px-6 py-5 my-6">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">{block.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function ShareButton({ icon: Icon, label, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2.5 rounded-xl border bg-card hover:scale-110 transition-all',
        className,
      )}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2[id]');
      let current = '';
      headings.forEach((h) => {
        if (h.getBoundingClientRect().top <= 150) {
          current = h.id;
        }
      });
      setActiveHeading(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-6 w-48 mb-6 rounded-lg" />
        <Skeleton className="h-64 w-full rounded-2xl mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-5 w-1/2 mb-6" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  const post = blogPost;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.04] via-background to-accent/[0.03] pt-8 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 rounded-lg">{post.category}</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
                  {post.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs font-semibold">
                        {post.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium text-card-foreground block">{post.author}</span>
                      <span className="text-xs">{post.authorBio}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" />{post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{post.readTime}</span>
                    <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-primary" />{post.views.toLocaleString()} views</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <Section className="!py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative h-56 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.06] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-primary/25" />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Content */}
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Share Buttons */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 flex lg:flex-col items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 hidden lg:block">Share</span>
                <ShareButton icon={Facebook} label="Share on Facebook" className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]" onClick={() => window.open('https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank')} />
                <ShareButton icon={Twitter} label="Share on Twitter" className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]" onClick={() => window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href), '_blank')} />
                <ShareButton icon={Linkedin} label="Share on LinkedIn" className="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]" onClick={() => window.open('https://linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href), '_blank')} />
                <ShareButton
                  icon={copied ? Check : Copy}
                  label="Copy link"
                  onClick={handleCopyLink}
                  className={copied ? 'bg-green-500 text-white border-green-500' : 'hover:bg-primary hover:text-white hover:border-primary'}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-7 order-1 lg:order-2" ref={contentRef}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <ContentRenderer content={post.content} />
              </motion.article>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors rounded-lg px-3 py-1.5" onClick={() => { navigate('/blog'); toast.success(`Showing posts tagged "${tag}"`); }}>
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author Card */}
              <Card className="mt-8 rounded-2xl border-0 shadow-lg shadow-primary/5">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <Avatar className="w-16 h-16 shrink-0 ring-2 ring-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-bold">
                        {post.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-card-foreground mb-1">{post.author}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{post.authorBio}</p>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="rounded-xl" onClick={() => navigate('/teachers')}>View Profile</Button>
                        <Button variant="ghost" size="sm" className="rounded-xl gap-1.5" onClick={() => toast.success('Contact feature coming soon')}>
                          <MessageSquare className="w-4 h-4" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Comments ({post.comments.length})
                </h2>

                <div className="space-y-4 mb-8">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="card-premium rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-semibold">
                              {comment.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sm text-card-foreground">{comment.name}</p>
                            <p className="text-xs text-muted-foreground">{comment.date}</p>
                          </div>
                        </div>
                        <button onClick={() => toast.success('Liked!')} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {comment.likes}
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                      <button onClick={() => toast.success('Reply feature coming soon')} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mt-2">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Reply
                      </button>
                    </div>
                  ))}
                </div>

                {/* Comment Form */}
                <Card className="rounded-2xl border-0 shadow-lg shadow-primary/5">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-card-foreground mb-4">Leave a Comment</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          placeholder="Your Name"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          className="rounded-xl"
                        />
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <Textarea
                        placeholder="Write your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={4}
                        className="rounded-xl"
                      />
                      <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl" onClick={() => { if (commentText.trim()) { toast.success('Comment posted!'); setCommentText(''); } else { toast.error('Please write a comment'); } }}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar - Table of Contents & Related */}
            <div className="lg:col-span-4 order-3">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Table of Contents */}
                <Card className="rounded-2xl border-0 shadow-lg shadow-primary/5">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-card-foreground mb-3 text-sm">Table of Contents</h3>
                    <nav className="space-y-1">
                      {post.tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={cn(
                            'block text-sm py-1.5 px-2 rounded-lg transition-all',
                            activeHeading === item.id
                              ? 'text-primary font-medium bg-primary/5'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                          )}
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                <Card className="rounded-2xl border-0 shadow-lg shadow-primary/5">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-card-foreground mb-3 text-sm">Related Posts</h3>
                    <div className="space-y-3">
                      {post.relatedPosts.map((rp) => (
                        <Link key={rp.id} to={`/blog/${rp.slug}`} className="flex items-start gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 text-primary/50" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate-2">
                              {rp.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              {rp.date} &middot; {rp.readTime}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
