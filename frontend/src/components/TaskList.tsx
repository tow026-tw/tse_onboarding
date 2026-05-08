import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import { Dialog } from "@tritonse/tse-constellation";
import styles from "src/components/TaskList.module.css";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      const result = await getAllTasks();

      if (result.success) {
        setTasks(result.data);
      } else {
        setError(result.error);
      }
    }

    void fetchTasks();
  }, []);

  return (
    <div className={styles.container}>

      <span className={styles.title}>{title}</span>

      <div className={styles.items}>
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))
        )}
      </div>

      {error && (
        <Dialog
            isOpen={!!error}
            onClose={() => setError(null)}
            variant="error"
            styleVersion="styled"
            title="Error"
            content={error ?? ""}
        />
      )}
    </div>
  );
}