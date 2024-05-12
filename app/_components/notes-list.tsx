"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { NoteComponent } from "./note";
import { INote } from "@/lib/models";

interface NoteComponentModel {
  note: INote;
  editMode: boolean;
}

const NotesList = () => {
  const [notes, setNotes] = useState<NoteComponentModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/api/notes");
        const fetchedNotes: NoteComponentModel[] = response.data.data.map((note: INote) => ({
          note,
          editMode: false,
        }));
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSave = async (note: INote) => {
    try {
      const response = await axios.post("/api/notes", note);
      const savedNote = response.data.note;
      setNotes((prevNotes) => {
        const existingNoteIndex = prevNotes.findIndex((n) => n.note.id === savedNote.id);
        if (existingNoteIndex !== -1) {
          // Update existing note
          const updatedNotes = [...prevNotes];
          updatedNotes[existingNoteIndex] = { note: savedNote, editMode: false };
          return updatedNotes;
        } else {
          // Add new note
          return [...prevNotes, { note: savedNote, editMode: false }];
        }
      });
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const addNewNote = () => {
    const newNoteModel: NoteComponentModel = { note: { title: "", content: "" }, editMode: true };
    setNotes([...notes, newNoteModel]);
  };

  return (
    <div>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        notes.map((noteModel, index) => <NoteComponent key={index} note={noteModel.note} editMode={noteModel.editMode} onSave={handleSave} />)
      )}
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={addNewNote}>
        Add New Note
      </button>
    </div>
  );
};

export default NotesList;
