import React from "react";

const PatientProfileCard = ({ profileDetails, username }) => {
    return (
        <div className="card border-0 shadow-sm p-4 mt-4 rounded-4 bg-white text-start">
            <h4 className="fw-bold text-dark mb-3">Patient Profile Details</h4>
            <div className="row g-3">
                <div className="col-sm-6">
                    <span className="d-block text-secondary small fw-bold">Patient Code</span>
                    <span className="text-primary fw-bold fs-5">{profileDetails?.patientCode || "Generating..."}</span>
                </div>
                <div className="col-sm-6">
                    <span className="d-block text-secondary small fw-bold">Full Name</span>
                    <span className="text-dark fw-medium">{profileDetails?.name || "Not Specified"}</span>
                </div>
                <div className="col-sm-6">
                    <span className="d-block text-secondary small fw-bold">Contact Number</span>
                    <span className="text-dark fw-medium">{profileDetails?.phoneNumber || "Not Specified"}</span>
                </div>
                <div className="col-sm-6">
                    <span className="d-block text-secondary small fw-bold">Date of Birth</span>
                    <span className="text-dark fw-medium">{profileDetails?.dob || "Not Specified"}</span>
                </div>
                <div className="col-sm-6">
                    <span className="d-block text-secondary small fw-bold">Gender</span>
                    <span className="text-dark fw-medium">{profileDetails?.gender || "Not Specified"}</span>
                </div>
                <div className="col-sm-6">
                    <span className="d-block text-secondary small fw-bold">Blood Group</span>
                    <span className="text-dark fw-medium">{profileDetails?.bloodGroup || "Not Specified"}</span>
                </div>
                <div className="col-sm-6">
                    <span className="d-block text-secondary small fw-bold">Home Address</span>
                    <span className="text-dark fw-medium">{profileDetails?.address || "Not Specified"}</span>
                </div>
            </div>
        </div>
    );
};

export default PatientProfileCard;
