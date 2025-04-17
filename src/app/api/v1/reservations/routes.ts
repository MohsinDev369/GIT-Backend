import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { reservations } from '@/supabase/migrations/schema';

// Get all reservations
export async function GET() {
  const response = await db.select().from(reservations);
  return NextResponse.json(response);
}

// Create a reservation
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