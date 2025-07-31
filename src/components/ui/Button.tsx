import { cn } from '../../lib/utils';
import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium',
        variant === 'default' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent hover:bg-gray-100',
        className
      )}
      {...props}
    />
  );
}