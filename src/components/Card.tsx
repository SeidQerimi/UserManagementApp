import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export const Card = ({ children, hover = false, className, ...props }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={hover ? { y: -4, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' } : {}}
      className={clsx(
        'bg-white rounded-lg shadow-md p-6 transition-shadow',
        hover && 'hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
