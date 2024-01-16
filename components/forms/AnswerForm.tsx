'use client';
import React, { useRef, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AnswerSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '../ui/button';
import Image from 'next/image';
import { createAnswer } from '@/lib/actions/answer.action';
import { usePathname } from 'next/navigation';
import { toast } from '../ui/use-toast';

interface AnswerFormProps {
  question: string;
  questionId: string;
  authorId: string;
}

const AnswerForm = ({ question, questionId, authorId }: AnswerFormProps) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    },
  });

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });
      toast({
        title: 'Answer Added',
        variant: 'default',
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent('');
      }
    } catch (error: any) {
      toast({
        title: error,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    if (!authorId) return;
    setIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: 'POST',
          body: JSON.stringify({ question }),
        }
      );
      const aiAnswer = await response.json();

      // convert plaintext to html
      const formattedAnswer = aiAnswer.reply.replace(/\n/g, '<br />');
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer);
      }

      //  toast notification
      return toast({
        title: `${aiAnswer.reply && 'Ai answer generated'}`,
        description: 'Ai answer generated successfully',
      });
    } catch (error: any) {
      return toast({
        title: `${error?.message}`,
        variant: 'destructive',
        description: `${error?.code}`,
      });
    } finally {
      setIsSubmittingAI(false);
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
        <h4 className='paragraph-semibold text-dark400_light800'>
          Write your answer here
        </h4>
        <Button
          disabled={isSubmittingAI}
          className='btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500'
          onClick={generateAIAnswer}
        >
          {isSubmittingAI ? (
            <>Generating...</>
          ) : (
            <>
              <Image
                src='/assets/icons/stars.svg'
                alt='star'
                width={12}
                height={12}
                className='object-contain'
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          className='mt-6 flex w-full flex-col gap-10'
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name='answer'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>
                {/* <FormLabel className='paragraph-semibold text-dark400_light800'>
                Detailed Explanation of your problem
                <span className='text-primary-500'>*</span>
              </FormLabel> */}
                <FormControl className='mt-3.5 bg-red-400'>
                  {/* Add an editor components */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    // initialValue=''
                    value={field.value}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'codesample',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style:
                        'body { font-family:Inter; font-size:16px }',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light',
                    }}
                  />
                </FormControl>

                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button
              disabled={isSubmitting}
              type='submit'
              className='primary-gradient w-fit !text-light-900'
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
