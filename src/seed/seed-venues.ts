import { venues } from "@/supabase/migrations/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, { venues });
}
main();