'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { postsService } from '@/libs/api';
import { setUserId } from '@/libs/auth';

export const ApiTestComponent = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  // Set a test user ID for demonstration
  const handleSetUserId = () => {
    setUserId('test-user-123');
    toast.success('User ID set for testing');
  };

  // Test fetching posts
  const handleFetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await postsService.getAllPosts();
      setPosts(fetchedPosts);
      toast.success(`Successfully fetched ${fetchedPosts.length} posts`);
    } catch (error) {
      // Error toast will be handled by axios interceptor
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Test creating a post
  const handleCreatePost = async () => {
    setLoading(true);
    try {
      await postsService.createPost({
        title: 'Test Post',
        content: 'This is a test post created via the API',
        tags: ['test', 'api'],
      });
      toast.success('Post created successfully!');
      // Refresh posts list
      handleFetchPosts();
    } catch (error) {
      // Error toast will be handled by axios interceptor
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Test error handling by calling invalid endpoint
  const handleTestError = async () => {
    setLoading(true);
    try {
      await postsService.getPost('invalid-post-id');
    } catch (error) {
      // Error toast will be handled by axios interceptor
      console.error('Expected error for testing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">API Test Component</h2>
      <p className="text-muted-foreground">
        Test the axios client with toast notifications
      </p>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleSetUserId} variant="outline">
          Set Test User ID
        </Button>

        <Button
          onClick={handleFetchPosts}
          disabled={loading}
          variant="default"
        >
          {loading ? 'Loading...' : 'Fetch Posts'}
        </Button>

        <Button
          onClick={handleCreatePost}
          disabled={loading}
          variant="default"
        >
          {loading ? 'Creating...' : 'Create Test Post'}
        </Button>

        <Button
          onClick={handleTestError}
          disabled={loading}
          variant="destructive"
        >
          {loading ? 'Testing...' : 'Test Error (404)'}
        </Button>
      </div>

      {posts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Fetched Posts:</h3>
          <div className="space-y-2">
            {posts.map(post => (
              <div key={post.id} className="p-3 border rounded-lg">
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-muted-foreground">{post.content}</p>
                <div className="flex gap-1 mt-2">
                  {post.tags?.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="text-xs bg-secondary px-2 py-1 rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
