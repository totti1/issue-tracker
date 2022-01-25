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
import NewIssue from './pages/NewIssue';
import ProfilPage from './pages/profilPage';

// ----------------------------------------------------------------------

const Router = () => {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const checked = localStorage.getItem('logged');
    setLogged(checked);
  }, [0]);
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
        { path: 'issues/:id', element: <Issues /> },
        { path: 'profile', element: <ProfilPage /> },
        { path: 'new/issue/:projectID', element: <NewIssue /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register/:id', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
export default Router