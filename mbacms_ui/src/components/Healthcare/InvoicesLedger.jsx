import React from "react";

const InvoicesLedger = ({
    invoices,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    sortDir,
    handleSort,
    renderSortIcon,
    expandedInvoiceId,
    toggleInvoiceExpand,
    currentPage,
    setCurrentPage,
    hasMoreInvoices,
    setSortBy,
    setSortDir
}) => {
    return (
        <div className="card border-0 shadow-sm p-4 rounded-4 text-start" style={{ background: "#ffffff" }}>
            <h4 className="fw-bold text-dark mb-3">Invoice Billing Logs</h4>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2 align-items-center">
                    <div className="input-group" style={{ maxWidth: '350px' }}>
                        <span className="input-group-text bg-white border-end-0">
                            <i className="pi pi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by invoice number or patient..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(0);
                            }}
                        />
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-outline-secondary d-flex align-items-center gap-1 btn-sm px-2.5"
                        style={{ height: '38px' }}
                        onClick={() => {
                            setSortBy("");
                            setSortDir("");
                            setCurrentPage(0);
                        }}
                        title="Clear Sorting"
                    >
                        <i className="pi pi-refresh"></i> Clear Sort
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Invoice No</th>
                            <th onClick={() => handleSort("patientName")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                Patient {renderSortIcon("patientName")}
                            </th>
                            <th onClick={() => handleSort("invoiceDate")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                Issued Date {renderSortIcon("invoiceDate")}
                            </th>
                            <th onClick={() => handleSort("dueDate")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                Due Date {renderSortIcon("dueDate")}
                            </th>
                            <th onClick={() => handleSort("totalDueAmount")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                Total Due {renderSortIcon("totalDueAmount")}
                            </th>
                            <th style={{ userSelect: 'none' }}>
                                <div className="d-flex align-items-center gap-1">
                                    <span>Status</span>
                                    <select 
                                        className="form-select form-select-sm border-0 p-0 bg-transparent text-secondary fw-semibold" 
                                        style={{ width: '85px', fontSize: '0.75rem', boxShadow: 'none' }}
                                        value={statusFilter}
                                        onChange={(e) => {
                                            setStatusFilter(e.target.value);
                                            setCurrentPage(0);
                                        }}
                                    >
                                        <option value="ALL">All</option>
                                        <option value="PAID">Paid</option>
                                        <option value="UNPAID">Unpaid</option>
                                    </select>
                                </div>
                            </th>
                            <th className="text-center">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length > 0 ? (
                            invoices.map((inv) => (
                                <React.Fragment key={inv.id}>
                                    <tr>
                                        <td className="fw-bold text-primary">{inv.invoiceNumber}</td>
                                        <td>{inv.patientName}</td>
                                        <td>{inv.invoiceDate}</td>
                                        <td>{inv.dueDate}</td>
                                        <td className="fw-semibold">₹{inv.totalDueAmount?.toFixed(2)}</td>
                                        <td>
                                            <span
                                                className="badge rounded-pill fw-semibold"
                                                style={{
                                                    backgroundColor: (inv.invoiceStatus || inv.status) === "PAID" ? "#e6f4ea" : "#fff7ed",
                                                    color: (inv.invoiceStatus || inv.status) === "PAID" ? "#137333" : "#c2410c",
                                                    padding: "6px 12px",
                                                    fontSize: "0.75rem"
                                                }}
                                            >
                                                {inv.invoiceStatus || inv.status || "UNPAID"}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm btn-outline-secondary py-1"
                                                onClick={() => toggleInvoiceExpand(inv.id)}
                                            >
                                                {expandedInvoiceId === inv.id ? "Hide" : "View items"}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedInvoiceId === inv.id && (
                                        <tr>
                                            <td colSpan="7" className="bg-light p-3 border-bottom">
                                                <div className="px-3">
                                                    <div className="row g-3 small bg-white p-3 border rounded mb-3">
                                                        <div className="col-md-6">
                                                            <strong className="text-secondary d-block mb-1">SYMPTOMS RECORDED</strong>
                                                            <span className="text-dark fw-medium">{inv.symptomsDesc || "No symptoms recorded."}</span>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <strong className="text-secondary d-block mb-1">TREATMENT PLAN</strong>
                                                            <span className="text-dark fw-medium">{inv.treatmentDesc || "No treatment plan recorded."}</span>
                                                        </div>
                                                    </div>
                                                    <h6 className="fw-bold text-secondary mb-2 small">MEDICAL SERVICE LINE ITEMS</h6>
                                                    <div className="table-responsive">
                                                        <table className="table table-sm table-bordered bg-white mb-0 small">
                                                            <thead>
                                                                <tr>
                                                                    <th>Service Name</th>
                                                                    <th>Charged Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {inv.items && inv.items.length > 0 ? (
                                                                    inv.items.map((item, i) => (
                                                                        <tr key={i}>
                                                                            <td>{item.serviceName}</td>
                                                                            <td className="fw-semibold">₹{item.actualAmount?.toFixed(2)}</td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="2" className="text-center text-muted">No details available.</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-secondary">
                                    No invoices generated yet. Click "Generate Invoice" to start.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4 gap-2">
                <button
                    className="btn btn-outline-primary btn-sm px-3"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span className="align-self-center text-secondary small px-2">Page {currentPage + 1}</span>
                <button
                    className="btn btn-outline-primary btn-sm px-3"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!hasMoreInvoices}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default InvoicesLedger;
