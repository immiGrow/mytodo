import { useState, useEffect } from "react";
import { SiTodoist } from "react-icons/si";
import { v4 as uuidv4 } from "uuid";
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import "./App.css";
import Navbar from "./Components/Navbar";
import Todo from "./Components/Todo";

function App() {
  function getFormattedDateWithDay() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = now.getFullYear();

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = daysOfWeek[now.getDay()];

    return `${day}-${month}-${year} ${weekday}`;
  }

  const [todo, setTodo] = useState({
    id: "",
    todo: "",
    isDone: false,
    isDate: getFormattedDateWithDay(),
  });
  const [todos, setTodos] = useState([]);
  const [showDone, setShowDone] = useState(false);

  // const [fake, setFake] = useState(false);
 const updateTodos = (updatedTodos) => {
  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};


 // Load todos from localStorage on first load
useEffect(() => {
  const todoString = localStorage.getItem("todos");
  if (todoString) {
    try {
      setTodos(JSON.parse(todoString));
    } catch (e) {
      console.error("Failed to parse todos from localStorage", e);
    }
  }
}, []);



  const handleChange = (e) => {
    setTodo((prev) => ({
      ...prev,
      todo: e.target.value,
    }));
  };

  const addTodo = () => {
  if (todo.todo.trim().length > 0) {
    const newTodo = {
      id: uuidv4(),
      todo: todo.todo,
      isDate: getFormattedDateWithDay(),
      isDone: false,
    };
  updateTodos([...todos, newTodo]);
    setTodo({
      id: "",
      todo: "",
      isDone: false,
      isDate: getFormattedDateWithDay(),
    });
  }
};


const handleComplete = (id) => {
  const updatedTodos = todos.map((item) =>
    item.id === id ? { ...item, isDone: true } : item
  );
  updateTodos(updatedTodos);
};

const deleteTodo = (id) => {
  const updatedTodos = todos.filter((item) => item.id !== id);
  updateTodos(updatedTodos);
};

  const filterTodos = todos.filter((item) => item.isDone === showDone);

const editTodo = (id) => {
  const toEdit = todos.find((t) => t.id === id);
  if (toEdit) {
    setTodo({
      id: toEdit.id,
      todo: toEdit.todo,
      isDone: false,
      isDate: getFormattedDateWithDay(),
    });
    deleteTodo(id); // this will trigger setTodos and save
  }
};

  return (
    <>
      <Navbar />
      <div className="container  mx-auto max-w-[100vw] lg:max-w-[50vw] p-2 sm:p-4">
        <div className="current-todo flex flex-col items-center ">
          <div className="add-todo w-full flex gap-2">
            {/* <form className='flex gap-2' onSubmit={addTodo}> */}

            <input
              type="text"
              onChange={handleChange}
              value={todo.todo}
              className="outline-none w-full px-3 text-slate-900 border-b border-slate-500"
              placeholder="add todo ..."
            />
            <button
              type="submit"
              onClick={addTodo}
              className="cursor-pointer bg-[#bb343c] text-[#ede4df] px-3 py-1 text-sm sm:px-4 sm:py-2 rounded-3xl font-bold"
            >
              Add
            </button>
            {/* </form> */}
          </div>
          <h1 className="font-bold text-2xl text-slate-900 mt-5">Your Todos</h1>
          {/* Completed Todos */}
          <div className="done-todos flex justify-end w-full my-4">
            {
              <button
                onClick={() => setShowDone(!showDone)}
                className="text-[9px] sm:text-xs font-semibold bg-[#ea7b86] px-3 py-1 rounded-xl flex items-center gap-1.5 hover:bg-[#f06774] cursor-pointer text-slate-950"
              >
                <SiTodoist />{" "}
                <span>
                  {" "}
                  {showDone ? "Current Todos" : "Show Completed Todos"}
                </span>
              </button>
            }
          </div>
          <div className="todos space-y-6 max-h-[70vh] overflow-y-auto w-full">
            {filterTodos.length > 0 ? (
              filterTodos.map((item) => {
                console.log("todo", item);
                return (
                  <Todo
                    item={item}
                    handleComplete={handleComplete}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                  />
                );
              })
            ) : (
              <div className="flex justify-center">
                <img className="w-80" src="no-todo.jpg" alt="no todos" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
