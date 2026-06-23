import React from "react";

const PlanForm = ({
    planId,
    planName,
    setPlanName,
    planType,
    setPlanType,
    planDesc,
    setPlanDesc,
    coverageAmount,
    setCoverageAmount,
    premiumAmount,
    setPremiumAmount,
    durationMonths,
    setDurationMonths,
    activeStatus,
    setActiveStatus,
    handleSavePlan,
    resetPlanForm,
    setActiveTab,
    loading
}) => {
    return (
        <div className="row justify-content-center text-start">
            <div className="col-lg-8">
                <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                    <h4 className="fw-bold text-dark mb-1">{planId ? "Modify Insurance Plan" : "New Policy Form"}</h4>
                    <p className="text-secondary small mb-4">Complete structural parameters below to configure coverage plans.</p>

                    <form onSubmit={handleSavePlan}>
                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Plan Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Care Shield Premium"
                                    required
                                    value={planName}
                                    onChange={(e) => setPlanName(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Plan Type</label>
                                <select
                                    className="form-select"
                                    required
                                    value={planType}
                                    onChange={(e) => setPlanType(e.target.value)}
                                >
                                    <option value="">-- Choose Type --</option>
                                    <option value="General Health Insurance">General Health Insurance</option>
                                    <option value="Critical Illness Insurance">Critical Illness Insurance</option>
                                    <option value="Maternity Insurance">Maternity Insurance</option>
                                    <option value="Senior Citizen Health Insurance">Senior Citizen Health Insurance</option>
                                    <option value="Family Floater Health Insurance">Family Floater Health Insurance</option>
                                    <option value="Individual Health Insurance">Individual Health Insurance</option>
                                    <option value="Group/Corporate Health Insurance">Group/Corporate Health Insurance</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Plan Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Write outline details and coverage inclusions..."
                                required
                                value={planDesc}
                                onChange={(e) => setPlanDesc(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="row g-3 mb-4">
                            <div className="col-md-4">
                                <label className="form-label small fw-semibold text-secondary">Coverage Amount (₹)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="1"
                                    className="form-control"
                                    placeholder="e.g. 500000"
                                    required
                                    value={coverageAmount}
                                    onChange={(e) => setCoverageAmount(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label small fw-semibold text-secondary">Monthly Premium (₹)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="1"
                                    className="form-control"
                                    placeholder="e.g. 1500"
                                    required
                                    value={premiumAmount}
                                    onChange={(e) => setPremiumAmount(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label small fw-semibold text-secondary">Duration (Months)</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="form-control"
                                    placeholder="e.g. 12"
                                    required
                                    value={durationMonths}
                                    onChange={(e) => setDurationMonths(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-semibold text-secondary">Status Option</label>
                            <select
                                className="form-select"
                                value={activeStatus}
                                onChange={(e) => setActiveStatus(e.target.value)}
                            >
                                <option value="ACTIVE">Active (Selectable by Patients)</option>
                                <option value="INACTIVE">Inactive (Disabled / Hidden)</option>
                            </select>
                        </div>

                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn text-white px-4 py-2 fw-semibold"
                                style={{ background: "linear-gradient(135deg, #4f46e5, #0891b2)", border: "none" }}
                            >
                                {loading ? "Processing..." : (planId ? "Save Changes" : "Create Plan")}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4 py-2"
                                onClick={() => { setActiveTab("plans"); resetPlanForm(); }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlanForm;
