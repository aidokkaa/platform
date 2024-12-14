import { pool } from "../db";
export interface TaskData {
    title:string;
    description?:string;
    due_date?:Date;
    status:string;
    user_id:number;
}
export const insertTask = async(data:TaskData)=>{
    const {title, description, due_date, status, user_id}=data;
    const query = `
    INSERT INTO public.tasks 
    (title, description, due_date, status, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [title, description, due_date, status, user_id];
  try{
   const result = await pool.query(query,values);
  return result.rows[0];
  }catch(error){
   console.log(error+ "insert error")
  }
};
export const getTaskById = async (id:number)=>{
  const query='SELECT * FROM tasks WHERE id = $1'
  try{
    const result = await pool.query(query,[id]);
    return result.rows[0];
  }catch(err){
    console.error(err);
    throw err;
  }
}

export const getTasks = async () => {
  const query = 'SELECT * FROM tasks';
  try {
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      console.log('No tasks found');
      return []; 
    }
    console.log(result.rows);
    return result.rows; 
  } catch (err) {
    console.error('Error fetching tasks:', err);
    throw err; 
  }
};
export const updateTask = async (id: number, data: Partial<TaskData>) => {
  const { title, description, due_date, status, user_id } = data;

  const query = `
    UPDATE public.tasks 
    SET 
      name = COALESCE($1, name), 
      description = COALESCE($2, description), 
      due_date = COALESCE($3, due_date), 
      status = COALESCE($5, status), 
      user_id = COALESCE($6, user_id)
    WHERE id = $7
    RETURNING *;
  `;

  const values = [title, description,due_date, status, user_id, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Task not found'); // Если проект с таким ID не найден
    }
    return result.rows[0]; // Возвращаем обновленный проект
  } catch (error) {
    console.error(error);
    throw error; // Пробрасываем ошибку для обработки в контроллере
  }
};

