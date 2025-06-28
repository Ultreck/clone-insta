// Sidebar.jsx
import { FiHome, FiPlusSquare, FiLogOut, FiUser, FiBell } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ user, onLogout }) {
  const location = useLocation();
  const active = (path) => location.pathname === path ? 'text-pink-600' : 'text-gray-800';

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-white shadow flex flex-col justify-between p-4">
      <div>
        <h1 className="text-pink-600 text-2xl font-bold mb-6 hidden md:block">InstaClone</h1>
        <nav className="space-y-10">
          <Link to="/" className={`flex items-center space-x-2 ${active('/')} hover:text-pink-600`}>
            <FiHome className="text-2xl" /> <span className="hidden md:inline">Home</span>
          </Link>
          <Link to="/create" className={`flex items-center space-x-2 ${active('/create')} hover:text-pink-600`}>
            <FiPlusSquare className="text-2xl" /> <span className="hidden md:inline">Create</span>
          </Link>
          <Link to="/profile" className={`flex items-center space-x-2 ${active('/profile')} hover:text-pink-600`}>
            <FiUser className="text-2xl" /> <span className="hidden md:inline">Profile</span>
          </Link>
          <Link to="/notifications" className={`flex items-center space-x-2 ${active('/notifications')} hover:text-pink-600`}>
            <FiBell  className="text-2xl" /> <span className="hidden md:inline">Notifications</span>
          </Link>

        </nav>
      </div>
      <div>
        {user && (
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-800"
          >
            <FiLogOut className="text-2xl" /> <span className="hidden md:inline">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
