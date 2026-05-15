import { Dialog } from "@tritonse/tse-constellation";
import { useState } from "react";
import { type Task, updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleCheck = async () => {
    setLoading(true);

    const result = await updateTask({
      ...task,
      isChecked: !task.isChecked,
    });

    if (result.success) {
      setTask(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleToggleCheckWrapper = () => {
    void handleToggleCheck();
  };

  return (
    <div className={styles.item}>
      <CheckButton
        checked={task.isChecked}
        onPress={handleToggleCheckWrapper}
        disabled={isLoading}
      />


      <div
        className={
          task.isChecked ? `${styles.textContainer} ${styles.checked}` : styles.textContainer
        }
      >
        <span className={styles.title}>{task.title}</span>

        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>

      {error && (
        <Dialog
          isOpen={!!error}
          onClose={() => setError(null)}
          variant="error"
          title="Error"
          content={error}
          styleVersion={"styled"}
        />
      )}
    </div>
  );
}
