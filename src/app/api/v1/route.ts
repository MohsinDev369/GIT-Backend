export const dynamic = 'force-static'
 
export async function GET() {
  return Response.json({ message: 'Welcome to the API', status: 'online' })
}