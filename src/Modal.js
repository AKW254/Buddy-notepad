import React, { useState, useEffect, useContext } from 'react';
import { NotesContext } from './context/NotesContext';
const generateId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 16);
  };

const Modal = () => {
  const {
    selectedNote,
    modalMode,
    closeModal,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote
  } = useContext(NotesContext);

  const { title, content, date, id } = selectedNote || {};

  const [newId, setNewId] = useState(id || '');
  const [newTitle, setNewTitle] = useState(title || '');
  const [newContent, setNewContent] = useState(content || '');

  useEffect(() => {
    if (selectedNote) {
      setNewId(id);
      setNewTitle(title);
      setNewContent(content);
    } else {
      setNewId('');
      setNewTitle('');
      setNewContent('');
    }
  }, [selectedNote, id, title, content]);

  const handleAdd = () => {
    handleAddNote({ id: generateId(), title: newTitle, content: newContent, date: new Date().toLocaleString() });
  };

  const handleEdit = () => {
    handleUpdateNote({ id: newId, title: newTitle, content: newContent, date: new Date().toLocaleString() });
  };

  const handleDelete = () => {
    handleDeleteNote({ id: newId });
    closeModal();
  };

  return (
    <div className="modal fade show" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {modalMode === 'add' ? 'New Note' : title || 'Untitled'}
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
             {modalMode === 'view' && (
        <div className="text-center">
          <strong>{title}</strong>
          <p>{content}</p>
          <hr />
          <p className="bi bi-calendar">{date}</p>
        </div>
      )}
      
      { modalMode !=='delete' && modalMode ==='add' && (
        <form>
          <div className="mb-3">
            
            <input
              type="hidden"
              className="form-control"
              id="id"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
            />
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Note Content</label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>
        </form>
            )}
           { modalMode !=='delete' && modalMode ==='edit' && (
        <form>
          <div className="mb-3">
        
            <input
              type="hidden"
              className="form-control"
              id="id"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
            />
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Note Content</label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>
        </form>
      )}
      
      {modalMode === 'delete' && (
        <div>
          <p className="text-danger">
            Are you sure you want to delete this <strong>{title}</strong> note?
          </p>
        </div>
      )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
            {modalMode === 'add' && (
              <button type="button" className="btn btn-primary" onClick={handleAdd}>
                Add
              </button>
            )}
            {modalMode === 'edit' && (
              <button type="button" className="btn btn-primary" onClick={handleEdit}>
                Edit
              </button>
            )}
            {modalMode === 'delete' && (
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
