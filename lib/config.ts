export const config = {
    env: {
        databaseUrl: process.env.DATABASE_URL as string,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT as string,
        imagekit: {
            privateKey: process.env.PRIVATE_KEY!,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
            urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
        }
    },
    
}