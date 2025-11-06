export interface TaskDTO {
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTaskBody {
  title: string;
  completed?: boolean;
}

export interface UpdateTaskBody {
  title?: string;
  completed?: boolean;
}

export interface IdParams {
  id: string;
}

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}