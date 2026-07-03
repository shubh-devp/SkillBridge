import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm ring-offset-background transition-all placeholder:text-muted-foreground/50 hover:border-muted-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30 resize-y',
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
Textarea.displayName = 'Textarea';

export { Textarea };
export default Textarea;
