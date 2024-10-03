import React from 'react';

interface TaskItemProps {
  task: { id: string; title: string; description: string | null; completed: boolean };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="task-item">
      <div className="task-item-details">
        <span
          className={`task-item-title ${task.completed ? 'completed' : ''}`}
        >
          {task.title}
        </span>
        </div>
        <div className="task-item-description">
          {task.description || 'No description'}
        </div>
        <div className="task-item-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
      </div>
      <div className="task-item-actions">
        <button className="edit-button" onClick={() => onEdit(task.id)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
