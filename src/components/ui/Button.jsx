import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import Icon from '../AppIcon';

const Button = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  iconName,
  iconPosition = 'left',
  iconSize = 16,
  href,
  ...props
}) => {
  const variants = {
    default: 'bg-accent text-white hover:bg-accent/90 shadow-collector',
    outline: 'border-2 border-border bg-transparent hover:bg-accent/5',
    ghost: 'bg-transparent hover:bg-accent/5',
    premium: 'bg-gradient-premium text-white hover:brightness-110 shadow-premium',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    success: 'bg-success text-white hover:bg-success/90',
    warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
    error: 'bg-error text-white hover:bg-error/90',
    link: 'text-accent underline-offset-4 hover:underline',
    'premium-ghost': 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20',
    'collector': 'bg-gradient-to-r from-accent to-primary text-white hover:brightness-110 shadow-collector'
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-lg',
    default: 'h-10 px-4 text-sm rounded-xl',
    lg: 'h-12 px-6 text-base rounded-xl',
    xl: 'h-14 px-8 text-lg rounded-2xl',
    icon: 'h-10 w-10 rounded-full p-0'
  };

  const baseStyles = cn(
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
    fullWidth && 'w-full',
    variants[variant],
    sizes[size],
    className
  );

  const ButtonContent = () => (
    <>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      
      <span className={cn('flex items-center space-x-2', loading && 'opacity-0')}>
        {iconName && iconPosition === 'left' && (
          <Icon name={iconName} size={iconSize} />
        )}
        {children}
        {iconName && iconPosition === 'right' && (
          <Icon name={iconName} size={iconSize} />
        )}
      </span>

      {/* Premium Shine Effect */}
      {variant === 'premium' && (
        <div className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
      )}

      {/* Collector Shine Effect */}
      {variant === 'collector' && (
        <div className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
      )}
    </>
  );

  if (asChild && href) {
    return (
      <Link
        to={href}
        className={cn(baseStyles, 'group')}
        {...props}
      >
        <ButtonContent />
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, 'group')}
      disabled={disabled || loading}
      {...props}
    >
      <ButtonContent />
    </button>
  );
};

export default Button;