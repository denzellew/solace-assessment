"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { NoteComponent } from "./note";
import { INote } from "@/lib/models";
import useNotes from "../_hooks/use-notes";

const NotesList = () => {
  const { notes, addNote, loading, handleSaveNewNote, handleEditNote, handleDelete, addNewNote, cancelNewNote, updateSearchTerm } = useNotes();
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    updateSearchTerm(searchText);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
       <div className="search-bar">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search notes..."
          className="px-4 py-2 border rounded"
        />
        <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Search
        </button>
      </div>
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
