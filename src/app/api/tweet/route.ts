import { db } from '@/lib/prisma';
import { errorResponse } from "@/lib/servermethods/dbHelpers";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email || typeof email !== 'string') {
            return errorResponse("Missing or invalid email parameter", 400);
        }
        const response = await db.gitHubUser.findUnique({
            where: { email },
            select: { tweets: true },
        });
        return new Response(JSON.stringify({ data: response?.tweets || [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return errorResponse("Internal Server Error");
    }
}