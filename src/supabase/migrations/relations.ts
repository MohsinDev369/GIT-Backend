import { relations } from "drizzle-orm/relations";
import { users, reviews, venues, restaurants, reservations, tables, events } from "./schema";

export const reviewsRelations = relations(reviews, ({one}) => ({
	user: one(users, {
		fields: [reviews.userId],
		references: [users.userId]
	}),
	venue: one(venues, {
		fields: [reviews.venueId],
		references: [venues.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	reviews: many(reviews),
}));

export const venuesRelations = relations(venues, ({many}) => ({
	reviews: many(reviews),
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

export const eventsRelations = relations(events, ({ one }) => ({
	venue: one(venues, {
	  fields: [events.venue_id],
	  references: [venues.id],
	}),
  }));