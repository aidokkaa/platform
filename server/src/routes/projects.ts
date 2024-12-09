import express,{Request,Response} from 'express';
import { createProject,getProject,fetchProjects,modifyProject } from '../controllers/projects';
import { updateProject } from '../models/projects';

const router = express.Router();
router.post('/',(req:Request,res:Response)=>{
  createProject(req,res)
});
router.get('/:id',(req:Request,res:Response)=>{
    getProject(req,res)
  });
  router.get('/', fetchProjects);
  router.put('/:id', (req: Request, res: Response) => {
    modifyProject(req, res);  
  });
  
export default router;