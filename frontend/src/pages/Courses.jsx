import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, Star, Users, BookOpen, Clock, GraduationCap, Filter,
  ArrowUpDown, ChevronLeft, ChevronRight, Eye, SlidersHorizontal,
  IndianRupee, Sparkles, PlayCircle, Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PageHeader from '@/components/shared/PageHeader';
import Section, { staggerContainer, staggerItem } from '@/components/shared/Section';
import { cn } from '@/lib/utils';

const allCourses = [
  { id: 1, slug: 'jee-advanced-physics-2026', title: 'JEE Advanced 2026: Complete Physics', teacher: 'Dr. Rajesh Kumar', teacherInitials: 'RK', category: 'JEE Advanced', level: 'Advanced', price: 14999, originalPrice: 29999, rating: 4.8, reviews: 1240, enrolled: 8450, duration: '12 months', lectures: 240, language: 'Hindi + English', mode: 'Live Online', gradient: 'from-blue-500 to-cyan-500' },
  { id: 2, slug: 'neet-biology-masterclass', title: 'NEET UG 2026: Biology Masterclass', teacher: 'Dr. Priya Sharma', teacherInitials: 'PS', category: 'NEET UG', level: 'Advanced', price: 12999, originalPrice: 24999, rating: 4.9, reviews: 980, enrolled: 7200, duration: '10 months', lectures: 200, language: 'Hindi + English', mode: 'Live Online', gradient: 'from-green-500 to-emerald-500' },
  { id: 3, slug: 'jee-main-mathematics-intensive', title: 'JEE Main 2026: Mathematics Intensive', teacher: 'Prof. Amit Verma', teacherInitials: 'AV', category: 'JEE Main', level: 'Intermediate', price: 9999, originalPrice: 19999, rating: 4.7, reviews: 1560, enrolled: 12300, duration: '8 months', lectures: 180, language: 'Hindi', mode: 'Live Online', gradient: 'from-purple-500 to-violet-500' },
  { id: 4, slug: 'cbse-class-12-chemistry', title: 'CBSE Class 12: Chemistry Crash Course', teacher: 'Ms. Sneha Patel', teacherInitials: 'SP', category: 'CBSE', level: 'Intermediate', price: 5999, originalPrice: 11999, rating: 4.6, reviews: 890, enrolled: 5600, duration: '4 months', lectures: 80, language: 'English', mode: 'Recorded', gradient: 'from-orange-500 to-amber-500' },
  { id: 5, slug: 'python-data-science-ai', title: 'Python for Data Science & AI', teacher: 'Mr. Arjun Nair', teacherInitials: 'AN', category: 'Programming', level: 'Beginner', price: 8499, originalPrice: 16999, rating: 4.8, reviews: 2100, enrolled: 15200, duration: '6 months', lectures: 120, language: 'English', mode: 'Live Online', gradient: 'from-sky-500 to-indigo-500' },
  { id: 6, slug: 'communication-skills', title: 'Communication Skills & Personality Dev', teacher: 'Ms. Neha Kapoor', teacherInitials: 'NK', category: 'Skill Dev', level: 'Beginner', price: 3999, originalPrice: 7999, rating: 4.5, reviews: 670, enrolled: 9800, duration: '3 months', lectures: 48, language: 'Hindi + English', mode: 'Recorded', gradient: 'from-pink-500 to-rose-500' },
  { id: 7, slug: 'jee-advanced-chemistry', title: 'JEE Advanced: Organic Chemistry', teacher: 'Ms. Sneha Patel', teacherInitials: 'SP', category: 'JEE Advanced', level: 'Advanced', price: 11999, originalPrice: 22999, rating: 4.7, reviews: 720, enrolled: 5100, duration: '9 months', lectures: 160, language: 'Hindi + English', mode: 'Live Online', gradient: 'from-teal-500 to-cyan-500' },
  { id: 8, slug: 'neet-physics', title: 'NEET UG: Physics Fundamentals', teacher: 'Dr. Rajesh Kumar', teacherInitials: 'RK', category: 'NEET UG', level: 'Intermediate', price: 8999, originalPrice: 17999, rating: 4.6, reviews: 840, enrolled: 6300, duration: '7 months', lectures: 140, language: 'Hindi', mode: 'Live Online', gradient: 'from-blue-500 to-indigo-500' },
  { id: 9, slug: 'web-development-full-stack', title: 'Full Stack Web Development', teacher: 'Mr. Arjun Nair', teacherInitials: 'AN', category: 'Programming', level: 'Intermediate', price: 12999, originalPrice: 25999, rating: 4.7, reviews: 1350, enrolled: 11000, duration: '8 months', lectures: 160, language: 'English', mode: 'Live Online', gradient: 'from-amber-500 to-orange-500' },
  { id: 10, slug: 'cbse-class-10-science', title: 'CBSE Class 10: Science Bundle', teacher: 'Dr. Priya Sharma', teacherInitials: 'PS', category: 'CBSE', level: 'Beginner', price: 4999, originalPrice: 9999, rating: 4.5, reviews: 1100, enrolled: 8900, duration: '6 months', lectures: 100, language: 'Hindi + English', mode: 'Recorded', gradient: 'from-green-500 to-teal-500' },
  { id: 11, slug: 'jee-main-physics', title: 'JEE Main: Physics Crash Course', teacher: 'Dr. Rajesh Kumar', teacherInitials: 'RK', category: 'JEE Main', level: 'Intermediate', price: 6999, originalPrice: 13999, rating: 4.6, reviews: 920, enrolled: 7400, duration: '4 months', lectures: 90, language: 'Hindi', mode: 'Live Online', gradient: 'from-violet-500 to-purple-500' },
  { id: 12, slug: 'data-structures-algorithms', title: 'DSA with C++', teacher: 'Prof. Amit Verma', teacherInitials: 'AV', category: 'Programming', level: 'Advanced', price: 9999, originalPrice: 19999, rating: 4.8, reviews: 1800, enrolled: 13500, duration: '5 months', lectures: 110, language: 'English', mode: 'Live Online', gradient: 'from-red-500 to-rose-500' },
];

