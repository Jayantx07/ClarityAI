const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md',
  as: Component = 'div',
  ...props 
}) => {
  const baseClasses = 'bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm';
  const hoverClasses = hover ? 'hover:bg-white/10 hover:border-white/20 transition-all duration-300' : '';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;
  
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Card;
