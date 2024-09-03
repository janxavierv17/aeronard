import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const {
	NEXT_PUBLIC_DB_URL,
	NEXT_PUBLIC_DB_HOST,
	NEXT_PUBLIC_DB_NAME,
	NEXT_PUBLIC_DB_USERNAME,
	NEXT_PUBLIC_DB_PASSWORD,
} = process.env;

const queryClient = postgres(NEXT_PUBLIC_DB_URL!, {
	host: NEXT_PUBLIC_DB_HOST,
	port: 5432,
	db: NEXT_PUBLIC_DB_NAME,
	username: NEXT_PUBLIC_DB_USERNAME,
	password: NEXT_PUBLIC_DB_PASSWORD,
});
export const db = drizzle(queryClient);
