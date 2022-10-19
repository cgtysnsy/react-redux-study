import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../stores/todo";
import { openModal } from "../stores/modalstore";

export default function TodoItem({ todo }) {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteTodo(todo.id));
  };

  const updateHandler = () => {
    dispatch(
      openModal({
        name: "edit-todo",
        data: todo,
      })
    );
  };

  return (
    <li key={todo.id}>
      <span style={{ textDecoration: todo.done ? "line-through" : false }}>
        {todo.title} - {todo.user}
      </span>
      {todo.userid === user.id && (
        <>
          <button onClick={updateHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </>
      )}
    </li>
  );
}
