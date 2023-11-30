'use client';
import { HomePageFilters } from '@/constants/filters';
import React from 'react';
import { Button } from '../ui/button';

const HomeFilters = () => {
  const active = 'frequent';
  return (
    <div className='mt-10 hidden flex-wrap gap-3 md:flex'>
      {HomePageFilters.map((filter) => (
        <Button
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? 'primary-gradient text-light-900'
              : 'bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400 '
          }`}
          key={filter.value}
          onClick={() => {}}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
