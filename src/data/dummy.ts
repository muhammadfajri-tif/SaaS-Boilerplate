export const users = [
  {
    id: 'f58d7b4e-3e9f-4de1-bae7-b7c6de1f45a9',
    username: 'john_doe',
    first_name: 'John',
    last_name: 'Doe',
  },
  {
    id: 'd2a0b29e-5726-46ff-8a2d-5693a89b3a43',
    username: 'alice',
    first_name: 'Alice',
    last_name: 'Nguyen',
  },
  {
    id: '21b58719-76c1-4f9d-91df-9d6fdcbf1d42',
    username: 'bob',
    first_name: 'Robert',
    last_name: 'Anderson',
  },
  {
    id: 'a6f8f14a-1f0f-4bb9-94cb-0b7d514dc2e0',
    username: 'carol',
    first_name: 'Carol',
    last_name: 'Kim',
  },
  {
    id: '7b2f9c4c-6071-44e1-83ec-17b9cda4b3ab',
    username: 'daniel',
    first_name: 'Daniel',
    last_name: 'Martinez',
  },
  {
    id: 'b1d6c8f9-08db-4cb2-9fd0-9b7cf54ef32c',
    username: 'eve',
    first_name: 'Evelyn',
    last_name: 'Carter',
  },
  {
    id: '6e1f9a0c-1b7e-43b3-9ff2-19e03b24f7f5',
    username: 'frank',
    first_name: 'Frank',
    last_name: 'Wilson',
  },
  {
    id: '91c3f514-3cb3-48c3-9066-b03ed5aefb18',
    username: 'grace',
    first_name: 'Grace',
    last_name: 'Lee',
  },
];

export const tags = [
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', name: 'technology' },
  { id: 'b2c3d4e5-f6f7-4901-bcde-f23456789012', name: 'programming' },
  { id: 'c3d4e5f6-f7f8-4012-cdef-345678901234', name: 'web development' },
  { id: 'd4e5f6f7-f8f9-4123-defa-456789012345', name: 'design' },
  { id: 'e5f6f7f8-f9fa-4234-efab-567890123456', name: 'productivity' },
];

export const comments = [
  {
    id: '3f1c29c7-7e34-4c8f-bc9e-88e2a9b6a002',
    postId: 'b1e29f7e-75a4-4a2f-9b22-92a81e834c52',
    userId: 'alice',
    content:
      'Great post! I especially liked the explanation about **React hooks**.',
  },
  {
    id: '7a5d1e30-90da-4a22-9eb7-2ffb2e2b43e9',
    postId: 'b1e29f7e-75a4-4a2f-9b22-92a81e834c52',
    userId: 'bob',
    content:
      'Could you elaborate on the difference between `useEffect` and `useLayoutEffect`?',
  },
  {
    id: '90d2f1c2-8d84-4c62-b2de-7fae3e44cdb4',
    postId: '2d918d18-05b3-4c97-ae5d-2cfb1a4b2a65',
    userId: 'carol',
    content: 'I think you could add a section about **async/await** examples.',
  },
  {
    id: 'a19d5371-60df-42d5-a742-7127e5f6ef92',
    postId: 'a8a5e940-5f8f-4d49-bf21-59b29839b602',
    userId: 'daniel',
    content:
      'Loved the design section — very insightful tips on **color contrast**.',
  },
  {
    id: 'cf8a83b4-cd8d-46fd-88f5-08e919827f36',
    postId: 'bb14a2a7-d8f2-4d1b-beb1-7c7dcaa8b5c8',
    userId: 'eve',
    content: 'Nice work! This helped me boost my **workflow efficiency**.',
  },
  {
    id: 'ed1a64a8-cd7a-45a8-8358-627fbf93127a',
    postId: 'ed3b11b5-9b6d-4d34-8b5b-cb28d2784a9a',
    userId: 'frank',
    content:
      'Interesting take. I’d love to see benchmarks for the **Node.js server**.',
  },
  {
    id: '5c6ef71a-0d19-4f70-b0d2-fbaac5c06de1',
    postId: 'f9135a67-51ac-4eb1-b5c5-06fa6c83487b',
    userId: 'grace',
    content: 'This markdown example was clear and concise — good job!',
  },
];

