import React, { useState } from "react";

const ClaimsTable = ({ claimsData = [] }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [sortBy, setSortBy] = useState("");
    const [sortDir, setSortDir] = useState("desc");
    const [viewingRejectionReason, setViewingRejectionReason] = useState(null);

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "APPROVED":
                return { backgroundColor: "#e6f4ea", color: "#137333" };
            case "REJECTED":
                return { backgroundColor: "#fbe9e7", color: "#d01716" };
            case "SUBMITTED":
            default:
                return { backgroundColor: "#fff7ed", color: "#c2410c" };
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDir('desc');
        }
    };

    const renderSortIcon = (field) => {
        if (sortBy !== field) return <i className="pi pi-sort-alt text-muted ms-1" style={{ fontSize: '0.8rem' }}></i>;
        return sortDir === 'asc' 
            ? <i className="pi pi-sort-amount-up text-primary ms-1" style={{ fontSize: '0.8rem' }}></i>
            : <i className="pi pi-sort-amount-down text-primary ms-1" style={{ fontSize: '0.8rem' }}></i>;
    };

    const getProcessedClaims = () => {
        let result = [...claimsData];

        // Filter by Status
        if (statusFilter !== "ALL") {
            result = result.filter(
                (c) => (c.claimStatus || c.status) === statusFilter
            );
        }

        // Search by Claim Number
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (c) => c.claimNumber && c.claimNumber.toLowerCase().includes(query)
            );
        }

        // Sort by field
        if (sortBy) {
            result.sort((a, b) => {
                let valA = a[sortBy];
                let valB = b[sortBy];

                if (sortBy === "submissionDate" || sortBy === "approvedDate") {
                    valA = valA ? new Date(valA).getTime() : 0;
                    valB = valB ? new Date(valB).getTime() : 0;
                }

                if (valA < valB) return sortDir === "asc" ? -1 : 1;
                if (valA > valB) return sortDir === "asc" ? 1 : -1;
                return 0;
            });
        }

        return result;
    };

    const processedClaims = getProcessedClaims();

    return (
        <div className="card border-0 shadow-sm p-4 mt-4" style={{ borderRadius: "16px", backgroundColor: "#ffffff" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-dark mb-0">Recent Claims Logs</h5>
            </div>

            {/* Filters and Search Bar */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div className="d-flex flex-wrap gap-3 align-items-center flex-grow-1" style={{ maxWidth: '600px' }}>
                    <div className="input-group" style={{ maxWidth: '350px' }}>
                        <span className="input-group-text bg-white border-end-0">
                            <i className="pi pi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by claim number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="d-flex align-items-center gap-2" style={{ minWidth: '180px' }}>
                        <span className="small text-secondary fw-semibold">Status:</span>
                        <select 
                            className="form-select form-select-sm" 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{ height: '38px' }}
                        >
                            <option value="ALL">All Statuses</option>
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
                        setSearchQuery("");
                        setStatusFilter("ALL");
                        setSortBy("");
                        setSortDir("desc");
                    }}
                >
                    <i className="pi pi-refresh"></i> Reset Filters
                </button>
            </div>

            <div className="table-responsive">
                <table className="table align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="text-secondary small fw-semibold">Claim Number</th>
                            <th className="text-secondary small fw-semibold">Policy Number / Plan</th>
                            <th className="text-secondary small fw-semibold">Invoice No</th>
                            <th className="text-secondary small fw-semibold">Claim Amount</th>
                            <th 
                                className="text-secondary small fw-semibold" 
                                style={{ cursor: 'pointer', userSelect: 'none' }}
                                onClick={() => handleSort("submissionDate")}
                            >
                                Submission Date {renderSortIcon("submissionDate")}
                            </th>
                            <th 
                                className="text-secondary small fw-semibold" 
                                style={{ cursor: 'pointer', userSelect: 'none' }}
                                onClick={() => handleSort("approvedDate")}
                            >
                                Approved Date {renderSortIcon("approvedDate")}
                            </th>
                            <th className="text-secondary small fw-semibold">Status</th>
                            <th className="text-secondary small fw-semibold text-center">Document</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedClaims.length > 0 ? (
                            processedClaims.map((claim) => (
                                <tr key={claim.id} className="border-bottom" style={{ borderColor: "#f8fafc" }}>
                                    <td className="fw-bold text-dark py-3">{claim.claimNumber}</td>
                                    <td className="py-3">
                                        <span className="fw-semibold text-secondary d-block small">{claim.policyNumber}</span>
                                        <span className="text-muted small">{claim.planName}</span>
                                    </td>
                                    <td className="py-3"><code>{claim.invoiceNumber}</code></td>
                                    <td className="fw-semibold text-dark py-3">₹{claim.claimAmount?.toFixed(2)}</td>
                                    <td className="text-secondary small py-3">{claim.submissionDate}</td>
                                    <td className="text-secondary small py-3">
                                        {claim.approvedDate ? claim.approvedDate : <span className="text-muted italic">Not approved yet</span>}
                                    </td>
                                    <td className="py-3">
                                        <span 
                                            className="badge rounded-pill px-2.5 py-1.5 fw-semibold"
                                            style={{
                                                ...getStatusBadgeStyle(claim.claimStatus),
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
                                    <td className="text-center py-3">
                                        {claim.documentUrl ? (
                                            <a 
                                                href={`http://localhost:8080${claim.documentUrl}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="btn btn-sm btn-outline-primary d-inline-flex align-items-center"
                                                style={{ borderRadius: "6px" }}
                                            >
                                                <i className="pi pi-file-pdf me-1"></i> View PDF
                                            </a>
                                        ) : (
                                            <span className="text-muted small">No PDF</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-secondary">
                                    No claims found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* VIEW REJECTION REASON MODAL OVERLAY */}
            {viewingRejectionReason !== null && (
                <div className="modal show d-block text-start" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 shadow-lg rounded-4">
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
            )}
        </div>
    );
};

export default ClaimsTable;