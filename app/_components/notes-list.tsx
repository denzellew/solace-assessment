"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { NoteComponent } from "./note";
import { INote } from "@/lib/models";
import useNotes from "../_hooks/use-notes";


const NotesList = () => {
  const { notes, addNote, loading, handleSaveNewNote, handleEditNote, handleDelete, addNewNote, cancelNewNote } = useNotes();

  return (
    <div>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        notes.map((noteModel, index) => (
          <NoteComponent key={index} note={noteModel.note} editMode={noteModel.editMode} onSave={handleEditNote} onDelete={handleDelete} />
        ))
      )}
      {addNote && <NoteComponent editMode={true} onSave={handleSaveNewNote} onCancel={cancelNewNote} /> }
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={addNewNote}>
        Add New Note
      </button>
    </div>
  );
};

export default NotesList;
