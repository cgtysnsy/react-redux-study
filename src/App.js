import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

import "./App.css";

function App() {
  const { open: isModalOpen } = useSelector((state) => state.modal);

  return (
    <main>
      {isModalOpen && <Modal />}
      <Header />
      <AddTodo />
      <TodoList />
    </main>
  );
}

export default App;
