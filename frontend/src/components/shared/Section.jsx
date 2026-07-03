import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const bgStyles = {
  default: '',
  muted: 'bg-muted/40',
  accent: 'bg-accent/5',
  primary: 'bg-primary/[0.03]',
  surface: 'bg-surface',
};

export default function Section({
  children,
  className,
  id,
  bg = 'default',
  containerClass,
  once = true,
}) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-20', bgStyles[bg] || bgStyles.default, className)}
    >
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClass)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, center = true, className }) {
  return (
    <div className={cn('mb-12', center && 'text-center', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};
