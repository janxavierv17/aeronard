import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema/**/schema.ts", // Your schema location
	out: "./drizzle", // Where our migrations will be outputted
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.NEXT_PUBLIC_DB_URL!,
	},
});
