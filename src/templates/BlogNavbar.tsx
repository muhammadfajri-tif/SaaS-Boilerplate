'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';

import { Section } from '@/features/landing/Section';
import { Logo } from './Logo';

export const BlogNavbar = () => {
  const t = useTranslations('Navbar');
  const { isLoaded, isSignedIn } = useUser();
  const isVisible = true;

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } bg-white/80 backdrop-blur-xs dark:bg-gray-950/95 shadow-sm`}
    >
      <Section className="px-3 py-6">
        <CenteredMenu
          logo={<Logo />}
          rightMenu={(
            <>
              {/* PRO: Dark mode toggle button */}
              <li data-fade>
                <LocaleSwitcher />
              </li>
              <li data-fade>
                <ThemeSwitcher />
              </li>
              {isLoaded && isSignedIn
                ? (
                    <li>
                      <UserButton
                        userProfileMode="navigation"
                        userProfileUrl="/dashboard/user-profile"
                        appearance={{
                          elements: {
                            rootBox: 'px-2 py-1.5',
                          },
                        }}
                      />
                    </li>
                  )
                : (
                    <>
                      <li className="ml-1 mr-2.5" data-fade>
                        <Link href="/sign-in">{t('sign_in')}</Link>
                      </li>
                      <li>
                        <Link className={buttonVariants()} href="/sign-up">
                          {t('sign_up')}
                        </Link>
                      </li>
                    </>
                  )}
            </>
          )}
        >
          <li className="flex items-center gap-2">
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <Link href="/">Home</Link>
          </li>

          <li className="flex items-center gap-2">
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
            <Link href="/blogs/write">Write</Link>
          </li>

          <li className="flex items-center gap-2">
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <Link href="/blogs/my-posts">My Stories</Link>
          </li>
        </CenteredMenu>
      </Section>
    </div>
  );
};
