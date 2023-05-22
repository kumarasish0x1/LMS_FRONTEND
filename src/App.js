import { Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import './App.css';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import CourseManagement from './pages/CourseManagement';
import SectionManagement from './pages/SectionManagement';
import ContentManagement from './pages/ContentManagement';
import CourseCatalog from './pages/CourseCatalog';
import Enroll from './pages/Enroll';
import CourseContent from './pages/CourseContent';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Authorized from './routes/Authorize';
import Home from './pages/Home';
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider from './providers/AuthProvider';
import CurrentUserProvider from './providers/CurrentUserProvider';
import AccessDenied from './pages/AccessDenied';

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/access-denied" element={<AccessDenied />} />
        <Route exact path="/dashboard" element={<UserDashboard />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route 
          exact path="/admin" 
          element= {
            <AuthProvider>
            <CurrentUserProvider>
              <ProtectedRoute>
                <Authorized component={Admin} allowedRoles={['admin']} />
              </ProtectedRoute>
            </CurrentUserProvider>
            </AuthProvider>
          } 
        />
        <Route 
          exact path="/instructor/courses" 
          element={
            <AuthProvider>
            <CurrentUserProvider>
              <ProtectedRoute>
                <Authorized component={CourseManagement} allowedRoles={['instructor']} />
              </ProtectedRoute>
            </CurrentUserProvider>
            </AuthProvider>
          } 
        />
        <Route 
          path="/instructor/courses/:courseId/sections"
          element={
            <AuthProvider>
            <CurrentUserProvider>
              <ProtectedRoute>
                <Authorized component={SectionManagement} allowedRoles={['instructor']} />
              </ProtectedRoute>
            </CurrentUserProvider>
            </AuthProvider>
          } 
        />
        <Route 
          path="/instructor/courses/:courseId/sections/:sectionId/contents" 
          element={
            <AuthProvider>
            <CurrentUserProvider>
              <ProtectedRoute>
                <Authorized component={ContentManagement} allowedRoles={['instructor']} />
              </ProtectedRoute>
            </CurrentUserProvider>
            </AuthProvider>
          } 
        />
        <Route 
          path="/course-catalog" 
          element={ 
            <AuthProvider>
            <CurrentUserProvider>
              <ProtectedRoute>
                <CourseCatalog />
              </ProtectedRoute>
            </CurrentUserProvider>
            </AuthProvider>
          }
        />
        <Route path="/course/:courseId" 
          element={ 
            <AuthProvider>
            <CurrentUserProvider>
              <ProtectedRoute>
                <Enroll />
              </ProtectedRoute>
            </CurrentUserProvider>
            </AuthProvider>
          }
        />
        <Route 
          path="/course/:courseId/contents" 
          element={ 
            <AuthProvider>
            <CurrentUserProvider>
              <ProtectedRoute>
                <CourseContent />
              </ProtectedRoute>
            </CurrentUserProvider>
            </AuthProvider>
          }
        />
      </Routes>
  );
}

export default App;