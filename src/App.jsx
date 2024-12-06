import React, { useState, useEffect } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

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
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <main className="overflow-hidden">
      <section className="from-blue-500 to-blue-600 bg-gradient-to-tl h-screen w-screen flex justify-center">
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
              className="py-1 px-2 bg-emerald-500 text-white font-bold rounded-md hover:bg-emerald-600 duration-200"
            >
              Add
            </button>
          </form>

          <div className="flex flex-col gap-3 w-full mt-4">
            {tasks.map(({ id, task }) => (
              <div
                key={id}
                className="flex flex-row items-center justify-between gap-4 bg-white rounded-md px-5 py-5"
              >
                <h1 className="px-3 py-0.5">{task}</h1>
                <button
                  onClick={() => deleteTask(id)}
                  className="py-1 px-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
