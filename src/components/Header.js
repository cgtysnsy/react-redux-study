import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../stores/auth";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginHandler = (user) => {
    dispatch(login(user));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="header">
      <img src="images/logo.jpg" alt="logo" className="logo" />

      {!user && (
        <nav>
          <button
            onClick={() => loginHandler({ id: 1, username: "This is user 1" })}
          >
            Login user 1
          </button>
          <button
            onClick={() => loginHandler({ id: 2, username: "This is user 2" })}
          >
            Login user 2
          </button>
        </nav>
      )}
      {user && (
        <nav>
          <p>Wellcome, {user.username}</p>
          <button onClick={() => logoutHandler()}>Log out</button>
        </nav>
      )}
    </div>
  );
}
