import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold tracking-wide">📁 My Workspace</h2>
        <nav className="flex flex-col space-y-4">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
