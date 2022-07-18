import { useState, useEffect } from "react";
import Alert from "./Alert";
import List from "./List";

import "./main.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const Main = () => {
  const [todo, setTodo] = useState(""),
    [todoList, setTodoList] = useState(getLocalStorage()),
    [isEditing, setisEditing] = useState(false),
    [todoID, setTodoID] = useState(null),
    [alert, setAlert] = useState({ shown: false, type: "", msg: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    if (!todo) {
      showAlert(true, "unsuccess", "Please enter todo!");
    } else if (todo && isEditing) {
      setTodoList(
        todoList.map((item) => {
          if (item.id === todoID) {
            return { ...item, title: todo };
          }
          return item;
        })
      );
      setTodo("");
      setTodoID(null);
      setisEditing(false);
      showAlert(true, "success", "Todo edited successfully!");
    } else {
      showAlert(true, "success", "Todo added successfully!");
      const newTodo = { id: new Date().getTime().toString(), title: todo };

      setTodoList([...todoList, newTodo]);
      setTodo("");
    }
  };

  const showAlert = (shown = false, type = "", msg = "") => {
    setAlert({shown, type, msg});
  };

  const clearTodoList = () => {
    showAlert(true, "unsuccess", "Todo list cleared!");
    setTodoList([]);
  };

  const removeTodo = (id) => {
    showAlert(true, "unsuccess", "Todo removed!");
    setTodoList(todoList.filter((todo) => todo.id != id));
  };

  const editTodo = (id) => {
    const markedTodo = todoList.find((todo) => todo.id == id);

    setisEditing(true);
    setTodoID(id);
    setTodo(markedTodo.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <section className="section-center">
      <form className="todo-form" onSubmit={submitHandler}>
        {alert.shown && <Alert {...alert} removeAlert={showAlert} list={todoList} />}
        <div className="form-control">
          <input
            type="text"
            className="todo"
            placeholder="Example: Running"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Enter"}
          </button>
        </div>
      </form>
      {todoList.length > 0 && (
        <div className="todo-container">
          <List list={todoList} removeTodo={removeTodo} editTodo={editTodo} />
          <button className="clear-btn" onClick={clearTodoList}>
            Clear Todo
          </button>
        </div>
      )}
    </section>
  );
};

export default Main;
