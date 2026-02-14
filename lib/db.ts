import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL || '';
const sql = databaseUrl ? neon(databaseUrl) : (null as any);
export const db = sql ? drizzle(sql, { schema }) : (null as any);
