// app/api/restaurants/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { restaurants, admin } from '@/supabase/migrations/schema';
import { eq } from 'drizzle-orm';

// Return all restaurants in the database
export async function GET() {
  try {
    const response = await db.select().from(restaurants);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json('something went wrong', { status: 500 });
  }
}

// Create a new restaurant
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  const logoLink = searchParams.get('logolink');
  
  // Get request body
  const { email, password } = await request.json();
  
  if (!email || !password) {
    return NextResponse.json(
      { error: 'Missing email or password' },
      { status: 400 }
    );
  }
  
  if (!name) {
    return NextResponse.json(
      { error: 'Missing required parameter: name' },
      { status: 400 }
    );
  }
  
  // Validate admin credentials
  const [isAdmin] = await db.select().from(admin).where(eq(admin.email, email));
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }
  
  if (password !== isAdmin.password) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }
  
  // Create new restaurant
  const [response] = await db.insert(restaurants)
    .values({ name: name, logoLink: logoLink || null })
    .returning();
  
  console.info('->New restaurant created');
  return NextResponse.json({
    'restaurants': response
  });
}