import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark/90 shadow-sm',
        secondary:
          'bg-surface text-foreground border border-border hover:bg-muted/50 active:bg-muted/70 shadow-sm',
        tertiary:
          'bg-muted/50 text-foreground hover:bg-muted/80 active:bg-muted',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/80 shadow-sm',
        outline:
          'border border-border bg-transparent text-foreground/80 hover:bg-muted/40 hover:text-foreground active:bg-muted/60',
        ghost:
          'text-muted-foreground hover:text-foreground hover:bg-muted/40 active:bg-muted/60',
        link: 'text-primary underline-offset-4 hover:underline',
        success:
          'bg-success text-white hover:bg-success/90 active:bg-success/80 shadow-sm',
        warning:
          'bg-warning text-white hover:bg-warning/90 active:bg-warning/80 shadow-sm',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs gap-1.5 rounded-md',
        sm: 'h-8 px-3 text-sm gap-1.5 rounded-lg',
        default: 'h-9 px-4 text-sm gap-2 rounded-lg',
        lg: 'h-10 px-5 text-sm gap-2 rounded-lg',
        xl: 'h-11 px-6 text-base gap-2.5 rounded-xl',
        '2xl': 'h-12 px-8 text-base gap-3 rounded-xl',
        icon: 'h-9 w-9 rounded-lg',
        'icon-sm': 'h-8 w-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, isLoading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
