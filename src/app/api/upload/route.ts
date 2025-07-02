import { findOrCreateGitHubUser, createTweet, errorResponse } from "@/lib/servermethods/dbHelpers";

export async function POST(req: Request) {
    try {
        const { username, handle, tweet, avatarURL, imageURL, email, githubImage } = await req.json();
        const user = await findOrCreateGitHubUser(email, githubImage);
        const response = await createTweet({
            username,
            handle,
            tweet,
            avatarURL,
            imageURL,
            ownerId: user.id,
        });
        return new Response(
            JSON.stringify({
                id: response.id,
                username,
                handle,
                tweet,
                avatar: avatarURL,
                image: imageURL,
                email,
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return errorResponse('Internal Server Error');
    }
}