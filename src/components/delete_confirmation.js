import React from 'react'

const DeleteConfirmation = (props) => {
  return (
    <div className="modal fade" id="deleteConfirmationModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content bg-dark">
          <div className="modal-header bg-dark text-light border-secondary">
            <h5 className="modal-title" id="deleteModalLabel">Delete Contact</h5>
            <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body rounded-bottom bg-dark">
            <p className="text-light text-left">
              Are you sure you want to delete this contact?
            </p>
            <div className="text-right">
              <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={(e) => props.handleDelete(e)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}

export default DeleteConfirmation