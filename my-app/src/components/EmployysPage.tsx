// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const EmployysPage = () => {
  
//   const [loading,setLoading]=React.useState(false);
//   const [userInfo,setUserInfo]=React.useState(null);
//   console.log(userInfo)
//   const navigate = useNavigate();
   
//   useEffect(()=>{
//     const data = localStorage.getItem('data');
//     if(!data){
//       navigate('/login')
//     }else{
//       try{
//         const parsedData = JSON.parse(data);
//         const token = parsedData.token;
//         if(!token){
//           throw new Error;
//         }
//         const parts = token.split('.');
//         const decoded = atob(parts[1]);
//         const user = JSON.parse(decoded); // Преобразуем в объект
//         setUserInfo(user); 
//       }
//       catch(error){
//         console.error('Error decoding token:', error);
//         navigate('/login'); 
//       }
//     }
//   },[navigate]);
//   const handleLogout = () => {
//     localStorage.removeItem('data'); // Удаляем данные пользователя
//     navigate('/login'); // Перенаправляем на страницу логина
//   };
//   return (
//     <div>EmployysPage
//         <h1>Welcome, </h1> {/* Показываем имя пользователя */}
//         <button onClick={handleLogout}>Logout</button> {/* Кнопка выхода */}
//     </div>
//   )
// }

// export default EmployysPage


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployysPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<any>(null);
  console.log(userInfo)
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (!data) {
      navigate('/login'); // Перенаправляем на страницу логина, если данных нет
    } else {
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData.user.first_name);
        setUserInfo(parsedData);
        console.log(userInfo)
        // const token = parsedData.token;
        // if (!token) {
        //   throw new Error('Token not found');
        // }
        // const parts = token.split('.'); // Разделяем токен
        // const decoded = atob(parts[1]); // Декодируем полезную нагрузку токена
        // const user = JSON.parse(decoded); // Преобразуем в объект
 
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login'); // При ошибке перенаправляем на страницу логина
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('data'); // Удаляем данные пользователя
    navigate('/login'); // Перенаправляем на страницу логина
  };

  // Если данные еще не загружены, показываем индикатор загрузки
  if (userInfo===null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <header>
        logo
        <div className="userImg"></div>
        <div className="userInfo">
          <span>User ID:{userInfo.user.id}</span>
          <span>First name: {userInfo.user.first_name}</span>
          <span>Last Name:{userInfo.user.last_name}</span>
          <span>Email:{userInfo.user.email}</span>
          <span>Gender:{userInfo.user.gender}</span>
        </div>
       </header>
      <h1>Welcome, {userInfo ? userInfo.user.first_name : 'User'}</h1> 
      <p>Role: {userInfo ? userInfo.user.role : 'Not available'}</p> 
      <button onClick={handleLogout}>Logout</button> 
    </div>
  );
};

export default EmployysPage;
