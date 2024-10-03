import React, { useState } from 'react';

interface TaskFormProps {
  onSave: (title: string, description: string | null) => Promise<void>;
  task?: { title: string; description: string | null };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, task }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title, description || null);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form-container">
      <div>
        <input
          type="text"
          className="task-form-title-input"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          className="task-form-description-input"
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="task-form-button">
        {task ? 'Save' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
