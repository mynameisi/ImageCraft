import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertImageSchema, insertFilterSchema } from "@shared/schema";
import { ZodError } from "zod";

export function registerRoutes(app: Express): Server {
  // Error handling middleware for Zod validation
  const handleZodError = (err: ZodError) => {
    return { message: "Validation error", errors: err.errors };
  };

  // Upload an image
  app.post("/api/images", async (req, res) => {
    try {
      const image = insertImageSchema.parse(req.body);
      const created = await storage.createImage(image);
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(handleZodError(err));
      } else {
        res.status(500).json({ message: "Failed to create image" });
      }
    }
  });

  // Get all images
  app.get("/api/images", async (_req, res) => {
    try {
      const images = await storage.getAllImages();
      res.json(images);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch images" });
    }
  });

  // Get a single image
  app.get("/api/images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const image = await storage.getImage(id);
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.json(image);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch image" });
    }
  });

  // Save filter settings for an image
  app.post("/api/images/:id/filters", async (req, res) => {
    try {
      const imageId = parseInt(req.params.id);
      const image = await storage.getImage(imageId);
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }

      const filter = insertFilterSchema.parse({
        ...req.body,
        imageId
      });

      const created = await storage.createFilter(filter);
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(handleZodError(err));
      } else {
        res.status(500).json({ message: "Failed to save filter settings" });
      }
    }
  });

  // Get filters for an image
  app.get("/api/images/:id/filters", async (req, res) => {
    try {
      const imageId = parseInt(req.params.id);
      const filters = await storage.getFilters(imageId);
      res.json(filters);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch filters" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}