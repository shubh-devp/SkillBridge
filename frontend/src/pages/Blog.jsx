import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Calendar, Clock, Eye, ArrowRight, ChevronRight,
  ChevronLeft, BookOpen, Sparkles, Tag, ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/shared/PageHeader';
import Section, { staggerContainer, staggerItem } from '@/components/shared/Section';
import { cn } from '@/lib/utils';

const allPosts = [
  { id: 1, slug: 'jee-advanced-2027-preparation-strategy', title: 'JEE Advanced 2027: Complete Preparation Strategy & Study Plan', excerpt: 'A comprehensive month-by-month preparation strategy for JEE Advanced 2027. Learn how to balance school, coaching, and self-study effectively.', category: 'JEE Advanced', author: 'Dr. Rajesh Kumar', authorInitials: 'RK', date: 'Jun 28, 2026', readTime: '8 min read', views: 12400, featured: true, tags: ['JEE', 'Preparation', 'Study Plan'] },
  { id: 2, slug: 'neet-ug-2027-biology-tips', title: 'NEET UG 2027: Top 10 Tips to Master Biology in 3 Months', excerpt: 'Expert tips and techniques to master the NEET Biology syllabus in just 3 months. Includes study schedules, memory techniques, and practice strategies.', category: 'NEET UG', author: 'Dr. Priya Sharma', authorInitials: 'PS', date: 'Jun 25, 2026', readTime: '6 min read', views: 9800, featured: false, tags: ['NEET', 'Biology', 'Study Tips'] },
  { id: 3, slug: 'cbse-class-12-board-exam-tips', title: 'CBSE Class 12 Board Exams 2027: How to Score 95%+', excerpt: 'Proven strategies and study techniques to score 95% and above in your CBSE Class 12 board exams. Tips from toppers and expert teachers.', category: 'CBSE', author: 'Ms. Sneha Patel', authorInitials: 'SP', date: 'Jun 22, 2026', readTime: '7 min read', views: 15600, featured: false, tags: ['CBSE', 'Board Exams', 'Study Tips'] },
  { id: 4, slug: 'python-vs-javascript-beginners', title: 'Python vs JavaScript for Beginners: Which Should You Learn First?', excerpt: 'Confused between Python and JavaScript? We compare both languages to help you decide which one to learn first based on your career goals.', category: 'Programming', author: 'Mr. Arjun Nair', authorInitials: 'AN', date: 'Jun 20, 2026', readTime: '5 min read', views: 21000, featured: false, tags: ['Programming', 'Python', 'JavaScript'] },
  { id: 5, slug: 'jee-main-2027-mathematics-tips', title: 'JEE Main 2027: Mathematics Preparation Guide for 99+ Percentile', excerpt: 'A complete guide to scoring 99+ percentile in JEE Main Mathematics. Covers important topics, problem-solving techniques, and mock test strategy.', category: 'JEE Main', author: 'Prof. Amit Verma', authorInitials: 'AV', date: 'Jun 18, 2026', readTime: '9 min read', views: 11200, featured: false, tags: ['JEE Main', 'Mathematics', 'Guide'] },
  { id: 6, slug: 'communication-skills-career-growth', title: 'Why Communication Skills Matter More Than Technical Skills in 2026', excerpt: 'In the age of AI, communication and soft skills have become more valuable than ever. Learn how to develop these crucial skills.', category: 'Skill Dev', author: 'Ms. Neha Kapoor', authorInitials: 'NK', date: 'Jun 15, 2026', readTime: '6 min read', views: 8700, featured: false, tags: ['Soft Skills', 'Career', 'Communication'] },
  { id: 7, slug: 'jee-advanced-physics-tips', title: 'JEE Advanced Physics: How to Improve from 60% to 95% in 4 Months', excerpt: 'A systematic approach to dramatically improve your Physics score for JEE Advanced. Includes chapter-wise strategy and practice techniques.', category: 'JEE Advanced', author: 'Dr. Rajesh Kumar', authorInitials: 'RK', date: 'Jun 12, 2026', readTime: '7 min read', views: 14300, featured: false, tags: ['JEE', 'Physics', 'Improvement'] },
  { id: 8, slug: 'data-science-career-india', title: 'Data Science Career in India 2026: Skills, Salary & Opportunities', excerpt: 'A complete overview of the data science landscape in India. Learn about required skills, expected salaries, and job opportunities.', category: 'Programming', author: 'Mr. Arjun Nair', authorInitials: 'AN', date: 'Jun 10, 2026', readTime: '8 min read', views: 18900, featured: false, tags: ['Data Science', 'Career', 'India'] },
  { id: 9, slug: 'neet-physics-preparation', title: 'NEET UG Physics: Most Important Topics & Weightage Analysis', excerpt: 'Detailed analysis of NEET Physics topic weightage with a focused study plan to maximize your score in the remaining months.', category: 'NEET UG', author: 'Dr. Priya Sharma', authorInitials: 'PS', date: 'Jun 8, 2026', readTime: '5 min read', views: 7600, featured: false, tags: ['NEET', 'Physics', 'Weightage'] },
  { id: 10, slug: 'jee-main-physics-crash-course', title: 'JEE Main Physics: Complete Crash Course Strategy for 2027', excerpt: 'A focused crash course strategy for JEE Main Physics. Cover important topics, high-weightage chapters, and time-saving techniques.', category: 'JEE Main', author: 'Dr. Suresh Reddy', authorInitials: 'SR', date: 'Jun 5, 2026', readTime: '6 min read', views: 9300, featured: false, tags: ['JEE Main', 'Physics', 'Crash Course'] },
  { id: 11, slug: 'cbse-class-10-math-tips', title: 'CBSE Class 10 Mathematics: How to Score 100/100', excerpt: 'A complete guide to scoring perfect 100 in CBSE Class 10 Mathematics. Includes chapter-wise strategy, common mistakes, and practice plan.', category: 'CBSE', author: 'Prof. Anjali Desai', authorInitials: 'AD', date: 'Jun 2, 2026', readTime: '7 min read', views: 17200, featured: false, tags: ['CBSE', 'Mathematics', 'Board Exams'] },
];

