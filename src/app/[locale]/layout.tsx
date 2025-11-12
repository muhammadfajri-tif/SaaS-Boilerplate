import type { Metadata } from 'next';

import { enUS, frFR } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AppConfig } from '@/utils/AppConfig';
import { AllLocales } from '@/utils/AppConfig';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  // Get messages for the locale
  let messages;
  try {
    messages = (await import(`@/locales/${params.locale}.json`)).default;
  } catch {
    // Fallback to default locale if the requested locale is not found
    console.warn(`Locale ${params.locale} not found, falling back to default locale`);
    messages = (await import(`@/locales/en.json`)).default;
  }

  let clerkLocale = enUS;
  let signInUrl = '/sign-in';
  let signUpUrl = '/sign-up';
  let dashboardUrl = '/dashboard';
  let afterSignOutUrl = '/';

  if (params.locale === 'fr') {
    clerkLocale = frFR;
  }

  if (params.locale !== AppConfig.defaultLocale) {
    signInUrl = `/${params.locale}${signInUrl}`;
    signUpUrl = `/${params.locale}${signUpUrl}`;
    dashboardUrl = `/${params.locale}${dashboardUrl}`;
    afterSignOutUrl = `/${params.locale}${afterSignOutUrl}`;
  }

  // The `suppressHydrationWarning` in <html> is used to prevent hydration errors caused by `next-themes`.
  // Solution provided by the package itself: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        {/* PRO: Dark mode support for Shadcn UI */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          value={{
            'light': 'light',
            'dark': 'dark',
            'catppuccin-latte': 'catppuccin-latte',
            'catppuccin-frappe': 'catppuccin-frappe',
            'catppuccin-macchiato': 'catppuccin-macchiato',
            'catppuccin-mocha': 'catppuccin-mocha',
          }}
        >
          <NextIntlClientProvider
            locale={params.locale}
            messages={messages}
          >
            <ClerkProvider
              localization={clerkLocale}
              signInUrl={signInUrl}
              signUpUrl={signUpUrl}
              signInFallbackRedirectUrl={dashboardUrl}
              signUpFallbackRedirectUrl={dashboardUrl}
              afterSignOutUrl={afterSignOutUrl}
            >
              {props.children}
            </ClerkProvider>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
