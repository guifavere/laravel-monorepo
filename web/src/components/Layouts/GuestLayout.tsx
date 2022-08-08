import { ReactNode } from 'react';

interface GuestLayoutProps {
  children: ReactNode;
}

export const GuestLayout = ({ children }: GuestLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
}
