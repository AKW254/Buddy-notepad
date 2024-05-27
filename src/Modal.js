import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = ({ note, mode, onClose, onAddNote, onUpdateNote, onDeleteNote }) => {
  const { title, date, id } = note || {};
  const [newTitle, setNewTitle] = useState(title || '');

  useEffect(() => {
    if (note) {
      setNewTitle(title);
    } else {
      setNewTitle('');
    }
  }, [note, title]);

  const handleAdd = () => {
      onAddNote({ id: Date.now(), title: newTitle, date: new Date().toLocaleString() });
      onClose();
  };
const handleEdit = () => {
   onUpdateNote({ id, title: newTitle, date });
  };
  const handleDelete = () => {
    onDeleteNote(id);
    onClose();
  };

  return (
    <div className="modal fade show" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {mode === 'add' ? 'New Note' : title || 'Untitled'}
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
             {(() => {
              if (mode === 'view') {
                return (
                  <div>
                    <strong>{title}</strong>
                    <p>{date}</p>
                  </div>
                );
              } else if (mode === 'edit' || mode === 'add') {
                return (
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                    </div>
                  </form>
                );
              } else if (mode === 'delete') {
                return (
                  <div>
                    <p>Are you sure you want to delete this note?</p>
                    <strong>{title}</strong>
                    <p>{date}</p>
                  </div>
                );
              }
            })()}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            {(() => {
              if (mode === 'view') {
                return null;
              } else if (mode === 'add') {
                return (
                  <button type="button" className="btn btn-danger" onClick={handleAdd}>
                    Update
                  </button>
                );
              }
      else if (mode === 'delete') {
                return (
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                );
              
              } else {
                return (
                  <button type="button" className="btn btn-primary" onClick={handleEdit}>
                    Edit
                  </button>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
