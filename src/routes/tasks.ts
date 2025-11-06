import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import { CreateTaskBody, UpdateTaskBody, IdParams, HttpError, TaskDTO } from "../types";

export const tasksRouter = Router();

// GET /tasks → Return all tasks
tasksRouter.get("/", async (_req: Request, res: Response<TaskDTO[]>, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "asc" },
      select: { id: true, title: true, completed: true },
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// POST /tasks → Add a new task
tasksRouter.post(
  "/",
  async (
    req: Request<unknown, TaskDTO, CreateTaskBody>,
    res: Response<TaskDTO>,
    next: NextFunction
  ) => {
    try {
      const { title, completed = false } = req.body;
      if (typeof title !== "string" || title.trim().length === 0) {
        throw new HttpError(400, "Title is required");
      }

      const created = await prisma.task.create({
        data: { title: title.trim(), completed },
        select: { id: true, title: true, completed: true },
      });
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }
);

// PUT /tasks/:id → Update a task by ID
tasksRouter.put(
  "/:id",
  async (
    req: Request<IdParams, TaskDTO, UpdateTaskBody>,
    res: Response<TaskDTO>,
    next: NextFunction
  ) => {
    try {
      const idNum = Number(req.params.id);
      if (!Number.isInteger(idNum)) {
        throw new HttpError(400, "Invalid task id");
      }

      const { title, completed } = req.body;
      const data: { title?: string; completed?: boolean } = {};
      if (title !== undefined) {
        if (typeof title !== "string" || title.trim().length === 0) {
          throw new HttpError(400, "Title must be a non-empty string");
        }
        data.title = title.trim();
      }
      if (completed !== undefined) {
        if (typeof completed !== "boolean") {
          throw new HttpError(400, "Completed must be a boolean");
        }
        data.completed = completed;
      }

      const existing = await prisma.task.findUnique({ where: { id: idNum } });
      if (!existing) {
        throw new HttpError(404, "Task not found");
      }

      const updated = await prisma.task.update({
        where: { id: idNum },
        data,
        select: { id: true, title: true, completed: true },
      });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /tasks/:id → Delete a task by ID
tasksRouter.delete(
  "/:id",
  async (req: Request<IdParams>, res: Response, next: NextFunction) => {
    try {
      const idNum = Number(req.params.id);
      if (!Number.isInteger(idNum)) {
        throw new HttpError(400, "Invalid task id");
      }

      const existing = await prisma.task.findUnique({ where: { id: idNum } });
      if (!existing) {
        throw new HttpError(404, "Task not found");
      }

      await prisma.task.delete({ where: { id: idNum } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// PATCH /tasks/:id/completed → Toggle completed
tasksRouter.patch(
  "/:id/completed",
  async (req: Request<IdParams, TaskDTO>, res: Response<TaskDTO>, next: NextFunction) => {
    try {
      const idNum = Number(req.params.id);
      if (!Number.isInteger(idNum)) {
        throw new HttpError(400, "Invalid task id");
      }

      const existing = await prisma.task.findUnique({ where: { id: idNum } });
      if (!existing) {
        throw new HttpError(404, "Task not found");
      }

      const updated = await prisma.task.update({
        where: { id: idNum },
        data: { completed: !existing.completed },
        select: { id: true, title: true, completed: true },
      });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);