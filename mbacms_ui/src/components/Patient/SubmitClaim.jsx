import React, { useState, useEffect } from "react";
import axios from "axios";

const SubmitClaim = ({ setActiveTab }) => {
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [patientInsurancePlanId, setPatientInsurancePlanId] = useState("");
    const [file, setFile] = useState(null);
    const [myPolicies, setMyPolicies] = useState([]);
    
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const getAxiosConfig = () => ({
        headers: { Authorization: `Bearer ${token}` }
    });

    const getMultipartConfig = () => ({
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });

    const fetchMyPolicies = async () => {
        if (!token) return;
        try {
            const res = await axios.get("http://localhost:8080/api/patient/my-plans", getAxiosConfig());
            setMyPolicies(res.data || []);
        } catch (err) {
            console.error("Failed to load policies", err);
        }
    };

    useEffect(() => {
        fetchMyPolicies();
    }, []);

    const getBackendErrorMessage = (err, fallback) => {
        if (err.response?.data) {
            if (typeof err.response.data === "object") {
                if (err.response.data.message) {
                    return err.response.data.message;
                } else {
                    const values = Object.values(err.response.data);
                    if (values.length > 0) {
                        return values.join(", ");
                    }
                }
            } else if (typeof err.response.data === "string") {
                return err.response.data;
            }
        }
        return err.message || fallback;
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
                setErrorMsg("Only PDF documents are allowed.");
                setFile(null);
                e.target.value = "";
                return;
            }
            setErrorMsg("");
            setFile(selectedFile);
        }
    };

    const handleSubmitClaim = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!invoiceNumber.trim()) {
            setErrorMsg("Please enter a valid invoice number.");
            return;
        }
        if (!patientInsurancePlanId) {
            setErrorMsg("Please select an active policy.");
            return;
        }
        if (!file) {
            setErrorMsg("Please upload the medical invoice PDF document.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("invoiceNumber", invoiceNumber.trim());
        formData.append("patientInsurancePlanId", patientInsurancePlanId);
        formData.append("file", file);

        try {
            await axios.post("http://localhost:8080/api/claim/submit", formData, getMultipartConfig());
            setSuccessMsg("Claim submitted successfully!");
            setInvoiceNumber("");
            setPatientInsurancePlanId("");
            setFile(null);
            
            // Redirect after brief delay
            setTimeout(() => {
                setSuccessMsg("");
                if (setActiveTab) {
                    setActiveTab("dashboard");
                }
            }, 2000);
        } catch (err) {
            console.error("Failed to submit claim", err);
            setErrorMsg(getBackendErrorMessage(err, "Claim submission failed. Verify invoice number and policy details."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center text-start">
            <div className="col-lg-8 col-md-10">
                <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                    <div className="mb-4">
                        <h4 className="fw-bold text-dark mb-1">Submit Medical Claim</h4>
                        <p className="text-secondary small">Enter your billing invoice number, select a policy and upload your medical PDF.</p>
                    </div>

                    {successMsg && (
                        <div className="alert alert-success border-0 shadow-sm p-3 mb-4 rounded-3 d-flex align-items-center">
                            <i className="pi pi-check-circle me-2 fs-5"></i> {successMsg}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="alert alert-danger border-0 shadow-sm p-3 mb-4 rounded-3 d-flex align-items-center">
                            <i className="pi pi-exclamation-circle me-2 fs-5"></i> {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmitClaim}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Billing Invoice Number</label>
                            <input
                                type="text"
                                className="form-control p-2.5"
                                placeholder="e.g. INV-10001"
                                required
                                value={invoiceNumber}
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Active Policy</label>
                            <select
                                className="form-select p-2.5"
                                required
                                value={patientInsurancePlanId}
                                onChange={(e) => setPatientInsurancePlanId(e.target.value)}
                            >
                                <option value="">-- Select Active Policy --</option>
                                {myPolicies.map((policy) => (
                                    <option key={policy.id} value={policy.id}>
                                        {policy.planName} ({policy.companyName}) - {policy.policyNumber}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-semibold text-secondary">Invoice Document (PDF format only)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                className="form-control p-2.5"
                                required
                                onChange={handleFileChange}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn text-white w-100 py-2.5 fw-semibold shadow-sm"
                            style={{ background: "linear-gradient(135deg, #2563eb, #14b8a6)", borderRadius: "8px" }}
                        >
                            {loading ? "Submitting Claim..." : "Submit Claim Verification"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitClaim;
