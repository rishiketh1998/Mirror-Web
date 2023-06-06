import { Todo } from "./Todo";
import type { Todo as TodoType } from "../types/interfaces/todo";

export interface TodoListProps {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export const TodoList = ({ todos, setTodos }: TodoListProps) => {
  const handleEditTodo = async (
    id: string,
    body: {
      text: string;
      completed: boolean;
    }
  ): Promise<void> => {
    try {
      const response = await fetch(`api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      //error handling
    }
  };
  const handleDeleteTodo = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`api/todos/${id}`, {
        method: "DELETE",
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
  return (
    <table className="todolist">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Completed</th>
          <th>Created At</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleEdit={handleEditTodo}
            handleDelete={handleDeleteTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
