import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
const AskQuestion = () => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');
  return <div>AskQuestion</div>;
};

export default AskQuestion;
