import { pgTable, foreignKey, uuid, text, timestamp } from "drizzle-orm/pg-core"




export const tables = pgTable("tables", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	qrlink: text("qrlink").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	lastchanged: timestamp("lastchanged", { withTimezone: true, mode: 'string' }).defaultNow(),
	expiresIn: timestamp("expires_in", { withTimezone: true, mode: 'string' }).defaultNow(),
	fromRestaurant: uuid("from_restaurant").notNull(),
},
(table) => {
	return {
		tablesFromRestaurantFkey: foreignKey({
			columns: [table.fromRestaurant],
			foreignColumns: [restaurants.id],
			name: "tables_from_restaurant_fkey"
		}),
	}
});

export const reservations = pgTable("reservations", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	tableId: uuid("table_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	startDate: timestamp("start_date", { withTimezone: true, mode: 'string' }).notNull(),
	endDate: timestamp("end_date", { withTimezone: true, mode: 'string' }).notNull(),
	status: text("status"),
	fromRestaurants: uuid("from_restaurants"),
},
(table) => {
	return {
		reservationsFromRestaurantsFkey: foreignKey({
			columns: [table.fromRestaurants],
			foreignColumns: [restaurants.id],
			name: "reservations_from_restaurants_fkey"
		}),
		reservationsTableIdFkey: foreignKey({
			columns: [table.tableId],
			foreignColumns: [tables.id],
			name: "reservations_table_id_fkey"
		}),
	}
});

export const currentTimestamp = pgTable("current_timestamp", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const restaurants = pgTable("restaurants", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	logoLink: text("logo_link"),
});

export const admin = pgTable("admin", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
});