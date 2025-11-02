import { sql } from 'drizzle-orm';
import { Router } from 'express';
import { apiError, apiSuccess } from '../utils/api-response';
import { db } from '../utils/db';
import { tags } from '../utils/schema';

export const tagsRouter = Router();

// GET /api/tags - Get all tags
tagsRouter.get('/', async (req, res) => {
  try {
    const allTags = await db
      .select()
      .from(tags)
      .orderBy(sql`${tags.name} ASC`);

    return apiSuccess(res, allTags, 'Tags retrieved successfully');
  } catch (error) {
    console.error('Error fetching tags:', error);
    return apiError(res, 'Failed to fetch tags', 'FETCH_TAGS_ERROR', 500);
  }
});
