import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer';
}) {
  return <Tag className={cn('mx-auto w-full max-w-container px-6 sm:px-10 lg:px-16', className)}>{children}</Tag>;
}
