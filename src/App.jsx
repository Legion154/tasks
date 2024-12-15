import React, { useState, useEffect } from "react";
import uz from "./assets/uz.png";
import ru from "./assets/ru.png";
import en from "./assets/en.png";
import history from "./assets/history.png";
import "./App.css";

const App = () => {
  const [completedTasks, setCompletedtasks] = useState([]);
  const [taskToConfirm, setTaskToConfirm] = useState(null);
  const [h1story, setH1story] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("lang");
    return savedLang ? savedLang : "en";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const english = {
    add: "Add",
    done: "Done",
    yes: "Of course",
    no: "Nope",
    remove: "Remove",
    admission: "Are you sure!",
  };

  const russian = {
    add: "Добавить",
    done: "Готово",
    yes: "Конечно",
    no: "Нет",
    remove: "Удалять",
    admission: "Вы уверены!",
  };

  const uzbek = {
    add: "Qo'shish",
    done: "Bajarildi",
    yes: "Albatta",
    no: "Yo'q",
    remove: "O'chirish",
    admission: "Aniqmi!",
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
    const savedCompletedTasks = JSON.parse(
      localStorage.getItem("completedTasks")
    );
    if (savedCompletedTasks) {
      setCompletedtasks(savedCompletedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (completedTasks.length > 0) {
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const inputVal = (e) => {
    setTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!task) {
      alert("Please fill out the task.");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: task,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const completedTask = (id) => {
    const taskToComplete = tasks.find((task) => task.id === id);
    if (taskToComplete) {
      setTaskToConfirm(taskToComplete);
      setLoading(true);
    }
  };

  const deleteTask = (id) => {
    // Delete only from the completedTasks array
    const taskToDelete = completedTasks.find((task) => task.id === id);

    if (taskToDelete) {
      const updatedCompletedTasks = completedTasks.filter(
        (task) => task.id !== id
      );

      setCompletedtasks(updatedCompletedTasks);
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(updatedCompletedTasks)
      );
    }
  };

  const confirmDelete = () => {
    // Delete task from tasks array
    setTasks(tasks.filter((task) => task.id !== taskToConfirm.id));

    // Add the task to completed tasks
    setCompletedtasks([...completedTasks, taskToConfirm]);

    // Persist the changes
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    // Reset confirmation state
    setTaskToConfirm(null);
    setLoading(false);
  };

  const cancelDelete = () => {
    setTaskToConfirm(null);
    setLoading(false);
  };

  const switchLanguage = (language) => {
    setLang(language);
    setMenuOpen(false);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest(".language-menu") &&
      !e.target.closest(".lang-toggle-btn")
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <main className="overflow-hidden relative bg-[#f4f4f4] selection:bg-emerald-500 selection:text-white w-full">
      <div className="flex flex-row items-center justify-between px-5 py-3">
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          className="font-thin cursor-pointer select-none text-lg lang-toggle-btn"
        >
          <span>{lang === "en" ? "EN" : lang === "ru" ? "RU" : "UZ"}</span>
        </div>
        <div
          onClick={() => setH1story((prev) => !prev)}
          className="cursor-pointer select-none"
        >
          <img src={history} alt="history" width={25} />
        </div>
      </div>

      {/* LANG TOGGLE */}

      <div
        className={`language-menu ${menuOpen ? "h-auto py-3" : "h-0 py-0"} absolute rounded-md top-10 shadow-lg shadow-gray-500/10 p-3 border border-transparent bg-primary focus:outline-none overflow-hidden duration-300`}
      >
        <div
          onClick={() => switchLanguage("en")}
          className="pt-[9px] pb-2 px-7 rounded-md text-secondary hover:text-black hover:bg-gray-200 hover:bg-opacity-80 focus:bg-gray-200 focus:bg-opacity-80 select-none cursor-pointer"
        >
          <div className="flex flex-row items-center space-x-2 text-sm">
            <img src={en} className="size-5 relative" alt="en" />
            <span>en</span>
          </div>
        </div>
        <div
          onClick={() => switchLanguage("ru")}
          className="pt-[9px] pb-2 px-7 rounded-md text-secondary hover:text-black hover:bg-gray-200 hover:bg-opacity-80 hover:text-blue-gray-900/10 select-none cursor-pointer"
        >
          <div className="flex flex-row items-center space-x-2 text-sm">
            <img src={ru} className="size-5 relative" alt="ru" />
            <span>ru</span>
          </div>
        </div>
        <div
          onClick={() => switchLanguage("uz")}
          className="pt-[9px] pb-2 px-7 rounded-md text-secondary hover:text-black hover:bg-gray-200 hover:bg-opacity-80 hover:text-blue-gray-900/10 select-none cursor-pointer"
        >
          <div className="flex flex-row items-center space-x-2 text-sm">
            <img src={uz} className="size-5 relative" alt="uz" />
            <span>uz</span>
          </div>
        </div>
      </div>

      {/* HISTORY */}

      <div
        className={`${
          h1story ? "translate-x-0" : "translate-x-[800px]"
        } fixed z-10 top-0 right-0 px-5 py-3 pb-20 bg-inherit w-screen h-screen flex flex-col gap-7 overflow-hidden duration-500 sm:hidden`}
      >
        {/* INTRO */}

        <span className="text-center opacity-60 relative before:absolute before:content-normal before:-bottom-1 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-full before:bg-opacity-60 before:bg-current">
          Finished tasks of todays
        </span>

        {/* FINISHED TASKS */}

        <div className="flex flex-col gap-4 overflow-y-scroll overflow-x-hidden">
          {completedTasks.map(({ id, task }) => (
            <div
              key={`completed_${id}`}
              className="flex flex-row items-center justify-between gap-4 bg-white rounded-md px-5 py-5"
            >
              <h1 className="px-3 py-0.5">{task}</h1>
              <button
                onClick={() => deleteTask(id)}
                className="py-1 px-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 select-none duration-200"
              >
                {lang === "en"
                  ? english.remove
                  : lang === "ru"
                  ? russian.remove
                  : uzbek.remove}
              </button>
            </div>
          ))}
        </div>

        {/* BACK BUTTON */}

        <button
          onClick={() => setH1story(false)}
          type="button"
          className="px-7 py-3 font-medium text-white bg-red-500 rounded-md absolute bottom-6"
        >
          <i className="fa-solid fa-arrow-left pr-2"></i> Back
        </button>
      </div>

      <section className="h-screen w-full flex justify-center pb-14">
        <div className="px-7 py-5 rounded-md flex flex-col gap-5 mt-28 items-center w-full sm:w-auto">
          <form
            onSubmit={addTask}
            className="flex flex-row items-center gap-4 bg-white rounded-md px-5 py-5 w-full sm:w-auto"
          >
            <input
              autoFocus
              value={task}
              onChange={inputVal}
              type="text"
              className="bg-transparent focus:outline-none rounded-md px-3 py-0.5 border border-slate-300 w-full"
            />
            <button
              type="submit"
              className="py-1 px-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 select-none duration-200"
            >
              <h1>
                {lang === "en"
                  ? english.add
                  : lang === "ru"
                  ? russian.add
                  : uzbek.add}
              </h1>
            </button>
          </form>

          {/* Task List */}
          <div className="flex flex-col gap-3 w-full mt-4 overflow-y-scroll">
            {tasks.map(({ id, task }) => (
              <div
                key={`task_${id}`}
                className="flex flex-row items-center justify-between gap-4 bg-white rounded-md px-5 py-5"
              >
                <h1 className="px-3 py-0.5">{task}</h1>
                <button
                  onClick={() => completedTask(id)}
                  className="py-1 px-2 bg-emerald-500 text-white font-bold rounded-md hover:bg-emerald-600 select-none duration-200"
                >
                  {lang === "en"
                    ? english.done
                    : lang === "ru"
                    ? russian.done
                    : uzbek.done}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ADMISSION */}

        <div
          className={`${
            loading ? "flex" : "hidden"
          } absolute z-10 flex justify-center items-center h-[80vh] select-none duration-300`}
        >
          <span
            className={`${
              loading ? "h-auto" : "h-0"
            } flex flex-col justify-center items-center gap-6 px-10 py-5 bg-slate-100 rounded-md shadow-xl duration-300`}
          >
            <h1 className="text-3xl font-bold text-center">
              {lang === "en"
                ? english.admission
                : lang === "ru"
                ? russian.admission
                : uzbek.admission}
            </h1>
            <div>
              <button
                type="submit"
                onClick={confirmDelete}
                className="py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 duration-200"
              >
                {lang === "en"
                  ? english.yes
                  : lang === "ru"
                  ? russian.yes
                  : uzbek.yes}
              </button>
              <button
                onClick={cancelDelete}
                className="py-2 px-4 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 duration-200 ml-3"
              >
                {lang === "en"
                  ? english.no
                  : lang === "ru"
                  ? russian.no
                  : uzbek.no}
              </button>
            </div>
          </span>
        </div>
      </section>
    </main>
  );
};

export default App;
