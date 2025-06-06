// src/app/api/docs/route.ts
import { NextResponse } from 'next/server';
import { getApiDocs } from '@/lib/swagger';

export async function GET() {
  return NextResponse.json(getApiDocs());
}