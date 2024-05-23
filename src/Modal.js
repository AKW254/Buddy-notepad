import React ,{ useState} from 'react'

function Modal({ note, onClose, onAddNote, onUpdateNote, onDeleteNote }) {
     const { title, date, id } = note || {}; // Handle cases where no note is provided
  const [newTitle, setNewTitle] = useState(title || ''); // State for new/edited title

  const handleSave = () => {
    if (!note) { // New Note
      onAddNote({ title: newTitle, id: Date.now() }); // Generate unique ID
    } else {
      onUpdateNote({ id, title: newTitle }); // Update existing note
    }
    onClose(); // Close the modal after saving
  };
    return (
        <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title || 'New Note'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input type="date" className="form-control" id="date" value={date} disabled />
                            </div>
                            {note && ( // Only show Delete button for existing notes
                                <button type="button" className="btn btn-danger mb-2" onClick={() => onDeleteNote(id)}>Delete Note</button>
                            )}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>
                            {note ? 'Save changes' : 'Add Note'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal
