import React from 'react'


const Listnote = ({ notes, openModal, loading, error }) => {
  
    // Handle loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
   if (notes.length < 0) {
    <p className="text-center my-3 py-4">No notes available.</p>
  }

  return (
   
    
    <ul className="list-group note-list">
      {notes.map((note) => (
        <li
          key={note.id}
          className="list-group-item note-item d-flex justify-content-between align-items-center"
        >
          <div className="note-details" onClick={() => openModal(note, 'view')}>
            <i className="bi bi-sticky"></i>
            <div>
              <strong>{note.title}</strong>
              <p className='bi bi-calendar'> {note.date}</p>
            </div>
          </div>
          <div className="action">
            <i
              className="edit bi bi-pencil-square px-4"
              onClick={() => openModal(note, 'edit')}
            ></i>
            <i
              className="delete bi bi-trash3"
              onClick={() => openModal(note, 'delete')}
            ></i>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Listnote;
