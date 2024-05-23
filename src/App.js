import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Header from './Header';
import Search from './Search';
import Listnote from './Listnote';
import Footer from './Footer';
import Modal from './Modal';


function App() {
const initialNotes = [
  { id: 1, title: 'Dentist appointment', date: 'Jan 2, 2023 at 12:00 PM' },
  { id: 2, title: 'Pick up dry cleaning', date: 'Jan 2, 2023 at 12:00 PM' },
  { id: 3, title: 'Buy groceries', date: 'Jan 2, 2023 at 12:00 PM' },
  { id: 4, title: 'Call mom', date: 'Jan 2, 2023 at 12:00 PM' },
];
 
// Initialize localStorage with the initial notes if not already set
if (!localStorage.getItem('notes')) {
  localStorage.setItem('notes', JSON.stringify(initialNotes));
}

  //Get Notes from localstorage
  const storedNotes = JSON.parse(localStorage.getItem('notes'));
  //Declare the store array
  const [notes, setNotes] = useState(storedNotes || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Sync notes state with localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setShowModal(false);
  };
  
  //CRUD FOR NOTEPAD
  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]); // Add new note to the state
    closeModal(); // Close the modal after adding
  };

  const handleUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    ); // Update the note in the state
    setNotes(updatedNotes);
    closeModal(); // Close the modal after updating
  };

  const handleDeleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id); // Remove the note from the state
    setNotes(filteredNotes);
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
      <Footer openModal={() => openModal(null)} />
      {showModal && (
        <Modal
          note={selectedNote}
          onClose={closeModal}
          onAddNote={handleAddNote} // Pass add note function
          onUpdateNote={handleUpdateNote} // Pass update note function
          onDeleteNote={handleDeleteNote} // Pass delete note function
        />
      )}
     
    </div>
    
  );
}

export default App;
