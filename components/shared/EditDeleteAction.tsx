'use client';
import { deleteAnswer } from '@/lib/actions/answer.action';
import { deleteQuestion } from '@/lib/actions/question.action';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from '../ui/use-toast';

type EditDeleteActionProps = {
  type: string;
  itemId: string;
};

const EditDeleteAction = ({ type, itemId }: EditDeleteActionProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === 'question') {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
      toast({
        title: 'Question Deleted',
        variant: 'destructive',
      });
    } else if (type === 'answer') {
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
      toast({
        title: 'Answer Deleted',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex items-center justify-end gap-3 max-sm:w-full'>
      {type === 'question' && (
        <Image
          src={'/assets/icons/edit.svg'}
          alt='edit'
          width={14}
          height={14}
          className='cursor-pointer object-contain'
          onClick={handleEdit}
        />
      )}
      {type === 'answer' && <div></div>}

      <Image
        src={'/assets/icons/trash.svg'}
        alt='delete'
        width={14}
        height={14}
        className='cursor-pointer object-contain'
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
