import React from "react";

const InsuranceSubmissionForm = ({
    availablePlans,
    insurancePlanId,
    setInsurancePlanId,
    priorityOrder,
    setPriorityOrder,
    policyNumber,
    setPolicyNumber,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handlePlanSubmit,
    getNextDayString,
    isOnboarding,
    handleSkipInsurance,
    handleCancel
}) => {
    return (
        <>
            <div className="mb-4 text-start">
                {isOnboarding ? (
                    <h4 className="fw-bold mb-1 text-dark">Step 3: Insurance Submission</h4>
                ) : (
                    <h5 className="fw-bold mb-1 text-dark">Step 3: Insurance Submission</h5>
                )}
                <p className="text-muted small">The policy number will be verified instantly against the registry database pool.</p>
            </div>
            <form onSubmit={handlePlanSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label small fw-semibold text-secondary">Insurance Plan</label>
                        <select className="form-select" required
                            value={insurancePlanId || ""}
                            onChange={(e) => setInsurancePlanId(e.target.value)}
                        >
                            <option value="">-- Choose a plan --</option>
                            {Array.isArray(availablePlans) && availablePlans.map(plan=>(
                                <option key={plan.id} value={plan.id}>
                                    {plan.planName} ({plan.planType})
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* <div className="col-md-6 mb-3">
                        <label className="form-label small fw-semibold text-secondary">Priority Order</label>
                        <select className="form-select" required
                            value={priorityOrder}
                            onChange={(e) => setPriorityOrder(e.target.value)}>
                            <option value="">Select Priority...</option>
                            <option value="1">1 (Primary Insurance)</option>
                            <option value="2">2 (Secondary Insurance)</option>
                            <option value="3">3 (Tertiary Insurance)</option>
                        </select>
                    </div> */}
                </div>
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Policy Number</label>
                    <input type="text" className="form-control p-2.5" placeholder="e.g. POL-10005" required
                        value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} />
                    <div className="form-text text-muted small" style={{ fontSize: "0.75rem" }}>
                        Try valid registry strings like <strong>POL-10001</strong> to <strong>POL-10020</strong>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                        <label className="form-label small fw-semibold text-secondary">Coverage Start Date</label>
                        <input type="date" className="form-control p-2.5" required
                            value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label small fw-semibold text-secondary">Coverage End Date</label>
                        <input type="date" className="form-control p-2.5" required
                            min={startDate ? getNextDayString(startDate) : ""}
                            value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>
                
                {isOnboarding ? (
                    <div className="d-flex flex-column gap-2.5">
                        <button type="submit" className="btn text-white w-100 py-2.5 fw-semibold shadow-sm" style={{ background: "linear-gradient(135deg, #2563eb, #14b8a6)", borderRadius: "8px" }}>
                            Link & Verify Policy
                        </button>
                        <button type="button" className="btn btn-outline-secondary w-100 py-2.5 fw-semibold" onClick={handleSkipInsurance}>
                            Skip Insurance Verification
                        </button>
                    </div>
                ) : (
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn text-white flex-grow-1 py-2.5 fw-semibold shadow-sm" style={{ background: "linear-gradient(135deg, #2563eb, #14b8a6)", borderRadius: "8px" }}>
                            Link & Verify Policy
                        </button>
                        <button type="button" className="btn btn-outline-secondary px-4 py-2.5 fw-semibold" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )}
            </form>
        </>
    );
};

export default InsuranceSubmissionForm;
