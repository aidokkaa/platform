import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';

  interface DecodedToken {
    userId: string;
    role: string;
  }
  
  declare global {
    namespace Express {
      interface Request {
        user?: DecodedToken; // добавляем поле user типа DecodedToken
      }
    }
  }
  

  export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; 
  
    if (!token) {
      res.status(403).json({ error: 'No token provided!' });
      return;
    }
  
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
      }
  
      const decodedToken = decoded as DecodedToken;
     
      (req as any).user = { id: decodedToken.userId, role: decodedToken.role }; 
  
      next(); 
    });
  };
  
  export const verifyManagerRole = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Извлекаем токен из заголовка
  
    if (!token) {
     res.status(403).json({ error: 'No token provided!' }); 
     return;
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid or expired token' }); // Если токен невалидный, возвращаем ошибку
      }
      const decodedToken = decoded as DecodedToken; 
      if (decodedToken.role !== 'manager') {
        return res.status(403).json({ error: 'Access denied. Only managers are allowed.' });
      }
      next();
    });
  };
  export const verifyAdminRole = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Извлекаем токен из заголовка
  
    if (!token) {
     res.status(403).json({ error: 'No token provided!' }); 
     return;
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid or expired token' }); // Если токен невалидный, возвращаем ошибку
        }
        const decodedToken = decoded as DecodedToken; 
        if (decodedToken.role !== 'admin') {
          return res.status(403).json({ error: 'Access denied. Only admins are allowed.' });
        }
        next();
      });
  };
