import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().min(1, 'Content is required').max(5000, 'Content must be 5,000 characters or less'),
});
