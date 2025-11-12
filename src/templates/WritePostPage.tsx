'use client';

import type { Tag } from '@/types/Post';
import { useUser } from '@clerk/nextjs';
import { Plus, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { postsService, tagsService } from '@/libs/api';
import { BlogNavbar } from '@/templates/BlogNavbar';

export const WritePostPage = () => {
  const router = useRouter();
  const t = useTranslations('BlogWrite');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string; tags?: string }>({});
  const [isPublishing, setIsPublishing] = useState(false);
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    redirect('/sign-in');
  }

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await tagsService.getAllTags();
        setAllTags(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTags();
  }, []);

  const validate = () => {
    const newErrors: { title?: string; content?: string; tags?: string } = {};

    if (!title.trim()) {
      newErrors.title = t('title_error');
    } else if (title.length > 100) {
      newErrors.title = t('title_length_error');
    }

    if (!content.trim()) {
      newErrors.content = t('content_error');
    } else if (content.length > 50000) {
      newErrors.content = t('content_length_error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    if (!validate()) {
      return;
    }

    setIsPublishing(true);

    try {
      await postsService.createPost({
        title,
        content,
        tags: selectedTags.map(tag => tag.name),
      });
      toast('Your post has been created successfully.');
    } catch (error) {
      console.error('Error handling new post:', error);
    }
    // console.log('Publishing:', { title, content, tags: selectedTags });

    // Redirect to blog list
    router.push('/blogs');
  };

  const togglePredefinedTag = (tag: Tag) => {
    setSelectedTags((prev) => {
      const exists = prev.find(t => t.id === tag.id);
      if (exists) {
        return prev.filter(t => t.id !== tag.id);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, tag];
    });
  };

  const addCustomTag = () => {
    const tagName = customTagInput.trim().toUpperCase();

    if (!tagName) {
      return;
    }

    if (selectedTags.length >= 5) {
      setErrors(prev => ({ ...prev, tags: t('max_tags_error') }));
      return;
    }

    // Check if tag already exists
    if (selectedTags.some(t => t.name === tagName)) {
      setCustomTagInput('');
      return;
    }

    const newTag: Tag = {
      id: crypto.randomUUID(),
      name: tagName,
    };

    setSelectedTags(prev => [...prev, newTag]);
    setCustomTagInput('');
    setErrors(prev => ({ ...prev, tags: undefined }));
  };

  const removeTag = (tagId: string) => {
    setSelectedTags(prev => prev.filter(t => t.id !== tagId));
    setErrors(prev => ({ ...prev, tags: undefined }));
  };

  const handleCustomTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomTag();
    }
  };

  return (
    <>
      <BlogNavbar />
      <div className="min-h-screen bg-white pt-20 dark:bg-gray-950">
        {/* Medium-style Header */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                {t('back_button')}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                disabled={isPublishing}
                className="text-gray-600 hover:text-gray-900"
              >
                {t('cancel_button')}
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isPublishing || !title.trim() || !content.trim()}
                className="bg-green-600 px-6 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
              >
                {isPublishing ? t('publishing_button') : t('publish_button')}
              </Button>
            </div>
          </div>
        </div>

        {/* Medium-style Editor Container */}
        <div className="mx-auto max-w-3xl px-6 py-12">
          {/* Title Input - Medium Style */}
          <div className="mb-2">
            <Input
              placeholder={t('title_placeholder')}
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={100}
              className="h-[60px] border-none bg-transparent px-0 text-[42px] font-medium leading-[1.14] tracking-tight text-gray-800 placeholder:text-gray-300 focus-visible:ring-0 dark:text-gray-100 dark:placeholder:text-gray-500"
              style={{
                fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              }}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Content Editor - Medium Style */}
          <div className="mb-12">
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder={t('content_placeholder')}
              height={600}
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          {/* Tags Section */}
          <div className="space-y-6 border-t border-gray-200 pt-10 dark:border-gray-800">
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div>
                <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('tags_section_title', { count: selectedTags.length })}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
                    >
                      {tag.name}
                      <button
                        type="button"
                        onClick={() => removeTag(tag.id)}
                        className="transition-opacity hover:opacity-70"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Tag Input */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('custom_tag_title')}
              </h4>
              <div className="flex gap-2">
                <Input
                  placeholder={t('custom_tag_placeholder')}
                  value={customTagInput}
                  onChange={e => setCustomTagInput(e.target.value)}
                  onKeyPress={handleCustomTagKeyPress}
                  disabled={selectedTags.length >= 5}
                  className="flex-1"
                  maxLength={20}
                />
                <Button
                  type="button"
                  onClick={addCustomTag}
                  disabled={!customTagInput.trim() || selectedTags.length >= 5}
                  variant="outline"
                  size="icon"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              {errors.tags && (
                <p className="mt-2 text-sm text-red-500">{errors.tags}</p>
              )}
            </div>

            {/* Predefined Tags */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('predefined_tags_title')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.some(t => t.id === tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => togglePredefinedTag(tag)}
                      disabled={!isSelected && selectedTags.length >= 5}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
