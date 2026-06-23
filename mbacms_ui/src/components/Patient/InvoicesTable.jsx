import React from "react";

const InvoicesTable = ({
    patientInvoices,
    getStatusStyle,
    handleDirectPay,
    setSelectedPrintInvoice
}) => {
    return (
        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-start">
            <h4 className="fw-bold text-dark mb-3">Healthcare Medical Invoices</h4>
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Invoice No</th>
                            <th>Healthcare Provider</th>
                            <th>Issued Date</th>
                            <th>Due Date</th>
                            <th>Total Due</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientInvoices.length > 0 ? (
                            patientInvoices.map((inv) => (
                                <tr key={inv.id}>
                                    <td className="fw-bold text-primary">{inv.invoiceNumber}</td>
                                    <td>{inv.healthcareName}</td>
                                    <td>{inv.invoiceDate}</td>
                                    <td>{inv.dueDate}</td>
                                    <td className="fw-semibold">₹{inv.totalDueAmount?.toFixed(2)}</td>
                                    <td>
                                        <span
                                            className="badge rounded-pill fw-semibold"
                                            style={getStatusStyle(inv.invoiceStatus || inv.status)}
                                        >
                                            {inv.invoiceStatus || inv.status || "UNPAID"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            {(inv.invoiceStatus || inv.status) !== "PAID" && (
                                                <button
                                                    className="btn btn-sm btn-success py-1 px-2.5 fw-semibold"
                                                    onClick={() => handleDirectPay(inv)}>
                                                    Make Payment
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-sm btn-outline-primary py-1 px-2.5 d-flex align-items-center"
                                                onClick={() => setSelectedPrintInvoice(inv)}>
                                                <i className="pi pi-file-pdf me-1"></i> View / PDF
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-secondary">
                                    No healthcare billing invoices generated for you.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoicesTable;
