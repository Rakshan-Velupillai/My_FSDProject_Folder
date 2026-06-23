import React from "react";
import InsuranceSubmissionForm from "./InsuranceSubmissionForm";

const InsurancePoliciesSection = ({
    myPolicies,
    showAddPolicyForm,
    setShowAddPolicyForm,
    availablePlans,
    insurancePlanId,
    setInsurancePlanId,
    policyNumber,
    setPolicyNumber,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    priorityOrder,
    setPriorityOrder,
    handlePlanSubmit,
    getNextDayString
}) => {
    return (
        <div className="card border-0 shadow-sm p-4 mt-4 rounded-4 bg-white text-start">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold text-dark mb-0">My Insurance Policies</h4>
                <button 
                    className="btn text-white fw-semibold d-flex align-items-center"
                    style={{ background: "linear-gradient(135deg, #2563eb, #14b8a6)", borderRadius: "8px" }}
                    onClick={() => setShowAddPolicyForm(!showAddPolicyForm)}
                >
                    <i className={`pi ${showAddPolicyForm ? 'pi-times' : 'pi-plus'} me-2`}></i>
                    {showAddPolicyForm ? "Cancel" : "Add Policy"}
                </button>
            </div>

            {/* Policies List Table */}
            {myPolicies.length > 0 ? (
                <div className="table-responsive mb-3">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Plan Name</th>
                                <th>Plan Type</th>
                                <th>Insurance Company</th>
                                <th>Policy Number</th>
                                {/* <th>Priority Order</th> */}
                                <th>Validity Period</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPolicies.map((policy) => (
                                <tr key={policy.id}>
                                    <td className="fw-bold text-primary">{policy.planName}</td>
                                    <td><span className="badge bg-light text-dark">{policy.planType}</span></td>
                                    <td className="fw-semibold text-secondary">{policy.companyName || "N/A"}</td>
                                    <td><code>{policy.policyNumber}</code></td>
                                    {/* <td>
                                        <span className="badge rounded-pill bg-primary px-2.5">
                                            Priority {policy.priorityOrder}
                                        </span>
                                    </td> */}
                                    <td className="small text-muted">
                                        {policy.startDate} to {policy.endDate}
                                    </td>
                                    <td>
                                        <span className="badge bg-success text-white fw-semibold">
                                            {policy.activeStatus || "ACTIVE"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !showAddPolicyForm && (
                    <div className="text-center py-4 text-secondary">
                        <i className="pi pi-shield fs-2 text-muted mb-2"></i>
                        <p className="mb-0 fw-medium">No insurance policy selected</p>
                    </div>
                )
            )}

            {/* Show Add Policy Form */}
            {showAddPolicyForm && (
                <div className="mt-4 p-4 border rounded-3 bg-light text-start">
                    <InsuranceSubmissionForm
                        availablePlans={availablePlans}
                        insurancePlanId={insurancePlanId}
                        setInsurancePlanId={setInsurancePlanId}
                        priorityOrder={priorityOrder}
                        setPriorityOrder={setPriorityOrder}
                        policyNumber={policyNumber}
                        setPolicyNumber={setPolicyNumber}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        handlePlanSubmit={handlePlanSubmit}
                        getNextDayString={getNextDayString}
                        isOnboarding={false}
                        handleCancel={() => setShowAddPolicyForm(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default InsurancePoliciesSection;
