import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Bell, Search, X, ChevronDown, LogOut, User, Settings, HelpCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/store/auth-context';
import { cn } from '@/lib/utils';
import DashboardSidebar from '@/components/shared/DashboardSidebar';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    setMobileSidebarOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className={cn('transition-all duration-300', sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60')}>
        <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur-sm border-b border-border/60">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
                aria-label="Open sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 lg:w-80 pl-9 pr-3 py-1.5 text-sm bg-muted/50 border border-border/60 rounded-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  aria-label="Search dashboard"
                />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full ring-1 ring-surface" />
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.96 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 top-full mt-2 w-72 bg-surface rounded-lg border border-border/60 shadow-sm overflow-hidden z-30"
                    >
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60">
                        <span className="text-sm font-semibold text-foreground">Notifications</span>
                        <button className="text-xs text-primary hover:underline">Mark all read</button>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {[
                          { title: 'New course available', desc: 'JEE Advanced 2026 batch is now open', time: '5m ago' },
                          { title: 'Assignment graded', desc: 'Physics assignment scored 92/100', time: '2h ago' },
                        ].map((n, i) => (
                          <button key={i} className="w-full text-left px-4 py-2.5 hover:bg-muted/30 transition-colors border-b border-border/40 last:border-0">
                            <p className="text-sm font-medium text-foreground">{n.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                            <p className="text-[10px] text-muted-foreground/50 mt-0.5">{n.time}</p>
                          </button>
                        ))}
                      </div>
                      <Link to="/dashboard/notifications" className="block text-center text-sm text-primary font-medium py-2.5 border-t border-border/60 hover:bg-muted/30 transition-colors">
                        View all
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 pr-2.5 rounded-lg hover:bg-muted/50 transition-colors ml-1"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-[10px] font-medium bg-muted text-muted-foreground/70">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-foreground leading-tight">{user?.name || 'User'}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{user?.role || 'Student'}</p>
                  </div>
                  <ChevronDown className={cn('w-3 h-3 text-muted-foreground transition-transform', profileOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.96 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-surface rounded-lg border border-border/60 shadow-sm py-1.5 z-30"
                    >
                      <div className="px-4 py-2 border-b border-border/60 mb-1">
                        <p className="text-sm font-medium text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
                        <User className="w-4 h-4 text-muted-foreground" />
                        My Profile
                      </Link>
                      <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        Settings
                      </Link>
                      <Link to="/help" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                        Help Center
                      </Link>
                      <hr className="my-1 mx-3 border-border/60" />
                      <button onClick={() => { logout(); setProfileOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/5 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
