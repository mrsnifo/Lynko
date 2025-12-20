import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/30 dark:bg-purple-400/20 -top-32 -right-32 blur-3xl"></div>
        <div className="absolute w-[250px] h-[250px] rounded-full bg-purple-500/25 dark:bg-purple-400/15 bottom-20 -left-20 blur-2xl"></div>
        <div className="absolute w-[150px] h-[150px] rounded-full bg-purple-500/20 dark:bg-purple-400/10 top-1/2 right-32 blur-xl"></div>
      </div>

      <div className="relative z-10">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/:username" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;