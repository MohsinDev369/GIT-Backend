import { sql } from 'drizzle-orm';
import { db } from '@/db';

async function setup() {
  // Run permissions as drizzle queries
  await db.execute(sql`GRANT USAGE ON SCHEMA public TO anon, authenticated`);
  await db.execute(sql`GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated`);
  await db.execute(sql`GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated`);
  
  console.log('Permissions granted!');
  process.exit(0);
}

setup().catch(console.error);