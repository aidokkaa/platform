import express,{Request,Response} from 'express';
import { pool } from "../db";
import { registerUser, loginUser } from '../controllers/auth';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/register', async (req: express.Request, res: express.Response) => {
    const { firstName, lastName, email, password, gender,role } = req.body;
    try {
        const user = await registerUser(firstName, lastName, email, password, gender,role);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/login', async (req: Request, res: Response) => {
   await loginUser(req, res); 
});




export default router;