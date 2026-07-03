import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Heart, ClipboardList, FileText,
  Award, UserCog, Users, BookMarked, BarChart3, Settings,
  MessageSquare, LogOut, ChevronLeft, GraduationCap, X, Menu,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/store/auth-context';
import { cn } from '@/lib/utils';

const studentLinks = [
  { label: 'Overview', path: '/dashboard/student', icon: LayoutDashboard },
  { label: 'My Courses', path: '/dashboard/student/courses', icon: BookOpen },
  { label: 'Wishlist', path: '/dashboard/student/wishlist', icon: Heart },
  { label: 'Tests', path: '/dashboard/student/tests', icon: ClipboardList },
  { label: 'Assignments', path: '/dashboard/student/assignments', icon: FileText },
  { label: 'Certificates', path: '/dashboard/student/certificates', icon: Award },
  { label: 'Profile', path: '/dashboard/student/profile', icon: UserCog },
];

const teacherLinks = [
  { label: 'Overview', path: '/dashboard/teacher', icon: LayoutDashboard },
  { label: 'My Courses', path: '/dashboard/teacher/courses', icon: BookOpen },
  { label: 'Students', path: '/dashboard/teacher/students', icon: Users },
  { label: 'Tests', path: '/dashboard/teacher/tests', icon: ClipboardList },
  { label: 'Assignments', path: '/dashboard/teacher/assignments', icon: FileText },
  { label: 'Analytics', path: '/dashboard/teacher/analytics', icon: BarChart3 },
  { label: 'Profile', path: '/dashboard/teacher/profile', icon: UserCog },
];

const adminLinks = [
  { label: 'Overview', path: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'Users', path: '/dashboard/admin/users', icon: Users },
  { label: 'Courses', path: '/dashboard/admin/courses', icon: BookMarked },
  { label: 'Teachers', path: '/dashboard/admin/teachers', icon: GraduationCap },
  { label: 'Blogs', path: '/dashboard/admin/blogs', icon: FileText },
  { label: 'Messages', path: '/dashboard/admin/messages', icon: MessageSquare },
  { label: 'Analytics', path: '/dashboard/admin/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/dashboard/admin/settings', icon: Settings },
];

const roleConfig = {
  student: { links: studentLinks, label: 'Student' },
  teacher: { links: teacherLinks, label: 'Teacher' },
  admin: { links: adminLinks, label: 'Admin' },
};

export default function DashboardSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const role = user?.role || 'student';
  const config = roleConfig[role] || roleConfig.student;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-14 px-4 border-b border-border/60">
        <Link to="/" className={cn('flex items-center gap-2.5', collapsed && 'lg:justify-center lg:w-full')}>
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
          <span className={cn('font-bold text-sm text-foreground', collapsed && 'lg:hidden')}>
            SkillBridge
          </span>
        </Link>
        <button onClick={onMobileClose} className="lg:hidden p-1 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors" aria-label="Close sidebar">
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5" role="navigation" aria-label="Dashboard navigation">
        {config.links.map((link) => {
          const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onMobileClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                collapsed && 'lg:justify-center lg:px-2',
              )}
            >
              <link.icon className={cn('w-4 h-4 shrink-0', isActive && 'text-primary')} />
              <span className={cn('truncate', collapsed && 'lg:hidden')}>{link.label}</span>
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-sm">
                  {link.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className={cn('p-3 border-t border-border/60', collapsed && 'lg:p-2')}>
        <div className={cn('flex items-center gap-3 mb-2', collapsed && 'lg:flex-col lg:gap-1')}>
          <Avatar className={cn('w-8 h-8 shrink-0', collapsed && 'lg:w-7 lg:h-7')}>
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground/70">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className={cn('flex-1 min-w-0', collapsed && 'lg:hidden')}>
            <p className="text-sm font-medium text-foreground truncate leading-tight">{user?.name || 'User'}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors',
            collapsed && 'lg:justify-center',
          )}
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className={cn(collapsed && 'lg:hidden')}>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-surface border-r border-border/60 z-30 transition-all duration-300',
          collapsed ? 'w-16' : 'w-60',
        )}
      >
        {sidebarContent}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-surface border border-border/60 shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronLeft className="w-3 h-3" />
          </motion.div>
        </button>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-surface z-50 lg:hidden shadow-sm"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
