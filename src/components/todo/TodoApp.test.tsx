import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "./TodoApp";

test("updates completed count when toggling todo items", () => {
  render(<TodoApp />);

  const input = screen.getByPlaceholderText(/add a task/i);
  const addButton = screen.getByRole("button", { name: /add/i });

  userEvent.type(input, "Test todo");
  userEvent.click(addButton);

  // Initially shows 0 completed
  expect(screen.getByText(/1 total · 0 completed/i)).toBeInTheDocument();

  // Toggle the todo to completed
  const checkbox = screen.getByRole("checkbox");
  userEvent.click(checkbox);

  // Should show 1 completed
  expect(screen.getByText(/1 total · 1 completed/i)).toBeInTheDocument();
});

test("removes todo items when clicking remove button", () => {
  render(<TodoApp />);

  const input = screen.getByPlaceholderText(/add a task/i);
  const addButton = screen.getByRole("button", { name: /add/i });

  // Add two todos
  userEvent.type(input, "First todo");
  userEvent.click(addButton);

  userEvent.clear(input);
  userEvent.type(input, "Second todo");
  userEvent.click(addButton);

  // Should show 2 total
  expect(screen.getByText(/2 total · 0 completed/i)).toBeInTheDocument();
  expect(screen.getByText("First todo")).toBeInTheDocument();
  expect(screen.getByText("Second todo")).toBeInTheDocument();

  // Remove first todo
  const removeButtons = screen.getAllByRole("button", { name: /remove todo/i });
  userEvent.click(removeButtons[0]);

  // Should show 1 total and only second todo
  expect(screen.getByText(/1 total · 0 completed/i)).toBeInTheDocument();
  expect(screen.queryByText("First todo")).not.toBeInTheDocument();
  expect(screen.getByText("Second todo")).toBeInTheDocument();
});

// TODO: Implement these tests

test("shows empty state when no todos exist", () => {
  throw new Error("Not implemented");
});

test("adds todo and clears input after submission", () => {
  throw new Error("Not implemented");
});
