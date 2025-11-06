import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { tasksRouter } from "./routes/tasks";
import { errorHandler } from "./middleware/errorHandler";
import { prisma } from "./prisma";
import { HttpError } from "./types";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/tasks", tasksRouter);

// Health check endpoint for Render
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// 404 handler for unmatched routes
app.use((req: Request, _res: Response, next: NextFunction) => {
  const err = new Error(`Route not found: ${req.method} ${req.path}`);
  // Pass to error handler with a 404 status via HttpError-like object
  (err as HttpError).status = 404;
  next(err);
});

// Error handling middleware
app.use(errorHandler);

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

void start();