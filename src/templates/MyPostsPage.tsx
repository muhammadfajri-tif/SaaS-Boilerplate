'use client';

import type { Post } from '@/types/Post';
import { useUser } from '@clerk/nextjs';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MarkdownPreviewComponent } from '@/components/MarkdownPreview';
import { MyPostCardSkeleton } from '@/components/skeletons/PostSkeletons';
import { Button } from '@/components/ui/button';
import { Section } from '@/features/landing/Section';
import { postsService } from '@/libs/api';
import { BlogNavbar } from '@/templates/BlogNavbar';

export const MyPostsPage = () => {
  const router = useRouter();

  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, user } = useUser();
  const currentUserId = user?.id;

  if (!isSignedIn) {
    redirect('/sign-in');
  }

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const allPosts = await postsService.getAllPosts();
      const filteredPosts = allPosts.filter(post => post.userId === currentUserId);
      setMyPosts(filteredPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  const handleDelete = async (postId: string) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Are you sure you want to delete this story?')) {
      return;
    }

    setDeletingId(postId);

    // Simulate API call
    try {
      await postsService.deletePost(postId);
      toast('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
    // console.log('Deleting post:', postId);

    setDeletingId(null);
  };

  const handleEdit = (postId: string) => {
    router.push(`/blogs/edit/${postId}`);
  };

  return (
    <>
      <BlogNavbar />
      <div className="min-h-screen bg-white pt-24 dark:bg-gray-950">
        <Section className="py-12">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-12 border-b border-gray-200 pb-8 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                    Your Stories
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {isLoading
                      ? 'Loading your stories...'
                      : `${myPosts.length} ${myPosts.length === 1 ? 'story' : 'stories'} published`}
                  </p>
                </div>
                <Button
                  onClick={() => router.push('/blogs/write')}
                  className="h-9 rounded-full bg-gray-900 px-5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  Write a story
                </Button>
              </div>
            </div>

            {/* Posts List */}
            {isLoading
              ? (
                  // Loading skeletons
                  <div className="space-y-8">
                    <MyPostCardSkeleton />
                    <MyPostCardSkeleton />
                    <MyPostCardSkeleton />
                  </div>
                )
              : myPosts.length > 0
                ? (
                    <div className="space-y-8">
                      {myPosts.map(post => (
                        <article
                          key={post.id}
                          className="group border-b border-gray-200 pb-8 last:border-0 dark:border-gray-800"
                        >
                          <div className="flex gap-6">
                            {/* Content */}
                            <Link
                              href={`/blogs/${post.id}`}
                              className="flex-1"
                            >
                              <div className="mb-3">
                                {post.tags.length > 0 && (
                                  <div className="mb-3 flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                      <span
                                        key={tag.id}
                                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                      >
                                        {tag.name}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <h2 className="mb-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                                  {post.title}
                                </h2>
                                <div className="line-clamp-2 text-base text-gray-600 dark:text-gray-400">
                                  <MarkdownPreviewComponent content={post.content} />
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>
                                  {post.comments.length}
                                  {' '}
                                  {post.comments.length === 1 ? 'comment' : 'comments'}
                                </span>
                              </div>
                            </Link>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(post.id)}
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                              >
                                <Edit className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(post.id)}
                                disabled={deletingId === post.id}
                                className="text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )
                : (
                    // Empty State
                    <div className="py-24 text-center">
                      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                        No stories yet
                      </h3>
                      <p className="mb-6 text-gray-600 dark:text-gray-400">
                        Start writing and share your thoughts with the community
                      </p>
                      <Button
                        onClick={() => router.push('/blogs/write')}
                        className="h-9 rounded-full bg-gray-900 px-5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                      >
                        Write your first story
                      </Button>
                    </div>
                  )}
          </div>
        </Section>
      </div>
    </>
  );
};
