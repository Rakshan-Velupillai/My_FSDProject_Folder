import React from "react";

const InvoiceModal = ({
    selectedPrintInvoice,
    setSelectedPrintInvoice,
    profileDetails,
    username,
    getStatusStyle,
    handleDownloadPDF
}) => {
    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow-lg rounded-4 text-start">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold text-dark">Invoice Document</h5>
                        <button type="button" className="btn-close" onClick={() => setSelectedPrintInvoice(null)}></button>
                    </div>
                    
                    {/* Printable/Saveable Invoice Container */}
                    <div className="modal-body p-4">
                        <div id="print-section" className="border p-4 bg-white rounded-3 shadow-sm">
                            <div className="d-flex justify-content-between align-items-start border-bottom pb-4 mb-4">
                                <div>
                                    <h3 className="fw-bold text-primary mb-1">CareAssist Bill</h3>
                                    <span className="text-secondary small">Medical Invoice Document</span>
                                </div>
                                <div className="text-end">
                                    <h5 className="fw-bold text-dark mb-1">{selectedPrintInvoice.healthcareName}</h5>
                                    <span className="text-secondary small d-block">Authorized Care Provider</span>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-sm-6">
                                    <span className="text-muted small d-block fw-semibold mb-1">INVOICE DETAILS</span>
                                    <strong className="text-dark d-block">Invoice No: {selectedPrintInvoice.invoiceNumber}</strong>
                                    <span className="small text-secondary d-block">Issued Date: {selectedPrintInvoice.invoiceDate}</span>
                                    <span className="small text-secondary d-block">Due Date: {selectedPrintInvoice.dueDate}</span>
                                </div>
                                <div className="col-sm-6 text-sm-end mt-3 mt-sm-0">
                                    <span className="text-muted small d-block fw-semibold mb-1">PATIENT BILLING INFO</span>
                                    <strong className="text-dark d-block">{profileDetails?.name || selectedPrintInvoice.patientName}</strong>
                                    <span className="small text-secondary d-block">Username: {username}</span>
                                    <span className="small text-secondary d-block">Phone: {profileDetails?.phoneNumber || "Not Set"}</span>
                                </div>
                            </div>

                            {/* Clinical Details */}
                            <div className="bg-light p-3 rounded mb-4 text-start">
                                <div className="row">
                                    <div className="col-md-6 mb-2 mb-md-0">
                                        <span className="text-muted small d-block fw-bold mb-1">SYMPTOMS RECORDED</span>
                                        <span className="text-dark small fw-semibold" style={{ wordBreak: "break-word" }}>{selectedPrintInvoice.symptomsDesc || "No symptoms recorded."}</span>
                                    </div>
                                    <div className="col-md-6 border-start-md border-light-40">
                                        <span className="text-muted small d-block fw-bold mb-1">TREATMENT PLAN</span>
                                        <span className="text-dark small fw-semibold" style={{ wordBreak: "break-word" }}>{selectedPrintInvoice.treatmentDesc || "No treatment plan recorded."}</span>
                                    </div>
                                </div>
                            </div>

                            <h6 className="fw-bold text-dark border-bottom pb-2 mb-2.5">MEDICAL SERVICES RECORDED</h6>
                            <div className="table-responsive mb-4">
                                <table className="table table-bordered table-sm mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Service Description</th>
                                            <th className="text-end">Amount Charged</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedPrintInvoice.items && selectedPrintInvoice.items.length > 0 ? (
                                            selectedPrintInvoice.items.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item.serviceName}</td>
                                                    <td className="text-end fw-semibold">₹{item.actualAmount?.toFixed(2)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center text-muted">No items recorded.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="row justify-content-end">
                                <div className="col-md-5 text-end">
                                    <div className="d-flex justify-content-between mb-1.5 small">
                                        <span className="text-secondary">Subtotal:</span>
                                        <span className="fw-semibold text-dark">₹{selectedPrintInvoice.subtotal?.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1.5 small">
                                        <span className="text-secondary">Tax Rate:</span>
                                        <span className="text-dark">{selectedPrintInvoice.taxRate?.toFixed(1)}%</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 small">
                                        <span className="text-secondary">Tax Calculated:</span>
                                        <span className="text-dark">₹{selectedPrintInvoice.taxAmount?.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between border-top pt-2">
                                        <strong className="text-dark">Total Due Amount:</strong>
                                        <strong className="text-primary">₹{selectedPrintInvoice.totalDueAmount?.toFixed(2)}</strong>
                                    </div>

                                    <div className="d-flex justify-content-between mt-1">
                                        <strong className="text-secondary small">Payment Status:</strong>
                                        <span className="badge rounded-pill fw-semibold" style={getStatusStyle(selectedPrintInvoice.invoiceStatus || selectedPrintInvoice.status)}>
                                            {selectedPrintInvoice.invoiceStatus || selectedPrintInvoice.status || "UNPAID"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary px-3" onClick={() => setSelectedPrintInvoice(null)}>Close</button>
                        <button type="button" className="btn btn-primary px-4 d-flex align-items-center" onClick={handleDownloadPDF}>
                            <i className="pi pi-file-pdf me-2"></i> Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;
