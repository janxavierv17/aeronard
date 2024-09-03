import {
	serial,
	pgTable,
	text,
	decimal,
	pgEnum,
	numeric,
	point,
	boolean,
	integer,
	timestamp,
	date,
} from "drizzle-orm/pg-core";
import { db } from "@/db";
import { reviwers } from "../reviewers";
import { user } from "../user";
import { eq } from "drizzle-orm";

export const locationEnum = pgEnum("location", ["Point"]);
export const categoryEnum = pgEnum("category", ["King", "Single", "Twin"]);
export const room = pgTable("room", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	pricePerNight: decimal("pricePerNight"),
	address: text("address").notNull(),
	location: locationEnum("location"),
	coordinates: point("coordinates"), // Geospatial data
	formattedAddress: text("formattedAddress"),
	city: text("city"),
	state: text("string"),
	zipCode: text("zipCode"),
	country: text("country"),
	guestCapacity: numeric("guestCapacity").notNull(),
	numOfBeds: numeric("numOfBeds").notNull(),
	hasInternet: boolean("hasInternet").default(false),
	hasBreakfast: boolean("hasBreakfast").default(false),
	hasAirCondition: boolean("hasAirCondition").default(false),
	isPetAllowed: boolean("isPetAllowed").default(false),
	isRoomCleaning: boolean("isRoomCleaning").default(false),
	ratings: numeric("ratings").default("0"),
	//  Add images later and leverage aws s3.
	// images:
	category: categoryEnum("category").notNull(),
	numOfReviews: numeric("numOfReviews").default("0"),
	reviewers: integer("reviewers")
		.references(() => reviwers.id)
		.array(),
	user: integer("user").references(() => user.id),
	createdAt: date("createdAt").notNull().defaultNow(),
});

export type newRoom = typeof room.$inferInsert;

export const getAllRooms = async () => await db.select().from(room);
export const postRoom = (payload: newRoom) => db.insert(room).values(payload).returning();
// export const deleteRoomById = async (roomId: number) => await db.delete(room).where(eq(room.id, roomId))

export const deleteRoomById = async (roomId: number) => {
	const rooms = await getAllRooms();
	const roomExist = rooms.find((collection) => collection.id === roomId);

	if (roomExist) return await db.delete(room).where(eq(room.id, roomId)).returning({ id: room.id });

	return;
};
