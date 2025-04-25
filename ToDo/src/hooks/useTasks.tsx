import { useShallow } from "zustand/shallow";
import { taskStore } from "../store/taskStore";
import {
  updateTareaController,
  deleteTareaController,
  getTareasController,
  createTareaController,
  moverTareaASprintController,
} from "../data/tareaController";
import { ITask } from "../types/ITask";
import Swal from "sweetalert2";
import { ICreateTask } from "../types/ICreateTask";

export const useTask = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    eliminarUnaTarea,
    editarUnaTarea,
  } = taskStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      eliminarUnaTarea: state.eliminarUnaTarea,
      editarUnaTarea: state.editarUnaTarea,
    }))
  );

  const actionSearch = async (searchTerm: string) => {
    const data = await getTareasController();
    if (data) {
      const filtered = data.filter((task) =>
        task.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setArrayTareas(filtered);
    }
  };

  const getTask = async () => {
    const data = await getTareasController();
    if (data) setArrayTareas(data);
  };

  const createTask = async (nuevaTarea: ICreateTask) => {
    try {
      await createTareaController(nuevaTarea);
      const tasks = await getTareasController();
      Swal.fire("Éxito", "Tarea creada correctamente", "success");
      setArrayTareas(tasks);
    } catch (error) {
      console.log("Algo salió mal al crear la tarea");
    }
  };

  const editTask = async (tareaEditada: ITask) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);

    editarUnaTarea(tareaEditada); // actualiza el estado local primero
    try {
      await updateTareaController(tareaEditada);
      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) editarUnaTarea(estadoPrevio); // rollback
      console.log("Algo salió mal al editar");
    }
  };

  const deleteTask = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    eliminarUnaTarea(idTarea);
    try {
      await deleteTareaController(idTarea);
      Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success");
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.log("Algo salió mal al editar");
    }
  };

  const moveTaskToSprint = async (task: ITask, sprintId: string) => {
    try {
      await moverTareaASprintController(task, sprintId);
      const tareaActualizada = { ...task, sprintId };
      editarUnaTarea(tareaActualizada); // ⚡ actualiza localmente, dispara el render
      console.log("Tarea movida al sprint localmente");
    } catch (error) {
      console.log("Error al mover tarea a un sprint");
    }
  };

  const updateTaskStatus = async (id: string, nuevoEstado: string) => {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return;

    const tareaActualizada = { ...tarea, estado: nuevoEstado };
    await editTask(tareaActualizada);
  };

  return {
    getTask,
    createTask,
    editTask,
    deleteTask,
    actionSearch,
    moveTaskToSprint,
    tareas,
    updateTaskStatus,
  };
};
