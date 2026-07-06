import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Search, Star, Users, BookOpen, GraduationCap, ChevronRight, Check,
  ArrowRight, Play, Award, Quote, ChevronLeft, Clock, Zap, Target,
  Shield, Sparkles, TrendingUp, Trophy, MessageCircle,
  Globe, Download, CheckCircle, ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Section, { staggerContainer, staggerItem } from '@/components/shared/Section';
import { cn } from '@/lib/utils';

/* ───────── helpers ───────── */
function AnimatedCounter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const anim = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2000, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * end));
      if (p < 1) requestAnimationFrame(anim);
    };
    requestAnimationFrame(anim);
  }, [isInView, end]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function FadeUp({ children, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  const [goal, setGoal] = useState('');
  const navigate = useNavigate();
  const goals = ['JEE Advanced', 'NEET UG', 'JEE Main', 'CBSE', 'Programming'];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-surface to-surface pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="accent" size="default" className="mb-5">
                <Sparkles className="w-3 h-3 mr-1" />
                India&apos;s #1 Learning Platform
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08] mb-5">
                Master Your Exams with{' '}
                <span className="text-primary">India&apos;s Best</span>{' '}
                Educators
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
                Join 50,000+ students learning from India&apos;s top teachers.
                Live classes, comprehensive study material, and AI-powered
                personalized learning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <Input
                  placeholder="What do you want to learn?"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="pl-10 h-11 bg-surface border-border rounded-lg text-sm"
                />
              </div>
              <Button size="lg" className="h-11 px-6 text-sm" onClick={() => navigate(goal ? `/courses?q=${encodeURIComponent(goal)}` : '/courses')}>
                <Search className="w-4 h-4 mr-2" />
                Explore
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => { setGoal(g); navigate(`/courses?category=${encodeURIComponent(g)}`); }}
                  className={cn(
                    'px-3.5 py-1.5 rounded-md text-xs font-medium border transition-colors',
                    goal === g
                      ? 'border-primary bg-primary-light text-primary'
                      : 'border-border text-muted-foreground hover:border-muted-foreground/30',
                  )}
                >
                  {g}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex items-center gap-5"
            >
              <div className="flex -space-x-2">
                {['RK', 'PS', 'AV', 'SN'].map((i, idx) => (
                  <Avatar key={i} className="w-8 h-8 border-2 border-surface ring-1 ring-border/30">
                    <AvatarFallback className="bg-muted text-[10px] text-muted-foreground font-medium">{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">200+ Expert Teachers</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  4.8 average rating
                </div>
              </div>
              <div className="h-8 w-px bg-border/60" />
              <div className="text-sm">
                <span className="font-semibold text-foreground">50K+</span>
                <div className="text-xs text-muted-foreground">Active Students</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="rounded-xl border border-border/60 bg-surface shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-xs font-medium text-foreground">Live Now</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12 ring-2 ring-border">
                    <AvatarFallback className="bg-primary-light text-primary font-semibold">RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Dr. Rajesh Kumar</p>
                    <p className="text-xs text-muted-foreground">JEE Advanced Physics</p>
                  </div>
                  <Badge variant="success" size="sm" className="ml-auto">
                    <div className="w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse-subtle" />
                    Live
                  </Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Kinematics &amp; Laws of Motion</span>
                    <span className="text-foreground font-medium">42 min</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 1,240 watching</span>
                  </div>
                  <Button size="sm" className="h-8 text-xs gap-1.5" onClick={() => navigate('/courses/jee-advanced-physics-2026')}>
                    <Play className="w-3 h-3" />
                    Join Live
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { value: '50K+', label: 'Students', icon: Users, to: '/teachers' },
                  { value: '500+', label: 'Courses', icon: BookOpen, to: '/courses' },
                  { value: '95%', label: 'Success Rate', icon: TrendingUp, to: '/about' },
                ].map((stat) => (
                  <button key={stat.label} onClick={() => navigate(stat.to)} className="w-full rounded-lg border border-border/50 bg-surface p-3 text-center hover:border-border hover:shadow-sm transition-all">
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-16 text-xs text-muted-foreground/60"
        >
          <span className="animate-bounce">↓</span>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── Trusted ───────── */
function Trusted() {
  const logos = [
    'IIT Delhi', 'IIT Bombay', 'IIT Kanpur', 'AIIMS Delhi',
    'IIM Ahmedabad', 'NIT Trichy', 'BITS Pilani', 'DU',
  ];
  return (
    <Section bg="muted">
      <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider mb-6">
        Trusted by students from India&apos;s top institutions
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {logos.map((l) => (
          <span key={l} className="text-sm font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors">
            {l}
          </span>
        ))}
      </div>
    </Section>
  );
}

/* ──────── How It Works ──────── */
function HowItWorks() {
  const steps = [
    { icon: Search, title: 'Choose Your Goal', desc: 'Select from JEE, NEET, CBSE, or skill-based learning paths tailored to your needs.' },
    { icon: Users, title: 'Learn from Experts', desc: 'Attend live classes taught by India\'s top educators from premier institutions.' },
    { icon: Trophy, title: 'Track & Succeed', desc: 'Get AI-powered insights, mock tests, and personalized feedback to ace your exams.' },
  ];
  return (
    <Section>
      <div className="text-center mb-12">
        <Badge variant="primary" size="sm" className="mb-3">How It Works</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Your Success in 3 Steps
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <FadeUp key={s.title} delay={i * 0.1}>
            <div className="relative rounded-xl border border-border/60 bg-surface p-6 text-center">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white mx-auto mb-4">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted text-xs font-bold flex items-center justify-center text-muted-foreground border border-border/50">
                {i + 1}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

/* ──────── Stats ──────── */
function Stats() {
  const navigate = useNavigate();
  const stats = [
    { value: 50000, suffix: '+', label: 'Students Enrolled', icon: Users, to: '/teachers' },
    { value: 500, suffix: '+', label: 'Expert-Led Courses', icon: BookOpen, to: '/courses' },
    { value: 200, suffix: '+', label: 'Top Educators', icon: GraduationCap, to: '/teachers' },
    { value: 95, suffix: '%', label: 'Success Rate', icon: TrendingUp, to: '/about' },
  ];
  return (
    <Section bg="muted">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08}>
            <button onClick={() => navigate(s.to)} className="w-full rounded-xl border border-border/60 bg-surface p-5 text-center hover:border-border hover:shadow-sm transition-all">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-3" />
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </button>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

/* ──────── Featured Courses ──────── */
const coursesData = [
  { id: 1, slug: 'jee-advanced-physics-2026', title: 'JEE Advanced 2026: Complete Physics', teacher: 'Dr. Rajesh Kumar', category: 'JEE Advanced', rating: 4.8, reviews: 1240, enrolled: 8450, price: 14999, original: 29999, duration: '12 months', level: 'Advanced', badge: 'Popular' },
  { id: 2, slug: 'neet-ug-biology-masterclass', title: 'NEET UG 2026: Biology Masterclass', teacher: 'Dr. Priya Sharma', category: 'NEET UG', rating: 4.9, reviews: 980, enrolled: 7200, price: 12999, original: 24999, duration: '10 months', level: 'Advanced', badge: 'Top Rated' },
  { id: 3, slug: 'jee-main-mathematics-intensive', title: 'JEE Main 2026: Mathematics Intensive', teacher: 'Prof. Amit Verma', category: 'JEE Main', rating: 4.7, reviews: 1560, enrolled: 12300, price: 9999, original: 19999, duration: '8 months', level: 'Intermediate', badge: null },
  { id: 4, slug: 'python-data-science-ai', title: 'Python for Data Science & AI', teacher: 'Mr. Arjun Nair', category: 'Programming', rating: 4.8, reviews: 2100, enrolled: 15200, price: 8499, original: 16999, duration: '6 months', level: 'Beginner', badge: 'New' },
];

function FeaturedCourses() {
  return (
    <Section>
      <div className="flex items-end justify-between mb-10">
        <div>
          <Badge variant="primary" size="sm" className="mb-3">Courses</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Featured Courses
          </h2>
        </div>
        <Link to="/courses" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coursesData.map((course, i) => (
          <FadeUp key={course.id} delay={i * 0.08}>
            <Link to={`/courses/${course.slug}`} className="group block h-full">
              <div className="rounded-xl border border-border/60 bg-surface p-5 h-full hover:border-border hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" size="sm">{course.category}</Badge>
                  {course.badge && (
                    <Badge variant={course.badge === 'New' ? 'success' : 'accent'} size="xs">
                      {course.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-3 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="text-[8px] bg-muted text-muted-foreground">
                      {course.teacher.split(' ').map(w => w[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{course.teacher}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {course.enrolled.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <div>
                    <span className="text-sm font-bold text-foreground">₹{course.price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground line-through ml-1.5">₹{course.original.toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{course.duration}</span>
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link to="/courses">
          <Button variant="outline" className="gap-1.5">
            View All Courses <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}

/* ──────── Educators ──────── */
const educators = [
  { id: 1, name: 'Dr. Rajesh Kumar', subject: 'Physics', qualification: 'Ph.D. IIT Delhi', rating: 4.9, students: 12500, initials: 'RK' },
  { id: 2, name: 'Dr. Priya Sharma', subject: 'Biology', qualification: 'M.D. AIIMS', rating: 4.8, students: 10800, initials: 'PS' },
  { id: 3, name: 'Prof. Amit Verma', subject: 'Mathematics', qualification: 'Ph.D. IIT Kanpur', rating: 4.9, students: 15200, initials: 'AV' },
  { id: 4, name: 'Ms. Sneha Patel', subject: 'Chemistry', qualification: 'Ph.D. IIT Bombay', rating: 4.7, students: 8900, initials: 'SP' },
  { id: 5, name: 'Mr. Arjun Nair', subject: 'Programming', qualification: 'M.Tech IIT Madras', rating: 4.8, students: 15200, initials: 'AN' },
];

function Educators() {
  return (
    <Section bg="muted">
      <div className="flex items-end justify-between mb-10">
        <div>
          <Badge variant="primary" size="sm" className="mb-3">Educators</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Learn from the Best
          </h2>
        </div>
        <Link to="/teachers" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {educators.map((e, i) => (
          <FadeUp key={e.id} delay={i * 0.06}>
            <Link to={`/teachers/${e.id}`} className="group block">
              <div className="rounded-xl border border-border/60 bg-surface p-4 text-center hover:border-border hover:shadow-sm transition-all">
                <Avatar className="w-14 h-14 mx-auto mb-3 ring-2 ring-border/40 group-hover:ring-primary/20 transition-all">
                  <AvatarFallback className="bg-muted text-sm text-muted-foreground font-semibold">{e.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-sm font-semibold text-foreground mb-0.5">{e.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">{e.subject} &middot; {e.qualification}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{e.rating}</span>
                  <span>{e.students.toLocaleString()} students</span>
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

/* ──────── Testimonials ──────── */
const testimonials = [
  { id: 1, name: 'Rohan Mehta', text: 'Dr. Rajesh Kumar\'s Physics course transformed my preparation. I improved from 60% to 92% in just 4 months. The conceptual clarity is unmatched.', rating: 5, role: 'JEE Advanced Aspirant', initials: 'RM' },
  { id: 2, name: 'Ananya Gupta', text: 'The structured syllabus and regular mock tests were game-changers. I secured AIR 247 in JEE Advanced 2025. Thank you SkillBridge!', rating: 5, role: 'JEE Advanced Topper', initials: 'AG' },
  { id: 3, name: 'Priya Sharma', text: 'NEET Biology masterclass by Dr. Priya Sharma is incredible. She makes complex topics easy to understand. Scored 360/360 in Biology.', rating: 5, role: 'NEET UG Aspirant', initials: 'PS' },
  { id: 4, name: 'Vikram Reddy', text: 'The personalized feedback and doubt resolution is what sets SkillBridge apart. My score improved by 35 marks after joining.', rating: 5, role: 'JEE Main Student', initials: 'VR' },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <Section>
      <div className="text-center mb-10">
        <Badge variant="primary" size="sm" className="mb-3">Testimonials</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          What Our Students Say
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-xl border border-border/60 bg-surface p-8 md:p-10">
          <Quote className="w-8 h-8 text-primary/20 absolute top-6 left-6" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-base text-foreground leading-relaxed mb-6 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={cn('w-4 h-4', s <= testimonials[current].rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted')} />
                ))}
              </div>
              <p className="text-sm font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-2 mt-5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === current ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40',
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ──────── FAQ ──────── */
const faqs = [
  { q: 'How do I enroll in a course?', a: 'Simply browse our course catalog, select the course you want, and click "Enroll Now". You can pay via credit/debit card, net banking, or UPI.' },
  { q: 'Are the classes live or recorded?', a: 'We offer both! Most courses include live interactive sessions with recordings available for later review.' },
  { q: 'Can I switch courses after enrollment?', a: 'Yes, you can switch to a different course within 7 days of enrollment. Contact our support team for assistance.' },
  { q: 'Do you offer refunds?', a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your full fee.' },
  { q: 'Is there a mobile app?', a: 'Yes, our mobile app is available on iOS and Android. You can learn anytime, anywhere.' },
];

function FAQ() {
  return (
    <Section bg="muted">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="primary" size="sm" className="mb-3">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-lg border border-border/60 bg-surface px-5">
              <AccordionTrigger className="text-sm font-medium text-foreground">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

/* ──────── CTA ──────── */
function CTA() {
  return (
    <Section>
      <div className="relative rounded-xl bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative px-8 py-12 md:px-12 md:py-16 text-center">
          <Badge variant="secondary" size="sm" className="mb-4 bg-white/15 text-white border-white/20">Get Started</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto mb-8">
            Join 50,000+ students and start learning from India&apos;s best educators today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-11 px-6 shadow-lg">
                Create Free Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 h-11 px-6">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ──────── Main ──────── */
export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Trusted />
      <HowItWorks />
      <Stats />
      <FeaturedCourses />
      <Educators />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
