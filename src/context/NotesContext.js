import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useFetch from '../customhook/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const apiUrl = 'http://localhost:3001/notes';
  const { data, loading, error } = useFetch(apiUrl);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalMode, setModalMode] = useState(null);

  useEffect(() => {
    if (data) {
      setNotes(data);
    }
  }, [data]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (note, mode) => {
    setSelectedNote(note);
    setModalMode(mode);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setModalMode(null);
    setShowModal(false);
  };
const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };
   

  const handleAddNote = async (newNote) => {
    try {
      const response = await axios.post(apiUrl, newNote, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNotes((prevNotes) => [...prevNotes, response.data]);
      closeModal();
      notifySuccess('Note is add!')
     
    } catch (error) {
     
        notifyError('This is Error adding note!');
    }
  };

  const handleUpdateNote = async (updatedNote) => {
    try {
      const response = await axios.put(`${apiUrl}/${updatedNote.id}`, updatedNote, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id ? response.data : note
      );
      setNotes(updatedNotes);
      closeModal();
      notifySuccess('Note is updated!');
    } catch (error) {
       notifyError('Error updating note');
    }
  };

  const handleDeleteNote = async (deleteNote) => {
    try {
      await axios.delete(`${apiUrl}/${deleteNote.id}`);
      const updatedNotes = notes.filter((note) => note.id !== deleteNote.id);
      setNotes(updatedNotes);
        notifySuccess('Note is deleted!');
    } catch (error) {
        notifyError('Error deleting note');
    }
  };

  return (
     
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        searchTerm,
        handleSearch,
        filteredNotes,
        showModal,
        selectedNote,
        modalMode,
        openModal,
        closeModal,
        handleAddNote,
        handleUpdateNote,
        handleDeleteNote,
      }}
    >
      {children}
      <ToastContainer />
    </NotesContext.Provider>
  );
};
