const bcrypt = require('bcrypt');
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import { createUser, findUserByEmail } from "../models/userModel";

const ADMIN_EMAIL = 'aida.ms0097@gmail.com';
const MANAGER_EMAIL = 'manager01@gmail.com';

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  gender: string,
): Promise<any> => {
  if (!email) {
    throw new Error("Email is required");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  // Определяем роль в зависимости от email
  let role: string;
  if (email === ADMIN_EMAIL) {
    role = 'admin';
  } else if (email === MANAGER_EMAIL) {
    role = 'manager';
  } else {
    role = 'user'; // По умолчанию для остальных пользователей
  }

  // Создаем нового пользователя с назначенной ролью
  const newUser = await createUser(firstName, lastName, email, hashedPass, gender, role);

  return newUser;
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Генерация токена с ролью из базы данных
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });


    return res.status(200).json({ token, user });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};




