import { insertProject,ProjectData,getProjectById,getProjects,updateProject } from "../models/projects";
import { Request,Response } from "express";
export const createProject = async(req:Request,res:Response)=>{
    const {name, description, start_date, end_date, status, user_id}=req.body;
try{
    if(!name || !user_id){
        return res.status(400).json({ message: "Поле 'name' и 'user_id' обязательны." });
    }
    const newProject = await insertProject(req.body);
    res.status(200).json({
        message:"Project created successfull!",
        project:newProject
    });
}catch(err){
    console.error("Ошибка при создании проекта:", err);
}
};
export const getProject = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id); // Получаем ID из параметров URL
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' }); // Проверяем, что ID корректен
      }
  
      const result = await getProjectById(id);
      if (!result) {
        return res.status(404).json({ error: 'Project not found' }); // Если проект не найден
      }
  
      res.status(200).json(result); // Успешный ответ
    } catch (err) {
      console.error(err); // Логирование ошибки на сервере
      res.status(500).json(err); // Ответ с кодом 500
    }
  };
export const fetchProjects = async (req: Request, res: Response) => {
  try {
    const projects = await getProjects();
    res.status(200).json(projects); // Отправляем список проектов
  } catch (err) {
    console.error('Error in fetchProjects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};


export const modifyProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const data = req.body; // Данные для обновления
    const updatedProject = await updateProject(id, data);

    res.status(200).json(updatedProject); // Успешный ответ
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
