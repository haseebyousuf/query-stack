import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import Navbar from '@/components/shared/navbar/Navbar';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Heart } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='background-light850_dark100 relative'>
      <Navbar />
      <div className='flex'>
        <LeftSidebar />
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
          <div className='mx-auto w-full max-w-5xl'>{children}</div>
        </section>
        {/* RightSideBar */}
        <RightSidebar />
      </div>
      <Toaster />
      <div className='mt-1 flex h-8 justify-center'>
        <p className='flex gap-2 font-spaceGrotesk text-sm font-bold text-dark-100 dark:text-light-900'>
          Made with{' '}
          <Heart
            fill='#ff5c00'
            color='#ff5c00'
            size={20}
            className='animate-pulse'
          />
          by{' '}
          <Link className='text-primary-500' href={'https://www.haseebs.tech/'}>
            Haseeb Yousuf
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Layout;
