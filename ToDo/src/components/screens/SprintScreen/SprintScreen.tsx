import { useParams, Link } from "react-router-dom";
import { Header } from "../../ui/Header/Header";
import { TaskComplete } from "../../ui/Sprint/StatusTask/TaskComplete";
import { TaskPending } from "../../ui/Sprint/StatusTask/TaskPending";
import { TaskProccesing } from "../../ui/Sprint/StatusTask/TaskProccesing";
import styles from "./SprintScreen.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import { ITask } from "../../../types/ITask";
import { SprintList } from "../../ui/Backlog/SprintListBackLog/SprintList";

export const SprintScreen = () => {
  const { id } = useParams();
  const { getSprintById } = useSprint();
  const [sprint, setSprint] = useState<ISprint>();
  const [taskPending, setTaskPending] = useState<ITask[]>([]);
  const [taskProccesing, setTaskProccesing] = useState<ITask[]>([]);
  const [taskComplete, setTaskComplete] = useState<ITask[]>([]);

  const filterTask = () => {
    const lista = sprint?.tareas ?? [];
    setTaskPending(lista.filter((t) => t.estado === "pendiente"));
    setTaskProccesing(lista.filter((t) => t.estado === "en proceso"));
    setTaskComplete(lista.filter((t) => t.estado === "completada"));
  };

  const getSprint = async () => {
    try {
      if (id) {
        const selectSprint = await getSprintById(id);
        setSprint(selectSprint);
      }
      filterTask();
    } catch {
      throw new Error("Error al tratar de conseguir un sprint por su id");
    }
  };

  useEffect(() => {
    getSprint();
  }, [id]);

  useEffect(() => {
    filterTask();
  }, [sprint]);

  const openModal = () => {

  };

  return (
    <>
      <Header title="Administrador de tareas: Sprint" />

      <div className={styles.containerPrincipalListTareas}>
        <SprintList />
        <div className={styles.stateTaskContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.buttonBackBacklogContainer}>
              <button>
                <Link to="/" className={styles.backButton}>
                  <p>Regresar a backlog</p>
                </Link>
              </button>
            </div>
          </div>
          <div className={styles.taskColumContainer}>
          <div className={styles.taskPending}>
            <TaskPending tasks={taskPending} openModal={openModal} sprint={sprint!} refrescarSprint={getSprint} />
          </div>
          <div className={styles.taskProcessing}>
            <TaskProccesing tasks={taskProccesing} openModal={openModal} sprint={sprint!} refrescarSprint={getSprint} />
          </div>
          <div className={styles.taskComplete}>
            <TaskComplete tasks={taskComplete} openModal={openModal} sprint={sprint!} refrescarSprint={getSprint} />
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
