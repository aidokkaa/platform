import { insertTask,TaskData,getTaskById,getTasks,updateTask } from "../models/tasks";
import { Request,Response } from "express";
import { pool } from '../db';
export const createTask = async(req:Request,res:Response)=>{
    const {title, description, start_date, end_date, status, user_id}=req.body;
try{
    if(!title || !user_id){
        return res.status(400).json({ message: "Поле 'name' и 'user_id' обязательны." });
    }
    const newTask = await insertTask(req.body);
    console.log('newTask', newTask)
    res.status(200).json({
        message:"Task created successfull!",
        project:newTask
    });
}catch(err){
    console.error("Ошибка при создании задачи:", err);
}
};
export const getTask = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id); // Получаем ID из параметров URL
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' }); // Проверяем, что ID корректен
      }
  
      const result = await getTaskById(id);
      if (!result) {
        return res.status(404).json({ error: 'Task not found' }); // Если проект не найден
      }
  
      res.status(200).json(result); // Успешный ответ
    } catch (err) {
      console.error(err); // Логирование ошибки на сервере
      res.status(500).json(err); // Ответ с кодом 500
    }
  };
export const fetchTasks = async (req: Request, res: Response) => {
  try {
    const projects = await getTasks();
    res.status(200).json(projects); 
  } catch (err) {
    console.error('Error in fetchProjects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};


export const modifyTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const data = req.body; // Данные для обновления
    const updatedTask = await updateTask(id, data);

    res.status(200).json(updatedTask); // Успешный ответ
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
export const assignTaskToUser = async (req: Request, res: Response) => {
  try {
    const { taskId, userId } = req.body; 
    
    if (!taskId || !userId) {
      return res.status(400).json({ error: 'Task ID and User ID are required' });
    }

    const taskExists = await pool.query('SELECT id FROM tasks WHERE id = $1', [taskId]);
    if (taskExists.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const userExists = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
    if (userExists.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const result = await pool.query(
      'INSERT INTO task_assignments (task_id, user_id) VALUES ($1, $2) RETURNING *',
      [taskId, userId]
    );

    return res.status(200).json({ message: 'Task assigned successfully', assignment: result.rows[0] });
  } catch (error) {
    console.error('Error assigning task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

