import { getTranslations } from 'next-intl/server';
import { WritePostPage } from '@/templates/WritePostPage';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'FYPPosts',
  });

  return {
    title: `Write a Story - ${t('meta_title')}`,
    description: 'Share your thoughts with the community',
  };
}

export default function WriteBlogPage() {
  return <WritePostPage />;
}
