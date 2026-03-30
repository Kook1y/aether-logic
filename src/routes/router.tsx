import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import AuthLayout from '@/layouts/AuthLayout';
import LandingPage from '@/pages/LandingPage';
import SolverPage from '@/pages/SolverPage';
import GraphPage from '@/pages/GraphPage';
import PracticePage from '@/pages/PracticePage';
import AuthPage from '@/pages/AuthPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'solve', element: <SolverPage /> },
      { path: 'graph', element: <GraphPage /> },
      { path: 'practice', element: <PracticePage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <AuthPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