const categories = ['All', 'JEE Advanced', 'JEE Main', 'NEET UG', 'CBSE', 'Programming', 'Skill Dev'];
const sidebarCategories = [
  { name: 'JEE Advanced', count: 12 },
  { name: 'JEE Main', count: 8 },
  { name: 'NEET UG', count: 10 },
  { name: 'CBSE', count: 6 },
  { name: 'Programming', count: 9 },
  { name: 'Skill Dev', count: 4 },
];
const popularTags = ['JEE', 'NEET', 'CBSE', 'Programming', 'Study Tips', 'Physics', 'Mathematics', 'Biology', 'Python', 'Career', 'Data Science', 'AI'];

const ITEMS_PER_PAGE = 6;

function BlogCard({ post, featured = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group h-full">
      <div className={cn(
        'card-premium card-hover-premium h-full overflow-hidden rounded-2xl',
        featured && 'md:flex',
      )}>
        <div className={cn(
          'bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 flex items-center justify-center overflow-hidden shrink-0',
          featured ? 'h-56 md:h-auto md:w-[400px]' : 'h-44',
        )}>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.06] via-transparent to-transparent" />
            <div className="text-center">
              <BookOpen className={cn(
                'text-primary/25 group-hover:scale-110 transition-transform duration-500',
                featured ? 'w-20 h-20' : 'w-12 h-12',
              )} />
            </div>
          </div>
        </div>
        <div className={cn('p-5 flex flex-col flex-1', featured && 'justify-center')}>
          <Badge variant="secondary" className="w-fit mb-3 rounded-lg text-xs">{post.category}</Badge>
          <h3 className={cn(
            'font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2 truncate-2',
            featured ? 'text-xl md:text-2xl' : 'text-base',
          )}>
            {post.title}
          </h3>
          <p className={cn('text-muted-foreground truncate-2 mb-4', featured ? 'text-sm' : 'text-xs')}>
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2.5">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-[10px] font-semibold">
                  {post.authorInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="text-xs font-medium text-card-foreground block">{post.author}</span>
                <span className="text-[10px] text-muted-foreground">{post.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BlogSkeleton() {
  return (
    <div className="card-premium overflow-hidden rounded-2xl">
      <Skeleton className="h-44 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20 rounded-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16 ml-auto" />
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory]);

  const featuredPost = allPosts.find((p) => p.featured);
  const otherPosts = allPosts.filter((p) => !p.featured);

  const filteredPosts = otherPosts.filter((post) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const recentPosts = allPosts.slice(0, 4);

  return (
    <div className="min-h-screen">
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            SkillBridge Blog
            <Sparkles className="w-6 h-6 text-accent" />
          </span>
        }
        subtitle="Expert insights, study tips, and updates on Indian education and competitive exams"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Blog' },
        ]}
      />

      <Section className="pt-0 -mt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-card border-muted focus-visible:border-primary/30 rounded-xl"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border shrink-0',
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-card text-muted-foreground border-muted hover:border-primary/30 hover:text-foreground',
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BlogSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && selectedCategory === 'All' && !searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">Featured Post</span>
                    </div>
                    <BlogCard post={featuredPost} featured />
                  </motion.div>
                )}

                {/* Post Grid */}
                {paginatedPosts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
                      <BookOpen className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      We couldn't find any blog posts matching your criteria.
                    </p>
                    <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="rounded-xl">
                      Clear Filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  >
                    {paginatedPosts.map((post) => (
                      <motion.div key={post.id} variants={staggerItem}>
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-12">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="w-9 h-9 rounded-xl"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={cn('w-9 h-9 rounded-xl text-sm', currentPage === page && 'shadow-lg shadow-primary/20')}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="w-9 h-9 rounded-xl"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-5">
              {/* Search Card */}
              <Card className="rounded-2xl border-0 shadow-lg shadow-primary/5">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-card-foreground mb-3 text-sm">Search Blog</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="rounded-2xl border-0 shadow-lg shadow-primary/5">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-card-foreground mb-3 text-sm">Categories</h3>
                  <div className="space-y-1">
                    {sidebarCategories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all',
                          selectedCategory === cat.name
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <ArrowUpRight className="w-3 h-3" />
                          {cat.name}
                        </span>
                        <Badge variant="secondary" className="text-[10px] px-2 py-0">{cat.count}</Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card className="rounded-2xl border-0 shadow-lg shadow-primary/5">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-card-foreground mb-3 text-sm">Recent Posts</h3>
                  <div className="space-y-3">
                    {recentPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="flex items-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-primary/50" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate-2">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="rounded-2xl border-0 shadow-lg shadow-primary/5">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-card-foreground mb-3 text-sm">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-white transition-colors rounded-lg px-3 py-1.5"
                        onClick={() => setSelectedCategory(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}
