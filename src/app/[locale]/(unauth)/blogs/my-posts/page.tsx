import { getTranslations } from 'next-intl/server';
import { MyPostsPage } from '@/templates/MyPostsPage';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'FYPPosts',
  });

  return {
    title: `My Stories - ${t('meta_title')}`,
    description: 'Manage your published stories',
  };
}

export default function MyBlogsPage() {
  return <MyPostsPage />;
}