const categories = ['All', 'JEE Advanced', 'JEE Main', 'NEET UG', 'CBSE', 'Programming', 'Skill Dev'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹15,000', min: 10000, max: 15000 },
  { label: 'Above ₹15,000', min: 15000, max: Infinity },
];
const languages = ['All', 'Hindi', 'English', 'Hindi + English'];
const modes = ['All', 'Live Online', 'Recorded'];

const sortOptions = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
];

const ITEMS_PER_PAGE = 9;

function RatingStars({ rating, size = 'sm' }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
            star <= Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : star === Math.ceil(rating) && rating % 1 >= 0.5
                ? 'fill-amber-400/50 text-amber-400/50'
                : 'fill-muted text-muted',
          )}
        />
      ))}
    </div>
  );
}

function CourseCard({ course, index }) {
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <motion.div variants={staggerItem} className="group">
      <Link to={`/courses/${course.slug}`} className="block h-full">
        <div className="card-premium card-hover-premium h-full flex flex-col overflow-hidden rounded-2xl">
          <div className={cn('relative h-48 bg-gradient-to-br shrink-0', course.gradient)}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/20 text-xs font-semibold">
                {course.category}
              </Badge>
            </div>
            {discount > 20 && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-accent text-white border-0 text-xs font-bold px-2.5 py-1">
                  {discount}% OFF
                </Badge>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <GraduationCap className="w-16 h-16 text-white/60" />
            </div>
          </div>

          <div className="flex flex-col flex-1 p-5 gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-card-foreground leading-snug truncate-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="text-[8px] font-bold bg-primary/10 text-primary">
                    {course.teacherInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{course.teacher}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <RatingStars rating={course.rating} />
                <span className="text-xs text-muted-foreground">({course.reviews.toLocaleString()})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span>{course.enrolled.toLocaleString()}</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-card-foreground">
                    <IndianRupee className="w-3.5 h-3.5 inline mr-0.5" />
                    {course.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    <IndianRupee className="w-2.5 h-2.5 inline mr-0.5" />
                    {course.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <PlayCircle className="w-3 h-3" />
                    {course.lectures}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mb-1">
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  View Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CourseSkeleton() {
  return (
    <div className="card-premium overflow-hidden rounded-2xl">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}

function FilterSidebar({ mobile, onClose, filters, setFilters, onClear }) {
  const content = (
    <div className="space-y-6">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Category</h4>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                filters.category === cat
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Level</h4>
        <div className="space-y-1">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setFilters({ ...filters, level })}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                filters.level === level
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Price Range</h4>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setFilters({ ...filters, price: range.label })}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                filters.price === range.label
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Language</h4>
        <div className="space-y-1">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setFilters({ ...filters, language: lang })}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                filters.language === lang
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Mode</h4>
        <div className="space-y-1">
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setFilters({ ...filters, mode })}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                filters.mode === mode
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Minimum Rating</h4>
        <div className="space-y-1">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setFilters({ ...filters, rating: r })}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                filters.rating === r
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              )}
            >
              {r === 0 ? 'Any Rating' : (
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {r}+
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <Button variant="outline" size="sm" className="w-full" onClick={onClear}>
        Clear All Filters
      </Button>
    </div>
  );

  if (mobile) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-2xl"
        >
          <div className="flex items-center justify-between p-5 border-b">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-5 overflow-y-auto max-h-[calc(100vh-70px)]">
            {content}
          </div>
        </motion.div>
      </div>
    );
  }

  return <div className="space-y-6">{content}</div>;
}

