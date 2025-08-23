import { pgTable, foreignKey, uuid, numeric, text, timestamp, check, doublePrecision, boolean, time, real, integer, date, smallint, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// Updated cuisine types from PDF
export const cuisineType = pgEnum("cuisine_type", [
  'african', 'american', 'english', 'arabic', 'argentinian', 'armenian', 'austrian', 
  'asian', 'middle_eastern', 'brazilian', 'chinese', 'croatian', 'montenegrin', 
  'czech', 'estonian', 'european', 'finnish', 'french', 'fusion', 'greek', 
  'georgian', 'spanish', 'dutch', 'indonesian', 'indian', 'israeli', 'japanese', 
  'korean', 'cuban', 'lebanese', 'mexican', 'international', 'german', 'polish', 
  'portuguese', 'serbian', 'slovenian', 'mediterranean', 'syrian', 'thai', 
  'turkish', 'ukrainian', 'uzbek', 'hungarian', 'vietnamese', 'italian'
])

// Poznań neighborhoods
export const neighborhood = pgEnum("neighborhood", [
  'antoninek_zieliniec_kobylepole', 'chartowo', 'fabianowo_kotowo', 'glowna', 
  'gluszyna', 'gorczyn', 'grunwald_poludnie', 'grunwald_polnoc', 'jezyce', 
  'junikowo', 'kiekrz', 'krzesiny_pokrzywno_garaszewo', 'krzyzowniki_smochowice', 
  'kwiatowe', 'lawica', 'morasko_radojewo', 'naramowice', 'nowe_winogrady_poludnie', 
  'nowe_winogrady_polnoc', 'nowe_winogrady_wschod', 'ogrody', 
  'ostrow_tumski_srodka_zawady_komandoria', 'piatkovo', 'piatkovo_polnoc', 
  'podolany', 'rataje', 'solacz', 'stare_miasto', 'stare_winogrady', 
  'staroleka_minikowo_marlewo', 'stary_grunwald', 'strzeszyn', 
  'szczepankowo_splawie_krzesinki', 'swierczewo', 'sw_lazarz', 'umultowo', 
  'warszawskie_pomet_maltanskie', 'wilda', 'winiary', 'wola', 'zielony_debiec', 'zegrze'
])

// Availability options
export const availability = pgEnum("availability", [
  'open_now', 'happy_hours', 'events_today', 'tables_available_tonight', 
  'breakfast_served_until_12'
])

// Amenities - general
export const amenity = pgEnum("amenity", [
  // Breakfast/Cafes
  'fast_service', 'specialty_coffee', 'breakfast_menu', 'veg_vegan_options', 
  'laptop_friendly', 'quiet_atmosphere', 'free_wifi', 'outlets_at_tables', 
  'good_for_meetings', 'homemade_cakes', 'weekend_brunch', 'freshly_baked_goods', 
  'all_day_breakfast', 'child_friendly', 'pet_water_bowl', 'pets_friendly', 
  'terrace_patio', 'books_magazines', 'table_reservations',
  
  // Restaurants
  'table_service', 'wine_list', 'tasting_menu', 'online_booking', 
  'multilingual_staff', 'cozy_interior', 'seasonal_menu', 'gluten_free_options', 
  'local_dishes', 'open_kitchen', 'sommelier', 'kids_menu', 'play_corner', 
  'live_music', 'private_rooms', 'vip_area', 'guest_parking', 'group_reservations',
  
  // Pubs
  'happy_hour', 'craft_beer', 'rotating_taps', 'pub_quizzes', 'sports_screenings', 
  'darts_pool', 'karaoke_nights', 'live_dj', 'daily_drink_specials', 'themed_shots', 
  'board_games', 'dance_zone', 'beer_garden', 'photo_booth', 'late_night', 
  'free_water', 'smoking_area',
  
  // Clubs
  'guest_list', 'vip_lounge', 'cloakroom', 'signature_cocktails', 'booth_reservations', 
  'resident_dj', 'themed_events', 'light_shows', 'afterparties', 'chill_zone', 
  'security_staff', 'skip_the_line', 'free_entry_before_10pm', 'qr_code_entry', 
  'free_shots_via_app', 'selfie_zone',
  
  // PlayZone
  'bowling_lanes', 'darts', 'arcade_machines', 'vr_simulators', 'escape_rooms', 
  'private_karaoke', 'retro_arcade_zone', 'slot_car_racing', 'air_hockey', 
  'snack_bar', 'birthday_packages', 'open_bar', 'chill_area_beanbags', 
  'dj_gaming', 'prize_tournaments', 'game_happy_hour', 'party_menu', 'free_popcorn'
])

// Occasions/Vibe
export const occasion = pgEnum("occasion", [
  'for_a_date', 'birthday', 'bachelorette_party', 'quiet_place', 'live_music', 
  'great_for_groups', 'after_work_drinks', 'romantic_sunset', 'girls_night_out', 
  'guys_night_out', 'party_mood', 'chill_vibes', 'candlelight_dinner', 
  'fun_games', 'family_friendly', 'dog_friendly', 'celebration_spot', 
  'work_friendly', 'business_meeting', 'weekend_brunch', 'instagrammable', 
  'karaoke_night', 'dj_dancing', 'game_night_trivia', 'outdoor_seating', 
  'themed_events', 'live_dj_set', 'club_night', 'study_friendly'
])

// Seating options
export const seatingOption = pgEnum("seating_option", [
  'standard', 'bar', 'counter', 'hightop', 'outdoor', 'booth', 'lounge_sofa', 
  'communal_table', 'window_seat', 'private_room', 'patio', 'rooftop', 'garden', 
  'firepit_seating', 'hammocks', 'beanbags_chill_zone', 'swing_chairs', 
  'stage_side_seating', 'couples_corner', 'hammock_chairs'
])

export const tableStatus = pgEnum("table_status", ['available', 'occupied', 'reserved', 'unavailable'])
export const venueType = pgEnum("venue_type", ['breakfast', 'playzones', 'pubs', 'clubs', 'restaurants'])

// Table to track filter popularity
export const filterUsage = pgTable("filter_usage", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  filterType: text("filter_type").notNull(), // 'cuisine_type', 'amenity', 'occasion', etc.
  filterValue: text("filter_value").notNull(), // the actual enum value
  usageCount: integer("usage_count").default(0).notNull(),
  lastUsed: timestamp("last_used", { withTimezone: true, mode: 'string' }).defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
})

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
})

