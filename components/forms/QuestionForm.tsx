'use client';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeProvider';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { QuestionsSchema } from '@/lib/validations';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { createQuestion, editQuestion } from '@/lib/actions/question.action';
import { usePathname, useRouter } from 'next/navigation';

type QuestionFormProps = {
  mongoUserId: string;
  type?: string;
  questionDetails?: string;
};
const QuestionForm = ({
  type,
  mongoUserId,
  questionDetails,
}: QuestionFormProps) => {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedQuestionDetails =
    questionDetails && JSON.parse(questionDetails || '');
  const groupedTags = parsedQuestionDetails?.tags.map((tag: any) => tag.name);

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: parsedQuestionDetails?.title || '',
      explanation: parsedQuestionDetails?.content || '',
      tags: groupedTags || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true);
    try {
      if (type === 'edit') {
        await editQuestion({
          questionId: parsedQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        });
        router.push(`/question/${parsedQuestionDetails._id}`);
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });
        router.push('/');
      }

      // console.log(value);
      // make api call to database
    } catch (error) {
      setIsSubmitting(false);
    } finally {
      console.log('s');
    }
  }

  function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>, field: any) {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters.',
          });
        }

        if (field.value.includes(tagValue as never)) {
          return form.setError('tags', {
            type: 'required',
            message: 'You already added this tag.',
          });
        } else {
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = '';
          form.clearErrors('tags');
        }
      } else {
        form.trigger();
      }
    }
  }

  const handleRemoveTag = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue('tags', newTags);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col gap-10'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Question Title<span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Be specific and imagine you&apos;re asking a question to
                  another person
                </FormDescription>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='explanation'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Detailed Explanation of your problem
                  <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5 bg-red-400'>
                  {/* Add an editor components */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    initialValue={parsedQuestionDetails?.content || ''}
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
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Tags<span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <>
                    <Input
                      disabled={type === 'edit'}
                      className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                      onKeyDown={(e) => handleAddTag(e, field)}
                      placeholder='Add tags...'
                    />
                    {field.value.length > 0 && (
                      <div className='flex-start mt-2.5 gap-2.5'>
                        {field.value.map((tag: any) => (
                          <Badge
                            key={tag}
                            onClick={() =>
                              type !== 'edit'
                                ? handleRemoveTag(tag, field)
                                : () => {}
                            }
                            className='subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize '
                          >
                            {tag}
                            {type !== 'edit' && (
                              <Image
                                src='/assets/icons/close.svg'
                                alt='close icon'
                                width={12}
                                height={12}
                                className='cursor-pointer object-contain invert-0 dark:invert'
                              />
                            )}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Add up to 3 tags to describe what your question is about. You
                  need to press enter to add a tag.
                </FormDescription>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='primary-gradient w-fit !text-light-900'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>{type === 'edit' ? 'Editing...' : 'Posting...'}</>
            ) : (
              <>{type === 'edit' ? 'Edit Question' : 'Post Question'}</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuestionForm;
