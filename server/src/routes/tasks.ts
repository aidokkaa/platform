import express,{Request,Response} from 'express';
import { createTask,getTask,fetchTasks,modifyTask } from '../controllers/tasks';
import { assignTaskToUser } from '../controllers/tasks';

const router = express.Router();
router.post('/',(req:Request,res:Response)=>{
  createTask(req,res)
});
router.get('/:id',(req:Request,res:Response)=>{
    getTask(req,res)
  });
  router.get('/', fetchTasks);
  router.put('/:id', (req: Request, res: Response) => {
    modifyTask(req, res);  
  });
  router.post('/assign-task',  (req: Request, res: Response)=>{
    assignTaskToUser(req,res)
  });
  
export default router;