export const venues = pgTable("venues", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text().notNull(),
  latitude: doublePrecision().notNull(),
  longitude: doublePrecision().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  description: text(),
  price: numeric(),
  status: boolean().default(false),
  imgUrl: text("img_url"),
  allergens: text().array(),
  "3DUrl": text("3d_url"),
  tags: text(),
  email: text(),
  phoneNumber: numeric("phone_number"),
  type: venueType().array().notNull(),
  openingHours: timestamp("opening_hours", { mode: 'string' }),
  closingHours: time("closing_hours", { withTimezone: true }),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  cuisineType: cuisineType("cuisine_type"),
  avgRating: real("avg_rating"),
  totalRating: numeric("total_rating"),
  amenities: text().array(),
}, () => [
  check("venues_avg_rating_check", sql`avg_rating > (0)::double precision`),
  check("venues_price_check", sql`price > (0)::numeric`),
  check("venues_total_rating_check", sql`total_rating > (0)::numeric`),
])

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
])

export const views = pgTable("views", {
  id: uuid().defaultRandom().primaryKey().notNull(),
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
])

export const admin = pgTable("admin", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text().default('admin').notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  email: text().notNull(),
  password: text().notNull(),
})

export const events = pgTable("events", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  venueId: uuid("venue_id").notNull(),
  title: text().notNull(),
  description: text(),
  subTitle: text("sub_title"),
  startTime: timestamp("start_time", { withTimezone: true, mode: 'string' }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true, mode: 'string' }),
  date: text(),
  price: numeric({ precision: 10, scale: 2 }),
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
])

export const reservations = pgTable("reservations", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  tableId: uuid("table_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  startDate: timestamp("start_date", { withTimezone: true, mode: 'string' }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true, mode: 'string' }).notNull(),
  status: text(),
  fromRestaurants: uuid("from_restaurants"),
  userId: uuid("user_id"),
  venueId: uuid("venue_id"),
}, (table) => [
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
  foreignKey({
    columns: [table.venueId],
    foreignColumns: [venues.id],
    name: "reservations_venue_id_fkey"
  }),
])

export const tables = pgTable("tables", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  qrlink: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  lastchanged: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
  expiresIn: timestamp("expires_in", { withTimezone: true, mode: 'string' }).defaultNow(),
  fromRestaurant: uuid("from_restaurant").notNull(),
  status: tableStatus().default('available'),
})

export const currentTimestamp = pgTable("current_timestamp", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
})

export const venueTypes = pgTable("venue_types", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  type: venueType().notNull(),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
})

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
])

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
])

