import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from 'primereact/chart';

const ClaimsInvoicesBarChart = () => {
    const adminStatsV1Api = "http://localhost:8080/api/auth/admin-stats/v1";
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
                const resp = await axios.get(adminStatsV1Api, config_details);
                const labelsArray = resp.data.labels || [];
                const dataArray = resp.data.counts || [];

                const baseColors = ['#3b82f6', '#10b981'];
                const hoverColors = ['#60a5fa', '#34d399'];

                const data = {
                    labels: labelsArray,
                    datasets: [
                        {
                            label: 'Total Generated',
                            data: dataArray,
                            backgroundColor: baseColors,
                            borderColor: baseColors,
                            borderWidth: 1,
                            borderRadius: 6
                        }
                    ]
                };

                const options = {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#495057',
                                precision: 0
                            },
                            grid: {
                                color: '#ebedef'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#495057',
                                font: { weight: 'bold' }
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    maintainAspectRatio: false
                };

                setChartData(data);
                setChartOptions(options);
            } catch (err) {
                console.error("Error loading claims/invoices stats:", err);
            }
        };
        getStats();
    }, []);

    return (
        <div className="card d-flex flex-column align-items-center p-4 shadow-sm bg-white rounded border-0" style={{ width: '100%', height: '400px' }}>
            <h5 className="mb-4 text-dark text-center fw-bold" style={{ letterSpacing: '0.5px' }}>
                System Activity Overview
            </h5>
            <div className="w-100 h-100" style={{ position: 'relative' }}>
                <Chart 
                    type="bar" 
                    data={chartData} 
                    options={chartOptions} 
                    style={{ width: '100%', height: '300px' }} 
                />
            </div>
        </div>
    );
};

export default ClaimsInvoicesBarChart;
