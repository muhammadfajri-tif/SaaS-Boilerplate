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
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/blogs/write">Write</Link>
          </li>

          <li>
            <Link href="/blogs/my-posts">My Stories</Link>
          </li>

          <li>
            <Link href="/dashboard">Profile</Link>
          </li>
        </CenteredMenu>
      </Section>
    </div>
  );
};
