CREATE TABLE IF NOT EXISTS "tables" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" smallint NOT NULL,
	"qrlink" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
