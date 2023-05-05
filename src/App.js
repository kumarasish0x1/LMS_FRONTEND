import { Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import CourseManagement from './pages/CourseManagement';
import SectionManagement from './pages/SectionManagement';
import ContentManagement from './pages/ContentManagement';
import CourseCatalog from './pages/CourseCatalog';
import Enroll from './pages/Enroll';
import CourseContent from './pages/CourseContent';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<UserDashboard />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/instructor/courses" element={<CourseManagement />} />
        <Route path="/instructor/courses/:courseId/sections" element={<SectionManagement />} />
        <Route path="/instructor/courses/:courseId/sections/:sectionId/contents" element={<ContentManagement />} />
        <Route path="/course-catalog" element={<CourseCatalog />} />
        <Route path="/course/:courseId" element={<Enroll />} />
        <Route path="/course/:courseId/contents" element={<CourseContent />} />
      </Routes>
  );
}

export default App;