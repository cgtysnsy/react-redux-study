import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../stores/todo";
export default function EditTodo({ data, close }) {
  //two ways, call data
  //const { data } = useSelector((state) => state.modal);

  const [todo, setTodo] = useState(data.title);
  const [done, setDone] = useState(data.done);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    console.log(done);
    e.preventDefault();
    dispatch(
      editTodo({
        id: data.id,
        title: todo,
        done,
      })
    );
    close();
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <br />
        <label>
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
          Done
        </label>
        <button type="submit">Save</button>
      </form>
      <button onClick={close}>Close</button>
    </div>
  );
}
