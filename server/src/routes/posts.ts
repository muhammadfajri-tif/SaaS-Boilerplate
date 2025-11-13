import { clerkClient, getAuth } from '@clerk/express';
import { eq, sql } from 'drizzle-orm';
import { Router } from 'express';
import { z } from 'zod';
import { createCommentSchema } from '../types/Comment';
import { createPostSchema, updatePostSchema } from '../types/Post';
import { apiError, apiSuccess } from '../utils/api-response';
import { db } from '../utils/db';
import { comments, posts, postTags, tags } from '../utils/schema';

export const postsRouter = Router();

// GET /api/posts - Get all posts
postsRouter.get('/', async (_, res) => {
  try {
    const { data: users } = await clerkClient.users.getUserList();

    const allPosts = await db
      .select({
        id: posts.id,
        userId: posts.userId,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .orderBy(sql`${posts.createdAt} DESC`);

    // Fetch tags and comments for each post
    const postsWithRelations = await Promise.all(
      allPosts.map(async (post) => {
        // Get tags
        const postTagsData = await db
          .select({
            id: tags.id,
            name: tags.name,
          })
          .from(postTags)
          .innerJoin(tags, eq(postTags.tagId, tags.id))
          .where(eq(postTags.postId, post.id));

        // Get comments
        const postComments = await db
          .select()
          .from(comments)
          .where(eq(comments.postId, post.id))
          .orderBy(sql`${comments.createdAt} ASC`);

        const author = users.find(user => post.userId === user.id);

        return {
          ...post,
          tags: postTagsData,
          comments: postComments,
          user: author ? `${author.firstName} ${author.lastName}` : post.userId,
        };
      }),
    );

    return apiSuccess(res, postsWithRelations, 'Posts retrieved successfully');
  } catch (error) {
    console.error('Error fetching posts:', error);
    return apiError(res, 'Failed to fetch posts', 'FETCH_POSTS_ERROR', 500);
  }
});

// POST /api/posts - Create new post
postsRouter.post('/', async (req, res) => {
  try {
    const { userId, isAuthenticated } = getAuth(req);

    if (!userId || !isAuthenticated) {
      return apiError(res, 'Unauthorized - Authentication required', 'UNAUTHORIZED', 401);
    }

    const validatedData = createPostSchema.parse(req.body);

    // Create post
    const [newPost] = await db
      .insert(posts)
      .values({
        userId,
        title: validatedData.title,
        content: validatedData.content,
      })
      .returning();

    // Process tags
    const tagObjects = [];
    if (validatedData.tags.length > 0) {
      for (const tagName of validatedData.tags) {
        const normalizedTag = tagName.toLowerCase().trim();

        // Check if tag exists
        let [existingTag] = await db
          .select()
          .from(tags)
          .where(eq(tags.name, normalizedTag))
          .limit(1);

        // Create tag if doesn't exist
        if (!existingTag) {
          [existingTag] = await db
            .insert(tags)
            .values({ name: normalizedTag })
            .returning();
        }

        tagObjects.push(existingTag);

        // Create post-tag relation
        await db.insert(postTags).values({
          postId: newPost!.id,
          tagId: existingTag!.id,
        });
      }
    }

    return apiSuccess(
      res,
      {
        ...newPost,
        tags: tagObjects,
        comments: [],
      },
      'Post created successfully',
      201,
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError(res, error.message, 'VALIDATION_ERROR', 400);
    }
    console.error('Error creating post:', error);
    return apiError(res, 'Failed to create post', 'CREATE_POST_ERROR', 500);
  }
});

// GET /api/posts/:postId - Get single post
postsRouter.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const [post] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
    const { data: users } = await clerkClient.users.getUserList();
    const user = users.find(user => user.id === post.userId);

    if (!post) {
      return apiError(res, 'Post not found', 'POST_NOT_FOUND', 404);
    }

    // Get tags
    const postTagsData = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(postTags)
      .innerJoin(tags, eq(postTags.tagId, tags.id))
      .where(eq(postTags.postId, postId));

    // Get comments
    const postComments = await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(sql`${comments.createdAt} ASC`);

    const postCommentsWithUser = postComments.map((comment) => {
      const user = users.find(user => comment.userId === user.id);
      return {
        ...comment,
        user: user ? `${user.firstName} ${user.lastName}` : comment.userId,
      };
    });

    return apiSuccess(
      res,
      {
        ...post,
        tags: postTagsData,
        comments: postCommentsWithUser,
        user: user ? `${user.firstName} ${user.lastName}` : post.userId,
      },
      'Post retrieved successfully',
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return apiError(res, 'Failed to fetch post', 'FETCH_POST_ERROR', 500);
  }
});

