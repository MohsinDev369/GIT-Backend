import { relations } from "drizzle-orm/relations";
import { users, reviews, venues, tables, views, events, restaurants, reservations, promotions, venueInfo, tasteOfTheDay } from "./schema";

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
	venueInfos: many(venueInfo),
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

export const tablesRelations = relations(tables, ({one, many}) => ({
	views: many(views),
	reservations: many(reservations),
	restaurant: one(restaurants, {
		fields: [tables.fromRestaurant],
		references: [restaurants.id]
	}),
}));

export const eventsRelations = relations(events, ({one}) => ({
	venue: one(venues, {
		fields: [events.venueId],
		references: [venues.id]
	}),
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
	user: one(users, {
		fields: [reservations.userId],
		references: [users.userId]
	}),
	venue: one(venues, {
		fields: [reservations.venueId],
		references: [venues.id]
	}),
}));

export const restaurantsRelations = relations(restaurants, ({many}) => ({
	reservations: many(reservations),
	tables: many(tables),
}));

export const promotionsRelations = relations(promotions, ({one}) => ({
	venue: one(venues, {
		fields: [promotions.venueId],
		references: [venues.id]
	}),
}));

export const venueInfoRelations = relations(venueInfo, ({one}) => ({
	venue: one(venues, {
		fields: [venueInfo.venueId],
		references: [venues.id]
	}),
}));

export const tasteOfTheDayRelations = relations(tasteOfTheDay, ({one}) => ({
	venue: one(venues, {
		fields: [tasteOfTheDay.venueId],
		references: [venues.id]
	}),
}));