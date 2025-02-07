import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  data: text("data").notNull(), // Base64 encoded image data
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const filters = pgTable("filters", {
  id: serial("id").primaryKey(),
  imageId: integer("image_id").references(() => images.id).notNull(),
  settings: jsonb("settings").notNull(), // Store filter settings as JSON
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertImageSchema = createInsertSchema(images).omit({ id: true });
export const insertFilterSchema = createInsertSchema(filters).omit({ id: true });

export type InsertImage = z.infer<typeof insertImageSchema>;
export type InsertFilter = z.infer<typeof insertFilterSchema>;
export type Image = typeof images.$inferSelect;
export type Filter = typeof filters.$inferSelect;