import { relations } from "drizzle-orm/relations";
import { users, reviews, venues, tables, views, events, reservations, promotions, tasteOfTheDay } from "./schema";

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
	views: many(views),
	reservations: many(reservations),
}));

export const venuesRelations = relations(venues, ({many}) => ({
	reviews: many(reviews),
	views: many(views),
	events: many(events),
	reservations: many(reservations),
	promotions: many(promotions),
	tasteOfTheDays: many(tasteOfTheDay),
}));

export const viewsRelations = relations(views, ({one}) => ({
	table: one(tables, {
		fields: [views.tableId],
		references: [tables.id]
	}),
	user: one(users, {
		fields: [views.userId],
		references: [users.userId]
	}),
	venue: one(venues, {
		fields: [views.venueId],
		references: [venues.id]
	}),
}));

export const tablesRelations = relations(tables, ({many}) => ({
	views: many(views),
	reservations: many(reservations),
}));

export const eventsRelations = relations(events, ({one}) => ({
	venue: one(venues, {
		fields: [events.venueId],
		references: [venues.id]
	}),
}));

export const reservationsRelations = relations(reservations, ({one}) => ({
	table: one(tables, {
		fields: [reservations.tableId],
		references: [tables.id]
	}),
	user: one(users, {
		fields: [reservations.userId],
		references: [users.userId]
	}),
	venue: one(venues, {
		fields: [reservations.venueId],
		references: [venues.id]
	}),
}));

export const promotionsRelations = relations(promotions, ({one}) => ({
	venue: one(venues, {
		fields: [promotions.venueId],
		references: [venues.id]
	}),
}));

export const tasteOfTheDayRelations = relations(tasteOfTheDay, ({one}) => ({
	venue: one(venues, {
		fields: [tasteOfTheDay.venueId],
		references: [venues.id]
	}),
}));