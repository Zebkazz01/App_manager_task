import { useState, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskFormPages from "./TaskFormPages";
import ProfilePages from "./ProfilePages";
import HeaderTaskPages from "./HeaderTaskPages";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import DraggableCard from "../components/DraggableCard";
import { DndProvider } from "react-dnd";
import { useForm } from "react-hook-form";
import BackgroundImage from "../components/BackgroundImage";
import { Toaster, toast } from "react-hot-toast";

function TaskPages() {
  const { user, updateProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenu, setIsModalOpenu] = useState(false);
  const [taskData, setModalData] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const { reset } = useForm();

  // ---------------- Eventos de modales ----------------
  const openModal = (taskData) => {
    if (taskData) {
      setModalData(taskData);
    } else {
      setModalData({ title: "", description: "" });
    }

    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    reset();
  };
  const openModalu = () => setIsModalOpenu(true);
  const closeModalu = () => setIsModalOpenu(false);
  const { getTasks, tasks, updateTask, setTasks } = useTasks([]);

  // ---------------------- Traer las tareas ----------------------
  useEffect(() => {
    getTasks();
  }, []);
  // ------------------------ Actualizar el orden de las tareas --------------------
  const moveCard = (dragIndex, hoverIndex) => {
    const updatedTasks = [...tasks];
    const dragCard = updatedTasks[dragIndex];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, dragCard);

    const tasksWithNewOrder = updatedTasks.map((task, index) => ({
      ...task,
      orden: index + 1,
    }));

    setTasks(tasksWithNewOrder);
    tasksWithNewOrder.forEach((task) => {
      updateTask(task);
    });
  };
  // ---------------  Mostrar o ocultar obotn de eliminar --------------
  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BackgroundImage />
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="w-full h-full flex flex-col justify-start items-center">
        <HeaderTaskPages
          openModalu={openModalu}
          openModal={openModal}
          useAuth={user}
        />
        <div className="reposnivetask flex flex-wrap items-start justify-center w-full px-2 gap-2 overflow-auto mt-[96px] pb-24 mb-2 sm:pb-22 md:pb-20">
          <TaskFormPages
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            modalData={taskData}
            setOpenDropdownId={setOpenDropdownId}
            toast={toast}
          />

          <ProfilePages
            isModalOpenu={isModalOpenu}
            closeModalu={closeModalu}
            useAuth={user}
            updateProfile={updateProfile}
            toast={toast}
          />
          {tasks.map((task, index) => (
            <DraggableCard
              key={task._id}
              index={index}
              _id={task._id}
              title={task.title}
              moveCard={moveCard}
              description={task.description}
              createdAt={task.createdAt}
              numeronota={task.numeronota}
              isOpen={openDropdownId === task._id}
              onDropdownToggle={() => toggleDropdown(task._id)}
              openModal={openModal}
              toast={toast}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default TaskPages;
