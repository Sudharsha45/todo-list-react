import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    if (taskName.trim() === "") return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
      startTime: new Date(),
      endTime: null,
      timeTaken: null,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
  };

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id && !task.completed
          ? {
              ...task,
              completed: true,
              endTime: new Date(),
              timeTaken: (
                (new Date() - task.startTime) /
                1000
              ).toFixed(2) + " sec",
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span>{task.name}</span>
              {task.completed && <span> ⏳ {task.timeTaken}</span>}
              <div>
                {!task.completed && (
                  <button onClick={() => handleCompleteTask(task.id)}>
                    ✅ Complete
                  </button>
                )}
                <button onClick={() => handleDeleteTask(task.id)}>❌ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
