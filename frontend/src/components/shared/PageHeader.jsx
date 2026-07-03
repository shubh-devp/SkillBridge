import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
  size = 'default',
}) {
  return (
    <section
      className={cn(
        'relative pt-24 pb-12 md:pt-28 md:pb-16',
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className={cn('flex-1', actions && 'max-w-2xl')}>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4"
                aria-label="Breadcrumbs"
              >
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-muted-foreground/30" />
                    {crumb.path ? (
                      <Link
                        to={crumb.path}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-foreground font-medium">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </motion.nav>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className={cn(
                'font-bold tracking-tight text-foreground',
                size === 'lg' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl',
              )}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-center gap-3 shrink-0"
            >
              {actions}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
