import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary-light text-primary-dark',
        secondary: 'bg-muted text-muted-foreground',
        success: 'bg-success-light text-success',
        warning: 'bg-warning-light text-warning',
        destructive: 'bg-destructive-light text-destructive',
        accent: 'bg-accent-light text-accent',
        outline: 'border border-border text-muted-foreground bg-transparent',
        premium: 'bg-primary-light text-primary-dark',
        neutral: 'bg-surface border border-border/60 text-muted-foreground',
      },
      size: {
        xs: 'px-1.5 py-0.5 text-2xs',
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  },
);

const Badge = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export default Badge;
