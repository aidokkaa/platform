import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import ManagerPage from './components/ManagerPage';
import LandingPage from './components/LandingPage';
import EmployysPage from './components/EmployysPage';

// Компонент для защищенных маршрутов
interface protectTypes {
  element: JSX.Element;
  allowedrols: string[];
  role: string | null;
}

// const ProtectedRoute: React.FC<protectTypes> = ({ element, allowedrols, role }) => {
//   if (!allowedrols.includes(role || '')) {
//     return <Navigate to="/login" replace />;
//   }
//   return element;
// };

// Главный компонент App
function App() {
  // const [role, setRole] = React.useState<string | null>(null);
  // // const navigate = useNavigate(); // Перенаправление на основе роли

  // React.useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1]));
  //       setRole(payload.role);
  //     } catch (err) {
  //       console.log('Error decoding token');
  //       setRole(null);
  //     }
  //   } else {
  //     setRole(null);

  //   }
  // }, []);

  // // Если роль еще не установлена, показываем только главную страницу
  // if (role === null) {
  //   return <LandingPage />;
  // }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/admin',
      element: <AdminPage />,
    },
    {
      path: '/manager',
      element: <ManagerPage />,
    },
    {
      path: '/emp',
      element: <EmployysPage></EmployysPage>,
    },
    // {
    //   path: '/admin',
    //   element: <ProtectedRoute element={<AdminPage />} allowedrols={['admin']} role={role} />,
    // },
    // {
    //   path: '/manager',
    //   element: <ProtectedRoute element={<ManagerPage />} allowedrols={['manager']} role={role} />,
    // },
  ]);

  // Возвращаем RouterProvider с маршрутами
  return <RouterProvider router={router} />;
}

export default App;
