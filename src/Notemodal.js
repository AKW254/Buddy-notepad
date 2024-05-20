import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function Notemodal({ note, onClose }) {
  return (
    <div>
       <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Note</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {note ? (
              <>
                <h3>{note.title}</h3>
                <p>{note.date}</p>
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar" style={{ fontSize: '24px' }}></i>
                  <p className="ms-2 mb-0">Created on {note.date}</p>
                </div>
              </>
            ) : (
              <p>No note selected.</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">Update note</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Delete note</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Notemodal
