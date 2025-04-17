import { relations } from "drizzle-orm/relations";
import { restaurants, tables, reservations } from "./schema";

export const tablesRelations = relations(tables, ({one, many}) => ({
	restaurant: one(restaurants, {
		fields: [tables.fromRestaurant],
		references: [restaurants.id]
	}),
	reservations: many(reservations),
}));

export const restaurantsRelations = relations(restaurants, ({many}) => ({
	tables: many(tables),
	reservations: many(reservations),
}));

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