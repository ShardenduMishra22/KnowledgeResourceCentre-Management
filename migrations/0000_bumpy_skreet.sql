CREATE TYPE "public"."borrow_status" AS ENUM('BORROWED', 'RETURNED');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING', 'ACTIVE', 'INACTIVE', 'BLOCKED');--> statement-breakpoint
CREATE TABLE "books" (
	"available_copies" integer DEFAULT 0 NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"total_copies" integer NOT NULL,
	"description" text NOT NULL,
	"cover_color" text NOT NULL,
	"cover_url" text NOT NULL,
	"video_url" text NOT NULL,
	"rating" integer NOT NULL,
	"summary" text NOT NULL,
	"genre" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "books_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "borrow_records" (
	"borrow_date" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"status" "borrow_status" DEFAULT 'BORROWED' NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"due_date" date NOT NULL,
	"return_date" date,
	CONSTRAINT "borrow_records_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"last_activity_date" timestamp DEFAULT now(),
	"status" "status" DEFAULT 'PENDING' NOT NULL,
	"university_id" integer NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'USER' NOT NULL,
	"university_card" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_university_id_unique" UNIQUE("university_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;