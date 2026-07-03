import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type || 'text'}
        className={cn(
          'flex h-9 w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm ring-offset-background transition-all',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground/50',
          'hover:border-muted-foreground/25',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-ring focus-visible:ring-offset-0',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30',
          error && 'border-destructive focus-visible:ring-destructive/30 focus-visible:border-destructive',
          className,
        )}
        ref={ref}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
export default Input;
