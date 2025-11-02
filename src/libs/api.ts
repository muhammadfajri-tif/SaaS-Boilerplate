import type { HTTPSuccess, Post } from '@/types/Post';
import axiosClient from '@/libs/axiosClient';

export type CreatePostRequest = {
  title: string;
  content: string;
  tags: string[];
};

export type UpdatePostRequest = {
  title?: string;
  content?: string;
  tags?: string[];
};

export type CreateCommentRequest = {
  userId: string;
  content: string;
};

export const postsService = {
  // Get all posts
  async getAllPosts(): Promise<Post[]> {
    const response = await axiosClient.get<HTTPSuccess<Post[]>>('/api/posts');
    return response.data.data;
  },

  // Get single post
  async getPost(postId: string): Promise<Post> {
    const response = await axiosClient.get<HTTPSuccess<Post>>(`/api/posts/${postId}`);
    return response.data.data;
  },

  // Create new post
  async createPost(postData: CreatePostRequest): Promise<Post> {
    const response = await axiosClient.post<HTTPSuccess<Post>>('/api/posts', postData);
    return response.data.data;
  },

  // Update post
  async updatePost(postId: string, postData: UpdatePostRequest): Promise<Post> {
    const response = await axiosClient.put<HTTPSuccess<Post>>(`/api/posts/${postId}`, postData);
    return response.data.data;
  },

  // Delete post
  async deletePost(postId: string): Promise<void> {
    await axiosClient.delete(`/api/posts/${postId}`);
  },

  // Create comment
  async createComment(postId: string, commentData: CreateCommentRequest): Promise<any> {
    const response = await axiosClient.post(`/api/posts/${postId}/comments`, commentData);
    return response.data.data;
  },

  // Get comments for a post
  async getComments(postId: string): Promise<any[]> {
    const response = await axiosClient.get(`/api/posts/${postId}/comments`);
    return response.data.data;
  },
};

export const tagsService = {
  // Get all tags
  async getAllTags(): Promise<any[]> {
    const response = await axiosClient.get('/api/tags');
    return response.data.data;
  },
};