// PUT /api/posts/:postId - Update post
postsRouter.put('/:postId', async (req, res) => {
  try {
    const { userId, isAuthenticated } = getAuth(req);

    if (!userId || !isAuthenticated) {
      return apiError(res, 'Unauthorized - Authentication required', 'UNAUTHORIZED', 401);
    }
    const { postId } = req.params;

    const validatedData = updatePostSchema.parse(req.body);

    // Check if post exists and belongs to user
    const [existingPost] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!existingPost) {
      return apiError(res, 'Post not found', 'POST_NOT_FOUND', 404);
    }

    if (existingPost.userId !== userId) {
      return apiError(res, 'Forbidden - You can only edit your own posts', 'FORBIDDEN', 403);
    }

    // Update post
    const updateData: any = {};
    if (validatedData.title) {
      updateData.title = validatedData.title;
    }
    if (validatedData.content) {
      updateData.content = validatedData.content;
    }
    updateData.updatedAt = new Date();

    const [updatedPost] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, postId))
      .returning();

    // Handle tags if provided
    let tagObjects = [];
    if (validatedData.tags) {
      // Delete existing post-tag relations
      await db.delete(postTags).where(eq(postTags.postId, postId));

      // Create new tag relations
      for (const tagName of validatedData.tags) {
        const normalizedTag = tagName.toLowerCase().trim();

        let [existingTag] = await db
          .select()
          .from(tags)
          .where(eq(tags.name, normalizedTag))
          .limit(1);

        if (!existingTag) {
          [existingTag] = await db
            .insert(tags)
            .values({ name: normalizedTag })
            .returning();
        }

        tagObjects.push(existingTag);

        await db.insert(postTags).values({
          postId,
          tagId: existingTag!.id,
        });
      }
    } else {
      // Get existing tags
      tagObjects = await db
        .select({
          id: tags.id,
          name: tags.name,
        })
        .from(postTags)
        .innerJoin(tags, eq(postTags.tagId, tags.id))
        .where(eq(postTags.postId, postId));
    }

    // Get comments
    const postComments = await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(sql`${comments.createdAt} ASC`);

    return apiSuccess(
      res,
      {
        ...updatedPost,
        tags: tagObjects,
        comments: postComments,
      },
      'Post updated successfully',
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError(res, error.message, 'VALIDATION_ERROR', 400);
    }
    console.error('Error updating post:', error);
    return apiError(res, 'Failed to update post', 'UPDATE_POST_ERROR', 500);
  }
});

// DELETE /api/posts/:postId - Delete post
postsRouter.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, isAuthenticated } = getAuth(req);

    if (!userId || !isAuthenticated) {
      return apiError(res, 'Unauthorized - Authentication required', 'UNAUTHORIZED', 401);
    }

    // Check if post exists and belongs to user
    const [existingPost] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!existingPost) {
      return apiError(res, 'Post not found', 'POST_NOT_FOUND', 404);
    }

    if (existingPost.userId !== userId) {
      return apiError(res, 'Forbidden - You can only delete your own posts', 'FORBIDDEN', 403);
    }

    // Delete post (cascading deletes will handle comments and post_tags)
    await db.delete(posts).where(eq(posts.id, postId));

    return apiSuccess(res, null, 'Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
    return apiError(res, 'Failed to delete post', 'DELETE_POST_ERROR', 500);
  }
});

// POST /api/posts/:postId/comments - Create comment
postsRouter.post('/:postId/comments', async (req, res) => {
  try {
    const { userId, isAuthenticated } = getAuth(req);

    if (!userId || !isAuthenticated) {
      return apiError(res, 'Unauthorized - Authentication required', 'UNAUTHORIZED', 401);
    }

    const { postId } = req.params;

    // Check if post exists
    const [existingPost] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

    if (!existingPost) {
      return apiError(res, 'Post not found', 'POST_NOT_FOUND', 404);
    }

    const validatedData = createCommentSchema.parse(req.body);

    // Create comment
    const [newComment] = await db
      .insert(comments)
      .values({
        postId,
        userId,
        content: validatedData.content,
      })
      .returning();

    return apiSuccess(res, newComment, 'Comment created successfully', 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError(res, error.message, 'VALIDATION_ERROR', 400);
    }
    console.error('Error creating comment:', error);
    return apiError(res, 'Failed to create comment', 'CREATE_COMMENT_ERROR', 500);
  }
});

// GET /api/posts/:postId/comments - Get all comments for a post
postsRouter.get('/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    const { data: users } = await clerkClient.users.getUserList();
    // Check if post exists
    const [existingPost] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

    if (!existingPost) {
      return apiError(res, 'Post not found', 'POST_NOT_FOUND', 404);
    }

    // Get comments
    const postComments = await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(sql`${comments.createdAt} ASC`);

    const postCommentsWithUser = postComments.map((comment) => {
      const user = users.find(user => comment.userId === user.id);
      return {
        ...comment,
        user: user ? `${user.firstName} ${user.lastName}` : comment.userId,
      };
    });

    return apiSuccess(res, postCommentsWithUser, 'Comments retrieved successfully');
  } catch (error) {
    console.error('Error fetching comments:', error);
    return apiError(res, 'Failed to fetch comments', 'FETCH_COMMENTS_ERROR', 500);
  }
});
