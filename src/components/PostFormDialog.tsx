'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { tags as allTags } from '@/data/dummy';

type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: Array<{ id: string; name: string }>;
  comments: any[];
};

type PostFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: Post;
  onSave: (post: Post) => void;
  mode: 'create' | 'edit';
};

export function PostFormDialog({
  open,
  onOpenChange,
  post,
  onSave,
  mode,
}: PostFormDialogProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    post?.tags.map(t => t.id) || [],
  );
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.length > 50000) {
      newErrors.content = 'Content must be 50,000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    const selectedTags = allTags.filter(tag => selectedTagIds.includes(tag.id));

    const newPost: Post = {
      id: post?.id || `temp-${Date.now()}`,
      userId: 'john_doe', // Mock user
      title: title.trim(),
      content: content.trim(),
      tags: selectedTags,
      comments: post?.comments || [],
    };

    onSave(newPost);
    // eslint-disable-next-line ts/no-use-before-define
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setSelectedTagIds([]);
    setErrors({});
    onOpenChange(false);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId],
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Post' : 'Edit Post'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Share your thoughts with the community'
              : 'Update your post details'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title
              {' '}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter post title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={100}
              className={errors.title ? 'border-red-500' : ''}
            />
            <div className="flex items-center justify-between text-xs">
              {errors.title
                ? (
                    <span className="text-red-500">{errors.title}</span>
                  )
                : (
                    <span className="text-gray-500">Max 100 characters</span>
                  )}
              <span className="text-gray-400">
                {title.length}
                /100
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">
              Content
              {' '}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder="Write your post content... (Markdown supported)"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={12}
              maxLength={50000}
              className={errors.content ? 'border-red-500' : ''}
            />
            <div className="flex items-center justify-between text-xs">
              {errors.content
                ? (
                    <span className="text-red-500">{errors.content}</span>
                  )
                : (
                    <span className="text-gray-500">Markdown supported</span>
                  )}
              <span className="text-gray-400">
                {content.length}
                /50,000
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag.id}
                  variant={selectedTagIds.includes(tag.id) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                  {selectedTagIds.includes(tag.id) && (
                    <X className="ml-1 size-3" />
                  )}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Click tags to select/deselect
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {mode === 'create' ? 'Create Post' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
