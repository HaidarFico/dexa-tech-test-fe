import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home/Home.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import ViewAllRollCalls from './pages/ViewAllRollCalls/ViewAllRollCalls.tsx';
import EmployeeDataAdministration from './pages/EmployeeDataAdministration/EmployeeDataAdministration.tsx';
import TurnInRollCall from './pages/TurnInRollCall/TurnInRollCall.tsx';
import EditEmployeeData from './pages/EditEmployeeData/EditEmployeeData.tsx';
import ViewRollCallPhoto from './pages/ViewRollCallPhoto/ViewRollCallPhoto.tsx';
import { ProtectedRoute } from './routes/ProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/dashboard',
    element: 
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/all-roll-call',
    element: 
    <ProtectedRoute>
      <ViewAllRollCalls />
    </ProtectedRoute>,
  },
  {
    path: '/all-roll-call/:photoId',
    element: 
    <ProtectedRoute>
      <ViewRollCallPhoto />
    </ProtectedRoute>,
  },
  {
    path: '/employee-data',
    element: <ProtectedRoute>
      <EmployeeDataAdministration />
    </ProtectedRoute>,
  },
  {
    path: '/employee-data/:userId',
    element: <ProtectedRoute>
      <EditEmployeeData />
    </ProtectedRoute>,
  },
  {
    path: '/roll-call',
    element: <ProtectedRoute>
      <TurnInRollCall />
    </ProtectedRoute>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
