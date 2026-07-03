import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Home, BookOpen, Users, Info, Newspaper, Mail, GraduationCap,
  LogIn, UserPlus, LogOut, User, Sparkles, LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/store/auth-context';
import { cn } from '@/lib/utils';

const guestLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Courses', path: '/courses', icon: BookOpen },
  { label: 'Teachers', path: '/teachers', icon: Users },
  { label: 'About', path: '/about', icon: Info },
  { label: 'Blog', path: '/blog', icon: Newspaper },
  { label: 'Contact', path: '/contact', icon: Mail },
];

function getDashboardPath(user) {
  return user?.role === 'teacher' ? '/dashboard/teacher'
    : user?.role === 'admin' ? '/dashboard/admin'
    : '/dashboard/student';
}

export default function MobileNav({ open, onClose }) {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-surface z-50 lg:hidden flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-border/40">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="text-base font-bold text-foreground">
                  Skill<span className="text-primary">Bridge</span>
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">
              {isAuthenticated && (
                <div className="flex items-center gap-3 px-3 py-3 mb-4 bg-muted/40 rounded-lg border border-border/40">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
                  </div>
                </div>
              )}

              <nav className="space-y-0.5" role="navigation">
                {guestLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/5 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                      )
                    }
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <hr className="my-4 border-border/40" />

              <div className="space-y-1.5">
                {isAuthenticated ? (
                  <>
                    <Link
                      to={getDashboardPath(user)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 pt-1">
                    <Link to="/login">
                      <Button variant="outline" className="w-full justify-center h-9">
                        <LogIn className="w-4 h-4" />
                        Log In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full justify-center h-9">
                        <UserPlus className="w-4 h-4" />
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-border/40">
              <Link to="/courses">
                <Button className="w-full bg-accent hover:bg-accent/90 font-semibold gap-2 h-10">
                  <Sparkles className="w-4 h-4" />
                  Enroll Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
