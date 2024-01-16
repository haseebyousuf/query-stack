import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <div className='flex flex-col items-start gap-4 lg:flex-row'>
        <Skeleton className='h-36 w-36 rounded-full bg-gray-100 dark:bg-gray-600' />

        <div className='mt-3'>
          <Skeleton className='h-7 w-28 bg-gray-100 dark:bg-gray-600' />
          <Skeleton className='mt-3 h-7 w-20 bg-gray-100 dark:bg-gray-600' />

          <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
            <Skeleton className='h-9 w-36 bg-gray-100 dark:bg-gray-600' />
            <Skeleton className='h-9 w-36 bg-gray-100 dark:bg-gray-600' />
            <Skeleton className='h-9 w-36 bg-gray-100 dark:bg-gray-600' />
          </div>

          <Skeleton className='mt-8 h-7 w-9/12' />
        </div>
      </div>

      <div className='mb-12 mt-10'>
        <Skeleton className='h-7 w-full bg-gray-100 dark:bg-gray-600' />

        <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
          <Skeleton className='h-28 rounded-md bg-gray-100 dark:bg-gray-600' />
          <Skeleton className='h-28 rounded-md bg-gray-100 dark:bg-gray-600' />
          <Skeleton className='h-28 rounded-md bg-gray-100 dark:bg-gray-600' />
          <Skeleton className='h-28 rounded-md bg-gray-100 dark:bg-gray-600' />
        </div>
      </div>

      <div className='mt-10 flex gap-10'>
        <div className='flex flex-1 flex-col'>
          <div className='flex'>
            <Skeleton className='h-11 w-24 rounded-r-none bg-gray-100 dark:bg-gray-600' />
            <Skeleton className='h-11 w-24 rounded-l-none bg-gray-100 dark:bg-gray-600' />
          </div>

          <div className='mt-5 flex w-full flex-col gap-6'>
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                key={item}
                className='h-48 w-full rounded-xl bg-gray-100 dark:bg-gray-600'
              />
            ))}
          </div>
        </div>

        <div className='flex min-w-[278px] flex-col max-lg:hidden'>
          <Skeleton className='h-7 w-10 bg-gray-100 dark:bg-gray-600' />

          <div className='mt-7 flex flex-col gap-4'>
            <Skeleton className='h-7 bg-gray-100 dark:bg-gray-600' />
            <Skeleton className='h-7 bg-gray-100 dark:bg-gray-600' />
            <Skeleton className='h-7 bg-gray-100 dark:bg-gray-600' />
            <Skeleton className='h-7 bg-gray-100 dark:bg-gray-600' />
            <Skeleton className='h-7 bg-gray-100 dark:bg-gray-600' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
