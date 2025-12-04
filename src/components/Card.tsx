import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        'glass rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-neon-glow',
        className
      )}>
      {children}
    </div>
  );
};

export default Card;
