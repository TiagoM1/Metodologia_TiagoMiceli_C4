// src/components/ui/Backlog/CardTaskTwo/CardTaskTwo.tsx

import { FC, useState } from "react";
import { ITask } from "../../../../types/ITask";
import styles from "./CardTaskTwo.module.css";
import { ISprint } from "../../../../types/ISprint";
import { useSprint } from "../../../../hooks/useSprint";

interface ICardTaskTwo {
  task: ITask;
  openModal: VoidFunction;
  sprint: ISprint;
  refrescarSprint: VoidFunction;
}

export const CardTaskTwo: FC<ICardTaskTwo> = ({ task, openModal, sprint, refrescarSprint }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { editSprint } = useSprint();

  const cambiarEstado = async (nuevoEstado: string) => {
    const tareasActualizadas = sprint.tareas.map((t) =>
      t.id === task.id ? { ...t, estado: nuevoEstado } : t
    );
    await editSprint({ ...sprint, tareas: tareasActualizadas });
    refrescarSprint();
    setShowMenu(false);
  };

  return (
    <div className={styles.containerCard}>
      <div className={styles.containerDescription}>
        {/* Título */}
        <p className={styles.title}>{task.titulo}</p>

        {/* Descripción */}
        <p>
          <b>Descripción:</b> {task.descripcion}
        </p>

        {/* Fecha límite */}
        <p>
          <b>Fecha límite:</b> {task.fechaLimite}
        </p>
      </div>

      <div className={styles.actionContainer}>
        <span
          className="material-symbols-outlined"
          onClick={() => setShowMenu(!showMenu)}
        >
          more_vert
        </span>
        {showMenu && (
          <div className={styles.menu}>
            <button onClick={() => cambiarEstado("pendiente")}>Pendiente</button>
            <button onClick={() => cambiarEstado("en proceso")}>
              En Proceso
            </button>
            <button onClick={() => cambiarEstado("completada")}>Completa</button>
          </div>
        )}
      </div>
    </div>
  );
};
