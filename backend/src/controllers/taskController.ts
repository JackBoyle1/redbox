import { Request, Response } from 'express';
import { Task } from '../models/task';

let tasks: Task[] = [];
let nextId = 1;

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask: any = (req: Request, res: Response) => {
    const { title, description } = req.body;
  
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Title is required and must be a string' });
    }
  
    const newTask: Task = {
      id: nextId++,
      title,
      description: description || '',
      completed: false,
    };
  
    tasks.push(newTask);
    return res.status(201).json(newTask);
  };

export const updateTask: any = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (title && typeof title === 'string') {
    task.title = title;
  }

  if (description && typeof description === 'string') {
    task.description = description;
  }

  if (typeof completed === 'boolean') {
    task.completed = completed;
  }

  res.json(task);
};

export const deleteTask: any = (req: Request, res: Response) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(t => t.id === Number(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};
