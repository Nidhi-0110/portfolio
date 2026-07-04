import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) {
  const cls = `btn btn-${variant} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
