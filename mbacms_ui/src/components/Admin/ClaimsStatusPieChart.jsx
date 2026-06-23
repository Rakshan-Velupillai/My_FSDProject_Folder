import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from 'primereact/chart';

const ClaimsStatusPieChart = () => {
    const adminStatsV2Api = "http://localhost:8080/api/auth/admin-stats/v2";
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const config_details = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        };

        const getStats = async () => {
            try {
                const resp = await axios.get(adminStatsV2Api, config_details);
                const labelsArray = resp.data.labels || [];
                const dataArray = resp.data.counts || [];

                const baseColors = ['#f59e0b', '#ef4444', '#10b981'];
                const hoverColors = ['#fbbf24', '#f87171', '#34d399'];

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
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#495057',
                                usePointStyle: true,
                                padding: 20,
                                font: { size: 13, weight: 'bold' }
                            }
                        }
                    },
                    maintainAspectRatio: false
                };

                setChartData(data);
                setChartOptions(options);
            } catch (err) {
                console.error("Error loading claims status stats:", err);
            }
        };
        getStats();
    }, []);

    return (
        <div className="card d-flex flex-column align-items-center p-4 shadow-sm bg-white rounded border-0" style={{ width: '100%', height: '400px' }}>
            <h5 className="mb-4 text-dark text-center fw-bold" style={{ letterSpacing: '0.5px' }}>
                Claims Status Distribution
            </h5>
            <div className="w-100 h-100" style={{ position: 'relative' }}>
                <Chart 
                    type="pie" 
                    data={chartData} 
                    options={chartOptions} 
                    style={{ width: '100%', height: '300px' }} 
                />
            </div>
        </div>
    );
};

export default ClaimsStatusPieChart;
