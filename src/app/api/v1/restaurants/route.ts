// app/api/restaurants/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { restaurants, admin } from '@/supabase/migrations/schema';
import { eq } from 'drizzle-orm';

// Return all restaurants in the database
/**
 * @swagger
 * /api/v1/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     description: Retrieves all restaurant records
 *     tags:
 *       - Restaurants
 *     responses:
 *       200:
 *         description: List of all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   logoLink:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /api/v1/restaurants:
 *   post:
 *     summary: Create a restaurant
 *     description: Creates a new restaurant record
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         description: Restaurant name
 *         schema:
 *           type: string
 *       - name: logolink
 *         in: query
 *         required: false
 *         description: Restaurant logo URL
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant created successfully
 *       400:
 *         description: Missing required parameters
 *       401:
 *         description: Invalid email or password
 */
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