import { images, filters, type Image, type InsertImage, type Filter, type InsertFilter } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getImage(id: number): Promise<Image | undefined>;
  getAllImages(): Promise<Image[]>;
  createImage(image: InsertImage): Promise<Image>;
  getFilters(imageId: number): Promise<Filter[]>;
  createFilter(filter: InsertFilter): Promise<Filter>;
}

export class DatabaseStorage implements IStorage {
  async getImage(id: number): Promise<Image | undefined> {
    const [image] = await db.select().from(images).where(eq(images.id, id));
    return image;
  }

  async getAllImages(): Promise<Image[]> {
    return await db.select().from(images);
  }

  async createImage(insertImage: InsertImage): Promise<Image> {
    const [image] = await db
      .insert(images)
      .values(insertImage)
      .returning();
    return image;
  }

  async getFilters(imageId: number): Promise<Filter[]> {
    return await db.select().from(filters).where(eq(filters.imageId, imageId));
  }

  async createFilter(insertFilter: InsertFilter): Promise<Filter> {
    const [filter] = await db
      .insert(filters)
      .values(insertFilter)
      .returning();
    return filter;
  }
}

export const storage = new DatabaseStorage();