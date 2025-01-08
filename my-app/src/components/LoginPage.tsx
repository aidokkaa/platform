import React, { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        throw new Error('Login failed!');
      }

      const data = await res.json();
      console.log('Login successful:', data);

      // Сохраняем данные в localStorage
      localStorage.setItem('data', JSON.stringify(data));

      // Извлекаем токен из localStorage
      const storedData = localStorage.getItem('data');
      if (storedData) {
        const parsedData = JSON.parse(storedData); // Парсим сохраненные данные
        const token = parsedData.token; // Извлекаем токен

        if (token) {
          // Разделяем токен на части
          const parts = token.split('.');
          console.log(parts);

          // Декодируем полезную нагрузку (Payload)
          const decodedPayload = atob(parts[1]);

          // Преобразуем в объект
          const payloadObject = JSON.parse(decodedPayload);

          console.log(payloadObject); // выводит объект с данными

          const role = payloadObject.role;
          console.log('Role:', role);

          // Навигация в зависимости от роли
          if (role === 'admin') {
            navigate('/admin');
          } else if (role === 'manager') {
            navigate('/manager');
          } else if (role === 'user') {
            navigate('/emp');
          }
        } else {
          alert('Token not found!');
        }
      } else {
        alert('User data not found!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed! Please check your credentials.');
    } finally {
      setLoading(false); // Останавливаем индикатор загрузки
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          required
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
