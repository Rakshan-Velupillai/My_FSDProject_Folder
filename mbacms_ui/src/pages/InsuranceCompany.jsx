import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/InsuranceCompany/Sidebar";
import PlansLedger from "../components/InsuranceCompany/PlansLedger";
import PlanForm from "../components/InsuranceCompany/PlanForm";
import ProfileSettings from "../components/InsuranceCompany/ProfileSettings";
import ClaimsManager from "../components/InsuranceCompany/ClaimsManager";
import RejectionModal from "../components/InsuranceCompany/RejectionModal";
import ViewRejectionModal from "../components/InsuranceCompany/ViewRejectionModal";

const InsuranceCompany = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    // Navigation Active Tab: 'plans', 'add-plan', 'profile', or 'claims'
    const [activeTab, setActiveTab] = useState("plans");

    // Plan Management Lists & Form States
    const [plans, setPlans] = useState([]);
    const [claims, setClaims] = useState([]);
    const [claimsSearch, setClaimsSearch] = useState("");
    const [claimsStatusFilter, setClaimsStatusFilter] = useState("ALL");
    const [claimsSortBy, setClaimsSortBy] = useState("");
    const [claimsSortDir, setClaimsSortDir] = useState("desc");
    const [rejectingClaimId, setRejectingClaimId] = useState(null);
    const [viewingRejectionReason, setViewingRejectionReason] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // Add/Edit Plan Form States
    const [planId, setPlanId] = useState(null);
    const [planName, setPlanName] = useState("");
    const [planType, setPlanType] = useState("");
    const [planDesc, setPlanDesc] = useState("");
    const [coverageAmount, setCoverageAmount] = useState("");
    const [premiumAmount, setPremiumAmount] = useState("");
    const [durationMonths, setDurationMonths] = useState("");
    const [activeStatus, setActiveStatus] = useState("ACTIVE");

    // Profile Settings States
    const [profileDetails, setProfileDetails] = useState(null);
    const [editCompanyName, setEditCompanyName] = useState("");
    const [editRegNo, setEditRegNo] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editFullName, setEditFullName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhone, setEditPhone] = useState("");

    // Axios authentication config
    const getAxiosConfig = () => ({
        headers: { Authorization: `Bearer ${token}` }
    });

    // Fetch insurance plans owned by company
    const fetchPlans = async () => {
        if (!token) return;
        try {
            const res = await axios.get("http://localhost:8080/api/insurance-company/plans", getAxiosConfig());
            setPlans(res.data || []);
        } catch (err) {
            console.error("Failed to load plans", err);
        }
    };

    // Fetch claims submitted to company
    const fetchClaims = async () => {
        if (!token) return;
        try {
            const res = await axios.get("http://localhost:8080/api/claim/company-claims", getAxiosConfig());
            setClaims(res.data || []);
        } catch (err) {
            console.error("Failed to load claims", err);
        }
    };

    // Process Claim (Approve or Reject)
    const handleProcessClaim = async (id, status, reason = "") => {
        setErrorMsg("");
        setSuccessMsg("");
        try {
            let url = `http://localhost:8080/api/claim/process/${id}?status=${status}`;
            if (status === "REJECTED" && reason.trim()) {
                url += `&rejectionReason=${encodeURIComponent(reason.trim())}`;
            }
            await axios.post(url, {}, getAxiosConfig());
            setSuccessMsg(`Claim status updated to ${status} successfully!`);
            setRejectingClaimId(null);
            fetchClaims();
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            console.error("Failed to process claim", err);
            setErrorMsg(getBackendErrorMessage(err, "Failed to process claim. Please try again."));
        }
    };

    const handleClaimsSort = (field) => {
        if (claimsSortBy === field) {
            setClaimsSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setClaimsSortBy(field);
            setClaimsSortDir('asc');
        }
    };

    const renderClaimsSortIcon = (field) => {
        if (claimsSortBy !== field) return <i className="pi pi-sort-alt text-muted ms-1" style={{ fontSize: '0.8rem' }}></i>;
        return claimsSortDir === 'asc' 
            ? <i className="pi pi-sort-amount-up text-primary ms-1" style={{ fontSize: '0.8rem' }}></i>
            : <i className="pi pi-sort-amount-down text-primary ms-1" style={{ fontSize: '0.8rem' }}></i>;
    };

    const getProcessedClaims = () => {
        let result = [...claims];

        if (claimsStatusFilter !== "ALL") {
            result = result.filter(
                (c) => (c.claimStatus || c.status) === claimsStatusFilter
            );
        }

        if (claimsSearch.trim()) {
            const query = claimsSearch.toLowerCase();
            result = result.filter(
                (c) =>
                    (c.claimNumber && c.claimNumber.toLowerCase().includes(query)) ||
                    (c.patientName && c.patientName.toLowerCase().includes(query))
            );
        }

        if (claimsSortBy) {
            result.sort((a, b) => {
                let valA = a[claimsSortBy];
                let valB = b[claimsSortBy];

                if (claimsSortBy === "submissionDate") {
                    valA = new Date(valA || 0);
                    valB = new Date(valB || 0);
                } else if (claimsSortBy === "claimAmount") {
                    valA = valA || 0;
                    valB = valB || 0;
                }

                if (valA < valB) return claimsSortDir === "asc" ? -1 : 1;
                if (valA > valB) return claimsSortDir === "asc" ? 1 : -1;
                return 0;
            });
        }

        return result;
    };

    const processedClaims = getProcessedClaims();

    // Fetch company profile details
    const fetchProfile = async () => {
        if (!token) return;
        try {
            const res = await axios.get("http://localhost:8080/api/insurance-company/get-profile", getAxiosConfig());
            if (res.data) {
                setProfileDetails(res.data);
                setEditCompanyName(res.data.companyName || "");
                setEditRegNo(res.data.regNo || "");
                setEditAddress(res.data.address || "");
                setEditFullName(res.data.fullName || "");
                setEditEmail(res.data.email || "");
                setEditPhone(res.data.phoneNumber || "");
            }
        } catch (err) {
            console.error("Failed to load profile details", err);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchPlans();
        fetchProfile();
        fetchClaims();
    }, [token, activeTab]);

    // Handle Plan submit (Add or Edit)
    const handleSavePlan = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setLoading(true);

        const planPayload = {
            planName,
            planType,
            planDescription: planDesc,
            coverageAmount: parseFloat(coverageAmount || 0),
            premiumAmount: parseFloat(premiumAmount || 0),
            durationMonths: parseInt(durationMonths || 12),
            activeStatus
        };

        try {
            if (planId) {
                // Update
                await axios.put(`http://localhost:8080/api/insurance-company/plans/${planId}`, planPayload, getAxiosConfig());
                setSuccessMsg("Insurance plan updated successfully!");
            } else {
                // Add
                await axios.post("http://localhost:8080/api/insurance-company/plans", planPayload, getAxiosConfig());
                setSuccessMsg("New insurance plan saved successfully!");
            }

            // Reset form
            resetPlanForm();
            fetchPlans();

            setTimeout(() => {
                setActiveTab("plans");
                setSuccessMsg("");
            }, 2000);
        } catch (err) {
            console.error("Failed to save plan", err);
            setErrorMsg(getBackendErrorMessage(err, "Operation failed. Please verify the input values."));
        } finally {
            setLoading(false);
        }
    };

    // Delete insurance plan with constraint handling
    const handleDeletePlan = async (id) => {
        if (!window.confirm("Are you sure you want to delete this insurance plan?")) return;
        setErrorMsg("");
        setSuccessMsg("");

        try {
            await axios.delete(`http://localhost:8080/api/insurance-company/plans/${id}`, getAxiosConfig());
            setSuccessMsg("Insurance plan deleted successfully!");
            fetchPlans();
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            console.error("Deletion failed", err);
            setErrorMsg(
                "Cannot delete this plan because it is currently linked to active patient policies. " +
                "Try updating the plan and changing its status to INACTIVE instead to prevent new policy registrations."
            );
        }
    };

    // Select plan for editing
    const selectEditPlan = (plan) => {
        setPlanId(plan.id);
        setPlanName(plan.planName || "");
        setPlanType(plan.planType || "");
        setPlanDesc(plan.planDescription || "");
        setCoverageAmount(plan.coverageAmount != null ? plan.coverageAmount.toString() : "");
        setPremiumAmount(plan.premiumAmount != null ? plan.premiumAmount.toString() : "");
        setDurationMonths(plan.durationMonths != null ? plan.durationMonths.toString() : "");
        setActiveStatus(plan.activeStatus || "ACTIVE");
        setActiveTab("add-plan");
    };

    const resetPlanForm = () => {
        setPlanId(null);
        setPlanName("");
        setPlanType("");
        setPlanDesc("");
        setCoverageAmount("");
        setPremiumAmount("");
        setDurationMonths("");
        setActiveStatus("ACTIVE");
    };

    // Update Company Profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        const profilePayload = {
            companyName: editCompanyName,
            regNo: editRegNo,
            address: editAddress,
            fullName: editFullName,
            email: editEmail,
            phoneNumber: editPhone
        };

        try {
            const res = await axios.patch("http://localhost:8080/api/insurance-company/update-profile", profilePayload, getAxiosConfig());
            setSuccessMsg("Insurance Company profile updated successfully!");
            setProfileDetails(res.data);
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            console.error("Failed to update profile", err);
            setErrorMsg(getBackendErrorMessage(err, "Profile update failed. Verify all fields are valid."));
        }
    };

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <div className="d-flex" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            {/* Sidebar View Navigation panel */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                username={username}
                handleLogout={handleLogout}
                setErrorMsg={setErrorMsg}
                setSuccessMsg={setSuccessMsg}
                resetPlanForm={resetPlanForm}
            />

            {/* Dashboard Workspace */}
            <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
                <div className="d-flex justify-content-between align-items-center mb-4 text-start">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Insurance Dashboard</h2>
                        <p className="text-secondary small">Manage, publish and edit active health insurance coverage policies.</p>
                    </div>
                </div>

                {/* Notification Banners */}
                {successMsg && (
                    <div className="alert alert-success border-0 shadow-sm p-3 mb-4 rounded-3 d-flex align-items-center text-start">
                        <i className="pi pi-check-circle me-2 fs-5"></i> {successMsg}
                    </div>
                )}
                {errorMsg && (
                    <div className="alert alert-danger border-0 shadow-sm p-3 mb-4 rounded-3 d-flex align-items-center text-start">
                        <i className="pi pi-exclamation-circle me-2 fs-5"></i> {errorMsg}
                    </div>
                )}

                {/* TAB 1: PLANS LEDGER MANAGER */}
                {activeTab === "plans" && (
                    <PlansLedger
                        plans={plans}
                        setActiveTab={setActiveTab}
                        resetPlanForm={resetPlanForm}
                        selectEditPlan={selectEditPlan}
                        handleDeletePlan={handleDeletePlan}
                    />
                )}

                {/* TAB 2: ADD/EDIT INSURANCE PLAN FORM */}
                {activeTab === "add-plan" && (
                    <PlanForm
                        planId={planId}
                        planName={planName}
                        setPlanName={setPlanName}
                        planType={planType}
                        setPlanType={setPlanType}
                        planDesc={planDesc}
                        setPlanDesc={setPlanDesc}
                        coverageAmount={coverageAmount}
                        setCoverageAmount={setCoverageAmount}
                        premiumAmount={premiumAmount}
                        setPremiumAmount={setPremiumAmount}
                        durationMonths={durationMonths}
                        setDurationMonths={setDurationMonths}
                        activeStatus={activeStatus}
                        setActiveStatus={setActiveStatus}
                        handleSavePlan={handleSavePlan}
                        resetPlanForm={resetPlanForm}
                        setActiveTab={setActiveTab}
                        loading={loading}
                    />
                )}

                {/* TAB 3: COMPANY PROFILE SETTINGS */}
                {activeTab === "profile" && (
                    <ProfileSettings
                        editCompanyName={editCompanyName}
                        setEditCompanyName={setEditCompanyName}
                        editRegNo={editRegNo}
                        setEditRegNo={setEditRegNo}
                        editAddress={editAddress}
                        setEditAddress={setEditAddress}
                        editFullName={editFullName}
                        setEditFullName={setEditFullName}
                        editEmail={editEmail}
                        setEditEmail={setEditEmail}
                        editPhone={editPhone}
                        setEditPhone={setEditPhone}
                        handleUpdateProfile={handleUpdateProfile}
                    />
                )}

                {/* TAB 4: CLAIMS MANAGER */}
                {activeTab === "claims" && (
                    <ClaimsManager
                        processedClaims={processedClaims}
                        claimsSearch={claimsSearch}
                        setClaimsSearch={setClaimsSearch}
                        claimsStatusFilter={claimsStatusFilter}
                        setClaimsStatusFilter={setClaimsStatusFilter}
                        handleClaimsSort={handleClaimsSort}
                        renderClaimsSortIcon={renderClaimsSortIcon}
                        setClaimsSortBy={setClaimsSortBy}
                        setClaimsSortDir={setClaimsSortDir}
                        handleProcessClaim={handleProcessClaim}
                        setRejectingClaimId={setRejectingClaimId}
                        setRejectionReason={setRejectionReason}
                        setViewingRejectionReason={setViewingRejectionReason}
                    />
                )}
            </div>

            {/* REJECTION REASON MODAL OVERLAY */}
            {rejectingClaimId !== null && (
                <RejectionModal
                    rejectionReason={rejectionReason}
                    setRejectionReason={setRejectionReason}
                    setRejectingClaimId={setRejectingClaimId}
                    handleProcessClaim={handleProcessClaim}
                    rejectingClaimId={rejectingClaimId}
                />
            )}

            {/* VIEW REJECTION REASON MODAL OVERLAY */}
            {viewingRejectionReason !== null && (
                <ViewRejectionModal
                    viewingRejectionReason={viewingRejectionReason}
                    setViewingRejectionReason={setViewingRejectionReason}
                />
            )}
        </div>
    );
};

export default InsuranceCompany;