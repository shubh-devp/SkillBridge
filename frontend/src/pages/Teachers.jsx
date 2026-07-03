import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Star, Users, BookOpen, GraduationCap,
  ChevronRight, Youtube, Instagram, Quote, Award,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/shared/PageHeader';
import Section, { staggerContainer, staggerItem } from '@/components/shared/Section';
import { cn } from '@/lib/utils';

const allTeachers = [
  { id: 1, name: 'Dr. Rajesh Kumar', qualification: 'Ph.D. Physics, IIT Delhi', experience: '18 years', subject: 'Physics', rating: 4.9, students: 12500, courses: 8, category: 'JEE Advanced', initials: 'RK', bio: 'Former faculty at IIT Delhi with expertise in JEE Advanced Physics. Known for conceptual clarity and advanced problem-solving techniques.', youtube: '#', instagram: '#' },
  { id: 2, name: 'Dr. Priya Sharma', qualification: 'M.D. Biology, AIIMS Delhi', experience: '15 years', subject: 'Biology', rating: 4.8, students: 10800, courses: 6, category: 'NEET UG', initials: 'PS', bio: 'Gold medalist from AIIMS Delhi with 15+ years of teaching experience. Specializes in NEET Biology and Medical Entrance preparation.', youtube: '#', instagram: '#' },
  { id: 3, name: 'Prof. Amit Verma', qualification: 'Ph.D. Mathematics, IIT Kanpur', experience: '20 years', subject: 'Mathematics', rating: 4.9, students: 15200, courses: 10, category: 'JEE Main', initials: 'AV', bio: 'Mathematics veteran with 20 years of experience. Has guided thousands of students to top ranks in JEE Main and Advanced.', youtube: '#', instagram: '#' },
  { id: 4, name: 'Ms. Sneha Patel', qualification: 'Ph.D. Chemistry, IIT Bombay', experience: '12 years', subject: 'Chemistry', rating: 4.7, students: 8900, courses: 5, category: 'CBSE', initials: 'SP', bio: 'Chemistry expert from IIT Bombay. Known for making organic chemistry easy and enjoyable for students.', youtube: '#', instagram: '#' },
  { id: 5, name: 'Mr. Arjun Nair', qualification: 'M.Tech CSE, IIT Madras', experience: '10 years', subject: 'Programming', rating: 4.8, students: 15200, courses: 7, category: 'Programming', initials: 'AN', bio: 'Full-stack developer and educator with industry experience at top tech firms. Teaches Python, DSA, and Web Development.', youtube: '#', instagram: '#' },
  { id: 6, name: 'Ms. Neha Kapoor', qualification: 'MA Psychology, DU', experience: '8 years', subject: 'Skill Development', rating: 4.5, students: 9800, courses: 4, category: 'Skill Dev', initials: 'NK', bio: 'Certified soft skills trainer and career coach. Helps students develop communication, leadership, and personality skills.', youtube: '#', instagram: '#' },
  { id: 7, name: 'Dr. Suresh Reddy', qualification: 'Ph.D. Physics, IIT Madras', experience: '16 years', subject: 'Physics', rating: 4.7, students: 9200, courses: 6, category: 'NEET UG', initials: 'SR', bio: 'Physics expert specializing in NEET and medical entrance exam preparation. Known for simplifying complex concepts.', youtube: '#', instagram: '#' },
  { id: 8, name: 'Prof. Anjali Desai', qualification: 'Ph.D. Mathematics, IIT Bombay', experience: '14 years', subject: 'Mathematics', rating: 4.6, students: 7800, courses: 5, category: 'CBSE', initials: 'AD', bio: 'Mathematics educator with a passion for making math accessible to all students. Expert in CBSE curriculum.', youtube: '#', instagram: '#' },
  { id: 9, name: 'Dr. Vikram Joshi', qualification: 'Ph.D. Physics, IIT Roorkee', experience: '12 years', subject: 'Physics', rating: 4.8, students: 6800, courses: 4, category: 'JEE Advanced', initials: 'VJ', bio: 'Known for innovative teaching methods and interactive learning. Specializes in Electrodynamics and Modern Physics.', youtube: '#', instagram: '#' },
  { id: 10, name: 'Ms. Ritu Agarwal', qualification: 'M.Sc. Chemistry, DU', experience: '9 years', subject: 'Chemistry', rating: 4.6, students: 5400, courses: 3, category: 'CBSE', initials: 'RA', bio: 'Chemistry educator with a focus on conceptual understanding. Expert in making Inorganic Chemistry easy to remember.', youtube: '#', instagram: '#' },
];

