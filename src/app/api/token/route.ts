import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { errorResponse } from "@/lib/servermethods/dbHelpers"

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        if (!email) {
            return errorResponse("Not authenticated", 401);
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tweet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const res = await response.json();
        return new Response(JSON.stringify({ subscriptionDetail: res }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return errorResponse("Internal Server Error");
    }
}