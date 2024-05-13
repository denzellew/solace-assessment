import { INote } from "@/lib/models";
import axios from "axios";
import { useEffect, useState } from "react";

export interface NoteComponentModel {
  note: INote;
  editMode: boolean;
}

export default function useNotes() {
  const [notes, setNotes] = useState<NoteComponentModel[]>([]);
  const [addNote, setAddNote] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Added state for search term

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get<INote[]>(`/api/notes?content=${searchTerm}`); // Modified to include searchTerm
        const fetchedNotes: NoteComponentModel[] = response.data.map((note: INote) => ({
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
  }, [searchTerm]); // Added searchTerm as a dependency

  const updateSearchTerm = (newTerm: string) => { // Method to update searchTerm
    setSearchTerm(newTerm);
  };

  const handleSaveNewNote = async (note: INote) => {
    try {
      const response = await axios.post("/api/notes", note);
      const savedNote = response.data.note;
      setNotes((prevNotes) => [...prevNotes, { note: savedNote, editMode: false }]);
      setAddNote(false);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleEditNote = async (note: INote) => {
    try {
      const response = await axios.post(`/api/notes/${note.id}`, note);
      const savedNote = response.data.note;
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes];
        let existingNoteIndex = prevNotes.findIndex((n) => n.note.id === savedNote.id);

        // Update ex˝isting note
        if (existingNoteIndex !== -1) {
          updatedNotes[existingNoteIndex] = { note: savedNote, editMode: false };
        }
        return updatedNotes;
      });
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleDelete = async (note: INote) => {
    try {
      await axios.delete(`/api/notes/${note.id}`);
      setNotes((prevNotes) => prevNotes.filter((n) => n.note.id !== note.id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const addNewNote = () => {
    setAddNote(true);
  };

  const cancelNewNote = () => {
    setAddNote(false);
  }

  return { notes, addNote, loading, handleSaveNewNote, handleEditNote, handleDelete, addNewNote, cancelNewNote, updateSearchTerm }; // Expose updateSearchTerm
}
