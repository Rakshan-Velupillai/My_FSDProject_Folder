import React from "react";

const PlansLedger = ({
    plans,
    setActiveTab,
    resetPlanForm,
    selectEditPlan,
    handleDeletePlan
}) => {
    return (
        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-start">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold text-dark mb-0">Offered Insurance Plans</h4>
                <button
                    className="btn btn-sm text-white px-3 py-2 fw-semibold"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #0891b2)" }}
                    onClick={() => { setActiveTab("add-plan"); resetPlanForm(); }}
                >
                    <i className="pi pi-plus me-1"></i> Add New Plan
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Plan Name</th>
                            <th>Plan Type</th>
                            <th>Coverage</th>
                            <th>Premium</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.length > 0 ? (
                            plans.map((plan) => (
                                <tr key={plan.id}>
                                    <td className="fw-bold text-indigo">{plan.planName}</td>
                                    <td><span className="badge bg-secondary bg-opacity-10 text-secondary">{plan.planType}</span></td>
                                    <td className="fw-semibold">₹{plan.coverageAmount?.toFixed(2)}</td>
                                    <td className="fw-semibold">₹{plan.premiumAmount?.toFixed(2)}</td>
                                    <td>{plan.durationMonths} Months</td>
                                    <td>
                                        <span
                                            className="badge rounded-pill fw-semibold"
                                            style={{
                                                backgroundColor: plan.activeStatus === "ACTIVE" ? "#e6f4ea" : "#fbe9e7",
                                                color: plan.activeStatus === "ACTIVE" ? "#137333" : "#d01716",
                                                padding: "6px 12px",
                                                fontSize: "0.75rem"
                                            }}
                                        >
                                            {plan.activeStatus || "ACTIVE"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-primary py-1 px-2.5 d-flex align-items-center"
                                                onClick={() => selectEditPlan(plan)}
                                            >
                                                <i className="pi pi-pencil me-1"></i> Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger py-1 px-2.5 d-flex align-items-center"
                                                onClick={() => handleDeletePlan(plan.id)}
                                            >
                                                <i className="pi pi-trash me-1"></i> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-secondary">
                                    No insurance plans configured. Click "Add New Plan" to publish a policy.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlansLedger;
