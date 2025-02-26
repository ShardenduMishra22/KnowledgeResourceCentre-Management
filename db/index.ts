import { config } from '@/lib/config';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(config.env.databaseUrl);

export {
    db
}