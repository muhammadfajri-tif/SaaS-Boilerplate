import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  content: z.string().min(1, 'Content is required').max(50000, 'Content must be 50,000 characters or less'),
  tags: z.array(z.string().min(1).max(50)).default([]),
});

export const updatePostSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  content: z.string().min(1).max(50000).optional(),
  tags: z.array(z.string().min(1).max(50)).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

// Type definitions for Blog Post system
export type Tag = {
  id: string;
  name: string;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  user: string;
};

export type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: Tag[];
  comments: Comment[];
  user: string;
};

export type Posts = {
  data: Post[];
};

export type HTTPSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type HTTPFailed = {
  success: false;
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
};
