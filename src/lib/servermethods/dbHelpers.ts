import { db as prisma } from "@/lib/prisma";

export async function findOrCreateGitHubUser(email: string, githubImage: string) {
    let user = await prisma.gitHubUser.findUnique({ where: { email } });
    if (!user) {
        user = await prisma.gitHubUser.create({
            data: { email, image: githubImage },
        });
    }
    return user;
}

export async function createTweet({ username, handle, tweet, avatarURL, imageURL, ownerId }: {
    username: string;
    handle: string;
    tweet: string;
    avatarURL: string;
    imageURL: string;
    ownerId: number;
}) {
    return prisma.tweet.create({
        data: {
            username,
            handle,
            tweet,
            avatarImage: avatarURL,
            tweetImage: imageURL,
            ownerId,
        },
    });
}

export function errorResponse(message: string, status = 500) {
    return new Response(JSON.stringify({ message }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}
