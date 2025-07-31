import { cn } from '../../lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('bg-white border rounded-lg shadow-sm', className)}
      {...props}
    />
  );
});