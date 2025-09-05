import { useState, useEffect } from "react";

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;
    setNotes([...notes, { id: Date.now(), title, content }]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Notes</h1>

      {/* Add note form */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Note content..."
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded self-start"
          onClick={addNote}
        >
          Add Note
        </button>
      </div>

      {/* Search bar */}
      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Empty state */}
      {filteredNotes.length === 0 ? (
        <p className="text-gray-500 italic">
          No notes yet. Jot something down ✍️
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((n) => (
            <div
              key={n.id}
              className="bg-yellow-100 p-4 rounded shadow relative"
            >
              <h2 className="font-bold mb-2">{n.title}</h2>
              <p className="whitespace-pre-line">{n.content}</p>

              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => deleteNote(n.id)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
