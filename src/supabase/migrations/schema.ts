import { pgTable, uuid, text, timestamp, foreignKey, smallint, date, boolean, doublePrecision, pgEnum } from "drizzle-orm/pg-core"

export const venueType = pgEnum("venue_type", ['breakfast', 'playzone', 'pub', 'club', 'restaurant'])


export const admin = pgTable("admin", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().default('admin').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	email: text().notNull(),
	password: text().notNull(),
});

export const currentTimestamp = pgTable("current_timestamp", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const restaurants = pgTable("restaurants", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	logoLink: text("logo_link"),
});

export const reservations = pgTable("reservations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tableId: uuid("table_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	startDate: timestamp("start_date", { withTimezone: true, mode: 'string' }).notNull(),
	endDate: timestamp("end_date", { withTimezone: true, mode: 'string' }).notNull(),
	status: text(),
	fromRestaurants: uuid("from_restaurants"),
}, (table) => [
	foreignKey({
			columns: [table.fromRestaurants],
			foreignColumns: [restaurants.id],
			name: "reservations_from_restaurants_fkey"
		}),
	foreignKey({
			columns: [table.tableId],
			foreignColumns: [tables.id],
			name: "reservations_table_id_fkey"
		}),
]);

export const tables = pgTable("tables", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	qrlink: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	lastchanged: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
	expiresIn: timestamp("expires_in", { withTimezone: true, mode: 'string' }).defaultNow(),
	fromRestaurant: uuid("from_restaurant").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.fromRestaurant],
			foreignColumns: [restaurants.id],
			name: "tables_from_restaurant_fkey"
		}),
]);

export const venueTypes = pgTable("venue_types", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	type: venueType().notNull(),
	photoUrl: text("photo_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	userId: uuid("user_id").defaultRandom().primaryKey().notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text().notNull(),
	password: text(),
	phoneNumber: text("phone_number"),
	gender: text(),
	age: smallint(),
	profilePhotoUrl: text("profile_photo_url"),
	subscriptionId: text("subscription_id"),
	googleId: text("google_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	facebookUrl: text("facebook_url"),
	instagramUrl: text("instagram_url"),
	reviews: smallint(),
	reservations: text(),
	geatme: text(),
	geatCoins: text("geat_coins"),
	notifications: text(),
	birthDate: date("birth_date"),
	preferences: text(),
	geolocation: text(),
	isVerified: boolean("is_verified"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	language: text(),
});

export const venues = pgTable("venues", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	type: venueType().notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	description: text(),
});
