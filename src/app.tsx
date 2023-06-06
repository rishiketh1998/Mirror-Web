import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";
import type { Todo } from "./types/interfaces/todo";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const fetchAllTodos = async (filter: string) => {
    try {
      let url = "api/todos";
      if (filter) {
        url = `${url}?completed=${filter === "completed" ? "true" : "false"}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      //error handling
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await fetch("api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodo }),
      });
      const data = await response.json();
      setTodos(data);
      setNewTodo("");
    } catch (error) {
      //error handling
    }
  };

  useEffect(() => {
    fetchAllTodos(filter);
  }, [filter]);

  return (
    <div>
      <h2>Filters</h2>
      <div
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            margin: "10px",
          }}
        >
          <label htmlFor="active">Active</label>
          <input
            type="radio"
            id="active"
            name="radio"
            onChange={(e) => setFilter(e.target.id)}
          />
        </div>
        <div
          style={{
            margin: "10px",
          }}
        >
          <label htmlFor="completed">Completed</label>
          <input
            type="radio"
            id="completed"
            name="radio"
            onChange={(e) => setFilter(e.target.id)}
          />
        </div>
      </div>
      <h2>Todo List</h2>
      <TodoList todos={todos} setTodos={setTodos} />
      <div>
        <h2>Add Todo</h2>
        <input
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}
