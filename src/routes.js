import { Navigate, useRoutes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Projects from './pages/Projects';
import Issues from './pages/Issues';
import User from './pages/User';
import NotFound from './pages/Page404';
import NewProject from './pages/NewProject';
import Home from './pages/home';

// ----------------------------------------------------------------------

export default function Router() {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const checked = localStorage.getItem('loggedin');
    setLogged(checked);
  }, []);
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          element: logged ? (
            <Navigate to="/dashboard/app" replace />
          ) : (
              <Navigate to="/login" replace />
            )
        },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'projects', element: <Projects /> },
        { path: 'issues', element: <Issues /> },
        { path: 'new/project', element: <NewProject /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register/:id', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: 'dashboard', element: <Navigate to="/dashboard" /> },
        { path: '/', element: <Home /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
