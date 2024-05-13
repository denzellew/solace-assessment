import { INote } from "@/lib/models";
import { useState } from "react";

export const NoteEdit = ({ note, onChange, onSave, onCancel }: { note: INote; onChange: (note: INote) => void; onSave: () => void; onCancel: () => void }) => {
  const [errors, setErrors] = useState<{ title: string; content: string }>({ title: "", content: "" });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    onChange({ ...note, title: newTitle });
    setErrors({ ...errors, title: newTitle ? "" : "Title is required" });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onChange({ ...note, content: newContent });
    setErrors({
      ...errors,
      content: !newContent ? "Content is required" :
        newContent.length < 20 ? "Content must be at least 20 characters" :
        newContent.length > 300 ? "Content must be no more than 300 characters" : ""
    });
  };

  const canSave = !errors.title && !errors.content && note.title && note.content.length >= 20 && note.content.length <= 300;

  return (
    <>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-4 border rounded text-black"
        value={note.title}
        onChange={handleTitleChange}
      />
      {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
      <textarea
        placeholder="Content"
        className="w-full p-2 mb-4 border rounded h-40 text-black"
        value={note.content}
        onChange={handleContentChange}
      />
      {errors.content && <p className="text-red-500 text-xs italic">{errors.content}</p>}
      <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 mr-1" onClick={onCancel}>
        Cancel
      </button>
      <button className={`px-4 py-2 text-white rounded ${canSave ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500'}`} onClick={onSave} disabled={!canSave}>
        Save
      </button>
    </>
  );
};