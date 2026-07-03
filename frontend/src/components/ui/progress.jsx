import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

const Progress = React.forwardRef(
  ({ className, value, indicatorClassName, size = 'default', ...props }, ref) => {
    const sizes = {
      sm: 'h-1.5',
      default: 'h-2',
      lg: 'h-2.5',
    };
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-muted',
          sizes[size],
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full w-full flex-1 rounded-full bg-primary transition-all duration-500 ease-out',
            indicatorClassName,
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  },
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
export default Progress;
