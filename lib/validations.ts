import * as z from 'zod';

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' })
    .max(130, { message: 'Title must be at most 130 characters long' }),

  explanation: z
    .string()
    .min(50, { message: 'Explanation must be at least 50 characters long' }),
  // .max(100, { message: 'Explanation must be at most 100 characters long' }),

  tags: z
    .array(
      z
        .string()
        .min(1, { message: 'Tag must be at least 1 characters long' })
        .max(15, { message: 'Tag must be at most 15 characters long' })
    )
    .min(1, { message: 'You must add at least one tag' })
    .max(3, { message: 'You can add at most 3 tags' }),
});

export const AnswerSchema = z.object({
  answer: z
    .string()
    .min(50, { message: 'Answer must be at least 50 characters long' }),
});
