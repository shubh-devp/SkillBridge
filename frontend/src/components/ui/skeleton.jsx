import * as React from 'react';
import { cn } from '@/lib/utils';

const Skeleton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'animate-shimmer rounded-lg bg-gradient-to-r from-muted via-muted/50 to-muted',
        className,
      )}
      {...props}
    />
  ),
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export default Skeleton;
