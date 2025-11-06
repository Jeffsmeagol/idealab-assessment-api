import { Request, Response, NextFunction } from "express";
import { HttpError } from "../types";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const defaultStatus = 500;
  const defaultMessage = "Internal Server Error";

  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  if (err instanceof Error) {
    res.status(defaultStatus).json({ error: err.message || defaultMessage });
    return;
  }

  res.status(defaultStatus).json({ error: defaultMessage });
}