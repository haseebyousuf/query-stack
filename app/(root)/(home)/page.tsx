import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilters from '@/components/home/HomeFilters';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import { getQuestions } from '@/lib/actions/question.action';
import Link from 'next/link';
import React from 'react';
// const questions = [
//   {
//     _id: 1,
//     title: 'How to use React Query?',
//     tags: [
//       { _id: 1, name: 'react-query' },
//       { _id: 2, name: 'react' },
//     ],
//     author: { _id: 2, name: 'John Doe', picture: '/assets/icons/avatar.svg' },
//     answers: [],
//     views: 10,
//     upvotes: 2,
//     createdAt: new Date('2021-09-03T12:00:00.000Z'),
//   },
//   {
//     _id: 2,
//     title: 'What is next.js? Why do we use it? what are the benefits?',
//     tags: [
//       { _id: 1, name: 'next' },
//       { _id: 2, name: 'js' },
//     ],
//     author: {
//       _id: 1,
//       name: 'Jawad Shakeel',
//       picture: '/assets/icons/avatar.svg',
//     },
//     answers: [],
//     views: 22,
//     upvotes: 4,
//     createdAt: new Date('2023-09-03T12:00:00.000Z'),
//   },
//   {
//     _id: 3,
//     title: 'What is virtual DOM?',
//     tags: [
//       { _id: 1, name: 'react' },
//       { _id: 2, name: 'dom' },
//     ],
//     author: { _id: 12, name: 'Faizan', picture: '/assets/icons/avatar.svg' },
//     answers: [],
//     views: 4322,
//     upvotes: 77,
//     createdAt: new Date('2021-09-03T12:00:00.000Z'),
//   },
// ];
const Home = async () => {
  const result = await getQuestions({});
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Link href='/ask-question' className='flex justify-end max-sm:w-full '>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900 '>
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        {/* local searchbar */}
        <LocalSearch
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherClasses='flex-1'
        />
        {/* filters */}
        <Filter
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
          containerClasses='hidden max-md:flex'
        />
      </div>
      <HomeFilters />
      <div className='mt-10 flex w-full flex-col gap-6'>
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title={`There's no question to show`}
            description={`Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡`}
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
    </>
  );
};

export default Home;
