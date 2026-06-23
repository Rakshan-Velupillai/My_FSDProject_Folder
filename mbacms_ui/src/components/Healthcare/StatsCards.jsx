import React from "react";

const StatsCards = ({ totalInvoicedValue, unpaidCount }) => {
    return (
        <div className="row g-4 mb-4 text-start">
            <div className="col-md-6">
                <div className="card border-0 shadow-sm p-3 rounded-4" style={{ background: "#ffffff" }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-secondary small fw-bold">TOTAL GENERATED VALUE (PAGE)</span>
                            <h3 className="fw-bold text-primary mt-1 mb-0">₹{totalInvoicedValue.toFixed(2)}</h3>
                        </div>
                        <div className="rounded-circle p-3 bg-primary bg-opacity-10 text-primary">
                            <i className="pi pi-money-bill fs-4"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card border-0 shadow-sm p-3 rounded-4" style={{ background: "#ffffff" }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-secondary small fw-bold">UNPAID INVOICES (PAGE)</span>
                            <h3 className="fw-bold text-warning mt-1 mb-0">{unpaidCount} Pending</h3>
                        </div>
                        <div className="rounded-circle p-3 bg-warning bg-opacity-10 text-warning">
                            <i className="pi pi-clock fs-4"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
