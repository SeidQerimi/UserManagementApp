import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className, disabled, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-500',
      danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
      ghost: 'text-secondary-700 hover:bg-secondary-100 focus:ring-secondary-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
