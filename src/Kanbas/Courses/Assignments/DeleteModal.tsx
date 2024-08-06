export default function DeleteModal({ assignmentId, deleteAssignment }: { assignmentId: string; deleteAssignment: (assignmentId: string) => void }) {
    const handleDeleteConfirm = () => {
      deleteAssignment(assignmentId);
    };
  
    return (
      <div className="modal fade" id={`deleteConfirmationModal-${assignmentId}`} tabIndex={-1} role="dialog" aria-labelledby={`deleteConfirmationModalLabel-${assignmentId}`} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`deleteConfirmationModalLabel-${assignmentId}`}>Confirm Deletion</h5>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this assignment?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  