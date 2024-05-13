import { INote } from "@/lib/models";
import { useCallback, useState } from "react";
import { NoteDisplay } from "./note-display";
import { NoteEdit } from "./note-edit";



interface NoteComponentProps {
  note?: INote;
  editMode?: boolean;
  onSave?: (note: INote) => void;
  onDelete?: (note: INote) => void;
  onCancel?: () => void;
}

export const NoteComponent = ({ note: initialNote, editMode: initialEditMode, onSave, onDelete, onCancel }: NoteComponentProps) => {
  const [note, setNote] = useState<INote>(initialNote || { title: "", content: "" });
  const [editMode, setEditMode] = useState(initialEditMode || false);

  const handleSave = useCallback(() => {
    if(onSave) {
      onSave(note);
    }
    setEditMode(false); // Exit edit mode after saving
  }, [note, onSave]);

  const handleCancel = useCallback(() => {
    setNote(initialNote || { title: "", content: "" });
    setEditMode(false);
    if(onCancel)
    onCancel();
  }, [initialNote, onCancel]);

  const handleDelete = useCallback(() => {
    if(onDelete) {
      onDelete(note);
    }
  }, [note, onDelete]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      {editMode ? <NoteEdit note={note} onChange={setNote} onSave={handleSave} onCancel={handleCancel} /> : <NoteDisplay note={note} onEdit={() => setEditMode(true)} onDelete={handleDelete} />}
    </div>
  );
};
