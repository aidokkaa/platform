const bcrypt = require('bcrypt');
import express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import { createUser,findUserByEmail } from "../models/userModel";
export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  gender: string,
  role:string
): Promise<any> => {
  if (!email) {
    throw new Error("Email is required");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = await createUser(firstName, lastName, email, hashedPass, gender,role);
  
  return newUser;
};

export const loginUser = async (req:Request,res:Response) => {
  try {
      const user = await findUserByEmail(req.body.email);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
      }
      // const roleQuery = `
      //     SELECT r.name AS role
      //     FROM roles r
      //     INNER JOIN project_users pu ON r.id = pu.role_id
      //     WHERE pu.user_id = $1
      // `;
      // const { rows } = await pool.query(roleQuery, [user.id]);

      // if (rows.length === 0) {
      //     return res.status(403).json({ error: 'Role not assigned to user' });
      // }

      // const role = rows[0].role;
      const adminCheckQuery = `SELECT COUNT(*) FROM users WHERE role = 'admin'`;
      const { rows: adminCheckRows } = await pool.query(adminCheckQuery);
      const isAdminExist = parseInt(adminCheckRows[0].count) > 0;
      let role;
      if(isAdminExist){
        role='user';
      }else{
        role='admin';
        await pool.query('UPDATE users SET role = $1 WHERE id = $2', ['admin', user.id]);
      }
      const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      return res.status(200).json({ token, user,role });
  } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};



