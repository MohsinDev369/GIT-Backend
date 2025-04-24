import { pgTable, foreignKey, uuid, numeric, text, timestamp, boolean, integer, date, bigint, smallint, doublePrecision, time, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const tableStatus = pgEnum("table_status", ['available', 'occupied', 'reserved', 'unavailable'])
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

export const reservations = pgTable("reservations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tableId: uuid("table_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	startDate: timestamp("start_date", { withTimezone: true, mode: 'string' }).notNull(),
	endDate: timestamp("end_date", { withTimezone: true, mode: 'string' }).notNull(),
	status: text(),
	fromRestaurants: uuid("from_restaurants"),
	userId: uuid("user_id"),
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
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "reservations_user_id_fkey"
		}),
]);

export const events = pgTable("events", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	venueId: uuid("venue_id").notNull(),
	title: text().notNull(),
	description: text(),
	subTitle: text("sub_title"),
	startTime: timestamp("start_time", { withTimezone: true, mode: 'string' }).notNull(),
	endTime: timestamp("end_time", { withTimezone: true, mode: 'string' }),
	date: text(),
	price: numeric({ precision: 10, scale:  2 }),
	isTicketed: boolean("is_ticketed").default(false).notNull(),
	photoUrl: text("photo_url"),
	djInfo: text("dj_info"),
	locationDetails: text("location_details"),
	dressCode: text("dress_code"),
	reservationInfo: text("reservation_info"),
	contactInfo: text("contact_info"),
	ticketPurchaseUrl: text("ticket_purchase_url"),
	calendarEventUrl: text("calendar_event_url"),
	freeTables: integer("free_tables"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venues.id],
			name: "events_venue_id_venues_id_fk"
		}),
]);

export const tables = pgTable("tables", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	qrlink: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	lastchanged: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
	expiresIn: timestamp("expires_in", { withTimezone: true, mode: 'string' }).defaultNow(),
	fromRestaurant: uuid("from_restaurant").notNull(),
	status: tableStatus().default('available'),
}, (table) => [
	foreignKey({
			columns: [table.fromRestaurant],
			foreignColumns: [restaurants.id],
			name: "tables_from_restaurant_fkey"
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

export const venueTypes = pgTable("venue_types", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	type: venueType().notNull(),
	photoUrl: text("photo_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const promotions = pgTable("promotions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	venueId: uuid("venue_id").notNull(),
	discountCode: text("discount_code"),
	validFrom: timestamp("valid_from", { withTimezone: true, mode: 'string' }),
	validTo: timestamp("valid_to", { withTimezone: true, mode: 'string' }),
	targetAudience: text("target_audience"),
	photo: text(),
	title: text().notNull(),
	shortText: text("short_text"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venues.id],
			name: "promotions_venue_id_venues_id_fk"
		}),
]);

export const venueInfo = pgTable("venue_info", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	venueId: uuid("venue_id").notNull(),
	shortInfo: text("short_info"),
	email: text(),
	phoneNumber: text("phone_number"),
	numberOfStars: integer("number_of_stars"),
	openingHours: text("opening_hours"),
	facebookUrl: text("facebook_url"),
	instagramUrl: text("instagram_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venues.id],
			name: "venue_info_venue_id_venues_id_fk"
		}),
]);

export const tasteOfTheDay = pgTable("taste_of_the_day", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	venueId: uuid("venue_id").notNull(),
	date: date(),
	validFrom: timestamp("valid_from", { withTimezone: true, mode: 'string' }),
	validTo: timestamp("valid_to", { withTimezone: true, mode: 'string' }),
	photo: text(),
	infoTasteOfTheDay: text("info_taste_of_the_day"),
	description: text(),
	allergens: text(),
	worthKnowing: text("worth_knowing"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venues.id],
			name: "taste_of_the_day_venue_id_venues_id_fk"
		}),
]);

export const views = pgTable("views", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "views_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	userId: uuid("user_id"),
	venueId: uuid("venue_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	tableId: uuid("table_id"),
	reservationTime: timestamp("reservation_time", { withTimezone: true, mode: 'string' }),
	status: text(),
	"3DScan": text("3d_scan"),
	"2DScan": text("2d_scan"),
	payment: text(),
}, (table) => [
	foreignKey({
			columns: [table.tableId],
			foreignColumns: [tables.id],
			name: "views_table_id_fkey"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "views_user_id_fkey"
		}),
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venues.id],
			name: "views_venue_id_fkey"
		}),
]);

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
	allergens: time(),
	"3DUrl": text("3d_url"),
	tags: text(),
});
