# Task Management API

A simple REST API built with Node.js, Express, TypeScript, and Prisma for managing a list of tasks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/idealab-assessment-api.git
    cd idealab-assessment-api
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env` file in the root of the project by copying the `.env.example` file. Then, update the `DATABASE_URL` with your PostgreSQL password.

    ```bash
    cp .env.example .env
    ```

    Your `.env` file should look like this:
    ```env
    DATABASE_URL="postgresql://postgres:your_password@localhost:5432/idealab_assessment?schema=public"
    PORT=3000
    ```

4.  **Run database migrations**

    This will create the `Task` table in your database.

    ```bash
    npm run prisma:migrate
    ```

## Usage

### Running the application

-   **Development mode:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000` and will automatically restart on file changes.

-   **Production mode:**
    First, build the project:
    ```bash
    npm run build
    ```
    Then, start the server:
    ```bash
    npm start
    ```

## API Endpoints

Here is a summary of the available endpoints.

| Method  | Endpoint                | Description                  |
| :------ | :---------------------- | :--------------------------- |
| `GET`   | `/tasks`                | Get all tasks                |
| `POST`  | `/tasks`                | Create a new task            |
| `PUT`   | `/tasks/:id`            | Update a task by ID          |
| `DELETE`| `/tasks/:id`            | Delete a task by ID          |
| `PATCH` | `/tasks/:id/completed`  | Toggle a task's `completed` status |

### `GET /tasks`

Returns a list of all tasks.

-   **Success Response (`200 OK`):**
    ```json
    [
      {
        "id": 1,
        "title": "Buy groceries",
        "completed": false
      }
    ]
    ```

### `POST /tasks`

Creates a new task.

-   **Request Body:**
    ```json
    {
      "title": "My new task"
    }
    ```
-   **Success Response (`201 Created`):**
    ```json
    {
      "id": 2,
      "title": "My new task",
      "completed": false
    }
    ```

### `PUT /tasks/:id`

Updates an existing task.

-   **Request Body:**
    ```json
    {
      "title": "My updated task",
      "completed": true
    }
    ```
-   **Success Response (`200 OK`):**
    ```json
    {
      "id": 1,
      "title": "My updated task",
      "completed": true
    }
    ```

### `DELETE /tasks/:id`

Deletes a task.

-   **Success Response (`204 No Content`):**

### `PATCH /tasks/:id/completed`

Toggles the completion status of a task.

-   **Success Response (`200 OK`):**
    ```json
    {
      "id": 1,
      "title": "My updated task",
      "completed": false
    }
    ```