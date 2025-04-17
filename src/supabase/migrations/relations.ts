import { relations } from "drizzle-orm/relations";
import { restaurants, reservations, tables } from "./schema";

export const reservationsRelations = relations(reservations, ({one}) => ({
	restaurant: one(restaurants, {
		fields: [reservations.fromRestaurants],
		references: [restaurants.id]
	}),
	table: one(tables, {
		fields: [reservations.tableId],
		references: [tables.id]
	}),
}));

export const restaurantsRelations = relations(restaurants, ({many}) => ({
	reservations: many(reservations),
	tables: many(tables),
}));

export const tablesRelations = relations(tables, ({one, many}) => ({
	reservations: many(reservations),
	restaurant: one(restaurants, {
		fields: [tables.fromRestaurant],
		references: [restaurants.id]
	}),
}));