const subjects = ['All Subjects', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Programming', 'Skill Development'];

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'w-3.5 h-3.5',
            star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted',
          )}
        />
      ))}
    </div>
  );
}

function TeacherSkeleton() {
  return (
    <div className="card-premium rounded-2xl overflow-hidden">
      <div className="p-6 text-center">
        <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
        <Skeleton className="h-5 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-24 mx-auto mb-1" />
        <Skeleton className="h-4 w-28 mx-auto mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mx-auto mb-4" />
        <div className="flex items-center justify-center gap-2 mb-4">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function Teachers() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const filteredTeachers = allTeachers.filter((teacher) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || teacher.name.toLowerCase().includes(q) || teacher.subject.toLowerCase().includes(q) || teacher.qualification.toLowerCase().includes(q);
    const matchesSubject = selectedSubject === 'All Subjects' || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen">
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            Our Expert Teachers
            <Sparkles className="w-6 h-6 text-accent" />
          </span>
        }
        subtitle="Learn from India's finest educators from IITs, NITs, AIIMS, and other premier institutions"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Teachers' },
        ]}
      />

      <Section className="pt-0 -mt-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search teachers by name, subject, or qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card border-muted focus-visible:border-primary/30 rounded-xl"
            />
          </div>
        </div>

        {/* Subject Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border shrink-0',
                selectedSubject === subject
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card text-muted-foreground border-muted hover:border-primary/30 hover:text-foreground',
              )}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing <span className="font-medium text-foreground">{filteredTeachers.length}</span> teacher{filteredTeachers.length !== 1 ? 's' : ''}
        </p>

        {/* Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <TeacherSkeleton key={i} />
            ))}
          </div>
        ) : filteredTeachers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
              <GraduationCap className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No teachers found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any teachers matching your criteria. Try adjusting your search or filter.
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedSubject('All Subjects'); }} className="rounded-xl">
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredTeachers.map((teacher) => (
              <motion.div key={teacher.id} variants={staggerItem}>
                <div className="card-premium card-hover-premium rounded-2xl overflow-hidden h-full">
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    <div className="relative mb-4">
                      <Avatar className="w-20 h-20 ring-4 ring-primary/20">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold">
                          {teacher.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-background flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-card-foreground mb-1">{teacher.name}</h3>
                    <p className="text-xs text-primary font-medium mb-2">{teacher.qualification}</p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {teacher.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {teacher.courses} courses
                      </span>
                    </div>

                    <Badge variant="secondary" className="mb-3 rounded-lg">
                      {teacher.subject}
                    </Badge>

                    <p className="text-xs text-muted-foreground leading-relaxed truncate-2 mb-4 flex-1">
                      {teacher.bio}
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1.5">
                        <RatingStars rating={teacher.rating} />
                        <span className="text-xs font-medium text-card-foreground">{teacher.rating}</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        {teacher.students.toLocaleString()}
                      </span>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2 mb-4">
                      <a href={teacher.youtube} aria-label="YouTube" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-red-500 hover:text-white transition-all">
                        <Youtube className="w-4 h-4" />
                      </a>
                      <a href={teacher.instagram} aria-label="Instagram" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-pink-500 hover:text-white transition-all">
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>

                    <Link to={`/teachers/${teacher.id}`} className="w-full mt-auto">
                      <Button variant="outline" className="w-full rounded-xl group border-2">
                        View Profile
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Section>
    </div>
  );
}
