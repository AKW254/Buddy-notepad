import React from 'react'

function Listnote({ notes, openModal }) {
  return (
    <div>
     <ul className="list-group note-list py-4">
        {notes.map((note) => (
          <li key={note.id} className="list-group-item note-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => openModal(note)}>
            <div>
              <strong>{note.title}</strong>
              <p>{note.date}</p>
            </div>
          
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Listnote
