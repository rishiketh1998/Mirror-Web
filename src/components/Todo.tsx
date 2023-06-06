import type { Todo as TodoType } from "../types/interfaces/todo";
import { useState } from "react";

export interface TodoProps {
  todo: TodoType;
  handleEdit: (
    id: string,
    body: {
      text: string;
      completed: boolean;
    }
  ) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export const Todo = (props: TodoProps) => {
  const { todo, handleEdit, handleDelete } = props;
  const [displayEdit, setDisplayEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<{
    text: string;
    completed: boolean;
  }>({
    text: todo.text,
    completed: todo.completed,
  });

  return (
    <tr>
      <td>{todo.id}</td>
      <td>
        {displayEdit ? (
          <input
            type="text"
            value={editTodo.text}
            onChange={(e) => {
              setEditTodo({
                ...editTodo,
                text: e.target.value,
              });
            }}
          />
        ) : (
          todo.text
        )}
      </td>
      <td>
        <input
          type="checkbox"
          defaultChecked={todo.completed}
          disabled={!displayEdit}
          onChange={(e) =>
            setEditTodo({
              ...editTodo,
              completed: e.target.checked,
            })
          }
        />
      </td>
      <td>{todo.createdAt}</td>
      <td onClick={() => setDisplayEdit(!displayEdit)}>
        <button
          style={{
            width: "100%",
            backgroundColor: "rgb(144, 202, 249)",
            padding: "5px",
            borderRadius: "5px",
            border: "none",
          }}
        >
          Edit
        </button>
      </td>
      <td onClick={() => handleDelete(todo.id)}>
        <button
          style={{
            width: "100%",
            backgroundColor: "rgb(244, 67, 54)",
            padding: "5px",
            borderRadius: "5px",
            border: "none",
          }}
        >
          Delete
        </button>
      </td>
      {displayEdit && (
        <td>
          <button
            onClick={() => {
              handleEdit(todo.id, editTodo);
              setDisplayEdit(!displayEdit);
            }}
            style={{
              width: "100%",
              backgroundColor: "#04AA6D",
              padding: "5px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Save
          </button>
        </td>
      )}
    </tr>
  );
};
