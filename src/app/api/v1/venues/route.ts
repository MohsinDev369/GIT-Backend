import { NextResponse } from 'next/server';
import { db } from '@/db';
import { venues } from '@/supabase/migrations/schema';

/**
 * @swagger
 * /api/v1/mapMarkers:
 *   get:
 *     summary: Get all locations for the map
 *     tags:
 *       - Venues
 *     responses:
 *       200:
 *         description: List of all markers 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *                   description:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
export async function GET() {
    try {   
        const allVenues = await db.select().from(venues);
        return NextResponse.json(allVenues);
    } catch (error) {
        console.error('Error fetching tables:', error);
        return Response.json('Internal server error');
    }
}