import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function PageLoader({ text = 'Loading...', className }) {
  return (
    <div className={cn('fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface/90 backdrop-blur-sm', className)}>
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

export function Spinner({ size = 'default', className }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    default: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-[3px]',
  };

  return (
    <motion.div
      className={cn(
        'rounded-full border-primary/20 border-t-primary',
        sizeClasses[size],
        className,
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('rounded-xl border border-border/50 overflow-hidden bg-surface', className)}>
      <div className="h-40 bg-muted animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-muted rounded animate-shimmer" />
        <div className="h-4 w-3/4 bg-muted rounded animate-shimmer" />
        <div className="h-3 w-full bg-muted rounded animate-shimmer" />
        <div className="h-3 w-2/3 bg-muted rounded animate-shimmer" />
      </div>
    </div>
  );
}

export function SkeletonList({ rows = 5, className }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border/40">
          <div className="w-9 h-9 rounded-lg bg-muted animate-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-2/5 bg-muted rounded animate-shimmer" />
            <div className="h-3 w-3/5 bg-muted rounded animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LoadingSpinner({ size = 'default', text, fullPage = false, className }) {
  if (fullPage) return <PageLoader text={text} />;

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Spinner size={size} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
