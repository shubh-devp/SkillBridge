import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  BookOpen, Star, Users, Clock, PlayCircle, CheckCircle,
  ChevronDown, Heart, Share2, BookMarked, Monitor,
  Languages, GraduationCap, Award, Download,
  MessageSquare, ThumbsUp, ArrowLeft, Shield,
  ChevronRight, FileText, IndianRupee, Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion';
import Section, { staggerContainer, staggerItem } from '@/components/shared/Section';
import { cn } from '@/lib/utils';

const courseData = {
  slug: 'jee-advanced-physics-2026',
  title: 'JEE Advanced 2026: Complete Physics',
  category: 'JEE Advanced',
  rating: 4.8,
  reviewCount: 1240,
  enrolled: 8450,
  lastUpdated: 'Apr 2026',
  teacher: {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    qualification: 'Ph.D. Physics, IIT Delhi',
    experience: '18 years',
    rating: 4.9,
    students: 12500,
    initials: 'RK',
    bio: 'Former faculty at IIT Delhi with 18 years of teaching experience. Specializes in Physics for JEE Advanced and NEET.',
  },
  originalPrice: 29999,
  price: 14999,
  description: `This comprehensive Physics course is designed specifically for JEE Advanced 2026 aspirants. Covering the entire Physics syllabus with in-depth conceptual explanations, advanced problem-solving techniques, and extensive practice material.

The course follows a structured approach with weekly live classes, doubt sessions, and mock tests to ensure thorough preparation. Key topics include Mechanics, Electrodynamics, Thermodynamics, Optics, Modern Physics, and more.

Each chapter is accompanied by detailed study notes, practice problems, and previous year question analysis. By the end of this course, you will have mastered every concept required to excel in JEE Advanced Physics.`,
  whatYoullLearn: [
    'Master the entire JEE Advanced Physics syllabus with conceptual clarity',
    'Solve complex numerical problems with advanced techniques and shortcuts',
    'Analyze and solve previous year JEE Advanced questions effectively',
    'Build strong fundamentals in Mechanics, Electrodynamics, and Modern Physics',
    'Develop time management skills and exam strategy for JEE Advanced',
    'Gain confidence through regular mock tests and performance analysis',
    'Understand derivations and their applications in problem-solving',
    'Master graphical analysis and data interpretation for Physics',
  ],
  prerequisites: [
    'Basic understanding of Class 11 and 12 Physics concepts',
    'Proficiency in Mathematics up to Class 12 level',
    'Strong foundation in Calculus and Vectors',
    'Willingness to practice regularly and solve problems',
  ],
  details: {
    duration: '12 Months',
    lectures: 240,
    language: 'Hindi + English',
    mode: 'Live Online',
    level: 'Advanced',
    certificate: true,
    mockTests: 25,
    studyMaterial: 'PDF Notes + Practice Books',
  },
  includes: [
    { icon: PlayCircle, label: '240+ live interactive lectures' },
    { icon: Clock, label: '12 months full course access' },
    { icon: Download, label: 'Downloadable PDF study material' },
    { icon: Award, label: 'Certificate of completion' },
    { icon: MessageSquare, label: '24/7 doubt resolution support' },
    { icon: BookMarked, label: '25 full-length mock tests' },
    { icon: Users, label: 'Dedicated mentorship & guidance' },
    { icon: Shield, label: '30-day money-back guarantee' },
  ],
  syllabus: [
    { week: 1, title: 'Mathematical Tools & Vectors', topics: ['Basic Mathematics for Physics', 'Vectors and Scalars', 'Differentiation & Integration', 'Applications in Physics Problems'], duration: '5 lectures' },
    { week: 2, title: 'Kinematics', topics: ['Motion in 1 Dimension', 'Motion in 2 Dimensions', 'Projectile Motion', 'Relative Motion & River Problems'], duration: '6 lectures' },
    { week: 3, title: 'Laws of Motion', topics: ["Newton's Laws of Motion", 'Friction & Its Applications', 'Circular Motion Dynamics', 'Dynamics of Systems of Particles'], duration: '5 lectures' },
    { week: 4, title: 'Work, Energy & Power', topics: ['Work Done by Various Forces', 'Kinetic & Potential Energy', 'Conservation of Energy', 'Power & Collisions'], duration: '4 lectures' },
    { week: 5, title: 'Rotational Motion', topics: ['Center of Mass', 'Torque & Angular Momentum', 'Moment of Inertia Calculations', 'Rolling Motion'], duration: '6 lectures' },
    { week: 6, title: 'Gravitation', topics: ["Newton's Law of Gravitation", 'Gravitational Potential & Field', "Kepler's Laws of Planetary Motion", 'Satellites & Escape Velocity'], duration: '4 lectures' },
    { week: 7, title: 'Mechanics of Solids & Fluids', topics: ['Elasticity & Hooke\'s Law', 'Fluid Pressure & Buoyancy', 'Bernoulli\'s Principle', 'Viscosity & Surface Tension'], duration: '5 lectures' },
    { week: 8, title: 'Thermodynamics', topics: ['Thermal Expansion of Solids/Liquids/Gases', 'Calorimetry & Heat Transfer', 'Laws of Thermodynamics', 'Kinetic Theory of Gases'], duration: '6 lectures' },
    { week: 9, title: 'Oscillations & Waves', topics: ['Simple Harmonic Motion', 'Damped & Forced Oscillations', 'Wave Motion & Superposition', 'Sound Waves & Doppler Effect'], duration: '5 lectures' },
    { week: 10, title: 'Electrostatics', topics: ['Electric Charge & Coulomb\'s Law', 'Gauss Law & Applications', 'Electric Potential & Potential Energy', 'Capacitors & Dielectrics'], duration: '6 lectures' },
    { week: 11, title: 'Current Electricity', topics: ['Ohm\'s Law & Resistance', 'Kirchhoff\'s Laws & Circuits', 'Electrical Measuring Instruments', 'Heating & Chemical Effects'], duration: '5 lectures' },
    { week: 12, title: 'Magnetism & EMI', topics: ['Magnetic Field & Lorentz Force', 'Biot-Savart & Ampere\'s Laws', 'Electromagnetic Induction', 'AC Circuits & Transformers'], duration: '6 lectures' },
    { week: 13, title: 'Optics', topics: ['Ray Optics & Reflection/Refraction', 'Lenses & Optical Instruments', 'Wave Optics & Interference', 'Diffraction & Polarization'], duration: '6 lectures' },
    { week: 14, title: 'Modern Physics', topics: ['Dual Nature of Radiation & Matter', 'Atomic Models & Spectra', 'Nuclear Physics & Radioactivity', 'Semiconductor Devices'], duration: '6 lectures' },
    { week: 15, title: 'Revision & Mock Tests', topics: ['Full Syllabus Revision', 'Mock Test Series (5 tests)', 'Doubt Clearing Sessions', 'Exam Strategy & Time Management'], duration: '8 lectures' },
  ],
  reviewsList: [
    { id: 1, name: 'Rohan Mehta', rating: 5, date: 'Mar 15, 2026', comment: 'Dr. Rajesh Kumar is an exceptional teacher. His conceptual approach to Physics made even the toughest topics easy to understand. The problem-solving techniques he teaches are incredibly effective. I improved my Physics score from 60% to 92% in just 4 months.', initials: 'RM' },
    { id: 2, name: 'Sneha Gupta', rating: 5, date: 'Mar 10, 2026', comment: 'The structured syllabus coverage and regular mock tests are game-changers. The study material is comprehensive and the doubt sessions are very helpful. Highly recommended for serious JEE aspirants.', initials: 'SG' },
    { id: 3, name: 'Arjun Patel', rating: 4, date: 'Feb 28, 2026', comment: 'Great course overall. The electromagnetism coverage is particularly excellent. Would love to see more practice problems for optics. But definitely worth the investment for anyone targeting JEE Advanced.', initials: 'AP' },
    { id: 4, name: 'Priya Singh', rating: 5, date: 'Feb 20, 2026', comment: 'Joined this course 6 months ago and my Physics has completely transformed. The live classes are interactive and engaging. The teacher ensures every student understands before moving on.', initials: 'PS' },
    { id: 5, name: 'Vikram Reddy', rating: 5, date: 'Feb 15, 2026', comment: 'The mock test analysis is incredibly detailed. It helped me identify my weak areas and work on them systematically. Secured 180+ in my last JEE Advanced mock test.', initials: 'VR' },
    { id: 6, name: 'Ananya Gupta', rating: 4, date: 'Feb 5, 2026', comment: 'Excellent course with great teaching methodology. The weekly quizzes keep you on track. Would appreciate more numerical practice sessions.', initials: 'AG' },
  ],
};

