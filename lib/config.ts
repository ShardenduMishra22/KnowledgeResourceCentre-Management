export const config = {
  env: {
    databaseUrl: process.env.DATABASE_URL!,
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
      imagekit: {
      privateKey: process.env.PRIVATE_KEY!,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
    },
    upstash: {
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
      redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
    },
    nodemailer: {
      MailId: process.env.MAIL_ID!,
      MailSecret: process.env.SECRET!,
      MailPass: process.env.MAIL_PASS!,
    }
  },
}