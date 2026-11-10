import type { ReactNode } from 'react';

// Oversized section title. `md` is for the supporting sections, so the main ones keep the weight.
export function DisplayHeading({ children, size = 'lg' }: { children: ReactNode; size?: 'lg' | 'md' }) {
  return (
    <h2 className={size === 'md' ? 'display display--md' : 'display'}>
      <span>{children}</span>
    </h2>
  );
}
