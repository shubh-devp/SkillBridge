import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, ChevronDown, LogOut, User, BookOpen,
  GraduationCap, Search, X, Bell, Sparkles, LayoutDashboard,
  Heart, BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/store/auth-context';
import { cn } from '@/lib/utils';
import MobileNav from './MobileNav';

const guestLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Teachers', path: '/teachers' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

function getDashboardPath(user) {
  return user?.role === 'teacher' ? '/dashboard/teacher'
    : user?.role === 'admin' ? '/dashboard/admin'
    : '/dashboard/student';
}

function getQuickLinks(user) {
  const links = [
    { label: 'Dashboard', icon: LayoutDashboard, path: getDashboardPath(user) },
  ];
  if (user?.role === 'student') {
    links.push({ label: 'My Learning', icon: BookOpen, path: '/dashboard/student/courses' });
    links.push({ label: 'Wishlist', icon: Heart, path: '/dashboard/student/wishlist' });
  }
  links.push({ label: 'Profile', icon: User, path: '/dashboard/profile' });
  return links;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/courses?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || searchOpen
            ? 'bg-surface/80 backdrop-blur-xl border-b border-border/40 shadow-sm'
            : 'bg-transparent',
        )}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="SkillBridge Home">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-foreground">
              Skill<span className="text-primary">Bridge</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {guestLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'px-3.5 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors text-sm"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-muted-foreground/40">Search...</span>
              <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-muted-foreground/40 bg-muted/50 rounded ml-1 border border-border/40">
                <span>⌘</span>K
              </kbd>
            </button>

            {isAuthenticated && (
              <Link
                to="/dashboard/notifications"
                className="relative p-2 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full ring-2 ring-surface" />
              </Link>
            )}

            <div className="hidden sm:flex items-center gap-1.5 ml-1">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1 pr-2 rounded-md hover:bg-muted/50 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className="text-[10px] font-semibold bg-primary/5 text-primary">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground/80 hidden md:block">{user?.name?.split(' ')[0] || 'User'}</span>
                    <ChevronDown className={cn('w-3 h-3 text-muted-foreground/40 transition-transform', dropdownOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.96 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-surface rounded-lg shadow-elevated border border-border/50 py-1.5 z-30"
                      >
                        <div className="px-3 py-2 border-b border-border/30 mb-1">
                          <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
                          <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
                        </div>
                        {getQuickLinks(user).map((link) => (
                          <Link
                            key={link.label}
                            to={link.path}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors rounded-md mx-1"
                          >
                            <link.icon className="w-4 h-4 text-muted-foreground/50" />
                            {link.label}
                          </Link>
                        ))}
                        <div className="border-t border-border/30 mt-1 pt-1 mx-1">
                          <button
                            onClick={() => { logout(); setDropdownOpen(false); }}
                            className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/5 transition-colors rounded-md"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-foreground/70 h-8 px-3">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="h-8 px-4 text-xs">
                      Get started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/15 backdrop-blur-sm z-50"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-0 z-50 pt-20 sm:pt-28 px-4"
            >
              <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto bg-surface rounded-xl shadow-elevated border border-border/50 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
                  <Search className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search courses, topics, or teachers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
                    aria-label="Search"
                  />
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] text-muted-foreground/40 bg-muted/50 rounded border border-border/40">
                    ESC
                  </kbd>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1 rounded text-muted-foreground/40 hover:bg-muted/50 hover:text-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="py-3 px-4 text-sm text-muted-foreground/50 text-center">
                  {searchQuery ? (
                    <p>Press Enter to search for &ldquo;{searchQuery}&rdquo;</p>
                  ) : (
                    <p>Type to search courses, topics, or teachers</p>
                  )}
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
