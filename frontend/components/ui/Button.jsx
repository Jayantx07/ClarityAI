import Link from 'next/link';

const Button = ({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium tracking-wider transition-all duration-300 rounded-lg';
  
  const variants = {
    primary: 'bg-gradient-to-t from-[#1e3a5f] to-[#3b82f6] text-white hover:shadow-lg hover:shadow-blue-500/25 border border-white/10',
    secondary: 'bg-white/5 text-white hover:bg-white/10 border border-white/10',
    ghost: 'text-white/80 hover:text-white hover:bg-white/5'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;

