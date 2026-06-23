import React from "react";

const RejectionModal = ({
    rejectionReason,
    setRejectionReason,
    setRejectingClaimId,
    handleProcessClaim,
    rejectingClaimId
}) => {
    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow-lg rounded-4 text-start">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold text-dark">Reject Insurance Claim</h5>
                        <button type="button" className="btn-close" onClick={() => setRejectingClaimId(null)}></button>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleProcessClaim(rejectingClaimId, "REJECTED", rejectionReason);
                    }}>
                        <div className="modal-body p-4">
                            <div className="mb-3">
                                <label className="form-label small fw-semibold text-secondary">Rejection Reason</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    required
                                    placeholder="Enter the reason why this claim is being rejected..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary px-3" onClick={() => setRejectingClaimId(null)}>Cancel</button>
                            <button type="submit" className="btn btn-danger px-4 fw-semibold">Submit Rejection</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RejectionModal;
