// app/api/tables/generateqrcode/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { tables, restaurants } from '@/supabase/migrations/schema';
import { eq, sql } from 'drizzle-orm';

/**
 * Returns the URL to be encoded in a QR code for a table
 */
export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tableid = searchParams.get('tableid');
    
    if (!tableid) {
      return NextResponse.json('table id not provided', { status: 400 });
    }
    
    const originDomain = process.env.DOMAIN;
    const url = `http://${originDomain}/tables/scan?tableid=${tableid}`;
    
    try {
      // Verify the table and restaurant exist
      const [tableInfo] = await db.select().from(tables).where(eq(tables.id, tableid));
      const [restaurantInfo] = await db.select().from(restaurants).where(eq(restaurants.id, tableInfo.fromRestaurant));
      
      // Return the URL and restaurant logo info for frontend QR code generation
      return NextResponse.json({
        url: url,
        restaurantLogo: restaurantInfo.logoLink,
        tableid: tableid,
        restaurantName: restaurantInfo.name
      });
      
    } catch (error) {
      console.error("Error processing table information:", error);
      return NextResponse.json("Error processing table information", { status: 500 });
    }
  }

// The qrcode leads to this and processes the code
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tableid = searchParams.get('tableid');
    
    if (!tableid) {
      return NextResponse.json('table id not provided', { status: 400 });
    }
    
    try {
      const intervalPlaceholder = sql.placeholder('interval');
  
      await db.update(tables)
        .set({
          expiresIn: sql`CASE 
            WHEN now() > ${tables.expiresIn} 
            THEN now() + ${intervalPlaceholder}::interval 
            ELSE ${tables.expiresIn} 
            END`
        })
        .where(eq(tables.id, tableid))
        .prepare("update_expires_in")
        .execute({ interval: `${process.env.EXPIRE_TIME} hour` });
        
      return NextResponse.redirect(process.env.MENU_LINK as string);
    } catch (error) {
      console.log(error);
      return NextResponse.json('Something went wrong', { status: 200 });
    }
  }