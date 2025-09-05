import { useState, useEffect } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null); // track which task is expanded
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) return;
    const now = new Date().toISOString();
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        details,
        done: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
    setTitle("");
    setDetails("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const saveEdit = (id) => {
    const now = new Date().toISOString();
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, title: editTitle, details: editDetails, updatedAt: now }
          : t
      )
    );
    setEditing(null);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending" && t.done) return false;
    if (filter === "completed" && !t.done) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Tasks</h1>

      {/* Create Task */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Task details (optional)..."
          rows="2"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded self-start"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
        <input
          className="border p-2 rounded flex-1"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 italic">
          No tasks found. Try adding one! 🚀
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map((t) => (
            <li
              key={t.id}
              onClick={() => setExpanded(expanded === t.id ? null : t.id)}
              className={`p-3 rounded shadow cursor-pointer 
                ${t.done ? "bg-green-100" : "bg-gray-100"}`}
            >
              {/* Check if this task is being edited */}
              {editing === t.id ? (
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    className="border p-2 w-full rounded"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="border p-2 w-full rounded"
                    rows="2"
                    value={editDetails}
                    onChange={(e) => setEditDetails(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => saveEdit(t.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 px-3 py-1 rounded"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header Row */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={t.done}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => toggleTask(t.id)}
                      />
                      <span
                        className={t.done ? "line-through text-gray-500" : ""}
                      >
                        {t.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">
                        {expanded === t.id ? "▲" : "▼"}
                      </span>
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditing(t.id);
                          setEditTitle(t.title);
                          setEditDetails(t.details || "");
                        }}
                      >
                        ✎
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(t.id);
                        }}
                      >
                        ✖
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {expanded === t.id && (
                    <div className="mt-2 p-2 bg-white rounded border whitespace-pre-line">
                      {t.details && <p>{t.details}</p>}
                      <div className="text-xs text-gray-500 mt-2">
                        Created: {new Date(t.createdAt).toLocaleString()} <br />
                        Last updated: {new Date(t.updatedAt).toLocaleString()}
                      </div>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
