import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserRoleDoughnutChart from "./UserRoleDoughnutChart";
import ClaimsInvoicesBarChart from "./ClaimsInvoicesBarChart";
import ClaimsStatusPieChart from "./ClaimsStatusPieChart";

function UserDetails() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [size, setSize] = useState(7);
    const [totalPages, setTotalPages] = useState(0);
    const [deleteMsg, setDeleteMessage] = useState("");

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [role, setRole] = useState("ALL");
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDir, setSortDir] = useState("desc");

    const navigate = useNavigate();

    const api = 'http://localhost:8080/api/auth/all-users';
    const deleteApi = 'http://localhost:8080/api/auth/soft-delete/';

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get(`${api}?page=${currentPage}&size=${size}&search=${debouncedSearch}&role=${role}&sortBy=${sortBy}&sortDir=${sortDir}`);
                const fetchedData = response.data.data || response.data.content || [];

                // Temporary debug log to confirm field names
                console.log("Fetched raw users:", fetchedData);

                setUsers(fetchedData);
                setTotalPages(response.data.totalPages || 0);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        getAllUsers();
    }, [currentPage, size, debouncedSearch, role, sortBy, sortDir]);

    const onDelete = async (id) => {
        if (!id) return alert(`User ID value is missing! Received value: ${id}`);
        try {
            await axios.delete(deleteApi + id);
            // FIX: Match against the exact backend key configuration (e.g., userId)
            setUsers(prevUsers => prevUsers.filter(user => (user.userId || user.id) !== id));
            setDeleteMessage("User successfully deactivated/deleted from the system.");
        }
        catch (err) {
            console.error("Error deleting user:", err);
        }
    };

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

    const formatDateTime = (timestamp) => {
        if (!timestamp) return "N/A";
        return new Date(timestamp).toLocaleString();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showRoleDropdown && !event.target.closest('.role-dropdown-container')) {
                setShowRoleDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showRoleDropdown]);

    return (
        <div className="container mt-4">
            <h1>Users Details</h1>

            {deleteMsg && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {deleteMsg}
                    <button type="button" className="btn-close" onClick={() => setDeleteMessage("")}></button>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <div className="d-flex gap-2 align-items-center">
                    <div className="input-group" style={{ maxWidth: '300px' }}>
                        <span className="input-group-text bg-white border-end-0">
                            <i className="pi pi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by username..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(0);
                            }}
                        />
                    </div>
                    <div className="dropdown position-relative role-dropdown-container" style={{ height: '38px' }}>
                        <button 
                            className="btn btn-outline-secondary d-flex align-items-center gap-2 h-100" 
                            type="button" 
                            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                            style={{ minWidth: '180px' }}
                        >
                            <i className="pi pi-filter text-muted"></i>
                            <span>Role: {role === "ALL" ? "All Roles" : role.replace('_', ' ')}</span>
                            <i className="pi pi-chevron-down ms-auto text-secondary" style={{ fontSize: '0.8rem' }}></i>
                        </button>
                        {showRoleDropdown && (
                            <ul className="dropdown-menu show" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000, display: 'block', minWidth: '180px' }}>
                                <li><button className="dropdown-item" type="button" onClick={() => { setRole("ALL"); setShowRoleDropdown(false); setCurrentPage(0); }}>All Roles</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() => { setRole("ADMIN"); setShowRoleDropdown(false); setCurrentPage(0); }}>Admin</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() => { setRole("PATIENT"); setShowRoleDropdown(false); setCurrentPage(0); }}>Patient</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() => { setRole("HEALTHCARE"); setShowRoleDropdown(false); setCurrentPage(0); }}>Healthcare</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() => { setRole("INSURANCE_COMPANY"); setShowRoleDropdown(false); setCurrentPage(0); }}>Insurance Company</button></li>
                            </ul>
                        )}
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-outline-secondary d-flex align-items-center gap-1 btn-sm px-2.5"
                        style={{ height: '38px' }}
                        onClick={() => {
                            setSortBy("");
                            setSortDir("");
                            setCurrentPage(0);
                        }}
                        title="Clear Sorting"
                    >
                        <i className="pi pi-refresh"></i> Clear Sort
                    </button>
                </div>
            </div>

            <table className="table table-striped table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col" style={{ userSelect: 'none' }}>S.No</th>
                        <th scope="col" onClick={() => handleSort("username")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                            Username {renderSortIcon("username")}
                        </th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col" onClick={() => handleSort("createdAt")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                            Created At {renderSortIcon("createdAt")}
                        </th>
                        <th scope="col" onClick={() => handleSort("updatedAt")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                            Updated At {renderSortIcon("updatedAt")}
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => {
                            // FALLBACK SAFETY: Extract whatever identification token is supplied
                            const currentId = user.userId || user.id;

                            return (
                                <tr key={currentId || index}>
                                    <th scope="row">{(currentPage * size) + index + 1}</th>
                                    <td>{user.username || user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role || "User"}</td>
                                    <td>
                                        <span className={`badge ${user.active !== false ? 'bg-success' : 'bg-danger'}`}>
                                            {user.active !== false ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>{formatDateTime(user.createdAt)}</td>
                                    <td>{formatDateTime(user.updatedAt)}</td>
                                    <td>
                                        <button
                                            className="btn btn-link p-0 text-danger text-decoration-none"
                                            onClick={() => onDelete(currentId)}
                                            title="Delete User"
                                        >
                                            <i className="pi pi-trash" style={{ fontSize: '1.1rem' }}></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4 gap-2">
                <button
                    className="btn btn-outline-primary btn-sm px-3"
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span className="align-self-center text-secondary small px-2">Page {currentPage + 1}</span>
                <button
                    className="btn btn-outline-primary btn-sm px-3"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={totalPages <= 1 || currentPage >= totalPages - 1}
                >
                    Next
                </button>
            </div>
            <hr className="my-5 opacity-25" /> 
            <div className="row g-4 mb-5">
                <div className="col-12 col-lg-6">
                    <ClaimsInvoicesBarChart />
                </div>
                <div className="col-12 col-lg-6">
                    <ClaimsStatusPieChart />
                </div>
            </div>

            <div className="row justify-content-center mt-4">
                <div className="col-12 col-md-9 d-flex justify-content-center">
                    <UserRoleDoughnutChart />
                </div>
            </div>


        </div>
    )
}

export default UserDetails;