import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .populate("user")
      .sort({ orden: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error: error });
  }
};
export const createTask = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    // Incrementar el orden de todas las tareas existentes
    await Task.updateMany({ user: req.user.id }, { $inc: { orden: 1 } });

    // Buscar el número de nota más alto actual
    const highestNota = await Task.findOne({ user: req.user.id })
      .sort({ numeronota: -1 })
      .limit(1);

    // Determinar el nuevo número de nota
    const newNumeroNota = highestNota ? highestNota.numeronota + 1 : 1;

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
      orden: 1,
      numeronota: newNumeroNota,
    });

    // Guardar la nueva tarea
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task)
    return res.status(404).json({ Message: "No se encuentra ninguna tarea" });
  res.json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { orden, title, description } = req.body;

  try {
    const updateData = {
      ...(orden && { orden }),
      ...(title && { title }),
      ...(description && { description }),
    };

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message_up: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
