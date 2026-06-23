import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Healthcare/Sidebar";
import StatsCards from "../components/Healthcare/StatsCards";
import InvoicesLedger from "../components/Healthcare/InvoicesLedger";
import BillingSection from "../components/Healthcare/BillingSection";
import ProfileSettings from "../components/Healthcare/ProfileSettings";

const Healthcare = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    // Tab State: 'invoices' or 'generate'
    const [activeTab, setActiveTab] = useState("invoices");

    // Data lists
    const [invoices, setInvoices] = useState([]);
    const [servicesList, setServicesList] = useState([]);

    // Patient Verification States
    const [patientCode, setPatientCode] = useState("");
    const [verifiedPatient, setVerifiedPatient] = useState(null);
    const [verificationError, setVerificationError] = useState("");
    const [verificationSuccess, setVerificationSuccess] = useState("");

    // Invoice Form Fields
    const [dueDate, setDueDate] = useState("");
    const [taxRate, setTaxRate] = useState("5.0");
    const [symptomsDesc, setSymptomsDesc] = useState("");
    const [treatmentDesc, setTreatmentDesc] = useState("");
    const [addedServices, setAddedServices] = useState([]);

    // Service Item Form Temp Fields
    const [tempServiceId, setTempServiceId] = useState("");
    const [tempActualAmount, setTempActualAmount] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(6);
    const [hasMoreInvoices, setHasMoreInvoices] = useState(true);

    // Search and Sort State
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [sortBy, setSortBy] = useState("invoiceDate");
    const [sortDir, setSortDir] = useState("desc");

    // Notifications & UI states
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [expandedInvoiceId, setExpandedInvoiceId] = useState(null);

    // Healthcare Profile States
    const [profileDetails, setProfileDetails] = useState(null);
    const [editHealthcareName, setEditHealthcareName] = useState("");
    const [editSpecialization, setEditSpecialization] = useState("");
    const [editLicenseNumber, setEditLicenseNumber] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editFullName, setEditFullName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhone, setEditPhone] = useState("");

    // Configuration header for authenticated requests
    const getAxiosConfig = () => ({
        headers: { Authorization: `Bearer ${token}` }
    });

    const fetchHealthcareProfile = async () => {
        if (!token) return;
        try {
            const res = await axios.get("http://localhost:8080/api/healthcare/get-healthcare", getAxiosConfig());
            if (res.data) {
                setProfileDetails(res.data);
                setEditHealthcareName(res.data.healthcareName || "");
                setEditSpecialization(res.data.specialization || "");
                setEditLicenseNumber(res.data.licenseNumber || "");
                setEditAddress(res.data.address || "");
                setEditFullName(res.data.fullName || "");
                setEditEmail(res.data.email || "");
                setEditPhone(res.data.phoneNumber || "");
            }
        } catch (err) {
            console.error("Failed to load healthcare profile", err);
        }
    };

    useEffect(() => {
        if (token) {
            fetchHealthcareProfile();
        }
    }, [token, activeTab]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        const body = {
            healthcareName: editHealthcareName,
            specialization: editSpecialization,
            licenseNumber: editLicenseNumber,
            address: editAddress,
            fullName: editFullName,
            email: editEmail,
            phoneNumber: editPhone
        };

        try {
            const res = await axios.patch("http://localhost:8080/api/healthcare/update-profile", body, getAxiosConfig());
            setSuccessMsg("Healthcare profile updated successfully!");
            setProfileDetails(res.data);
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            console.error("Failed to update profile", err);
            setErrorMsg(getBackendErrorMessage(err, "Profile update failed. Please fill all fields correctly."));
        }
    };

    // Fetch Invoices
    const fetchInvoices = async (page = 0, searchVal = "", statusVal = "ALL", sortField = "invoiceDate", dir = "desc") => {
        if (!token) return;
        try {
            const res = await axios.get(
                `http://localhost:8080/api/invoice/healthcare-invoices/?page=${page}&size=${pageSize}&search=${searchVal}&status=${statusVal}&sortBy=${sortField}&sortDir=${dir}`,
                getAxiosConfig()
            );
            const fetched = res.data || [];
            setInvoices(fetched);
            setHasMoreInvoices(fetched.length === pageSize);
        } catch (err) {
            console.error("Failed to load invoices", err);
            setErrorMsg("Could not retrieve invoices. Please log in again.");
        }
    };

    // Fetch Services
    const [servicesLoading, setServicesLoading] = useState(false);
    const fetchServices = async () => {
        if (!token) return;
        setServicesLoading(true);
        try {
            const servicesRes = await axios.get("http://localhost:8080/api/medical-service/getAll", getAxiosConfig());
            setServicesList(servicesRes.data || []);
        } catch (err) {
            console.error("Failed to load services", err);
        } finally {
            setServicesLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchInvoices(currentPage, debouncedSearch, statusFilter, sortBy, sortDir);
    }, [token, currentPage, debouncedSearch, statusFilter, sortBy, sortDir]);

    useEffect(() => {
        if (!token) return;
        fetchServices();
    }, [token]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDir('asc');
        }
        setCurrentPage(0);
    };

    const renderSortIcon = (field) => {
        if (sortBy !== field) return <i className="pi pi-sort-alt text-muted ms-1" style={{ fontSize: '0.8rem' }}></i>;
        return sortDir === 'asc'
            ? <i className="pi pi-sort-amount-up text-primary ms-1" style={{ fontSize: '0.8rem' }}></i>
            : <i className="pi pi-sort-amount-down text-primary ms-1" style={{ fontSize: '0.8rem' }}></i>;
    };

    // Handle Service Dropdown Change (autopopulate base price)
    const handleServiceChange = (serviceId) => {
        setTempServiceId(serviceId);
        if (!serviceId) {
            setTempActualAmount("");
            return;
        }
        const service = servicesList.find((s) => s.id === parseInt(serviceId));
        if (service) {
            setTempActualAmount(service.basePrice.toString());
        }
    };

    // Add Service to Invoice items
    const handleAddService = (e) => {
        e.preventDefault();
        if (!tempServiceId) {
            setErrorMsg("Please select a medical service to add.");
            return;
        }
        if (!tempActualAmount || parseFloat(tempActualAmount) <= 0) {
            setErrorMsg("Please specify a valid actual amount.");
            return;
        }

        const service = servicesList.find((s) => s.id === parseInt(tempServiceId));
        if (!service) return;

        // Check if already added
        if (addedServices.some((item) => item.medicalServiceId === service.id)) {
            setErrorMsg("This service has already been added to the invoice.");
            return;
        }

        const newListItem = {
            medicalServiceId: service.id,
            serviceName: service.serviceName,
            basePrice: service.basePrice,
            actualAmount: parseFloat(tempActualAmount)
        };

        setAddedServices([...addedServices, newListItem]);
        setTempServiceId("");
        setTempActualAmount("");
        setErrorMsg("");
    };

    // Remove Service from Invoice items
    const handleRemoveService = (serviceId) => {
        setAddedServices(addedServices.filter((item) => item.medicalServiceId !== serviceId));
    };

    // Invoice calculations
    const subtotal = addedServices.reduce((sum, item) => sum + item.actualAmount, 0);
    const taxAmt = (subtotal * parseFloat(taxRate || 0)) / 100;
    const totalDue = subtotal + taxAmt;

    // Verify Patient Code
    const handleVerifyPatient = async () => {
        if (!patientCode) {
            setVerificationError("Please enter a patient code.");
            return;
        }
        setVerificationError("");
        setVerificationSuccess("");
        setVerifiedPatient(null);
        try {
            const res = await axios.get(
                `http://localhost:8080/api/patient/verify/${patientCode.trim().toUpperCase()}`,
                getAxiosConfig()
            );
            setVerifiedPatient(res.data);
            setVerificationSuccess("Patient Verified Successfully!");
        } catch (err) {
            console.error("Verification failed", err);
            setVerificationError("Patient verification failed. Check the Patient Code and try again.");
        }
    };

    // Handle Invoice Submission
    const handleGenerateInvoice = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!verifiedPatient) {
            setErrorMsg("Please verify the patient code first.");
            return;
        }
        if (!dueDate) {
            setErrorMsg("Please specify a payment due date.");
            return;
        }
        if (!symptomsDesc || !treatmentDesc) {
            setErrorMsg("Please specify symptoms and treatment description.");
            return;
        }
        if (addedServices.length === 0) {
            setErrorMsg("Please add at least one medical service item to the invoice.");
            return;
        }

        const invoicePayload = {
            patientId: verifiedPatient.id,
            dueDate: dueDate,
            taxRate: parseFloat(taxRate || 0),
            symptomsDesc: symptomsDesc,
            treatmentDesc: treatmentDesc,
            services: addedServices.map((item) => ({
                medicalServiceId: item.medicalServiceId,
                actualAmount: item.actualAmount
            }))
        };

        setLoading(true);
        try {
            await axios.post(
                "http://localhost:8080/api/invoice/generate",
                invoicePayload,
                getAxiosConfig()
            );
            setSuccessMsg("Invoice successfully generated and sent to patient!");
            // Reset form
            setPatientCode("");
            setVerifiedPatient(null);
            setVerificationSuccess("");
            setVerificationError("");
            setSymptomsDesc("");
            setTreatmentDesc("");
            setDueDate("");
            setTaxRate("5.0");
            setAddedServices([]);
            fetchInvoices(0);
            setCurrentPage(0);
            
            // Switch tab after short delay
            setTimeout(() => {
                setActiveTab("invoices");
                setSuccessMsg("");
            }, 2000);
        } catch (err) {
            console.error("Failed to generate invoice", err);
            setErrorMsg(getBackendErrorMessage(err, "Operation failed. Make sure all values are correct."));
        } finally {
            setLoading(false);
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

    const toggleInvoiceExpand = (id) => {
        setExpandedInvoiceId(expandedInvoiceId === id ? null : id);
    };

    // Card Stats
    const totalInvoicedValue = invoices.reduce((sum, inv) => sum + (inv.totalDueAmount || 0), 0);
    const unpaidCount = invoices.filter((inv) => (inv.invoiceStatus || inv.status) === "UNPAID").length;

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
            />

            {/* Dashboard Workspace */}
            <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Healthcare Portal Dashboard</h2>
                        <p className="text-secondary small">Generate invoices, link medical services, and verify billing logs.</p>
                    </div>
                </div>

                {/* Notifications */}
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

                {/* TAB 1: INVOICES LEDGER */}
                {activeTab === "invoices" && (
                    <div>
                        <StatsCards
                            totalInvoicedValue={totalInvoicedValue}
                            unpaidCount={unpaidCount}
                        />

                        <InvoicesLedger
                            invoices={invoices}
                            search={search}
                            setSearch={setSearch}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            sortBy={sortBy}
                            sortDir={sortDir}
                            handleSort={handleSort}
                            renderSortIcon={renderSortIcon}
                            expandedInvoiceId={expandedInvoiceId}
                            toggleInvoiceExpand={toggleInvoiceExpand}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            hasMoreInvoices={hasMoreInvoices}
                            setSortBy={setSortBy}
                            setSortDir={setSortDir}
                        />
                    </div>
                )}

                {/* TAB 2: GENERATE INVOICE FORM */}
                {activeTab === "generate" && (
                    <BillingSection
                        patientCode={patientCode}
                        setPatientCode={setPatientCode}
                        verifiedPatient={verifiedPatient}
                        setVerifiedPatient={setVerifiedPatient}
                        verificationSuccess={verificationSuccess}
                        verificationError={verificationError}
                        handleVerifyPatient={handleVerifyPatient}
                        symptomsDesc={symptomsDesc}
                        setSymptomsDesc={setSymptomsDesc}
                        treatmentDesc={treatmentDesc}
                        setTreatmentDesc={setTreatmentDesc}
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                        taxRate={taxRate}
                        setTaxRate={setTaxRate}
                        tempServiceId={tempServiceId}
                        setTempServiceId={setTempServiceId}
                        tempActualAmount={tempActualAmount}
                        setTempActualAmount={setTempActualAmount}
                        servicesList={servicesList}
                        addedServices={addedServices}
                        setAddedServices={setAddedServices}
                        handleServiceChange={handleServiceChange}
                        handleAddService={handleAddService}
                        handleRemoveService={handleRemoveService}
                        handleGenerateInvoice={handleGenerateInvoice}
                        loading={loading}
                        subtotal={subtotal}
                        taxAmt={taxAmt}
                        totalDue={totalDue}
                    />
                )}

                {/* TAB 3: MY PROFILE */}
                {activeTab === "profile" && (
                    <ProfileSettings
                        editHealthcareName={editHealthcareName}
                        setEditHealthcareName={setEditHealthcareName}
                        editSpecialization={editSpecialization}
                        setEditSpecialization={setEditSpecialization}
                        editLicenseNumber={editLicenseNumber}
                        setEditLicenseNumber={setEditLicenseNumber}
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
            </div>
        </div>
    );
};

export default Healthcare;