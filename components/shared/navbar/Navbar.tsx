import { UserButton } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs/app-beta/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Theme from './Theme';

const Navbar = () => {
  return (
    <nav className='flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12'>
      <Link href='/' className='flex items-center gap-1'>
        <Image
          src='/assets/images/site-logo.svg'
          width={23}
          height={23}
          alt='QueryStack'
        />
        <p className='h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden'>
          Stack <span className='text-primary-500'>Query</span>
        </p>
      </Link>
      {/* GlobalSearch  */}
      <div className='flex-between gap-5'>
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
              variables: {
                colorPrimary: '#ff7000',
              },
            }}
          />
        </SignedIn>
        {/* Mobile navbar  */}
      </div>
    </nav>
  );
};

export default Navbar;
