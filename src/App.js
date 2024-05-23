import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Header from './Header';
import Search from './Search';
import Listnote from './Listnote';
import Footer from './Footer';
import Notemodal from './Notemodal';


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
      {showModal && <Notemodal note={selectedNote} onClose={closeModal} />}
    </div>
    
  );
}

export default App;
