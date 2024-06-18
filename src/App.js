import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Header from './Header';
import Search from './Search';
import Listnote from './Listnote';
import Footer from './Footer';
import Modal from './Modal';
import { NotesContext } from './context/NotesContext';

function App() {
  const {
    showModal,
    openModal
  } = useContext(NotesContext);

  return (
    <div className="container">
      <Header />
      <Search />
      <Listnote />
      <Footer openModal={() => openModal(null, 'add')} />
      {showModal && (
        <Modal />
      )}
    </div>
  );
}

export default App;
