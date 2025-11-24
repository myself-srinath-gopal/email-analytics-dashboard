import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const RealTimeChart = ({ liveMetrics, isLiveMode, refreshInterval }) => {
    const [chartData, setChartData] = useState([]);
    const [selectedMetrics, setSelectedMetrics] = useState(['openRate', 'clickRate', 'bounceRate']);
    const [timeRange, setTimeRange] = useState('30min'); // 30min, 1hour, 3hours

    const metricOptions = [
        { key: 'openRate', label: 'Open Rate', color: '#F59E0B', unit: '%' },
        { key: 'clickRate', label: 'Click Rate', color: '#2563EB', unit: '%' },
        { key: 'bounceRate', label: 'Bounce Rate', color: '#EF4444', unit: '%' },
        { key: 'deliveryRate', label: 'Delivery Rate', color: '#10B981', unit: '%' },
        { key: 'sendRate', label: 'Send Rate', color: '#8B5CF6', unit: '/min' },
        { key: 'engagementVelocity', label: 'Engagement Velocity', color: '#F97316', unit: '/min' }
    ];

    // Performance thresholds for reference lines
    const thresholds = {
        openRate: { good: 25, warning: 15 },
        clickRate: { good: 5, warning: 2 },
        bounceRate: { good: 2, warning: 5 },
        deliveryRate: { good: 98, warning: 95 },
        sendRate: { good: 150, warning: 100 },
        engagementVelocity: { good: 3, warning: 1 }
    };

    // Generate chart data points
    useEffect(() => {
        if (!isLiveMode) return;

        const interval = setInterval(() => {
            const now = new Date();
            const newDataPoint = {
                timestamp: now,
                time: now.toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                openRate: liveMetrics.openRate,
                clickRate: liveMetrics.clickRate,
                bounceRate: liveMetrics.bounceRate,
                deliveryRate: liveMetrics.deliveryRate,
                sendRate: liveMetrics.sendRate,
                engagementVelocity: liveMetrics.engagementVelocity
            };

            setChartData(prev => {
                const maxPoints = timeRange === '30min' ? 30 : timeRange === '1hour' ? 60 : 180;
                return [...prev, newDataPoint].slice(-maxPoints);
            });
        }, refreshInterval * 1000);

        return () => clearInterval(interval);
    }, [liveMetrics, isLiveMode, refreshInterval, timeRange]);

    // Initialize with some historical data
    useEffect(() => {
        const initialData = [];
        const now = new Date();
        const points = timeRange === '30min' ? 15 : timeRange === '1hour' ? 30 : 60;

        for (let i = points; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - i * refreshInterval * 1000);
            initialData.push({
                timestamp,
                time: timestamp.toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                openRate: Math.max(15, Math.min(35, liveMetrics.openRate + (Math.random() - 0.5) * 5)),
                clickRate: Math.max(2, Math.min(8, liveMetrics.clickRate + (Math.random() - 0.5) * 2)),
                bounceRate: Math.max(0.5, Math.min(5, liveMetrics.bounceRate + (Math.random() - 0.5) * 1)),
                deliveryRate: Math.max(95, Math.min(100, liveMetrics.deliveryRate + (Math.random() - 0.5) * 2)),
                sendRate: Math.max(100, Math.min(200, liveMetrics.sendRate + (Math.random() - 0.5) * 30)),
                engagementVelocity: Math.max(1, Math.min(5, liveMetrics.engagementVelocity + (Math.random() - 0.5) * 1))
            });
        }

        setChartData(initialData);
    }, [timeRange]); // Only reset when time range changes

    const toggleMetric = (metricKey) => {
        setSelectedMetrics(prev =>
            prev.includes(metricKey)
                ? prev.filter(key => key !== metricKey)
                : [...prev, metricKey]
        );
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                    <Icon name="TrendingUp" size={24} className="text-(--primary)" />
                    <div>
                        <h3 className="text-lg font-semibold text-(--text-primary)">
                            Real-Time Performance Chart
                        </h3>
                        <p className="text-sm text-(--text-secondary)">
                            Live metrics with 5-minute intervals and performance thresholds
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    {/* Time Range Selector */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-(--text-secondary)">Range:</span>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-3 py-1 border border-(--border) rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-100)"
                        >
                            <option value="30min">30 minutes</option>
                            <option value="1hour">1 hour</option>
                            <option value="3hours">3 hours</option>
                        </select>
                    </div>

                    {/* Live Indicator */}
                    {isLiveMode && (
                        <div className="flex items-center space-x-2 px-3 py-1 bg-(--success-50) rounded-full">
                            <div className="w-2 h-2 bg-(--success) rounded-full animate-pulse" />
                            <span className="text-xs font-medium text-(--success)">Live Updates</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Metric Toggles */}
            <div className="flex flex-wrap gap-2 mb-6">
                {metricOptions.map((metric) => (
                    <button
                        key={metric.key}
                        onClick={() => toggleMetric(metric.key)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border nav-transition ${selectedMetrics.includes(metric.key)
                            ? 'border-(--primary) bg-(--primary-50) text-(--primary)' : 'border-(--border) bg-(--surface) text-(--text-secondary) hover:bg-(--secondary-50)'
                            }`}
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: metric.color }}
                        />
                        <span className="text-sm font-medium">{metric.label}</span>
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div className="h-80 w-full">
                <LineChart data={chartData} responsive width={"100%"} height={"100%"}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                        dataKey="time"
                        stroke="#64748B"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#64748B"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip metricOptions={metricOptions} />} />
                    <Legend />
                    {selectedMetrics.map((metricKey) => {
                        const metric = metricOptions.find(m => m.key === metricKey);
                        return (
                            <Line
                                key={metricKey}
                                type="monotone"
                                dataKey={metricKey}
                                stroke={metric.color}
                                strokeWidth={2}
                                dot={false}
                                name={metric.label}
                                connectNulls={false}
                            />
                        );
                    })}
                </LineChart>
            </div>

            {/* Performance Indicators */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedMetrics.map((metricKey) => {
                    const metric = metricOptions.find(m => m.key === metricKey);
                    const threshold = thresholds[metricKey];
                    const currentValue = liveMetrics[metricKey];
                    const status = currentValue >= threshold.good ? 'good' :
                        currentValue >= threshold.warning ? 'warning' : 'critical';

                    return (
                        <div key={metricKey} className="bg-(--surface) border border-(--border) rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: metric.color }}
                                    />
                                    <span className="text-xs sm:text-sm font-medium text-(--text-primary)">
                                        {metric.label}
                                    </span>
                                </div>
                                <Icon
                                    name={status === 'good' ? 'TrendingUp' :
                                        status === 'warning' ? 'Minus' : 'TrendingDown'}
                                    size={16}
                                    className={status === 'good' ? 'text-(--success)' :
                                        status === 'warning' ? 'text-(--warning)' : 'text-(--error)'}
                                />
                            </div>

                            <div className="text-lg sm:text-2xl font-bold text-(--text-primary) mb-1">
                                {currentValue.toFixed(1)}{metric.unit}
                            </div>

                            <div className="text-xs sm:text-xs text-(--text-secondary)">
                                Target: &gt;{threshold.good}{metric.unit} |
                                Warning: &lt;{threshold.warning}{metric.unit}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload, label, metricOptions }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-(--surface) border border-(--border) rounded-lg p-3 shadow-elevation-md">
                <p className="font-medium text-(--text-primary) mb-2">{label}</p>
                {payload.map((entry, index) => {
                    const metric = metricOptions.find(m => m.key === entry.dataKey);
                    return (
                        <div key={index} className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-sm text-(--text-secondary)">{metric?.label}</span>
                            </div>
                            <span className="text-sm font-medium text-(--text-primary)">
                                {entry.value.toFixed(1)}{metric?.unit}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
    return null;
};

export default RealTimeChart;