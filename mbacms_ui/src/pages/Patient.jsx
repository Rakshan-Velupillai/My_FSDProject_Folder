import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveProfile, selectInsurancePlan, fetchPatientStatus, fetchAvailablePlans } from "../store/action/patientAction";
import StatsCard from "../components/Patient/StatsCard";
import ClaimsTable from "../components/Patient/ClaimsTable";
import SubmitClaim from "../components/Patient/SubmitClaim";
import Sidebar from "../components/Patient/Sidebar";
import ProfileCompletionForm from "../components/Patient/ProfileCompletionForm";
import InsuranceSubmissionForm from "../components/Patient/InsuranceSubmissionForm";
import PatientProfileCard from "../components/Patient/PatientProfileCard";
import InsurancePoliciesSection from "../components/Patient/InsurancePoliciesSection";
import InvoicesTable from "../components/Patient/InvoicesTable";
import EditProfileForm from "../components/Patient/EditProfileForm";
import InvoiceModal from "../components/Patient/InvoiceModal";

const Patient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux State
    const patientState = useSelector((state) => state.patient);
    const onboardingStatus = patientState?.onboardingStatus;
    const availablePlans = patientState?.availablePlans || [];
    const profileDetails = patientState?.profileDetails;

    // Token & User details
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    // Onboarding Form States
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");

    // Insurance Onboarding Form States
    const [insurancePlanId, setInsurancePlanId] = useState("");
    const [policyNumber, setPolicyNumber] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [priorityOrder, setPriorityOrder] = useState("");

    const [myPolicies, setMyPolicies] = useState([]);
    const [showPoliciesSection, setShowPoliciesSection] = useState(false);
    const [showAddPolicyForm, setShowAddPolicyForm] = useState(false);

    const [activeTab, setActiveTab] = useState("dashboard");
    const [patientInvoices, setPatientInvoices] = useState([]);
    const [patientClaims, setPatientClaims] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [selectedPrintInvoice, setSelectedPrintInvoice] = useState(null);

    const [skippedInsurance, setSkippedInsurance] = useState(
        localStorage.getItem(`skippedInsurance_${username}`) === "true"
    );

    useEffect(() => {
        setSkippedInsurance(localStorage.getItem(`skippedInsurance_${username}`) === "true");
    }, [username]);



    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editDob, setEditDob] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editBloodGroup, setEditBloodGroup] = useState("");

    const resolvedOnboardingStatus = skippedInsurance ? "ACTIVE" : onboardingStatus;

    console.log("Patient.jsx: Render details:", {
        username,
        token: token ? (token.substring(0, 10) + "...") : "MISSING",
        onboardingStatus,
        skippedInsurance,
        resolvedOnboardingStatus,
        activeTab,
        invoicesCount: patientInvoices.length
    });

    // Axios config
    const getAxiosConfig = () => ({
        headers: { Authorization: `Bearer ${token}` }
    });

    const fetchPatientInvoices = async () => {
        if (!token) {
            console.log("fetchPatientInvoices: Skipped due to missing token");
            return;
        }
        console.log("fetchPatientInvoices: Triggered request to /api/invoice/patient-invoices");
        try {
            const res = await axios.get("http://localhost:8080/api/invoice/patient-invoices", getAxiosConfig());
            console.log("fetchPatientInvoices: Success! Received invoices:", res.data);
            setPatientInvoices(res.data || []);
        } catch (err) {
            console.error("Failed to load patient invoices", err);
            if (err.response) {
                console.error("Server responded with error status:", err.response.status, "and data:", err.response.data);
            } else if (err.request) {
                console.error("No response received from server. Request details:", err.request);
            } else {
                console.error("Request configuration error:", err.message);
            }
        }
    };

    const fetchMyPolicies = async () => {
        if (!token) return;
        try {
            const res = await axios.get("http://localhost:8080/api/patient/my-plans", getAxiosConfig());
            setMyPolicies(res.data || []);
        } catch (err) {
            console.error("Failed to load patient policies", err);
        }
    };

    const fetchPatientClaims = async () => {
        if (!token) return;
        try {
            const res = await axios.get("http://localhost:8080/api/claim/patient-claims", getAxiosConfig());
            setPatientClaims(res.data || []);
        } catch (err) {
            console.error("Failed to load patient claims", err);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        dispatch(fetchPatientStatus());
        dispatch(fetchAvailablePlans());
        fetchPatientInvoices();
        fetchMyPolicies();
        fetchPatientClaims();
    }, [dispatch, token]);

    // Refresh patient data dynamically when tab or onboarding status changes to ACTIVE
    useEffect(() => {
        if (token && resolvedOnboardingStatus === "ACTIVE") {
            fetchPatientInvoices();
            fetchMyPolicies();
            fetchPatientClaims();
        }
    }, [activeTab, resolvedOnboardingStatus, token]);

    // Populate profile inputs when user enters Profile tab
    useEffect(() => {
        if (activeTab === "profile" && profileDetails) {
            setEditName(profileDetails.name || "");
            setEditPhone(profileDetails.phoneNumber || "");
            setEditDob(profileDetails.dob || "");
            setEditAddress(profileDetails.address || "");
            setEditBloodGroup(profileDetails.bloodGroup || "");
        }
    }, [activeTab, profileDetails]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const body = {
            dob: dob,
            gender: gender,
            address: address,
            bloodGroup: bloodGroup
        };

        try {
            await dispatch(saveProfile(body));
            setErrorMsg("");
        } catch (err) {
            setErrorMsg(getBackendErrorMessage(err, "Profile completion failed. Make sure all values are filled."));
        }
    };

    const handlePlanSubmit = async (e) => {
        e.preventDefault();
        if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
            setErrorMsg("Coverage End Date must be after the Coverage Start Date.");
            return;
        }
        const body = {
            insurancePlanId: insurancePlanId,
            policyNumber: policyNumber,
            startDate: startDate,
            endDate: endDate,
            priorityOrder: priorityOrder
        };

        try {
            await dispatch(selectInsurancePlan(body));
            setErrorMsg("");
            setSuccessMsg("Insurance plan linked and verified successfully!");
            setInsurancePlanId("");
            setPolicyNumber("");
            setStartDate("");
            setEndDate("");
            setPriorityOrder("");
            fetchMyPolicies();
            setShowAddPolicyForm(false);
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setErrorMsg(getBackendErrorMessage(err, "Insurance verification failed. Policy does not exist."));
        }
    };

    const handleSkipInsurance = () => {
        localStorage.setItem(`skippedInsurance_${username}`, "true");
        setSkippedInsurance(true);
        dispatch(fetchPatientStatus());
    };

    const handleDirectPay = async (inv) => {
        setErrorMsg("");
        setSuccessMsg("");
        try {
            await axios.post(
                `http://localhost:8080/api/invoice/pay/${inv.id}`,
                {},
                getAxiosConfig()
            );
            setSuccessMsg(`Invoice ${inv.invoiceNumber} paid successfully!`);
            fetchPatientInvoices();
            dispatch(fetchPatientStatus());
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            console.error("Payment failed", err);
            setErrorMsg(getBackendErrorMessage(err, "Payment processing failed. Please try again."));
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        const body = {
            name: editName,
            address: editAddress,
            dob: editDob,
            phoneNumber: editPhone,
            bloodGroup: editBloodGroup
        };

        try {
            await axios.patch("http://localhost:8080/api/patient/patient-update", body, getAxiosConfig());
            setSuccessMsg("Profile updated successfully!");
            dispatch(fetchPatientStatus());
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            console.error("Profile update failed", err);
            setErrorMsg(getBackendErrorMessage(err, "Profile update failed. Please verify that all fields are filled."));
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

    const getNextDayString = (dateStr) => {
        if (!dateStr) return "";
        const parts = dateStr.split("-");
        if (parts.length !== 3) return "";
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        date.setDate(date.getDate() + 1);
        
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const handleLogout = () => {
        const currentUser = localStorage.getItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        if (currentUser) {
            localStorage.removeItem(`skippedInsurance_${currentUser}`);
        }
        navigate("/login");
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById("print-section");
        const opt = {
            margin: 10,
            filename: `invoice_${selectedPrintInvoice.invoiceNumber}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        };

        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        script.onload = () => {
            window.html2pdf().from(element).set(opt).save();
        };
        document.body.appendChild(script);
    };

    // Calculate dynamic stats
    const totalOutstanding = patientInvoices
        .filter((inv) => (inv.invoiceStatus || inv.status) !== "PAID")
        .reduce((sum, inv) => sum + (inv.totalDueAmount || 0), 0);

    const mockStats = {
        activePolicies: `${myPolicies.length} Active`,
        totalClaims: `${patientClaims.length}`,
        outstandingBalance: `₹${totalOutstanding.toFixed(2)}`
    };

    const handleActivePoliciesClick = () => {
        setShowPoliciesSection(prev => !prev);
        if (myPolicies.length === 0) {
            setShowAddPolicyForm(true);
        } else {
            setShowAddPolicyForm(false);
        }
    };

    const mockClaimsList = [
        { id: 1, date: "2026-06-18", amount: "₹0.00", status: "APPROVED" },
        { id: 2, date: "2026-06-18", amount: "₹0.00", status: "PENDING" }
    ];

    const getStatusStyle = (statusVal) => {
        const status = statusVal || "UNPAID";
        if (status === "PAID") {
            return { backgroundColor: "#e6f4ea", color: "#137333" };
        } else if (status === "PARTIALLY_PAID") {
            return { backgroundColor: "#e8f0fe", color: "#1a73e8" };
        } else {
            return { backgroundColor: "#fff7ed", color: "#c2410c" };
        }
    };

    return (
        <div className="d-flex" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            {/* Sidebar View Navigation panel */}
            <Sidebar
                resolvedOnboardingStatus={resolvedOnboardingStatus}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setErrorMsg={setErrorMsg}
                username={username}
                handleLogout={handleLogout}
            />

            {/* Dashboard Workspace */}
            <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
                <div className="mb-4">
                    <h2 className="fw-bold text-dark mb-1">Welcome back, {profileDetails?.name || username}</h2>
                    <p className="text-secondary small">Access claims details, complete profiles, and verify medical invoices.</p>
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

                {/* Step 2 Form view */}
                {resolvedOnboardingStatus === "REGISTERED" && (
                    <ProfileCompletionForm
                        dob={dob}
                        setDob={setDob}
                        gender={gender}
                        setGender={setGender}
                        address={address}
                        setAddress={setAddress}
                        bloodGroup={bloodGroup}
                        setBloodGroup={setBloodGroup}
                        handleProfileSubmit={handleProfileSubmit}
                    />
                )}

                {/* Step 3 & 4 Insurance verification Form view */}
                {resolvedOnboardingStatus === "PROFILE_PENDING" && (
                    <div className="card border-0 shadow-sm p-4 animate-fade-in" style={{ borderRadius: "16px" }}>
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
                            isOnboarding={true}
                            handleSkipInsurance={handleSkipInsurance}
                        />
                    </div>
                )}

                {/* Dashboard Tabs for unlocked users */}
                {resolvedOnboardingStatus === "ACTIVE" && (
                    <div>
                        {activeTab === "dashboard" && (
                            <div>
                                <div className="row g-4">
                                    <div className="col-md-4">
                                        <StatsCard 
                                            title="Active Policies" 
                                            value={mockStats.activePolicies} 
                                            subtext="Policy Active" 
                                            icon="🛡️" 
                                            iconBg="#e6f4ea" 
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <StatsCard title="Total Claims" value={mockStats.totalClaims} subtext="Submitted claims" icon="📋" iconBg="#e8f0fe" />
                                    </div>
                                    <div className="col-md-4">
                                        <StatsCard title="Outstanding Balance" value={mockStats.outstandingBalance} subtext="Due balance" icon="💵" iconBg="#fef3c7" />
                                    </div>
                                </div>

                                {/* Redux Profile Details Card */}
                                <PatientProfileCard
                                    profileDetails={profileDetails}
                                    username={username}
                                />

                                <InsurancePoliciesSection
                                    myPolicies={myPolicies}
                                    showAddPolicyForm={showAddPolicyForm}
                                    setShowAddPolicyForm={setShowAddPolicyForm}
                                    availablePlans={availablePlans}
                                    insurancePlanId={insurancePlanId}
                                    setInsurancePlanId={setInsurancePlanId}
                                    policyNumber={policyNumber}
                                    setPolicyNumber={setPolicyNumber}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    priorityOrder={priorityOrder}
                                    setPriorityOrder={setPriorityOrder}
                                    handlePlanSubmit={handlePlanSubmit}
                                    getNextDayString={getNextDayString}
                                />

                                <ClaimsTable claimsData={patientClaims} />
                            </div>
                        )}

                        {activeTab === "invoices" && (
                            <InvoicesTable
                                patientInvoices={patientInvoices}
                                getStatusStyle={getStatusStyle}
                                handleDirectPay={handleDirectPay}
                                setSelectedPrintInvoice={setSelectedPrintInvoice}
                            />
                        )}

                        {activeTab === "profile" && (
                            <EditProfileForm
                                profileDetails={profileDetails}
                                editName={editName}
                                setEditName={setEditName}
                                editPhone={editPhone}
                                setEditPhone={setEditPhone}
                                editDob={editDob}
                                setEditDob={setEditDob}
                                editAddress={editAddress}
                                setEditAddress={setEditAddress}
                                editBloodGroup={editBloodGroup}
                                setEditBloodGroup={setEditBloodGroup}
                                handleUpdateProfile={handleUpdateProfile}
                            />
                        )}

                        {activeTab === "submit-claim" && (
                            <SubmitClaim setActiveTab={setActiveTab} />
                        )}
                    </div>
                )}
            </div>

            {/* PDF DETAIL OVERLAY MODAL */}
            {selectedPrintInvoice && (
                <InvoiceModal
                    selectedPrintInvoice={selectedPrintInvoice}
                    setSelectedPrintInvoice={setSelectedPrintInvoice}
                    profileDetails={profileDetails}
                    username={username}
                    getStatusStyle={getStatusStyle}
                    handleDownloadPDF={handleDownloadPDF}
                />
            )}
        </div>
    );
};

export default Patient;