export default function Courses() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    level: 'All Levels',
    price: 'All Prices',
    language: 'All',
    mode: 'All',
    rating: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters, sortBy]);

  const priceRange = priceRanges.find((p) => p.label === filters.price);

  const filteredCourses = allCourses
    .filter((course) => {
      const q = debouncedSearch.toLowerCase();
      const matchesSearch = !q || course.title.toLowerCase().includes(q) || course.teacher.toLowerCase().includes(q);
      const matchesCategory = filters.category === 'All' || course.category === filters.category;
      const matchesLevel = filters.level === 'All Levels' || course.level === filters.level;
      const matchesPrice = !priceRange || (course.price >= priceRange.min && course.price <= priceRange.max);
      const matchesLanguage = filters.language === 'All' || course.language === filters.language;
      const matchesMode = filters.mode === 'All' || course.mode === filters.mode;
      const matchesRating = course.rating >= filters.rating;
      return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesLanguage && matchesMode && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular': return b.enrolled - a.enrolled;
        case 'newest': return b.id - a.id;
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const activeFilterCount = [
    filters.category !== 'All',
    filters.level !== 'All Levels',
    filters.price !== 'All Prices',
    filters.language !== 'All',
    filters.mode !== 'All',
    filters.rating > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({ category: 'All', level: 'All Levels', price: 'All Prices', language: 'All', mode: 'All', rating: 0 });
    setSearchQuery('');
  };

  const removeFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === 'rating' ? 0 : key === 'level' ? 'All Levels' : key === 'price' ? 'All Prices' : 'All',
    }));
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            Explore Courses
            <Sparkles className="w-6 h-6 text-accent" />
          </span>
        }
        subtitle="Hand-picked courses from India's finest educators. Find your perfect learning path."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Courses' },
        ]}
      />

      <Section className="pt-0 -mt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="card-premium rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </h3>
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      {activeFilterCount}
                    </Badge>
                  )}
                </div>
                <FilterSidebar filters={filters} setFilters={setFilters} onClear={clearFilters} />
              </div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <FilterSidebar
                mobile
                filters={filters}
                setFilters={setFilters}
                onClear={clearFilters}
                onClose={() => setMobileFiltersOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search & Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-card border-muted focus-visible:border-primary/30 rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 h-11 bg-card border-muted rounded-xl gap-2">
                    <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="lg:hidden h-11 px-3 border-muted rounded-xl relative"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <Filter className="w-4 h-4" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters({ ...filters, category: cat })}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border shrink-0',
                    filters.category === cat
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-card text-muted-foreground border-muted hover:border-primary/30 hover:text-foreground',
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Active Filter Tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {filters.category !== 'All' && (
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-lg text-xs">
                    {filters.category}
                    <button onClick={() => removeFilter('category')} className="hover:text-destructive transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.level !== 'All Levels' && (
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-lg text-xs">
                    {filters.level}
                    <button onClick={() => removeFilter('level')} className="hover:text-destructive transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.price !== 'All Prices' && (
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-lg text-xs">
                    {filters.price}
                    <button onClick={() => removeFilter('price')} className="hover:text-destructive transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.language !== 'All' && (
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-lg text-xs">
                    {filters.language}
                    <button onClick={() => removeFilter('language')} className="hover:text-destructive transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.mode !== 'All' && (
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-lg text-xs">
                    {filters.mode}
                    <button onClick={() => removeFilter('mode')} className="hover:text-destructive transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.rating > 0 && (
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-lg text-xs">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {filters.rating}+
                    <button onClick={() => removeFilter('rating')} className="hover:text-destructive transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-5">
              Showing <span className="font-medium text-foreground">{paginatedCourses.length}</span> of{' '}
              <span className="font-medium text-foreground">{filteredCourses.length}</span> courses
            </p>

            {/* Content States */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CourseSkeleton key={i} />
                ))}
              </div>
            ) : paginatedCourses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
                  <Search className="w-8 h-8 text-muted-foreground/40" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any courses matching your criteria. Try adjusting your filters or search term.
                </p>
                <Button variant="outline" onClick={clearFilters} className="rounded-xl">
                  Clear All Filters
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {paginatedCourses.map((course, i) => (
                    <CourseCard key={course.id} course={course} index={i} />
                  ))}
                </motion.div>

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
                        className={cn(
                          'w-9 h-9 rounded-xl text-sm',
                          currentPage === page && 'shadow-lg shadow-primary/20',
                        )}
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
        </div>
      </Section>
    </div>
  );
}
