import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Star, Users, BookOpen, GraduationCap, Clock, Award,
  Quote, ArrowLeft, Mail, ThumbsUp, MessageSquare, CheckCircle,
  Youtube, Instagram, ChevronRight, FileText, IndianRupee,
  Sparkles, Target, Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import Section, { staggerContainer, staggerItem } from '@/components/shared/Section';
import { cn } from '@/lib/utils';

const teacherData = {
  id: 1,
  name: 'Dr. Rajesh Kumar',
  qualification: 'Ph.D. Physics, IIT Delhi',
  experience: '18 years',
  subject: 'Physics',
  rating: 4.9,
  students: 12500,
  reviewCount: 1240,
  courses: 8,
  category: 'JEE Advanced',
  initials: 'RK',
  bio: `Dr. Rajesh Kumar is a distinguished Physics educator with 18 years of teaching experience. He completed his Ph.D. in Physics from IIT Delhi and has served as a faculty member at IIT Delhi for over a decade. Known for his exceptional ability to simplify complex Physics concepts, he has guided thousands of students to secure top ranks in JEE Advanced, JEE Main, and NEET exams.

His teaching methodology focuses on building strong conceptual foundations followed by advanced problem-solving techniques. He has authored multiple best-selling Physics books for competitive exams and has been recognized with the "Best Educator Award" by the Ministry of Education for three consecutive years.

Dr. Kumar believes that Physics is not just about formulas and calculations — it is about understanding the fundamental principles that govern the universe. His classes are known for being engaging, interactive, and highly effective.`,
  achievements: [
    'Best Educator Award — Ministry of Education (2023, 2024, 2025)',
    'Ph.D. in Physics from IIT Delhi',
    'Former Assistant Professor at IIT Delhi',
    'Author of 5 best-selling Physics books for JEE & NEET',
    'Guided 50+ students to AIR under 100 in JEE Advanced',
    'Featured in Times of India "Top 10 Educators of India"',
    'Gold Medalist — IIT Delhi Physics Olympiad',
  ],
  specialization: ['Mechanics', 'Electrodynamics', 'Quantum Physics', 'Optics', 'Thermodynamics', 'Mathematical Physics'],
  social: { youtube: 'https://youtube.com/@skillbridge', instagram: 'https://instagram.com/skillbridge', twitter: 'https://twitter.com/skillbridge' },
  coursesTaught: [
    { id: 1, slug: 'jee-advanced-physics-2026', title: 'JEE Advanced 2026: Complete Physics', category: 'JEE Advanced', rating: 4.8, price: 14999, enrolled: 8450, gradient: 'from-blue-500 to-cyan-500' },
    { id: 8, slug: 'neet-physics', title: 'NEET UG: Physics Fundamentals', category: 'NEET UG', rating: 4.6, price: 8999, enrolled: 6300, gradient: 'from-green-500 to-emerald-500' },
    { id: 11, slug: 'jee-main-physics', title: 'JEE Main: Physics Crash Course', category: 'JEE Main', rating: 4.6, price: 6999, enrolled: 7400, gradient: 'from-purple-500 to-violet-500' },
  ],
  reviewsList: [
    { id: 1, name: 'Rohan Mehta', rating: 5, date: 'Mar 15, 2026', text: 'Dr. Rajesh Kumar is the best Physics teacher I have ever had. His conceptual clarity and problem-solving techniques are unmatched. I improved from 40% to 92% in Physics in just 4 months.', initials: 'RM' },
    { id: 2, name: 'Ananya Gupta', rating: 5, date: 'Feb 20, 2026', text: 'The way he explains complex topics like Electrodynamics and Quantum Mechanics is incredible. He makes Physics feel like a story rather than a subject. Highly recommended!', initials: 'AG' },
    { id: 3, name: 'Vikram Singh', rating: 4, date: 'Jan 12, 2026', text: 'Excellent teacher with deep knowledge. His study material and practice problems are very comprehensive. The only suggestion would be to include more numerical practice sessions.', initials: 'VS' },
    { id: 4, name: 'Priya Sharma', rating: 5, date: 'Dec 28, 2025', text: 'Dr. Kumar has a gift for teaching. He breaks down the most complex concepts into simple, digestible parts. My Physics score improved by 35 marks after joining his course.', initials: 'PS' },
  ],
};

