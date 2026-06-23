import React from "react";

const BillingSection = ({
    patientCode,
    setPatientCode,
    verifiedPatient,
    setVerifiedPatient,
    verificationSuccess,
    verificationError,
    handleVerifyPatient,
    symptomsDesc,
    setSymptomsDesc,
    treatmentDesc,
    setTreatmentDesc,
    dueDate,
    setDueDate,
    taxRate,
    setTaxRate,
    tempServiceId,
    setTempServiceId,
    tempActualAmount,
    setTempActualAmount,
    servicesList,
    addedServices,
    setAddedServices,
    handleServiceChange,
    handleAddService,
    handleRemoveService,
    handleGenerateInvoice,
    loading,
    subtotal,
    taxAmt,
    totalDue
}) => {
    return (
        <div className="row g-4 text-start">
            <div className="col-lg-7">
                <div className="card border-0 shadow-sm p-4 rounded-4" style={{ background: "#ffffff" }}>
                    <h4 className="fw-bold text-dark mb-1">Billing Setup Form</h4>
                    <p className="text-secondary small mb-4">Complete patient selection and specify service logs to calculate totals.</p>

                    <form onSubmit={handleGenerateInvoice}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Patient Code</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. PAT-A1B2C3D4"
                                    value={patientCode}
                                    onChange={(e) => {
                                        setPatientCode(e.target.value);
                                        setVerifiedPatient(null);
                                        setVerificationSuccess("");
                                        setVerificationError("");
                                    }}
                                />
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={handleVerifyPatient}
                                >
                                    Verify
                                </button>
                            </div>
                            {verificationSuccess && <div className="text-success small mt-1"><i className="pi pi-check-circle me-1"></i>{verificationSuccess}</div>}
                            {verificationError && <div className="text-danger small mt-1"><i className="pi pi-exclamation-circle me-1"></i>{verificationError}</div>}
                        </div>

                        {verifiedPatient && (
                            <div className="card p-3 mb-3 bg-light border border-success border-opacity-25" style={{ borderRadius: "8px" }}>
                                <h6 className="fw-bold text-dark mb-2 small">Verified Patient Info</h6>
                                <div className="row g-2 small">
                                    <div className="col-6">
                                        <span className="text-muted">Full Name:</span> <strong className="text-dark">{verifiedPatient.name}</strong>
                                    </div>
                                    <div className="col-6">
                                        <span className="text-muted">Username:</span> <strong className="text-dark">{verifiedPatient.username}</strong>
                                    </div>
                                    <div className="col-6">
                                        <span className="text-muted">Date of Birth:</span> <strong className="text-dark">{verifiedPatient.dob}</strong>
                                    </div>
                                    <div className="col-6">
                                        <span className="text-muted">Gender:</span> <strong className="text-dark">{verifiedPatient.gender}</strong>
                                    </div>
                                    <div className="col-6">
                                        <span className="text-muted">Blood Group:</span> <strong className="text-dark">{verifiedPatient.bloodGroup || "N/A"}</strong>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Symptoms Description</label>
                            <textarea
                                className="form-control p-2.5"
                                rows="2"
                                placeholder="Enter patient symptoms details..."
                                required
                                value={symptomsDesc}
                                onChange={(e) => setSymptomsDesc(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Treatment Description</label>
                            <textarea
                                className="form-control p-2.5"
                                rows="2"
                                placeholder="Enter treatment details..."
                                required
                                value={treatmentDesc}
                                onChange={(e) => setTreatmentDesc(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Payment Due Date</label>
                                <input
                                    type="date"
                                    className="form-control p-2.5"
                                    required
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Tax Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    className="form-control p-2.5"
                                    required
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Medical Services Addition */}
                        <div className="border p-3 rounded-3 mb-4 bg-light bg-opacity-50">
                            <h6 className="fw-bold text-dark mb-2.5">Add Medical Service Line Item</h6>
                            <div className="row g-2 align-items-end">
                                <div className="col-sm-7">
                                    <label className="form-label small text-secondary">Service Item</label>
                                    <select
                                        className="form-select"
                                        value={tempServiceId}
                                        onChange={(e) => handleServiceChange(e.target.value)}
                                    >
                                        <option value="">-- Choose Service --</option>
                                        {servicesList.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.serviceName} (₹{s.basePrice})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label small text-secondary">Actual Amount (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        placeholder="0.00"
                                        className="form-control"
                                        value={tempActualAmount}
                                        onChange={(e) => setTempActualAmount(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <button
                                        type="button"
                                        className="btn btn-teal text-white w-100"
                                        style={{ background: "#0d9488" }}
                                        onClick={handleAddService}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-100 py-2.5 fw-bold shadow-sm d-flex align-items-center justify-content-center"
                            style={{ background: "linear-gradient(135deg, #1e3a8a, #0d9488)", border: "none" }}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Generating Invoice...
                                </>
                            ) : (
                                <>
                                    <i className="pi pi-send me-2"></i> Save & Generate Invoice
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Invoice Summary Side Preview */}
            <div className="col-lg-5">
                <div className="card border-0 shadow-sm p-4 rounded-4" style={{ background: "#ffffff" }}>
                    <h4 className="fw-bold text-dark mb-3">Live Invoice Preview</h4>
                    <div className="border p-3 rounded-3 bg-light">
                        <div className="d-flex justify-content-between mb-1.5">
                            <span className="small text-secondary">Patient Code:</span>
                            <span className="fw-bold small text-primary">{verifiedPatient?.patientCode || "Unverified"}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1.5">
                            <span className="small text-secondary">Patient Name:</span>
                            <span className="fw-bold small text-dark">{verifiedPatient?.name || "Unverified"}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1.5">
                            <span className="small text-secondary">Due Date:</span>
                            <span className="fw-bold small text-dark">{dueDate || "Not Set"}</span>
                        </div>
                        <div className="mt-2.5 p-2 bg-white rounded border small text-start">
                            <strong className="text-muted d-block" style={{ fontSize: "0.7rem" }}>SYMPTOMS PREVIEW</strong>
                            <span className="text-dark fw-medium d-block text-truncate" style={{ fontSize: "0.75rem" }}>{symptomsDesc || "No symptoms entered"}</span>
                        </div>
                        <div className="mt-2 p-2 bg-white rounded border small text-start mb-3">
                            <strong className="text-muted d-block" style={{ fontSize: "0.7rem" }}>TREATMENT PREVIEW</strong>
                            <span className="text-dark fw-medium d-block text-truncate" style={{ fontSize: "0.75rem" }}>{treatmentDesc || "No treatment entered"}</span>
                        </div>

                        <hr />

                        <h6 className="fw-bold text-dark mb-2.5 small">INVOICE ITEMS</h6>
                        {addedServices.length > 0 ? (
                            <div className="d-flex flex-column gap-2 mb-3">
                                {addedServices.map((item) => (
                                    <div key={item.medicalServiceId} className="d-flex justify-content-between align-items-center bg-white p-2 rounded border text-start">
                                        <div>
                                            <span className="d-block fw-semibold small">{item.serviceName}</span>
                                            <span className="text-muted small" style={{ fontSize: "0.75rem" }}>Base Price: ₹{item.basePrice}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-bold small">₹{item.actualAmount.toFixed(2)}</span>
                                            <button
                                                type="button"
                                                className="btn btn-link p-0 text-danger border-0"
                                                onClick={() => handleRemoveService(item.medicalServiceId)}
                                                title="Remove Item"
                                            >
                                                <i className="pi pi-times-circle fs-6"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted small py-3">No service items added yet.</p>
                        )}

                        <hr />

                        <div className="d-flex justify-content-between mb-1">
                            <span className="small text-secondary">Subtotal:</span>
                            <span className="fw-semibold small">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                            <span className="small text-secondary">Tax Rate:</span>
                            <span className="small">{taxRate}%</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="small text-secondary">Tax Calculated:</span>
                            <span className="small">₹{taxAmt.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between pt-2 border-top">
                            <span className="fw-bold text-dark">Total Due Amount:</span>
                            <span className="fw-bold text-primary">₹{totalDue.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingSection;
