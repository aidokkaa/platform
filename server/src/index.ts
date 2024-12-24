// import express, { Request, Response } from 'express';
// import dotenv from 'dotenv';
// import { pool } from './db';
// import multer from 'multer';
// import path from 'path';
// import userRouter from './routes/auth'
// import taskRoutes from './routes/tasks';
// import filterRoutes from './routes/filterRoutes';
// import commentRoures from './routes/commentRoutes'

// dotenv.config()
// const app = express();
// app.use(express.json());
// const PORT = process.env.PORT || 3000;
// pool.connect()
//     .then(client => {
//         console.log('Подключение к базе данных PostgreSQL успешно!');
//         client.release();
//     })
//     .catch(err => {
//         console.error('Ошибка подключения к базе данных:', err);
//     });
// app.use('/api/users',userRouter);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/filterprojects', filterRoutes);
// app.use('/api/taskComments',commentRoures);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const storage = multer.diskStorage({
//     destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
//         const uploadPath = path.join(__dirname, 'uploads');
//         cb(null, uploadPath);
//     },
//     filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
//         const uniqueSuffix = Date.now() + path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + uniqueSuffix);  // Формируем уникальное имя файла
//     },
// });
// const upload = multer({ storage: storage });
//   app.post('/upload', upload.single('file'), (req: Request, res: Response):void => {
//     const uploadedFile = req.file;
//     if (!uploadedFile) {
//         res.status(400).json({ error: 'No file uploaded' });
//         return;
//       }
//       const fileInfo = {
//         originalName: uploadedFile.originalname,
//         filename: uploadedFile.filename,
//         path: uploadedFile.path,
//         size: uploadedFile.size,
//         mimeType: uploadedFile.mimetype,
//     };
    
//     pool.query(
//         'INSERT INTO files (original_name, filename, path, size, mime_type) VALUES ($1, $2, $3, $4, $5)',
//         [fileInfo.originalName, fileInfo.filename, fileInfo.path, fileInfo.size, fileInfo.mimeType],
//         (err, result) => {
//             if (err) {
//                 console.error('Error saving file info to database:', err);
//                 return res.status(500).json({ error: 'Error saving file info to database' });
//             }
//             res.status(200).json({
//                 message: 'File uploaded successfully',
//                 file: uploadedFile,
//             });
//         }
//     );
//     res.status(200).json({
//       message: 'File uploaded successfully',
//       file: uploadedFile,
//     });
//   });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { pool } from './db';
import multer from 'multer';
import path from 'path';
import userRouter from './routes/auth';
import taskRoutes from './routes/tasks';
import filterRoutes from './routes/filterRoutes';
import commentRoures from './routes/commentRoutes';

dotenv.config();
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

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRoutes);
app.use('/api/filterprojects', filterRoutes);
app.use('/api/taskComments', commentRoures);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);  // Формируем уникальное имя файла
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req: Request, res: Response): void => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
   res.status(400).json({ error: 'No file uploaded' });
   return;
  }

  const fileInfo = {
    originalName: uploadedFile.originalname,
    filename: uploadedFile.filename,
    path: uploadedFile.path,
    size: uploadedFile.size,
    mimeType: uploadedFile.mimetype,
  };

  pool.query(
    'INSERT INTO files (original_name, filename, path, size, mime_type) VALUES ($1, $2, $3, $4, $5)',
    [fileInfo.originalName, fileInfo.filename, fileInfo.path, fileInfo.size, fileInfo.mimeType],
    (err, result) => {
      if (err) {
        console.error('Error saving file info to database:', err);
        return res.status(500).json({ error: 'Error saving file info to database' });
      }

      // Ответ только один раз, после того как данные сохранены в базе
      res.status(200).json({
        message: 'File uploaded successfully',
        file: uploadedFile,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

