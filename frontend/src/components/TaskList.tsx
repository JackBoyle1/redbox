import React, { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleAddTask = async (title: string, description: string | null) => {
    await addTask({ title, description });
    loadTasks();
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) setEditingTask(task);
  };

  const handleUpdateTask = async (title: string, description: string | null) => {
    if (editingTask) {
      await updateTask(editingTask.id, { title, description });
      setEditingTask(null);
      loadTasks();
    }
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      await updateTask(id, {
        ...task,
        completed: !task.completed,
      });
      loadTasks();
    }
  };

return (
    <div className="task-list-container">
      <h1 className="task-list-title">To-Do List</h1>

      {/* Task Form */}
      <TaskForm
        onSave={editingTask ? handleUpdateTask : handleAddTask}
        task={editingTask ? { ...editingTask, description: editingTask.description || null } : undefined}
      />

      {/* Column Titles */}
      <div className="task-list-header">
        <div className="task-list-header-item">Title</div>
        <div className="task-list-header-item">Description</div>
        <div className="task-list-header-item">Completed</div>
        <div className="task-list-header-item">Actions</div>
      </div>

      <div className="task-items-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          ))
        ) : (
          <p className="no-tasks-message">No tasks to display</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
