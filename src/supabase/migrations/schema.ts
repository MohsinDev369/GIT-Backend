import { pgTable, foreignKey, uuid, numeric, text, timestamp, smallint, date, boolean, doublePrecision, integer, pgEnum } from "drizzle-orm/pg-core"


export const venueType = pgEnum("venue_type", ['breakfast', 'playzone', 'pub', 'club', 'restaurant'])


export const reviews = pgTable("reviews", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").defaultRandom(),
	venueId: uuid("venue_id"),
	rating: numeric(),
	comment: text(),
	replyFromVenue: text("reply_from_venue"),
	sentimentScore: numeric("sentiment_score"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "reviews_user_id_fkey"
		}),
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venues.id],
			name: "reviews_venue_id_fkey"
		}),
]);

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
	overallRating: numeric("overall_rating"),
	noOfRating: integer("no_of_rating"),
	price: numeric().notNull(),
	favorite: boolean().default(false).notNull(),
	status: boolean().default(false).notNull(),
	hasWifi: boolean("has_wifi").default(false),
	hasParking: boolean("has_parking").default(false),
	hasOutdoorSeating: boolean("has_outdoor_seating").default(false),
	acceptsCreditCards: boolean("accepts_credit_cards").default(false),
	hasLiveMusic: boolean("has_live_music").default(false),
	allowsLargeGroups: boolean("allows_large_groups").default(false),
	imgUrl: text("img_url"),
});

export const events = pgTable("events", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	venue_id: uuid().notNull().references(() => venues.id),
	title: text().notNull(),
	description: text(),
	sub_title: text(),
	start_time: timestamp("start_time", { withTimezone: true, mode: 'string' }).notNull(),
	end_time: timestamp("end_time", { withTimezone: true, mode: 'string' }),
	date: text(), // Formatted date for display
	price: numeric("price", { precision: 10, scale: 2 }),
	is_ticketed: boolean().default(false).notNull(),
	photo_url: text(),
	dj_info: text(),
	location_details: text(),
	dress_code: text(),
	reservation_info: text(),
	contact_info: text(),
	ticket_purchase_url: text(),
	calendar_event_url: text(),
	free_tables: integer(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  });

  export const promotions = pgTable("promotions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	venue_id: uuid().notNull().references(() => venues.id),
	discount_code: text(),
	valid_from: timestamp("valid_from", { withTimezone: true, mode: 'string' }),
	valid_to: timestamp("valid_to", { withTimezone: true, mode: 'string' }),
	target_audience: text(),
	photo: text(), // URL or path to image
	title: text().notNull(),
	short_text: text(), // Renamed from short_text_of_promotion for consistency
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  });

  export const venueInfo = pgTable("venue_info", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	venue_id: uuid().notNull().references(() => venues.id),
	short_info: text(),
	email: text(),
	phone_number: text(),
	number_of_stars: integer(),
	opening_hours: text(),
	facebook_url: text(),
	instagram_url: text(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  });

  export const tasteOfTheDay = pgTable("taste_of_the_day", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	venue_id: uuid().notNull().references(() => venues.id),
	date: date("date"),
	valid_from: timestamp("valid_from", { withTimezone: true, mode: 'string' }),
	valid_to: timestamp("valid_to", { withTimezone: true, mode: 'string' }),
	photo: text(),
	info: text("info_taste_of_the_day"),
	description: text(),
	allergens: text(),
	worth_knowing: text(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  });