function RatingStars({ rating, size = 'sm' }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
            star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted',
          )}
        />
      ))}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, className }) {
  return (
    <div className={cn('card-premium rounded-2xl p-5 text-center', className)}>
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary/20">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-2xl md:text-3xl font-bold text-card-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function TeacherDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-6 w-48 mb-8 rounded-lg" />
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <Skeleton className="w-32 h-32 rounded-full shrink-0" />
          <div className="flex-1 w-full space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  const teacher = teacherData;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.04] via-background to-accent/[0.03] pt-8 pb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/teachers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Teachers
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
          >
            <div className="relative shrink-0">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-4xl md:text-5xl font-bold">
                  {teacher.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-amber-400 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                {teacher.rating}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3 rounded-lg">
                {teacher.subject}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-2">
                {teacher.name}
              </h1>
              <p className="text-base text-muted-foreground mb-4">{teacher.qualification}</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <RatingStars rating={teacher.rating} size="default" />
                  <span className="text-sm font-semibold text-foreground">{teacher.rating}</span>
                  <span className="text-sm text-muted-foreground">({teacher.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  {teacher.students.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  {teacher.experience}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {teacher.courses} courses
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl gap-2" onClick={() => toast.success('Message feature coming soon')}>
                  <Mail className="w-4 h-4" />
                  Contact Teacher
                </Button>
                <div className="flex items-center gap-2">
                  <a href={teacher.social.youtube} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-red-500 hover:text-white transition-all" aria-label="YouTube">
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a href={teacher.social.instagram} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-pink-500 hover:text-white transition-all" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <Section className="!py-10 -mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard icon={Users} label="Total Students" value={`${(teacher.students / 1000).toFixed(1)}K+`} />
            <StatCard icon={BookOpen} label="Courses Created" value={teacher.courses} />
            <StatCard icon={GraduationCap} label="Years Experience" value={teacher.experience.split(' ')[0]} />
            <StatCard icon={Award} label="Overall Rating" value={`${teacher.rating}`} />
          </motion.div>
        </div>
      </Section>

      {/* Bio & Achievements */}
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />
                  About {teacher.name}
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-3 whitespace-pre-line">
                  {teacher.bio}
                </div>
              </motion.div>

              <Separator />

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Achievements & Recognition
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {teacher.achievements.map((achievement) => (
                    <div key={achievement} className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                      <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <Separator />

              {/* Specialization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Specialization & Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {teacher.specialization.map((spec) => (
                    <Badge key={spec} variant="secondary" className="px-4 py-2 rounded-xl text-sm">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="lg:sticky lg:top-24 space-y-6">
                <Card className="rounded-2xl border-2">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-card-foreground mb-4">Quick Info</h3>
                    <div className="space-y-4">
                      {[
                        { icon: Users, label: 'Total Students', value: `${teacher.students.toLocaleString()}+` },
                        { icon: BookOpen, label: 'Courses Created', value: teacher.courses },
                        { icon: GraduationCap, label: 'Experience', value: teacher.experience },
                        { icon: Award, label: 'Rating', value: `${teacher.rating}/5.0` },
                        { icon: Target, label: 'Category', value: teacher.category },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <item.icon className="w-4 h-4 text-primary" />
                            {item.label}
                          </span>
                          <span className="font-medium text-card-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border p-5 text-center">
                  <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold text-foreground">Available for</p>
                  <p className="text-xs text-muted-foreground">Live courses, Mentorship &amp; Workshops</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Courses */}
      <Section bg="muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Courses by {teacher.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">Explore all courses taught by this educator</p>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="rounded-xl gap-1.5">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {teacher.coursesTaught.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No courses available yet.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {teacher.coursesTaught.map((course) => (
                <motion.div key={course.id} variants={staggerItem}>
                  <Link to={`/courses/${course.slug}`} className="block group h-full">
                    <div className="card-premium card-hover-premium h-full overflow-hidden rounded-2xl">
                      <div className={cn('h-32 bg-gradient-to-br relative', course.gradient)}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white border-white/20">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors truncate-2 mb-3">
                          {course.title}
                        </h3>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <RatingStars rating={course.rating} />
                            <span className="text-xs text-muted-foreground">{course.rating}</span>
                          </div>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3.5 h-3.5" />
                            {course.enrolled.toLocaleString()}
                          </span>
                        </div>
                        <Separator className="mb-3" />
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-card-foreground">
                            <IndianRupee className="w-3.5 h-3.5 inline mr-0.5" />
                            {course.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-primary font-medium group-hover:underline">
                            View Course &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Section>

      {/* Reviews */}
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            What Students Say
          </h2>
          <div className="max-w-3xl space-y-4">
            {teacher.reviewsList.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-premium rounded-2xl p-6"
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
                <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
