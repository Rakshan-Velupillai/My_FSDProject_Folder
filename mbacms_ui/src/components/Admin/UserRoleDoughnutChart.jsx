import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from 'primereact/chart';

const UserRoleDoughnutChart = () => {
    const userStatApi = "http://localhost:8080/api/auth/user-stat";
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const config_details = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        };

        const getUserRoleStat = async () => {
            try {
                const resp = await axios.get(userStatApi, config_details);
                const labelsArray = resp.data.role || [];
                const dataArray = resp.data.count || [];

                const baseColors = ['#2563eb', '#1d4ed8', '#0d9488', '#14b8a6'];
                const hoverColors = ['#3b82f6', '#2563eb', '#14b8a6', '#2dd4bf'];

                const data = {
                    labels: labelsArray,
                    datasets: [
                        {
                            data: dataArray,
                            backgroundColor: baseColors,
                            hoverBackgroundColor: hoverColors,
                            borderWidth: 2,
                            borderColor: '#ffffff'
                        }
                    ]
                };

                const options = {
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#495057',
                                usePointStyle: true,
                                padding: 25,
                                font: { size: 13, weight: 'bold' }
                            }
                        }
                    },
                    maintainAspectRatio: false
                };

                setChartData(data);
                setChartOptions(options);
            } catch (err) {
                console.error("Error loading user stats:", err);
            }
        };
        getUserRoleStat();
    }, []);

    return (
        /* CHANGED: Removed width: '400px', replaced with width: '100%' */
        <div className="card d-flex flex-column align-items-center p-4 shadow-sm bg-white rounded border-0" style={{ width: '100%', height: '450px' }}>
            <h5 className="mb-4 text-dark text-center fw-bold" style={{ letterSpacing: '0.5px' }}>
                User Role Distribution
            </h5>
            <div className="w-100 h-100" style={{ position: 'relative' }}>
                <Chart 
                    type="doughnut" 
                    data={chartData} 
                    options={chartOptions} 
                    style={{ width: '100%', height: '330px' }} 
                />
            </div>
        </div>
    );
};

export default UserRoleDoughnutChart;