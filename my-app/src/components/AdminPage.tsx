import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<any>(null);
  console.log(userInfo)
  const navigate = useNavigate();
  console.log('adminpage')
  useEffect(() => {
    const data = localStorage.getItem('data');
    console.log(data)
    if (!data) {
      navigate('/login'); // Перенаправляем на страницу логина, если данных нет
    } else {
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData.user.gender)
        const token = parsedData.token;
        if (!token) {
          throw new Error('Token not found');
        }
        const parts = token.split('.'); // Разделяем токен
        const decoded = atob(parts[1]); // Декодируем полезную нагрузку токена
        const user = JSON.parse(decoded); // Преобразуем в объект
        setUserInfo(parsedData); // Сохраняем информацию о пользователе
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login'); // При ошибке перенаправляем на страницу логина
      }
    }
  }, [navigate]);

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
      <h1>Welcome, {userInfo ? userInfo.user.first_name : 'User'}</h1> {/* Показываем имя пользователя */}
      adminnn
      <p>Role: {userInfo ? userInfo.user.role : 'Not available'}</p> {/* Показываем роль */}
      <button onClick={handleLogout}>Logout</button> {/* Кнопка выхода */}
    </div>
  );
};

export default AdminPage;
