import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, Search, GraduationCap, BookOpen, Users,
  MessageSquare, ArrowRight, Compass, Sparkles, Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const quickLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Courses', path: '/courses', icon: BookOpen },
  { label: 'Teachers', path: '/teachers', icon: Users },
  { label: 'About', path: '/about', icon: GraduationCap },
  { label: 'Blog', path: '/blog', icon: MessageSquare },
  { label: 'Contact', path: '/contact', icon: Mail },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-3xl" />

      <div className="relative text-center px-4 max-w-lg mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
          className="relative mb-8"
        >
          {/* Floating Search Icon */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 md:-top-8 md:-right-8"
          >
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20">
              <GraduationCap className="w-7 h-7 md:w-10 md:h-10 text-primary/40" />
            </div>
          </motion.div>

          {/* 404 Text */}
          <span className="text-[140px] md:text-[220px] font-bold leading-none bg-gradient-to-r from-primary via-primary/70 to-accent bg-clip-text text-transparent select-none tracking-tighter">
            404
          </span>

          {/* Floating Search Icon */}
          <motion.div
            animate={{
              y: [0, 8, 0],
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center border border-accent/20">
              <Search className="w-5 h-5 md:w-7 h-7 text-accent/40" />
            </div>
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Oops! The page you are looking for doesn't exist or has been moved.
            Let's get you back on track to your learning journey.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 w-full sm:w-auto rounded-xl h-12 px-8"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/courses">
            <Button
              variant="outline"
              size="lg"
              className="border-2 w-full sm:w-auto rounded-xl h-12 px-8"
            >
              <Compass className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Popular Pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-card border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all shadow-sm"
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
