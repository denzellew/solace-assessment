import { INote } from "@/lib/models";

export const NoteEdit = ({ note, onChange, onSave, onCancel }: { note: INote; onChange: (note: INote) => void; onSave: () => void; onCancel: () => void }) => (
    <>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-4 border rounded text-black"
        value={note.title}
        onChange={(e) => onChange({ ...note, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        className="w-full p-2 mb-4 border rounded h-40 text-black"
        value={note.content}
        onChange={(e) => onChange({ ...note, content: e.target.value })}
      />
      <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400" onClick={onCancel}>
        Cancel
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onSave}>
        Save
      </button>
    </>
  );