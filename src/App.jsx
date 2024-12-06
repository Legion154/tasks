import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const inputVal = (e) => {
    setTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!task) {
      alert("Enter a new task");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: task,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setTask("");
  };

  const deleteTask = (id) => {
    setTaskToDelete(id);
    setLoading(true);
  };

  const confirmDelete = () => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(updatedTasks);
    setLoading(false);
    setAccept(false);
  };

  const cancelDelete = () => {
    setLoading(false);
    setAccept(false);
  };

  return (
    <main className="overflow-hidden relative selection:bg-emerald-500 selection:text-white">
      <section className="bg-[#e8e8e8] h-screen w-screen flex justify-center">
        <div className="px-7 py-5 rounded-md flex flex-col gap-5 mt-40 items-center">
          <form
            onSubmit={addTask}
            className="flex flex-row items-center gap-4 bg-white rounded-md px-5 py-5"
          >
            <input
              autoFocus
              value={task}
              onChange={inputVal}
              type="text"
              className="bg-transparent focus:outline-none rounded-md px-3 py-0.5 border border-slate-300"
            />
            <button
              type="submit"
              className="py-1 px-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 select-none duration-200"
            >
              Add
            </button>
          </form>

          <div className="flex flex-col gap-3 w-full mt-4 overflow-y-scroll">
            {tasks.map(({ id, task }) => (
              <div
                key={id}
                className="flex flex-row items-center justify-between gap-4 bg-white rounded-md px-5 py-5"
              >
                <h1 className="px-3 py-0.5">{task}</h1>
                <button
                  onClick={() => deleteTask(id)}
                  className="py-1 px-2 bg-emerald-500 text-white font-bold rounded-md hover:bg-emerald-600 select-none duration-200"
                >
                  Done!
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${
            loading ? "flex" : "hidden"
          } absolute z-20 flex justify-center items-center h-screen select-none duration-300`}
        >
          <span
            className={`${
              loading ? "h-auto" : "h-0"
            } flex flex-col justify-center items-center gap-6 px-10 py-5 bg-slate-100 rounded-md shadow-xl duration-300`}
          >
            <h1 className="text-3xl font-bold text-center">Are you sure</h1>
            <div>
              <button
                type="submit"
                onClick={confirmDelete}
                className="py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 duration-200"
              >
                Of course
              </button>
              <button
                onClick={cancelDelete}
                className="py-2 px-4 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 duration-200 ml-3"
              >
                Nope
              </button>
            </div>
          </span>
        </div>
      </section>
    </main>
  );
};

export default App;
