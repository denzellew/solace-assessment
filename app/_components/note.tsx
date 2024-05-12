import { INote } from "@/lib/models";
import { useCallback, useState } from "react";

const NoteDisplay = ({ note, onEdit }: { note: INote; onEdit: () => void }) => (
  <>
    <h1 className="text-xl font-bold">{note.title}</h1>
    <p className="mb-4">{note.content}</p>
    {note.createdAt && (
      <p className="text-sm text-gray-500">
        Created on: {note.createdAt.toLocaleDateString()} at {note.createdAt.toLocaleTimeString()}
      </p>
    )}
    {note.updatedAt && (
      <p className="text-sm text-gray-500">
        Last modified: {note.updatedAt.toLocaleDateString()} at {note.updatedAt.toLocaleTimeString()}
      </p>
    )}
    <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400" onClick={onEdit}>
      Edit
    </button>
  </>
);

const NoteEdit = ({ note, onChange, onSave }: { note: INote; onChange: (note: INote) => void; onSave: () => void }) => (
  <>
    <input
      type="text"
      placeholder="Title"
      className="w-full p-2 mb-4 border rounded"
      value={note.title}
      onChange={(e) => onChange({ ...note, title: e.target.value })}
    />
    <textarea
      placeholder="Content"
      className="w-full p-2 mb-4 border rounded h-40"
      value={note.content}
      onChange={(e) => onChange({ ...note, content: e.target.value })}
    />
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onSave}>
      Save
    </button>
  </>
);

interface NoteComponentProps {
  note?: INote;
  editMode?: boolean;
  onSave: (note: INote) => void;
}

export const NoteComponent = ({ note: initialNote, editMode: initialEditMode, onSave }: NoteComponentProps) => {
  const [note, setNote] = useState<INote>(initialNote || { title: "", content: "", createdAt: "", updatedAt: "" });
  const [editMode, setEditMode] = useState(initialEditMode || false);

  const handleSave = useCallback(() => {
    onSave(note);
    setEditMode(false); // Exit edit mode after saving
  }, [note, onSave]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      {editMode ? <NoteEdit note={note} onChange={setNote} onSave={handleSave} /> : <NoteDisplay note={note} onEdit={() => setEditMode(true)} />}
    </div>
  );
};
