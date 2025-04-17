
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { tables,admin, restaurants } from '@/supabase/migrations/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/v1/tables:
 *   get:
 *     summary: Get all tables
 *     tags:
 *       - Tables
 *     responses:
 *       200:
 *         description: List of all tables
 */
export async function GET() {
    try {
        const allTables = await db.select().from(tables);
        return Response.json(allTables);
    } catch (error) {
        console.error('Error fetching tables:', error);
        return Response.json('Internal server error');
    }
}

/**
 * Creates a new table record in the database.
 */
/**
 * @swagger
 * /api/v1/tables:
 *   post:
 *     summary: Create a new table
 *     tags:
 *       - Tables
 *     parameters:
 *       - name: resid
 *         in: query
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Table created successfully
 */
export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const resid = searchParams.get('resid');
    
    // Get request body
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      );
    }
    
    if (!resid) {
      return NextResponse.json(
        { error: 'Missing required parameter: resid (restaurant ID)' },
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
    
    // Validate restaurant ID
    try {
      const [isRes] = await db.select().from(restaurants).where(eq(restaurants.id, resid));
      if (!isRes) {
        return NextResponse.json(
          { error: 'Invalid restaurant ID' },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid restaurant ID ' + error },
        { status: 400 }
      );
    }
    
    // Create new table
    try {
      const [response] = await db.insert(tables)
        .values({ 
          qrlink: `go back to /tables to see the link`, 
          fromRestaurant: resid 
        })
        .returning();
      
      // Update table with complete QR link
      await db.update(tables)
        .set({ 
          qrlink: `${process.env.DOMAIN}/tables/generateqrcode?tableid=${response.id}` 
        })
        .where(eq(tables.id, response.id));
      
      console.info('->New table created');
      return NextResponse.json(response);
    } catch (error) {
      console.error('Error creating table:', error);
      return NextResponse.json(
        { error: 'Server error' },
        { status: 500 }
      );
    }
  }