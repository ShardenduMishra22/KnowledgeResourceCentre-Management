import { date, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status",["PENDING","ACTIVE","INACTIVE","BLOCKED"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status",["BORROWED","RETURNED"]);
export const ROLE_ENUM = pgEnum("role",["USER","ADMIN"]);

export const users = pgTable("users",
    {
        id: uuid("id").notNull().primaryKey().unique().defaultRandom(),
        lastActivityDate: timestamp("last_activity_date").defaultNow(),
        status: STATUS_ENUM("status").default("PENDING").notNull(),
        universityId: integer("university_id").notNull().unique(),
        fullName: varchar("full_name",{length: 255}).notNull(),
        role: ROLE_ENUM("role").default("USER").notNull(),
        universityCard: text("university_card").notNull(),
        email: text("email").notNull().unique(),
        password: text("password").notNull(),
        createdAt: timestamp("created_at",{
            withTimezone: true,
        }).defaultNow().notNull(),
        updatedAt: timestamp("updated_at",{
            withTimezone: true,
        }).defaultNow().notNull(),
    }
)

export const books = pgTable("books",
    {
        availableCopies: integer("available_copies").notNull().default(0),
        id: uuid("id").notNull().primaryKey().unique().defaultRandom(),
        author: varchar("author",{ length: 255 }).notNull(),
        title: varchar("title",{ length: 255 }).notNull(),
        totalCopies: integer("total_copies").notNull(),
        description: text("description").notNull(),
        coverColor: text("cover_color").notNull(),
        coverUrl: text("cover_url").notNull(),
        videoUrl: text("video_url").notNull(),
        rating: integer("rating").notNull(),
        summary: text("summary").notNull(),
        genre: text("genre").notNull(),
        createdAt: timestamp("created_at",{
            withTimezone: true,
        }).defaultNow().notNull(),
    }
);

export const borrowRecords = pgTable("borrow_records", {
    borrowDate: timestamp("borrow_date", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    bookId: uuid("book_id").references(() => books.id).notNull(),
    dueDate: date("due_date").notNull(),
    returnDate: date("return_date"),
});
