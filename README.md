# Frontend Technical Interview - Todo App

A toy application for a technical interview using comparable stack as our main frontend project.

Please complete as many of the tasks below as you can. When finished, submit pull request(s) to the main branch.

## Setup

To get started, run the following commands:

  ```bash
  npm install
  npm start
  npm test
  ```

The app will be available at <http://localhost:5173>.

---

## Tasks

### Add a Feature

- Add an optional due date to the todo item

### Styling

- Update the todo list to have a responsive design

### Refactoring

- Replace local app state with React Query using the `/api/todos` endpoint
- Refactor the `TodoList` component by extracting a `TodoItem` component

### Bugs to Fix

Tests that are currently failing:

- **Remove button bug**: Items are not removed when clicking the remove button
- **Completed count bug**: Completed count doesn't update when toggling todo items

### Tests to Implement

- Implement the 2 missing unit tests in `TodoApp.test.tsx`

---

## Docs

### API

The following endpoints are mocked in `src/mocks/handlers.ts`:

#### `GET /api/todos`

- **Description:** Fetch all todo items.
- **Response:**  
  `200 OK`  
  Returns an array of todo objects:  

  ```json
  [
    {
      "id": string,
      "text": string,
      "completed": boolean
    },
    ...
  ]
  ```

#### `POST /api/todos`

- **Description:** Create a new todo item.
- **Request Body:**  

  ```json
  {
    "text": string
  }
  ```

- **Response:**  
  `201 Created`  
  Returns the created todo object.

#### `PATCH /api/todos/:id`

- **Description:** Update a todo item (e.g., toggle completed status or edit text).
- **Request Body:**  
  Partial todo object with fields to update, e.g.:  

  ```json
  {
    "completed": boolean
  }
  ```

- **Response:**  
  `200 OK`  
  Returns the updated todo object.

#### `DELETE /api/todos/:id`

- **Description:** Delete a todo item by ID.
- **Response:**  
  `200 OK`  
  Returns an empty object or confirmation message.
