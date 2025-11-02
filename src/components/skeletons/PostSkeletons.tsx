import { Skeleton } from '@/components/ui/skeleton';

export const PostCardSkeleton = () => {
  return (
    <div className="space-y-4 p-6 border border-gray-200 rounded-lg dark:border-gray-800">
      {/* User info skeleton */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-6 w-3/4" />

      {/* Content skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Tags skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
};

export const SearchFilterSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Search skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Tags filter skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
};

export const RecommendedPostSkeleton = () => {
  return (
    <article className="group my-10 cursor-pointer pb-6 border-b border-gray-100 last:border-0 last:pb-0 dark:border-gray-800">
      <div className="mb-3 flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="space-y-2 mb-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-3 w-20" />
    </article>
  );
};

export const MyPostCardSkeleton = () => {
  return (
    <article className="group border-b border-gray-200 pb-8 last:border-0 dark:border-gray-800">
      <div className="flex gap-6">
        {/* Content */}
        <div className="flex-1">
          <div className="mb-3">
            {/* Tags skeleton */}
            <div className="mb-3 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            {/* Title skeleton */}
            <Skeleton className="h-8 w-3/4 mb-2" />
            {/* Content skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          {/* Footer skeleton */}
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </article>
  );
};

export const BlogPostDetailSkeleton = () => {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
      {/* Main Content */}
      <article className="lg:col-span-8">
        {/* Tags skeleton */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-12 rounded-full" />
        </div>

        {/* Title skeleton */}
        <div className="mb-6 space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-4/5" />
        </div>

        {/* Author Info skeleton */}
        <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8 dark:border-gray-800">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 mb-16">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Comments Section skeleton */}
        <div className="border-t border-gray-200 pt-12 dark:border-gray-800">
          <Skeleton className="h-8 w-48 mb-8" />

          {/* Add Comment Form skeleton */}
          <div className="mb-8">
            <Skeleton className="h-24 w-full mb-3" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Comments List skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={`comment-skeleton-${index}`} className="border-b border-gray-100 pb-6 last:border-0 dark:border-gray-800">
                <div className="mb-2 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="ml-13 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Sidebar skeleton */}
      <aside className="lg:col-span-4">
        <div className="sticky top-8 space-y-6">
          {/* Author Card skeleton */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>

          {/* Share Buttons skeleton */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Export PDF skeleton */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <Skeleton className="h-5 w-20 mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Post Stats skeleton */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <Skeleton className="h-5 w-28 mb-4" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-6" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
