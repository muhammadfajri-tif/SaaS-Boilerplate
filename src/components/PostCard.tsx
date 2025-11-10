'use client';

import type { Post } from '@/types/Post';

import { Edit, MessageCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Button } from '@/components/ui/button';

type PostCardProps = {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
  currentUserId?: string;
};

export function PostCard({
  post,
  onEdit,
  onDelete,
  currentUserId = 'john_doe',
}: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isOwner = post.userId === currentUserId;

  return (
    <article
      className="group relative border-b border-gray-200 py-8 transition-opacity hover:opacity-75 dark:border-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edit/Delete Buttons - Only for owner */}
      {isOwner && isHovered && (
        <div className="absolute right-0 top-8 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onEdit?.(post);
            }}
          >
            <Edit className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onDelete?.(post.id);
            }}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}

      <Link href={`/blogs/${post.id}`} className="block">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag.id}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag.name.toLowerCase()}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
          {post.title}
        </h3>

        {/* Content Preview with Markdown */}
        <div className="mb-4 line-clamp-2 text-base text-gray-600 dark:text-gray-400">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <span className="font-bold text-lg">{children}</span>,
              h2: ({ children }) => <span className="font-bold text-base">{children}</span>,
              h3: ({ children }) => <span className="font-semibold">{children}</span>,
              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              p: ({ children }) => <span>{children}</span>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer with Author and Comments */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white dark:bg-white dark:text-gray-900">
              {post.userId.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              @
              {post.userId}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <MessageCircle className="size-4" />
            <span>{post.comments.length}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
