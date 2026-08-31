import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-ink/85',
  secondary: 'bg-transparent text-ink border border-ink/70 hover:border-ink hover:bg-ink/5',
  ghost: 'bg-transparent text-ink-soft hover:text-ink',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ease-premium disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  external?: boolean;
}

interface NativeButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined;
}

type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Shared CTA control. Pass `href` to render a link, omit it for a native button (forms, dialogs). */
export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children } = props;
  const classes = cn(baseClasses, variantClasses[variant], className);

  if ('href' in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _variant, className: _className, children: _children, ...rest } =
    props as NativeButtonProps;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
