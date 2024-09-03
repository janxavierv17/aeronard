import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { user } from "../user";

export const reviwers = pgTable("reviwers", {
	id: serial("id").primaryKey(),
	rating: integer("rating").notNull(),
	reviewers: integer("reviewers")
		.references(() => user.id)
		.array(),
});
