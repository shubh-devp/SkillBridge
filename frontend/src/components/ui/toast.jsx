import * as React from 'react';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-3 overflow-hidden rounded-[var(--radius)] border p-4 pr-10 shadow-[var(--elevation-3)] transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'border-border/60 bg-card text-card-foreground',
        success:
          'border-success/30 bg-success-light/50 text-success dark:border-success/20 dark:bg-success/10',
        error:
          'border-destructive/30 bg-destructive/5 text-destructive dark:border-destructive/20 dark:bg-destructive/10',
        warning:
          'border-warning/30 bg-warning-light/50 text-warning dark:border-warning/20 dark:bg-warning/10',
        info: 'border-primary/30 bg-primary-light/50 text-primary dark:border-primary/20 dark:bg-primary/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Toast = React.forwardRef(
  ({ className, variant, children, onClose, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      {...props}
    >
      <div className="flex-1 text-sm">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2.5 top-2.5 rounded-[var(--radius)] p-1 text-muted-foreground/40 opacity-0 transition-all duration-200 hover:text-foreground hover:bg-muted/60 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring group-hover:opacity-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  ),
);
Toast.displayName = 'Toast';

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xs text-muted-foreground/80 mt-0.5', className)}
    {...props}
  />
));
ToastDescription.displayName = 'ToastDescription';

export { Toast, ToastTitle, ToastDescription, toastVariants };
export default Toast;
