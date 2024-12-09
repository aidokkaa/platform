import { getProjectsByDate, getProjectsByStatus,getprojectsByUser } from '../models/filterModels'
export const filterProjects = async (filters: { status?: string,user_id? :number,start_date:string  }) => {
    let projects;
    if (filters.status) {
      projects = await getProjectsByStatus(filters.status);  // Запрос к базе с фильтром
      console.log('services filter', projects)
    } if(filters.user_id){
      if(projects){
        projects = projects.filter(project=>project.user_id===filters.user_id);
      } else{
        projects = await getprojectsByUser(filters.user_id)
      }
      if(filters.start_date){
        if(projects){
            projects = projects.filter(project => new Date(project.start_date) >= new Date(filters.start_date));
        }
        else{
            projects= await getProjectsByDate(filters.start_date)
        }
      }
    }return projects
  };
//   {
//     "id": 19,
//     "name": "New Project11",
//     "description": "This is a sample project description.",
//     "start_date": "2024-11-18T17:00:00.000Z",
//     "end_date": "2024-12-19T01:00:00.000Z",
//     "status": "completed",
//     "user_id": 2
// }


