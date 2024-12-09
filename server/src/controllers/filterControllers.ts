import { Request, Response } from 'express';
import { filterProjects} from '../services/filterServices';
export const getProjectsFilter = async (req: Request, res: Response) => {
    const filters = {
      status: req.query.status as string,
      user_id: req.query.user_id ? Number(req.query.user_id) : undefined, 
    start_date:req.query.start_date as string 
    };
    try {
      const projects = await filterProjects(filters);
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  };

// export const getProjectsFilter = async (req: Request, res: Response) => {
//   const filters = {
//     status: req.query.status as string,
//     user_id:req.query.user_id ? Number(req.query.user_id) : undefined,  // Получаем фильтр из query параметров
//   };


//   if (!filters.status) {
//     return res.status(400).json({ error: 'Status is required' });
//   }

//   try {
//     const projects = await filterProjects(filters);  // Вызов фильтрации
//     res.status(200).json(projects);  // Отправляем отфильтрованные проекты
//   } catch (err) {
//     console.error('Error fetching projects:', err);
//     res.status(500).json({ error: 'Failed to fetch projects' });
//   }
  
// };


