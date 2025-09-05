import { Link, Outlet } from "react-router-dom";

const MainLayout = ({ onLogout }) => {
  const username = localStorage.getItem("currentUser") || "User";

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-wide">📁 My Workspace</h2>
          <nav className="flex flex-col space-y-4 mt-6">
            <Link to="/" className="hover:text-blue-400">
              Dashboard
            </Link>
            <Link to="/tasks" className="hover:text-blue-400">
              Tasks
            </Link>
            <Link to="/notes" className="hover:text-blue-400">
              Notes
            </Link>
          </nav>
        </div>

        <div className="mt-6">
          <span className="block mb-2 text-sm">👋 {username}</span>
          <button
            onClick={onLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
