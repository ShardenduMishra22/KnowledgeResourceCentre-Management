import Header from '@/components/Header';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-lg">
        <Header />
        <div>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
