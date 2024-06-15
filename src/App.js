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

function App() {
  
  const { data, loading, error } = useFetch('http://localhost:3001/notes');

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

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
    closeModal();
  };

  const handleUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    closeModal();
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    closeModal();
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
