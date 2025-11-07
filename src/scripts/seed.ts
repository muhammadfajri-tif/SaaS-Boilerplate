import {
  comments as dummyComments,
  posts as dummyPosts,
  tags as dummyTags,
  users as dummyUsers,
} from '@/data/dummy';
import { getDbConnection } from '@/libs/db-seed';
import { comments, posts, postTags, tags } from '@/models/Schema';

// Import dummy data
import 'dotenv/config';

async function seed() {
  console.log('🌱 Starting database seed...');

  let client;
  let db;

  try {
    // Get database connection
    console.log('📡 Connecting to database...');
    const connection = await getDbConnection();
    db = connection.db;
    client = connection.client;
    console.log('✅ Connected to database');

    // Create username to ID mapping
    const userMap = new Map(
      dummyUsers.map(user => [user.username, user.id]),
    );

    // Clear existing data (in reverse order of dependencies)
    console.log('🧹 Cleaning existing data...');
    await db.delete(postTags);
    await db.delete(comments);
    await db.delete(posts);
    await db.delete(tags);
    console.log('✅ Existing data cleaned');

    // Seed Tags
    console.log('📌 Seeding tags...');
    const seededTags = await db.insert(tags).values(
      dummyTags.map(tag => ({
        id: tag.id,
        name: tag.name.toLowerCase(), // Normalize to lowercase as per business logic
      })),
    ).returning();
    console.log(`✅ Seeded ${seededTags.length} tags`);

    // Seed Posts (map username to user ID)
    console.log('📝 Seeding posts...');
    const seededPosts = await db.insert(posts).values(
      dummyPosts.map(post => ({
        id: post.id,
        userId: post.userId,
        title: post.title,
        content: post.content,
      })),
    ).returning();
    console.log(`✅ Seeded ${seededPosts.length} posts`);

    // Seed Post-Tag relationships
    console.log('🔗 Seeding post-tag relationships...');
    const postTagRelations = [];
    for (const post of dummyPosts) {
      for (const tag of post.tags) {
        postTagRelations.push({
          postId: post.id,
          tagId: tag.id,
        });
      }
    }
    if (postTagRelations.length > 0) {
      await db.insert(postTags).values(postTagRelations);
    }
    console.log(`✅ Seeded ${postTagRelations.length} post-tag relationships`);

    // Seed Comments (map username to user ID)
    console.log('💬 Seeding comments...');
    const seededComments = await db.insert(comments).values(
      dummyComments.map(comment => ({
        id: comment.id,
        postId: comment.postId,
        userId: comment.userId,
        content: comment.content,
      })),
    ).returning();
    console.log(`✅ Seeded ${seededComments.length} comments`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Tags: ${seededTags.length}`);
    console.log(`   - Posts: ${seededPosts.length}`);
    console.log(`   - Comments: ${seededComments.length}`);
    console.log(`   - Post-Tag Relations: ${postTagRelations.length}`);
    console.log('\n💡 User ID Mapping:');
    userMap.forEach((id, username) => {
      console.log(`   - ${username} → ${id}`);
    });
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    // Close database connection
    if (client) {
      console.log('\n🔌 Closing database connection...');
      await client.end();
      console.log('✅ Connection closed');
    }
  }
}

// Run seed
seed()
  .then(() => {
    console.log('\n✅ Seed script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seed script failed:', error);
    process.exit(1);
  });
