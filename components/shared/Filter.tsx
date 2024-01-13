'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

type FilterProps = {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
};
const Filter = ({ filters, otherClasses, containerClasses }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramFilter = searchParams.get('filter');

  const handleUpdateFilter = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value,
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateFilter}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className='line-clamp-1 flex-1 text-left'>
            <SelectValue placeholder='Filter' />
          </div>
        </SelectTrigger>
        <SelectContent className='text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300'>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className='cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400'
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
