import { FC } from "react";
import { ITask } from "../../../../types/ITask";
import { ISprint } from "../../../../types/ISprint";
import { CardTaskTwo } from "../../Backlog/CardTaskTwo/CardTaskTwo";

interface ITaskCompleteProps {
  tasks: ITask[];
  openModal: VoidFunction;
  sprint: ISprint;
  refrescarSprint: VoidFunction;
}

export const TaskComplete: FC<ITaskCompleteProps> = ({ tasks, openModal, sprint, refrescarSprint }) => {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Tareas Completas</h3>
      {tasks.map((task) => (
        <CardTaskTwo
          key={task.id}
          task={task}
          openModal={openModal}
          sprint={sprint}
          refrescarSprint={refrescarSprint}
        />
      ))}
    </>
  );
};
