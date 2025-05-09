// app/api/example/route.ts
import { NextResponse } from 'next/server';

// Define the expected response data type
type ResponseData = {
  message: string;
};

export async function GET(): Promise<NextResponse<ResponseData>> {
  try {
    // Handle GET request logic here
    const data = { message: 'online'};

    // Return a successful response with the defined type
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    // Handle errors gracefully
    console.error('Error in GET request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}