export const posts = [
  {
    id: 'b1e29f7e-75a4-4a2f-9b22-92a81e834c52',
    userId: 'john_doe',
    title: 'Understanding React Hooks',
    content:
      'React hooks allow you to use state and lifecycle methods in functional components. Here\'s a quick overview of `useState`, `useEffect`, and `useContext`.',
    tags: [
      { id: 'b2c3d4e5-f6f7-4901-bcde-f23456789012', name: 'Programming' },
      { id: 'c3d4e5f6-f7f8-4012-cdef-345678901234', name: 'Web Development' },
    ],
    comments: [
      {
        id: '3f1c29c7-7e34-4c8f-bc9e-88e2a9b6a002',
        postId: 'b1e29f7e-75a4-4a2f-9b22-92a81e834c52',
        userId: 'alice',
        content:
          'Great post! I especially liked the explanation about **React hooks**.',
      },
      {
        id: '7a5d1e30-90da-4a22-9eb7-2ffb2e2b43e9',
        postId: 'b1e29f7e-75a4-4a2f-9b22-92a81e834c52',
        userId: 'bob',
        content:
          'Could you elaborate on the difference between `useEffect` and `useLayoutEffect`?',
      },
    ],
  },
  {
    id: '2d918d18-05b3-4c97-ae5d-2cfb1a4b2a65',
    userId: 'alice',
    title: 'Async JavaScript Simplified',
    content:
      'JavaScript\'s asynchronous nature can be confusing. Let\'s break down **callbacks**, **promises**, and **async/await** with examples.',
    tags: [{ id: 'b2c3d4e5-f6f7-4901-bcde-f23456789012', name: 'Programming' }],
    comments: [
      {
        id: '90d2f1c2-8d84-4c62-b2de-7fae3e44cdb4',
        postId: '2d918d18-05b3-4c97-ae5d-2cfb1a4b2a65',
        userId: 'carol',
        content:
          'I think you could add a section about **async/await** examples.',
      },
    ],
  },
  {
    id: 'a8a5e940-5f8f-4d49-bf21-59b29839b602',
    userId: 'carol',
    title: 'Designing Accessible Web Interfaces',
    content:
      'Accessibility ensures everyone can use your product. Consider **contrast ratios**, **keyboard navigation**, and **ARIA labels**.',
    tags: [
      { id: 'd4e5f6f7-f8f9-4123-defa-456789012345', name: 'Design' },
      { id: 'c3d4e5f6-f7f8-4012-cdef-345678901234', name: 'Web Development' },
    ],
    comments: [
      {
        id: 'a19d5371-60df-42d5-a742-7127e5f6ef92',
        postId: 'a8a5e940-5f8f-4d49-bf21-59b29839b602',
        userId: 'daniel',
        content:
          'Loved the design section — very insightful tips on **color contrast**.',
      },
    ],
  },
  {
    id: 'bb14a2a7-d8f2-4d1b-beb1-7c7dcaa8b5c8',
    userId: 'bob',
    title: 'Boosting Productivity with VS Code',
    content:
      'Visual Studio Code offers powerful extensions for developers. We\'ll cover **shortcuts**, **themes**, and **debugging tools**.',
    tags: [
      { id: 'e5f6f7f8-f9fa-4234-efab-567890123456', name: 'Productivity' },
      { id: 'b2c3d4e5-f6f7-4901-bcde-f23456789012', name: 'Programming' },
    ],
    comments: [
      {
        id: 'cf8a83b4-cd8d-46fd-88f5-08e919827f36',
        postId: 'bb14a2a7-d8f2-4d1b-beb1-7c7dcaa8b5c8',
        userId: 'eve',
        content: 'Nice work! This helped me boost my **workflow efficiency**.',
      },
    ],
  },
  {
    id: 'ed3b11b5-9b6d-4d34-8b5b-cb28d2784a9a',
    userId: 'daniel',
    title: 'Scaling Node.js Applications',
    content:
      'Learn how to handle thousands of requests efficiently using **clustering**, **load balancing**, and **worker threads**.',
    tags: [
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', name: 'Technology' },
      { id: 'b2c3d4e5-f6f7-4901-bcde-f23456789012', name: 'Programming' },
    ],
    comments: [
      {
        id: 'ed1a64a8-cd7a-45a8-8358-627fbf93127a',
        postId: 'ed3b11b5-9b6d-4d34-8b5b-cb28d2784a9a',
        userId: 'frank',
        content:
          'Interesting take. I’d love to see benchmarks for the **Node.js server**.',
      },
    ],
  },
  {
    id: 'f9135a67-51ac-4eb1-b5c5-06fa6c83487b',
    userId: 'frank',
    title: 'Writing Clean Markdown',
    content:
      'Markdown is simple yet powerful. Here\'s how to use **headings**, **lists**, and **code blocks** effectively.',
    tags: [{ id: 'e5f6f7f8-f9fa-4234-efab-567890123456', name: 'Productivity' }],
    comments: [
      {
        id: '5c6ef71a-0d19-4f70-b0d2-fbaac5c06de1',
        postId: 'f9135a67-51ac-4eb1-b5c5-06fa6c83487b',
        userId: 'grace',
        content: 'This markdown example was clear and concise — good job!',
      },
    ],
  },
  {
    id: '29a9b9e2-b7f9-4b15-a7fa-528a6cb7e93d',
    userId: 'grace',
    title: 'Introduction to Docker for Developers',
    content:
      'Docker makes it easy to package and deploy your app. Learn about **containers**, **images**, and **volumes**.',
    tags: [
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', name: 'Technology' },
      { id: 'b2c3d4e5-f6f7-4901-bcde-f23456789012', name: 'Programming' },
    ],
    comments: [],
  },
  {
    id: 'a14bcb28-7f93-44ee-8ef7-68f447cc7d48',
    userId: 'eve',
    title: 'Why Design Systems Matter',
    content:
      'A design system maintains **consistency** and improves **collaboration**. Here\'s how to build one effectively.',
    tags: [{ id: 'd4e5f6f7-f8f9-4123-defa-456789012345', name: 'Design' }],
    comments: [],
  },
  {
    id: 'dfc8e4b3-06d2-467d-80a5-2f4e8f78d7f2',
    userId: 'john_doe',
    title: 'Deploying Web Apps to the Cloud',
    content:
      'Learn the basics of cloud deployment using **Vercel**, **Netlify**, or **AWS Amplify**.',
    tags: [
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', name: 'Technology' },
      { id: 'c3d4e5f6-f7f8-4012-cdef-345678901234', name: 'Web Development' },
    ],
    comments: [],
  },
  {
    id: '4a9ef8cf-9295-4cc5-bd4d-c593f3e38d91',
    userId: 'carol',
    title: 'Improving Frontend Performance',
    content:
      'Techniques such as **lazy loading**, **code splitting**, and **caching** can drastically improve performance.',
    tags: [
      { id: 'c3d4e5f6-f7f8-4012-cdef-345678901234', name: 'Web Development' },
      { id: 'e5f6f7f8-f9fa-4234-efab-567890123456', name: 'Productivity' },
    ],
    comments: [],
  },
];

export const HTTPSuccess = {
  success: true,
  message: 'Posts retrieved successfully.',
  data: {
    data: posts,
  },
};

export const HTTPFailed = {
  success: false,
  error: {
    message: 'Post not found.',
    code: 'POST_NOT_FOUND',
    statusCode: 404,
  },
};