const relatedCourses = [
  { id: 1, slug: 'jee-advanced-chemistry', title: 'JEE Advanced: Organic Chemistry', teacher: 'Ms. Sneha Patel', teacherInitials: 'SP', rating: 4.7, price: 11999, enrolled: 5100, category: 'JEE Advanced', gradient: 'from-teal-500 to-cyan-500' },
  { id: 2, slug: 'jee-main-mathematics-intensive', title: 'JEE Main 2026: Mathematics Intensive', teacher: 'Prof. Amit Verma', teacherInitials: 'AV', rating: 4.7, price: 9999, enrolled: 12300, category: 'JEE Main', gradient: 'from-purple-500 to-violet-500' },
  { id: 3, slug: 'neet-physics', title: 'NEET UG: Physics Fundamentals', teacher: 'Dr. Rajesh Kumar', teacherInitials: 'RK', rating: 4.6, price: 8999, enrolled: 6300, category: 'NEET UG', gradient: 'from-blue-500 to-indigo-500' },
];

function RatingStars({ rating, size = 'sm', showNumber = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
            star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : star === Math.ceil(rating) && rating % 1 >= 0.5 ? 'fill-amber-400/50 text-amber-400/50' : 'fill-muted text-muted',
          )}
        />
      ))}
      {showNumber && <span className="ml-1.5 text-sm font-medium text-foreground">{rating}</span>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, className }) {
  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-xl bg-card border', className)}>
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-card-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function CourseDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug]);

  const tabIds = ['overview', 'syllabus', 'reviews', 'faq'];
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = tabIds.map((id) => document.getElementById(`section-${id}`));
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActiveSection(tabIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-6 w-48 mb-6 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <Skeleton className="h-10 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-1/3 rounded-lg" />
            <Skeleton className="h-5 w-1/2 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-5/6 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
          <div>
            <Skeleton className="h-[500px] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const course = courseData;
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.04] via-background to-accent/[0.03] pt-8 pb-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
          >
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
            <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-medium">{course.title}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pb-8">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-3 py-1">
                  {course.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
                  {course.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5">
                    <RatingStars rating={course.rating} size="default" />
                    <span className="text-sm font-semibold text-foreground">{course.rating}</span>
                    <span className="text-sm text-muted-foreground">({course.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    {course.enrolled.toLocaleString()} enrolled
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4 text-primary" />
                    Updated {course.lastUpdated}
                  </span>
                </div>

                {/* Teacher Info */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border mb-5">
                  <Avatar className="w-14 h-14 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold text-lg">
                      {course.teacher.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link to={`/teachers/${course.teacher.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                        {course.teacher.name}
                      </Link>
                      <Badge variant="secondary" className="text-[10px] py-0 px-2 h-5">
                        {course.teacher.rating} <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 ml-0.5" />
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{course.teacher.qualification}</p>
                  </div>
                  <Link to={`/teachers/${course.teacher.id}`}>
                    <Button variant="ghost" size="sm" className="text-primary gap-1">
                      View Profile
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>

                {/* Course Preview Image */}
                <button onClick={() => toast.success('Opening course preview...')} className="relative h-56 md:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border w-full text-left">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.06] via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-primary/20">
                        <PlayCircle className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-foreground">Course Preview</p>
                      <p className="text-xs text-muted-foreground">Watch introduction video</p>
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Sticky Sidebar */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="lg:sticky lg:top-24"
              >
                <Card className="border-2 shadow-xl shadow-primary/5 rounded-2xl overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2.5 mb-1">
                        <span className="text-3xl font-bold text-foreground">
                          <IndianRupee className="w-5 h-5 inline mr-0.5" />
                          {course.price.toLocaleString()}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          <IndianRupee className="w-3.5 h-3.5 inline mr-0.5" />
                          {course.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <Badge className="bg-accent text-white border-0 font-semibold mt-1">
                        Save ₹{(course.originalPrice - course.price).toLocaleString()} ({discount}% OFF)
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <Button size="lg" className="w-full h-13 bg-primary hover:bg-primary/90 text-white text-base font-semibold shadow-lg shadow-primary/30 rounded-xl"
                        onClick={() => { toast.success('Enrolled successfully! Redirecting...'); navigate('/dashboard/student/courses'); }}>
                        <GraduationCap className="w-5 h-5 mr-2" />
                        Enroll Now
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full h-12 rounded-xl border-2"
                        onClick={() => { setAddedToWishlist(!addedToWishlist); toast.success(addedToWishlist ? 'Removed from wishlist' : 'Added to wishlist'); }}
                      >
                        <Heart className={cn('w-4 h-4 mr-2', addedToWishlist ? 'fill-red-500 text-red-500' : '')} />
                        {addedToWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
                      </Button>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-3.5">
                      <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        This course includes:
                      </p>
                      {course.includes.map((item) => (
                        <div key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <item.icon className="w-4 h-4 text-primary shrink-0" />
                          {item.label}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                      <Shield className="w-5 h-5 text-primary mx-auto mb-1.5" />
                      <p className="text-xs font-medium text-foreground">30-Day Money-Back Guarantee</p>
                      <p className="text-[11px] text-muted-foreground">Full refund if not satisfied</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content with Floating TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Floating TOC - Desktop only */}
          <aside className="hidden xl:block w-56 shrink-0">
            <div className="sticky top-24 pt-8">
              <nav className="space-y-1 border-l-2 border-muted pl-4">
                {tabIds.map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id);
                      document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={cn(
                      'block w-full text-left text-sm py-1.5 transition-all capitalize',
                      activeSection === id
                        ? 'text-primary font-medium -ml-[calc(1rem+1px)] border-l-2 border-primary pl-[calc(1rem-2px)]'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {id}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 pt-8 pb-16">
            {/* Tabbed Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start h-auto p-1 bg-muted/60 rounded-xl mb-8 overflow-x-auto flex-nowrap gap-1">
                <TabsTrigger value="overview" className="px-5 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg">Overview</TabsTrigger>
                <TabsTrigger value="syllabus" className="px-5 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg">Syllabus</TabsTrigger>
                <TabsTrigger value="reviews" className="px-5 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg">Reviews ({course.reviewsList.length})</TabsTrigger>
                <TabsTrigger value="faq" className="px-5 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg">FAQ</TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" id="section-overview">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">About This Course</h2>
                    <div className="text-muted-foreground leading-relaxed space-y-4 whitespace-pre-line">
                      {course.description}
                    </div>
                  </div>

                  <Separator />

                  {/* What You'll Learn */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">What You'll Learn</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.whatYoullLearn.map((item) => (
                        <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Prerequisites */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Prerequisites</h2>
                    <ul className="space-y-2">
                      {course.prerequisites.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Course Details Grid */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">Course Details</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      <StatCard icon={Clock} label="Duration" value={course.details.duration} />
                      <StatCard icon={PlayCircle} label="Lectures" value={`${course.details.lectures} lectures`} />
                      <StatCard icon={Languages} label="Language" value={course.details.language} />
                      <StatCard icon={Monitor} label="Mode" value={course.details.mode} />
                      <StatCard icon={Award} label="Level" value={course.details.level} />
                      <StatCard icon={BookMarked} label="Study Material" value={course.details.studyMaterial} />
                      <StatCard icon={Award} label="Certificate" value={course.details.certificate ? 'Yes' : 'No'} />
                      <StatCard icon={FileText} label="Mock Tests" value={`${course.details.mockTests} tests`} />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Syllabus */}
              <TabsContent value="syllabus" id="section-syllabus">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Course Syllabus</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.syllabus.length} weeks &middot; {course.details.lectures} lectures &middot; {course.syllabus.reduce((a, w) => a + w.topics.length, 0)} topics
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{course.details.duration}</Badge>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {course.syllabus.map((week) => (
                      <AccordionItem
                        key={week.week}
                        value={`week-${week.week}`}
                        className="card-premium border-0 rounded-xl overflow-hidden"
                      >
                        <AccordionTrigger className="px-5 py-4 text-foreground font-medium hover:no-underline">
                          <div className="flex items-center gap-4 text-left">
                            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white text-sm font-bold shrink-0 shadow-lg shadow-primary/20">
                              {week.week}
                            </span>
                            <div>
                              <span className="text-sm font-semibold">Week {week.week}: {week.title}</span>
                              <span className="block text-xs text-muted-foreground font-normal mt-0.5">
                                {week.duration} &middot; {week.topics.length} topics
                              </span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-4">
                          <div className="ml-[52px] space-y-2 pt-2">
                            {week.topics.map((topic) => (
                              <div key={topic} className="flex items-center gap-3 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-primary/60 shrink-0" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" id="section-reviews">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col sm:flex-row gap-6 mb-8 p-6 rounded-2xl bg-card border">
                    {/* Average Rating */}
                    <div className="text-center sm:w-40 shrink-0">
                      <p className="text-5xl font-bold text-foreground">{course.rating}</p>
                      <RatingStars rating={course.rating} size="default" />
                      <p className="text-xs text-muted-foreground mt-1.5">{course.reviewCount.toLocaleString()} reviews</p>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = course.reviewsList.filter((r) => Math.floor(r.rating) === star).length;
                        const percentage = (count / course.reviewsList.length) * 100;
                        return (
                          <div key={star} className="flex items-center gap-2.5 text-sm">
                            <span className="w-10 text-xs text-muted-foreground shrink-0">{star} star</span>
                            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-amber-400 rounded-full"
                              />
                            </div>
                            <span className="w-6 text-xs text-muted-foreground text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Cards */}
                  <div className="space-y-4">
                    {course.reviewsList.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border bg-card p-6"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-semibold">
                                {review.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm text-card-foreground">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <RatingStars rating={review.rating} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t">
                          <button onClick={() => toast.success('Marked as helpful')} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            Helpful
                          </button>
                          <button onClick={() => toast.success('Reply feature coming soon')} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <MessageSquare className="w-3.5 h-3.5" />
                            Reply
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* FAQ */}
              <TabsContent value="faq" id="section-faq">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {[
                      { q: 'Is this course suitable for beginners?', a: 'This course is designed for JEE Advanced aspirants who have completed their Class 11 syllabus. While we start with fundamentals, we quickly progress to advanced topics. Beginners may need to put in extra effort in the initial weeks.' },
                      { q: 'What is the class schedule like?', a: 'Live classes are held 5 days a week (Mon-Fri) with weekend doubt sessions. Each live class is approximately 2 hours long. Recordings are available for all sessions.' },
                      { q: 'Do I get study material?', a: 'Yes, you get comprehensive PDF study notes, practice problem sets, and previous year question banks for each chapter.' },
                      { q: 'Is there a money-back guarantee?', a: 'We offer a 30-day full money-back guarantee. If you are not satisfied with the course within the first 30 days, we will refund your entire fee.' },
                      { q: 'Can I access the course on mobile?', a: 'Yes, our platform is fully responsive and works on all devices including smartphones and tablets. You can also download recorded lectures for offline viewing.' },
                      { q: 'How are doubts handled?', a: 'We have a dedicated 24/7 doubt resolution system. You can post your doubts in the discussion forum, and our teaching assistants will respond within 2 hours.' },
                    ].map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="card-premium border-0 rounded-xl overflow-hidden">
                        <AccordionTrigger className="px-5 py-4 text-foreground font-medium hover:no-underline text-sm">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right empty area for balance */}
          <div className="hidden xl:block w-56 shrink-0" />
        </div>
      </div>

      {/* Related Courses */}
      <Section bg="muted" className="!py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Related Courses</h2>
              <p className="text-muted-foreground text-sm mt-1">Continue your learning journey</p>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="rounded-xl gap-1.5">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {relatedCourses.map((rc) => (
              <motion.div key={rc.id} variants={staggerItem}>
                <Link to={`/courses/${rc.slug}`} className="block group h-full">
                  <div className="card-premium card-hover-premium h-full overflow-hidden rounded-2xl">
                    <div className={cn('h-32 bg-gradient-to-br relative', rc.gradient)}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <GraduationCap className="absolute bottom-3 left-3 w-8 h-8 text-white/40" />
                      <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white border-white/20">
                        {rc.category}
                      </Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors truncate-2 mb-2">
                        {rc.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-[8px] font-bold bg-primary/10 text-primary">
                            {rc.teacherInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{rc.teacher}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <RatingStars rating={rc.rating} />
                          <span className="text-xs text-muted-foreground">{rc.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          {rc.enrolled.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <span className="font-bold text-card-foreground">
                          <IndianRupee className="w-3 h-3 inline mr-0.5" />
                          {rc.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-primary font-medium group-hover:underline">View Course</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
