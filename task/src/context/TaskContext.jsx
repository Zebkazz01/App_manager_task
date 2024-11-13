import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  updateTaskRequest,
  updateTaskRequesti,
  //getTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTask necesita usar con TaskProvider");

  return context;
};
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    getTasks();
    console.log(res);
  };
  const updateTask = async (id, taskData, newOrder = null) => {
    const payload =
      newOrder !== null ? { ...taskData, order: newOrder } : taskData;
    try {
      let res;
      if (taskData) {
        res = await updateTaskRequesti(id, payload);
      } else {
        res = await updateTaskRequest(id, payload);
      }
      if (res.status === 200) {
        const updatedTask = res.data;
        setTasks((prevTasks) => {
          return prevTasks
            .map((task) =>
              task._id === id ? { ...task, ...updatedTask } : task
            )
            .sort((a, b) => a.order - b.order);
        });
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id);
    if (res.status === 200) {
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTask,
        getTasks,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
