import { INote } from "@/lib/models";

export const NoteDisplay = ({ note, onEdit, onDelete }: { note: INote; onEdit: () => void; onDelete: (note: INote) => void }) => (
    <>
      <h1 className="text-xl font-bold">{note.title}</h1>
      <p className="mb-4">{note.content}</p>
      {note.createdAt && (
        <p className="text-sm text-gray-500">
          Created on: {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString()}
        </p>
      )}
      {note.updatedAt && (
        <p className="text-sm text-gray-500">
          Last modified: {new Date(note.updatedAt).toLocaleDateString()} at {new Date(note.updatedAt).toLocaleTimeString()}
        </p>
      )}
      <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400" onClick={() => onDelete(note)}>
        Delete
      </button>
      <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400" onClick={onEdit}>
        Edit
      </button>
    </>
  );