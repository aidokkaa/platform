import { pool } from "../db";
export interface ProjectData {
    name:string;
    description?:string;
    start_date?:Date;
    end_date?:Date;
    status:string;
    user_id:number;
}
export const insertProject = async(data:ProjectData)=>{
    const {name, description, start_date, end_date, status, user_id}=data;
    const query = `
    INSERT INTO public.projects 
    (name, description, start_date, end_date, status, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [name, description, start_date, end_date, status, user_id];
  try{
   const result = await pool.query(query,values);
  return result.rows[0];
  }catch(error){
   console.log(error+ "insert error")
  }
};
export const getProjectById = async (id:number)=>{
  const query='SELECT * FROM projects WHERE id = $1'
  try{
    const result = await pool.query(query,[id]);
    return result.rows[0];
  }catch(err){
    console.error(err);
    throw err;
  }
}

export const getProjects = async () => {
  const query = 'SELECT * FROM projects';
  try {
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      console.log('No projects found');
      return []; 
    }
    console.log(result.rows);
    return result.rows; 
  } catch (err) {
    console.error('Error fetching projects:', err);
    throw err; 
  }
};
export const updateProject = async (id: number, data: Partial<ProjectData>) => {
  const { name, description, start_date, end_date, status, user_id } = data;

  const query = `
    UPDATE public.projects 
    SET 
      name = COALESCE($1, name), 
      description = COALESCE($2, description), 
      start_date = COALESCE($3, start_date), 
      end_date = COALESCE($4, end_date), 
      status = COALESCE($5, status), 
      user_id = COALESCE($6, user_id)
    WHERE id = $7
    RETURNING *;
  `;

  const values = [name, description, start_date, end_date, status, user_id, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Project not found'); // Если проект с таким ID не найден
    }
    return result.rows[0]; // Возвращаем обновленный проект
  } catch (error) {
    console.error(error);
    throw error; // Пробрасываем ошибку для обработки в контроллере
  }
};

