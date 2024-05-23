import React from 'react'

function Listnote({ notes, openModal }) {
  return (
     <ul className="list-group note-list">
      {notes.map((note) => (
        <li
          key={note.id}
          className="list-group-item note-item d-flex justify-content-between align-items-center"
          onClick={() => openModal(note)}
        >
          <div className="note-details">
            <i className="bi bi-sticky"></i>
            <div>
              <strong>{note.title}</strong>
              <p>{note.date}</p>
            </div>
          
          </div>
        
        </li>
      ))}
    </ul>
  )
}

export default Listnote
