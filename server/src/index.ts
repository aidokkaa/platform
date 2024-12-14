import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { pool } from './db';
import userRouter from './routes/auth'
import taskRoutes from './routes/tasks';
import filterRoutes from './routes/filterRoutes'

dotenv.config()
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

pool.connect()
    .then(client => {
        console.log('Подключение к базе данных PostgreSQL успешно!');
        client.release();
    })
    .catch(err => {
        console.error('Ошибка подключения к базе данных:', err);
    });
app.use('/api/users',userRouter);
app.use('/api/tasks', taskRoutes);
app.use('/api/filterprojects', filterRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

