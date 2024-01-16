'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { ProfileSchema } from '@/lib/validations';
import { usePathname, useRouter } from 'next/navigation';
import { updateUser } from '@/lib/actions/user.action';
import { toast } from '../ui/use-toast';

interface Props {
  clerkId: string;
  user: string;
}
const ProfileForm = ({ clerkId, user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parsedUser = JSON.parse(user);
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      portfolio: parsedUser.portfolio || '',
      location: parsedUser.location || '',
      bio: parsedUser.bio || '',
    },
  });
  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);
    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolio: values.portfolio,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });
      toast({
        title: 'Profile Updated',
        variant: 'default',
      });
      router.back();
    } catch (error) {
      toast({
        title: `error: ${error}`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-9 flex w-full flex-col gap-9'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Name <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                  placeholder='Your Name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Username <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                  placeholder='Your Username'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='portfolio'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Portfolio Link
              </FormLabel>
              <FormControl>
                <Input
                  type='url'
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                  placeholder='Your Portfolio URL'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Location
              </FormLabel>
              <FormControl>
                <Input
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                  placeholder='Where are you from?'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                  placeholder='Tell us about yourself.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-7 flex justify-end'>
          <Button
            type='submit'
            className='primary-gradient w-fit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
