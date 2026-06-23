import React from "react";

const ClaimsManager = ({
    processedClaims,
    claimsSearch,
    setClaimsSearch,
    claimsStatusFilter,
    setClaimsStatusFilter,
    handleClaimsSort,
    renderClaimsSortIcon,
    setClaimsSortBy,
    setClaimsSortDir,
    handleProcessClaim,
    setRejectingClaimId,
    setRejectionReason,
    setViewingRejectionReason
}) => {
    return (
        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-start">
            <div className="mb-4">
                <h4 className="fw-bold text-dark mb-1">Incoming Insurance Claims</h4>
                <p className="text-secondary small">Review, approve, or reject claim submissions matched with patient policies.</p>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-3 align-items-center flex-grow-1" style={{ maxWidth: '600px' }}>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="pi pi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by claim number or patient name..."
                            value={claimsSearch}
                            onChange={(e) => setClaimsSearch(e.target.value)}
                        />
                    </div>
                    <div className="d-flex align-items-center gap-2" style={{ minWidth: '200px' }}>
                        <span className="small text-secondary fw-semibold">Status:</span>
                        <select 
                            className="form-select form-select-sm" 
                            value={claimsStatusFilter}
                            onChange={(e) => setClaimsStatusFilter(e.target.value)}
                        >
                            <option value="ALL">All</option>
                            <option value="SUBMITTED">Submitted</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>
                <button 
                    type="button" 
                    className="btn btn-outline-secondary d-flex align-items-center gap-1 btn-sm px-2.5"
                    style={{ height: '38px' }}
                    onClick={() => {
                        setClaimsSearch("");
                        setClaimsStatusFilter("ALL");
                        setClaimsSortBy("");
                        setClaimsSortDir("desc");
                    }}
                >
                    <i className="pi pi-refresh"></i> Reset Filters
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Claim No</th>
                            <th>Patient Name</th>
                            <th>Policy No / Plan</th>
                            <th>Invoice No</th>
                            <th onClick={() => handleClaimsSort("claimAmount")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                Claim Amount {renderClaimsSortIcon("claimAmount")}
                            </th>
                            <th onClick={() => handleClaimsSort("submissionDate")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                Submission Date {renderClaimsSortIcon("submissionDate")}
                            </th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedClaims.length > 0 ? (
                            processedClaims.map((claim) => (
                                <tr key={claim.id}>
                                    <td className="fw-bold text-indigo">{claim.claimNumber}</td>
                                    <td>{claim.patientName}</td>
                                    <td>
                                        <span className="fw-semibold text-secondary d-block small">{claim.policyNumber}</span>
                                        <span className="text-muted small">{claim.planName}</span>
                                    </td>
                                    <td><code>{claim.invoiceNumber}</code></td>
                                    <td className="fw-semibold">₹{claim.claimAmount?.toFixed(2)}</td>
                                    <td>{claim.submissionDate}</td>
                                    <td>
                                        <span
                                            className="badge rounded-pill fw-semibold"
                                            style={{
                                                backgroundColor: claim.claimStatus === "APPROVED" ? "#e6f4ea" : claim.claimStatus === "REJECTED" ? "#fbe9e7" : "#fff7ed",
                                                color: claim.claimStatus === "APPROVED" ? "#137333" : claim.claimStatus === "REJECTED" ? "#d01716" : "#c2410c",
                                                padding: "6px 12px",
                                                fontSize: "0.75rem",
                                                cursor: claim.claimStatus === "REJECTED" ? "pointer" : "default"
                                            }}
                                            onClick={() => {
                                                if (claim.claimStatus === "REJECTED") {
                                                    setViewingRejectionReason(claim.rejectionReason || "No reason provided.");
                                                }
                                            }}
                                        >
                                            {claim.claimStatus}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            {claim.documentUrl ? (
                                                <a
                                                    href={`http://localhost:8080${claim.documentUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-sm btn-outline-secondary py-1 px-2.5 d-flex align-items-center"
                                                >
                                                    <i className="pi pi-file-pdf me-1"></i> View PDF
                                                </a>
                                            ) : (
                                                <span className="text-muted small">No PDF</span>
                                            )}
                                            {claim.claimStatus === "SUBMITTED" && (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-success py-1 px-2.5 fw-semibold"
                                                        onClick={() => handleProcessClaim(claim.id, "APPROVED")}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger py-1 px-2.5 fw-semibold"
                                                        onClick={() => {
                                                            setRejectingClaimId(claim.id);
                                                            setRejectionReason("");
                                                        }}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-5 text-secondary">
                                    No claim submissions found for your insurance plans.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClaimsManager;
