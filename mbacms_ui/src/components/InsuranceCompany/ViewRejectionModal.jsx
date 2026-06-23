import React from "react";

const ViewRejectionModal = ({
    viewingRejectionReason,
    setViewingRejectionReason
}) => {
    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow-lg rounded-4 text-start">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold text-dark">Claim Rejection Reason</h5>
                        <button type="button" className="btn-close" onClick={() => setViewingRejectionReason(null)}></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-3 border border-danger-subtle">
                            <p className="mb-0 fs-6">{viewingRejectionReason}</p>
                        </div>
                    </div>
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary px-4 fw-semibold" onClick={() => setViewingRejectionReason(null)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRejectionModal;
