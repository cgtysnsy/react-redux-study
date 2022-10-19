import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../stores/todo";
import { nanoid } from "nanoid";

export default function AddTodo() {
  //this state is local, we dont need it global
  const [todoLocal, setTodoLocal] = useState("");
  //const { todos } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        title: todoLocal,
        done: false,
        id: nanoid(),
        user: user.username,
        userid: user.id,
      })
    );
  };
  return (
    <form onSubmit={submitHandler} className="add-form">
      <div className="container">
        <input
          type="text"
          value={todoLocal}
          onChange={(e) => setTodoLocal(e.target.value)}
          placeholder="Add todo"
        />
        <button type="submit" disabled={!todoLocal || !user}>
          Add
        </button>
      </div>
    </form>
  );
}
