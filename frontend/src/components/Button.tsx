import React from 'react';

/**
 * Button component built with shadcn/ui patterns
 * Supports multiple variants and sizes
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
      outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-900',
      ghost: 'hover:bg-gray-100 text-gray-900',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
    };

    const sizeStyles = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-12 px-6 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
