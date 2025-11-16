## [1.1.1](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/compare/v1.1.0...v1.1.1) (2025-11-15)


### Bug Fixes

* **token:** add token to authorization header ([625c5f3](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/625c5f3f079ac6e5019c3923a1db6bf7eb23bc80))
* use CORS environment variable for clerk middleware ([bdd56ae](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/bdd56aec0406dd039f44d3aced4d2342329d84b5))

# [1.1.0](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/compare/v1.0.1...v1.1.0) (2025-11-15)


### Bug Fixes

* **db:** use username instead of user id ([1a2c00e](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/1a2c00ed39f34e1d48faf92c523ff0cb5f482a1a))
* exclude server folder from tsconfig and fix linting errors ([70c52fd](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/70c52fde797d0c7f52f41ff20099ab8c83bbd6f7))
* fix access to potentially undefined values ([b912423](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/b912423c1b7b5a278aaad2d34c08d60998ff1974))
* **read post:** fix author name and commenter's name ([e21d40c](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/e21d40c5a8c6eb30c8677a23b7a5d1f1f656669e))


### Features

* add markdown preview in FYP posts and convert all tags to lowercase ([a40822a](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/a40822af234e166a4042ed0abebf4814f656db50))
* add token for authorization ([#12](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/issues/12)) ([c8a56c7](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/c8a56c713807a068b1f9a06f3f765093883c27e0))
* improve UI with monochrome design and add topic icons ([4eb0381](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/4eb03810a5ead45bc903cea7bb14019baf48707c))
* liquid navbar ([2742144](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/2742144976a745f5bf1b0e116e4fd2d47c5921f4))
* rebrand to Metion, add elegant pen nib logo, implement auto-hide navbar, and prepare liquid-glass integration ([9c9cbf1](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/9c9cbf1d1d302c6b0f98df068159ee6e7e64edb8))
* sticky navbar ([e7fbbee](https://github.com/muhammadfajri-tif/SaaS-Boilerplate/commit/e7fbbee509d7dcd076dad4fe904d60cb292d4b5e))

## [1.0.1](https://github.com/RioAgasta/SaaS-Boilerplate/compare/v1.0.0...v1.0.1) (2025-11-06)


### Bug Fixes

* set API URL via ENV ([4f24262](https://github.com/RioAgasta/SaaS-Boilerplate/commit/4f242623052075615411cbd74afcd39969e68ec7))

# 1.0.0 (2025-11-06)


### Bug Fixes

* add demo banner at the top of the landing page ([09bf8c8](https://github.com/RioAgasta/SaaS-Boilerplate/commit/09bf8c8aba06eba1405fb0c20aeec23dfb732bb7))
* chnage dashboard index message button in french translation ([2f1dca8](https://github.com/RioAgasta/SaaS-Boilerplate/commit/2f1dca84cb05af52a959dd9630769ed661d8c69b))
* clerk integration ([a9981cd](https://github.com/RioAgasta/SaaS-Boilerplate/commit/a9981cddcb4a0e2365066938533cd13225ce10a9))
* fix markdown and remove unused parameters ([9c90821](https://github.com/RioAgasta/SaaS-Boilerplate/commit/9c90821a113414728373f3425f28ad29b721609e))
* hide text in logo used in dashboard and add spacing for sign in button used in navbar ([a0eeda1](https://github.com/RioAgasta/SaaS-Boilerplate/commit/a0eeda12251551fd6a8e50222f46f3d47f0daad7))
* in dashboard, make the logo smaller, display without text ([f780727](https://github.com/RioAgasta/SaaS-Boilerplate/commit/f780727659fa58bbe6e4250dd63b2819369b7308))
* issue to build Next.js with Node.js 22.7, use 22.6 instead ([4acaef9](https://github.com/RioAgasta/SaaS-Boilerplate/commit/4acaef95edec3cd72a35405969ece9d55a2bb641))
* redirect user to the landing page after signing out ([6e9f383](https://github.com/RioAgasta/SaaS-Boilerplate/commit/6e9f3839daaab56dd3cf3e57287ea0f3862b8588))
* remove custom framework configuration for i18n-ally vscode ([63f87fe](https://github.com/RioAgasta/SaaS-Boilerplate/commit/63f87feb3c0cb186c500ef9bed9cb50d7309224d))
* remove hydration error and unify with pro version 1.6.1 ([ea2d02b](https://github.com/RioAgasta/SaaS-Boilerplate/commit/ea2d02bd52de34c6cd2390d160ffe7f14319d5c3))
* remove update deps github workflow, add separator in dashboard header ([fcf0fb4](https://github.com/RioAgasta/SaaS-Boilerplate/commit/fcf0fb48304ce45f6ceefa7d7eae11692655c749))
* update clerk to the latest version and update middlware to use await with auth ([2287192](https://github.com/RioAgasta/SaaS-Boilerplate/commit/2287192ddcf5b27a1f43ac2b7a992e065b990627))
* update logicalId in checkly configuration ([6e7a479](https://github.com/RioAgasta/SaaS-Boilerplate/commit/6e7a4795bff0b92d3681fadc36256aa957eb2613))
* use new vitest vscode setting for preventing automatic opening of the test results ([2a2b945](https://github.com/RioAgasta/SaaS-Boilerplate/commit/2a2b945050f8d19883d6f2a8a6ec5ccf8b1f4173))


### Features

* add API for blog ([#7](https://github.com/RioAgasta/SaaS-Boilerplate/issues/7)) ([ffaf8b2](https://github.com/RioAgasta/SaaS-Boilerplate/commit/ffaf8b259558049d77e541c562126e9e63eab307))
* add Arisu.Blog with filter and search functionality ([c3c8348](https://github.com/RioAgasta/SaaS-Boilerplate/commit/c3c8348a78466b285d174217782013d5859df9f8))
* add arisu.blog with navbar, clickable posts, and recommended posts sidebar ([39727af](https://github.com/RioAgasta/SaaS-Boilerplate/commit/39727af10c77a0a71c02c18df412a3876213735d))
* add blog post reading page with comment system and interactions ([aafa775](https://github.com/RioAgasta/SaaS-Boilerplate/commit/aafa775f795ea7f79892e41bd61be0c0c782a915))
* add catppuccin themes, dark mode, and theme switcher ([#4](https://github.com/RioAgasta/SaaS-Boilerplate/issues/4)) ([a1f22de](https://github.com/RioAgasta/SaaS-Boilerplate/commit/a1f22def292944c200fd6a20029290d714141a18))
* add complete blog feature with medium-style UI, filtering, and PDF export ([52dc8eb](https://github.com/RioAgasta/SaaS-Boilerplate/commit/52dc8eb341c283ff476c3b41f53b83165066449b))
* add crud blog ([5d6ca88](https://github.com/RioAgasta/SaaS-Boilerplate/commit/5d6ca889f2ee539ea2e7505d73e5f6f512d42083))
* add custom framework for i18n-ally and replace deprecated Jest VSCode configuration ([a9889dc](https://github.com/RioAgasta/SaaS-Boilerplate/commit/a9889dc129aeeba8801f4f47e54d46e9515e6a29))
* add link to the GitHub repository ([ed42176](https://github.com/RioAgasta/SaaS-Boilerplate/commit/ed42176bdc2776cacc2c939bac45914a1ede8e51))
* add read post page and comment section ([9b7c2e3](https://github.com/RioAgasta/SaaS-Boilerplate/commit/9b7c2e3f57ebcf93c1867dfc2a9b67989f25a4fd))
* add read post page and comment section ([7371016](https://github.com/RioAgasta/SaaS-Boilerplate/commit/7371016b571edeed5b103001afdbd4e2a1901eb2))
* **blog:** add i18n support for 4 languages and fix slash command menu border ([63165cc](https://github.com/RioAgasta/SaaS-Boilerplate/commit/63165cc063a6480fd1de3b0778f8177c7c06b144))
* **blog:** implement Medium-style editor with Tiptap ([4401e86](https://github.com/RioAgasta/SaaS-Boilerplate/commit/4401e86604c6df0d271342e5f684ef6320f8f8c0))
* **card:** add Card components with BlogSection integration ([9b1086f](https://github.com/RioAgasta/SaaS-Boilerplate/commit/9b1086f94af3c3cb3dde19cc7c35ccbfc6d06e6d))
* create dashboard header component ([f3dc1da](https://github.com/RioAgasta/SaaS-Boilerplate/commit/f3dc1da451ab8dce90d111fe4bbc8d4bc99e4b01))
* don't redirect to organization-selection if the user is already on this page ([87da997](https://github.com/RioAgasta/SaaS-Boilerplate/commit/87da997b853fd9dcb7992107d2cb206817258910))
* **i18n:** add Japanese (jp) locale support i love anime btw ([7d5d1bf](https://github.com/RioAgasta/SaaS-Boilerplate/commit/7d5d1bf691c8483ba65d9b41ab98fea436f8e315))
* initial commit ([d58e1d9](https://github.com/RioAgasta/SaaS-Boilerplate/commit/d58e1d97e11baa0a756bd038332eb84daf5a8327))
* integration with API ([#10](https://github.com/RioAgasta/SaaS-Boilerplate/issues/10)) ([fa10d56](https://github.com/RioAgasta/SaaS-Boilerplate/commit/fa10d56fe0c96a9673a3e3e2574d835a5fcbcd63))
* launching SaaS boilerplate for helping developers to build SaaS quickly ([7f24661](https://github.com/RioAgasta/SaaS-Boilerplate/commit/7f246618791e3a731347dffc694a52fa90b1152a))
* make the landing page responsive and works on mobile ([27e908a](https://github.com/RioAgasta/SaaS-Boilerplate/commit/27e908a735ea13845a6cc42acc12e6cae3232b9b))
* make user dashboard responsive ([f88c9dd](https://github.com/RioAgasta/SaaS-Boilerplate/commit/f88c9dd5ac51339d37d1d010e5b16c7776c73b8d))
* migreate Env.mjs file to Env.ts ([2e6ff12](https://github.com/RioAgasta/SaaS-Boilerplate/commit/2e6ff124dcc10a3c12cac672cbb82ec4000dc60c))
* remove next-sitemap and use the native Next.js sitemap/robots.txt ([75c9751](https://github.com/RioAgasta/SaaS-Boilerplate/commit/75c9751d607b8a6a269d08667f7d9900797ff38a))
* update de Next.js Boilerplate v3.58.1 ([16aea65](https://github.com/RioAgasta/SaaS-Boilerplate/commit/16aea651ef93ed627e3bf310412cfd3651aeb3e4))
* update to Drizzle Kit 0.22, Storybook 8, migrate to vitest ([c2f19cd](https://github.com/RioAgasta/SaaS-Boilerplate/commit/c2f19cd8e9dc983e0ad799da2474610b57b88f50))
* update to Next.js Boilerpalte v3.54 ([ae80843](https://github.com/RioAgasta/SaaS-Boilerplate/commit/ae808433e50d6889559fff382d4b9c595d34e04f))
* upgrade to Clerk v5 and use Clerk's Core 2 ([a92cef0](https://github.com/RioAgasta/SaaS-Boilerplate/commit/a92cef026b5c85a703f707aabf42d28a16f07054))
* upgrade to Tailwind v4, Next 15 & React 19, refactor i18n, and bump deps ([#1](https://github.com/RioAgasta/SaaS-Boilerplate/issues/1)) ([4f4352b](https://github.com/RioAgasta/SaaS-Boilerplate/commit/4f4352b63bbbd93e21df5266f3169b6baf5f9db9))
* use Node.js version 20 and 22 in GitHub Actions ([226b5e9](https://github.com/RioAgasta/SaaS-Boilerplate/commit/226b5e970f46bfcd384ca60cd63ebb15516eca21))
* vscode jest open test result view on test fails and add unauthenticatedUrl in clerk middleware ([3cfcb6b](https://github.com/RioAgasta/SaaS-Boilerplate/commit/3cfcb6b00d91dabcb00cbf8eb2d8be6533ff672e))

## [1.7.6](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.7.5...v1.7.6) (2025-05-01)


### Bug Fixes

* update clerk to the latest version and update middlware to use await with auth ([2287192](https://github.com/ixartz/SaaS-Boilerplate/commit/2287192ddcf5b27a1f43ac2b7a992e065b990627))

## [1.7.5](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.7.4...v1.7.5) (2025-05-01)


### Bug Fixes

* clerk integration ([a9981cd](https://github.com/ixartz/SaaS-Boilerplate/commit/a9981cddcb4a0e2365066938533cd13225ce10a9))

## [1.7.4](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.7.3...v1.7.4) (2024-12-20)


### Bug Fixes

* remove custom framework configuration for i18n-ally vscode ([63f87fe](https://github.com/ixartz/SaaS-Boilerplate/commit/63f87feb3c0cb186c500ef9bed9cb50d7309224d))
* use new vitest vscode setting for preventing automatic opening of the test results ([2a2b945](https://github.com/ixartz/SaaS-Boilerplate/commit/2a2b945050f8d19883d6f2a8a6ec5ccf8b1f4173))

## [1.7.3](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.7.2...v1.7.3) (2024-11-07)


### Bug Fixes

* chnage dashboard index message button in french translation ([2f1dca8](https://github.com/ixartz/SaaS-Boilerplate/commit/2f1dca84cb05af52a959dd9630769ed661d8c69b))
* remove update deps github workflow, add separator in dashboard header ([fcf0fb4](https://github.com/ixartz/SaaS-Boilerplate/commit/fcf0fb48304ce45f6ceefa7d7eae11692655c749))

## [1.7.2](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.7.1...v1.7.2) (2024-10-17)


### Bug Fixes

* hide text in logo used in dashboard and add spacing for sign in button used in navbar ([a0eeda1](https://github.com/ixartz/SaaS-Boilerplate/commit/a0eeda12251551fd6a8e50222f46f3d47f0daad7))
* in dashboard, make the logo smaller, display without text ([f780727](https://github.com/ixartz/SaaS-Boilerplate/commit/f780727659fa58bbe6e4250dd63b2819369b7308))
* remove hydration error and unify with pro version 1.6.1 ([ea2d02b](https://github.com/ixartz/SaaS-Boilerplate/commit/ea2d02bd52de34c6cd2390d160ffe7f14319d5c3))

## [1.7.1](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.7.0...v1.7.1) (2024-10-04)


### Bug Fixes

* update logicalId in checkly configuration ([6e7a479](https://github.com/ixartz/SaaS-Boilerplate/commit/6e7a4795bff0b92d3681fadc36256aa957eb2613))

# [1.7.0](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.6.1...v1.7.0) (2024-10-04)


### Features

* update de Next.js Boilerplate v3.58.1 ([16aea65](https://github.com/ixartz/SaaS-Boilerplate/commit/16aea651ef93ed627e3bf310412cfd3651aeb3e4))

## [1.6.1](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.6.0...v1.6.1) (2024-08-31)


### Bug Fixes

* add demo banner at the top of the landing page ([09bf8c8](https://github.com/ixartz/SaaS-Boilerplate/commit/09bf8c8aba06eba1405fb0c20aeec23dfb732bb7))
* issue to build Next.js with Node.js 22.7, use 22.6 instead ([4acaef9](https://github.com/ixartz/SaaS-Boilerplate/commit/4acaef95edec3cd72a35405969ece9d55a2bb641))

# [1.6.0](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.5.0...v1.6.0) (2024-07-26)


### Features

* update to Next.js Boilerpalte v3.54 ([ae80843](https://github.com/ixartz/SaaS-Boilerplate/commit/ae808433e50d6889559fff382d4b9c595d34e04f))

# [1.5.0](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.4.0...v1.5.0) (2024-06-05)


### Features

* update to Drizzle Kit 0.22, Storybook 8, migrate to vitest ([c2f19cd](https://github.com/ixartz/SaaS-Boilerplate/commit/c2f19cd8e9dc983e0ad799da2474610b57b88f50))

# [1.4.0](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.3.0...v1.4.0) (2024-05-17)


### Features

* vscode jest open test result view on test fails and add unauthenticatedUrl in clerk middleware ([3cfcb6b](https://github.com/ixartz/SaaS-Boilerplate/commit/3cfcb6b00d91dabcb00cbf8eb2d8be6533ff672e))

# [1.3.0](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.2.1...v1.3.0) (2024-05-16)


### Features

* add custom framework for i18n-ally and replace deprecated Jest VSCode configuration ([a9889dc](https://github.com/ixartz/SaaS-Boilerplate/commit/a9889dc129aeeba8801f4f47e54d46e9515e6a29))
* create dashboard header component ([f3dc1da](https://github.com/ixartz/SaaS-Boilerplate/commit/f3dc1da451ab8dce90d111fe4bbc8d4bc99e4b01))
* don't redirect to organization-selection if the user is already on this page ([87da997](https://github.com/ixartz/SaaS-Boilerplate/commit/87da997b853fd9dcb7992107d2cb206817258910))
* make the landing page responsive and works on mobile ([27e908a](https://github.com/ixartz/SaaS-Boilerplate/commit/27e908a735ea13845a6cc42acc12e6cae3232b9b))
* make user dashboard responsive ([f88c9dd](https://github.com/ixartz/SaaS-Boilerplate/commit/f88c9dd5ac51339d37d1d010e5b16c7776c73b8d))
* migreate Env.mjs file to Env.ts ([2e6ff12](https://github.com/ixartz/SaaS-Boilerplate/commit/2e6ff124dcc10a3c12cac672cbb82ec4000dc60c))
* remove next-sitemap and use the native Next.js sitemap/robots.txt ([75c9751](https://github.com/ixartz/SaaS-Boilerplate/commit/75c9751d607b8a6a269d08667f7d9900797ff38a))
* upgrade to Clerk v5 and use Clerk's Core 2 ([a92cef0](https://github.com/ixartz/SaaS-Boilerplate/commit/a92cef026b5c85a703f707aabf42d28a16f07054))
* use Node.js version 20 and 22 in GitHub Actions ([226b5e9](https://github.com/ixartz/SaaS-Boilerplate/commit/226b5e970f46bfcd384ca60cd63ebb15516eca21))

## [1.2.1](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.2.0...v1.2.1) (2024-03-30)


### Bug Fixes

* redirect user to the landing page after signing out ([6e9f383](https://github.com/ixartz/SaaS-Boilerplate/commit/6e9f3839daaab56dd3cf3e57287ea0f3862b8588))

# [1.2.0](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.1.0...v1.2.0) (2024-03-29)


### Features

* add link to the GitHub repository ([ed42176](https://github.com/ixartz/SaaS-Boilerplate/commit/ed42176bdc2776cacc2c939bac45914a1ede8e51))

# [1.1.0](https://github.com/ixartz/SaaS-Boilerplate/compare/v1.0.0...v1.1.0) (2024-03-29)


### Features

* launching SaaS boilerplate for helping developers to build SaaS quickly ([7f24661](https://github.com/ixartz/SaaS-Boilerplate/commit/7f246618791e3a731347dffc694a52fa90b1152a))

# 1.0.0 (2024-03-29)


### Features

* initial commit ([d58e1d9](https://github.com/ixartz/SaaS-Boilerplate/commit/d58e1d97e11baa0a756bd038332eb84daf5a8327))
