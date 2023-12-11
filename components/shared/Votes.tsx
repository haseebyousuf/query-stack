'use client';
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import {
  downvoteQuestion,
  upvoteQuestion,
} from '@/lib/actions/question.action';
import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';
import React from 'react';

type VotesProps = {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
};

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpVoted,
  downvotes,
  hasDownVoted,
  hasSaved,
}: VotesProps) => {
  const handleSave = () => {};
  const pathname = usePathname();
  // const router = useRouter();
  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === 'upvote') {
      if (type === 'Question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      } else if (type === 'Answer') {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      }

      return;
    }

    if (action === 'downvote') {
      if (type === 'Question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      } else if (type === 'Answer') {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      }
    }
  };

  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasUpVoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            alt='upvote icon'
            width={18}
            height={18}
            className='cursor-pointer'
            onClick={() => handleVote('upvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasDownVoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            alt='downvote icon'
            width={18}
            height={18}
            className='cursor-pointer'
            onClick={() => handleVote('downvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === 'Question' && (
        <Image
          src={
            hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
          }
          alt='star'
          width={18}
          height={18}
          className='cursor-pointer'
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
