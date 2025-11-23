import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import CustomTooltip from '../../../components/CustomTooltip';

const EngagementTimelineChart = ({ isLoading }) => {
    const [activeMetrics, setActiveMetrics] = useState(['opens', 'clicks']);

    // Mock timeline data
    const timelineData = [
        { date: '2024-01-01', opens: 1240, clicks: 156, bounces: 23, unsubscribes: 8 },
        { date: '2024-01-02', opens: 1580, clicks: 198, bounces: 31, unsubscribes: 12 },
        { date: '2024-01-03', opens: 1320, clicks: 167, bounces: 28, unsubscribes: 9 },
        { date: '2024-01-04', opens: 1890, clicks: 234, bounces: 35, unsubscribes: 15 },
        { date: '2024-01-05', opens: 1650, clicks: 201, bounces: 29, unsubscribes: 11 },
        { date: '2024-01-06', opens: 1420, clicks: 178, bounces: 26, unsubscribes: 7 },
        { date: '2024-01-07', opens: 1780, clicks: 223, bounces: 33, unsubscribes: 13 },
        { date: '2024-01-08', opens: 1950, clicks: 245, bounces: 38, unsubscribes: 16 },
        { date: '2024-01-09', opens: 1680, clicks: 209, bounces: 31, unsubscribes: 10 },
        { date: '2024-01-10', opens: 1520, clicks: 189, bounces: 27, unsubscribes: 8 },
        { date: '2024-01-11', opens: 1840, clicks: 231, bounces: 34, unsubscribes: 14 },
        { date: '2024-01-12', opens: 1720, clicks: 215, bounces: 32, unsubscribes: 12 },
        { date: '2024-01-13', opens: 1600, clicks: 198, bounces: 29, unsubscribes: 9 },
        { date: '2024-01-14', opens: 2100, clicks: 267, bounces: 41, unsubscribes: 18 }
    ];

    const metrics = [
        { key: 'opens', label: 'Opens', color: '#10B981', icon: 'Mail' },
        { key: 'clicks', label: 'Clicks', color: '#F59E0B', icon: 'MousePointer' },
        { key: 'bounces', label: 'Bounces', color: '#EF4444', icon: 'AlertTriangle' },
        { key: 'unsubscribes', label: 'Unsubscribes', color: '#8B5CF6', icon: 'UserMinus' }
    ];

    const toggleMetric = (metricKey) => {
        setActiveMetrics(prev =>
            prev.includes(metricKey)
                ? prev.filter(m => m !== metricKey)
                : [...prev, metricKey]
        );
    };

    const formatXAxisLabel = (tickItem) => {
        const date = new Date(tickItem);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg p-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                <div>
                    <h3 className="text-lg font-semibold text-(--text-primary)">
                        Engagement Timeline
                    </h3>
                    <p className="text-sm text-(--text-secondary)">
                        Email engagement trends over time
                    </p>
                </div>

                {/* Metric Toggles */}
                <div className="flex flex-wrap items-center gap-2">
                    {metrics.map((metric) => (
                        <button
                            key={metric.key}
                            onClick={() => toggleMetric(metric.key)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg nav-transition ${activeMetrics.includes(metric.key)
                                ? 'bg-(--primary-50) text-(--primary) border border-(--primary-100)' : 'bg-(--secondary-50) text-(--text-secondary) hover:bg-(--secondary-100)'
                                }`}
                        >
                            <Icon name={metric.icon} size={14} />
                            <span className="text-sm font-medium">{metric.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="h-80 bg-(--secondary-50) rounded-lg animate-pulse flex items-center justify-center">
                    <div className="text-(--text-secondary)">Loading chart data...</div>
                </div>
            ) : (
                <>
                    {/* Chart */}
                    <div className="h-80 mb-6">
                        <LineChart
                            data={timelineData}
                            responsive
                            width={"100%"}
                            height={"100%"}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={formatXAxisLabel}
                                tick={{ fontSize: 12, fill: '#64748B' }}
                                axisLine={{ stroke: '#E2E8F0' }}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: '#64748B' }}
                                axisLine={{ stroke: '#E2E8F0' }}
                            />
                            <Tooltip content={<EngagementTooltip metrics={metrics} />} />
                            <Legend />

                            {activeMetrics.map((metricKey) => {
                                const metric = metrics.find(m => m.key === metricKey);
                                return (
                                    <Line
                                        key={metricKey}
                                        type="monotone"
                                        dataKey={metricKey}
                                        stroke={metric.color}
                                        strokeWidth={2}
                                        dot={{ fill: metric.color, strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, stroke: metric.color, strokeWidth: 2 }}
                                        name={metric.label}
                                    />
                                );
                            })}
                        </LineChart>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid max-[450px]:grid-cols-1 max-[450px]:gap-2 grid-cols-2 lg:grid-cols-4 gap-4">
                        {metrics.map((metric) => {
                            const total = timelineData.reduce((sum, day) => sum + day[metric.key], 0);
                            const average = Math.round(total / timelineData.length);
                            const isActive = activeMetrics.includes(metric.key);

                            return (
                                <div
                                    key={metric.key}
                                    className={`p-4 rounded-lg border ${isActive
                                        ? 'bg-(--primary-50) border-(--primary-100)' : 'bg-(--secondary-50) border-(--border)'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Icon
                                            name={metric.icon}
                                            size={16}
                                            style={{ color: metric.color }}
                                        />
                                        <span className="font-medium text-sm text-(--text-primary)">
                                            {metric.label}
                                        </span>
                                    </div>
                                    <div className="text-lg font-bold text-(--text-primary) mb-1">
                                        {total.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-(--text-secondary)">
                                        Avg: {average.toLocaleString()}/day
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Chart Controls */}
                    <div className="mt-6 pt-4 border-t border-(--border)">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-(--text-secondary)">
                                Showing data for the last {timelineData.length} days
                            </div>

                            <div className="flex items-center space-x-2">
                                <button className="p-2 hover:bg-(--secondary-50) rounded-lg nav-transition" title="Download chart">
                                    <Icon name="Download" size={16} className="text-(--text-secondary)" />
                                </button>
                                <button className="p-2 hover:bg-(--secondary-50) rounded-lg nav-transition" title="Fullscreen view">
                                    <Icon name="Maximize2" size={16} className="text-(--text-secondary)" />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
const EngagementTooltip = ({ active, payload, label, metrics }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-(--surface) border border-(--border) rounded-lg p-4 shadow-md">
                <div className="font-medium text-(--text-primary) mb-2">
                    {new Date(label).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
                <div className="space-y-1">
                    {payload.map((entry) => (
                        <div key={entry.dataKey} className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-sm text-(--text-secondary)">
                                    {metrics.find(m => m.key === entry.dataKey)?.label}
                                </span>
                            </div>
                            <span className="font-medium text-(--text-primary)">
                                {entry.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export default EngagementTimelineChart;