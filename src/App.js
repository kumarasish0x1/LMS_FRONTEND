import { Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import './App.css';
import CourseDashboard from "./pages/CourseDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/dashboard" element={<CourseDashboard />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;