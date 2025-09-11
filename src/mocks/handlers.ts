import { rest } from "msw";

// In-memory store to simulate a backend DB for todos
type TodoItem = { id: string; text: string; done: boolean };
let todos: TodoItem[] = [
  { id: "1", text: "Read the README", done: true },
  { id: "2", text: "Build a small feature", done: false },
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const handlers = [
  // Health check
  rest.get("/health", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ok: true }));
  }),

  // List todos
  rest.get("/api/todos", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  // Create a todo
  rest.post("/api/todos", async (req, res, ctx) => {
    try {
      const body = (await req.json()) as Partial<Pick<TodoItem, "text">>;
      const text = (body?.text ?? "").trim();
      if (!text) {
        return res(
          ctx.status(400),
          ctx.json({ error: "Field 'text' is required" })
        );
      }

      const newTodo: TodoItem = { id: generateId(), text, done: false };
      todos = todos.concat(newTodo);
      return res(ctx.status(201), ctx.json(newTodo));
    } catch {
      return res(ctx.status(400), ctx.json({ error: "Invalid JSON body" }));
    }
  }),

  // Toggle or update a todo (done flag) via PATCH
  rest.patch("/api/todos/:id", async (req, res, ctx) => {
    const { id } = req.params as { id: string };

    let payload: Partial<Pick<TodoItem, "done" | "text">> = {};
    try {
      payload = (await req.json()) as Partial<Pick<TodoItem, "done" | "text">>;
    } catch {
      // Allow empty body to mean toggle
    }

    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) {
      return res(ctx.status(404), ctx.json({ error: "Not found" }));
    }

    const current = todos[idx];
    const nextDone =
      typeof payload.done === "boolean" ? payload.done : current.done;
    const nextText =
      typeof payload.text === "string" && payload.text.trim()
        ? payload.text.trim()
        : current.text;

    const updated: TodoItem = { ...current, done: nextDone, text: nextText };
    todos = [...todos.slice(0, idx), updated, ...todos.slice(idx + 1)];
    return res(ctx.status(200), ctx.json(updated));
  }),

  // Delete a todo
  rest.delete("/api/todos/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const exists = todos.some((t) => t.id === id);
    if (!exists) {
      return res(ctx.status(404), ctx.json({ error: "Not found" }));
    }
    todos = todos.filter((t) => t.id !== id);
    return res(ctx.status(204));
  }),
];

// Utility only used in tests to reset seed state if needed
export function __resetTodos(seed?: TodoItem[]): void {
  todos = Array.isArray(seed)
    ? seed.map((t) => ({ ...t }))
    : [
        { id: "1", text: "Read the README", done: true },
        { id: "2", text: "Build a small feature", done: false },
      ];
}
