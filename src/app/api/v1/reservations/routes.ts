import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { reservations } from '@/supabase/migrations/schema';

// Get all reservations
/**
 * @swagger
 * /api/v1/reservations:
 *   get:
 *     summary: Get all reservations
 *     description: Retrieves all reservation records
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: List of all reservations
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
 *                   tableId:
 *                     type: string
 *                     format: uuid
 *                   fromRestaurants:
 *                     type: string
 *                     format: uuid
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
export async function GET() {
  const response = await db.select().from(reservations);
  return NextResponse.json(response);
}

// Create a reservation
/**
 * @swagger
 * /api/v1/reservations:
 *   post:
 *     summary: Create a reservation
 *     description: Creates a new reservation record
 *     tags:
 *       - Reservations
 *     parameters:
 *       - name: tableid
 *         in: query
 *         required: true
 *         description: Table ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: fromRestaurant
 *         in: query
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: startat
 *         in: query
 *         required: true
 *         description: Start time (ISO format)
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: endat
 *         in: query
 *         required: true
 *         description: End time (ISO format)
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: status
 *         in: query
 *         required: false
 *         description: Reservation status
 *         schema:
 *           type: string
 *           default: active
 *     responses:
 *       200:
 *         description: Reservation created successfully
 *       400:
 *         description: Wrong format or missing required parameters
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tableid = searchParams.get('tableid');
  const fromRestaurant = searchParams.get('fromRestaurant');
  const startat = searchParams.get('startat');
  const endat = searchParams.get('endat');
  const status = searchParams.get('status');
  
  console.log(tableid, fromRestaurant, startat, endat, status);
  
  if (tableid && fromRestaurant && startat && endat) {
    const [response] = await db.insert(reservations)
      .values({ 
        tableId: tableid, 
        fromRestaurants: fromRestaurant, 
        startDate: startat, 
        endDate: endat,
        status: status || 'active'
      } as never)
      .returning();
      
    console.info('->New reservation created');
    return NextResponse.json(response);
  } else {
    return NextResponse.json('wrong format', { status: 400 });
  }
}