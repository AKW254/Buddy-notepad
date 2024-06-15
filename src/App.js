import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Header from './Header';
import Search from './Search';
import Listnote from './Listnote';
import Footer from './Footer';
import Modal from './Modal';
import useFetch from './customhook/useFetch';
import axios from 'axios';
function App() {
  const apiUrl = 'http://localhost:3001/notes';
  const { data, loading, error, doFetch, setData } = useFetch(apiUrl);
  // Declare the store array
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalMode, setModalMode] = useState(null); // Mode for modal (add, edit, view)

// Set notes state with fetched data
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

  // Create Note
  
  const handleAddNote = async (newNote) => {
    try {
      const response = await axios.post(apiUrl, newNote, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNotes((prevNotes) => [...prevNotes, response.data]);
      closeModal();
    } catch (error) {
      console.error('Error adding note:', error);
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
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      closeModal();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="container">
      <Header />
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      {filteredNotes.length > 0 ? (
        <Listnote notes={filteredNotes} openModal={openModal} />
      ) : (
        <p className="text-center my-3 py-4">No notes available.</p>
      )}
      <Footer openModal={() => openModal(null, 'add')} />
      {showModal && (
        <Modal
          note={selectedNote}
          mode={modalMode}
          onClose={closeModal}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
        />
      )}
    </div>
  );
}

export default App;
