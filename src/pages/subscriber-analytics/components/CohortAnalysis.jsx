import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CohortAnalysis = () => {
    const [viewType, setViewType] = useState('retention'); // retention, revenue
    const [selectedCohort, setSelectedCohort] = useState(null);

    // Mock cohort data
    const generateCohortData = () => {
        const cohorts = [];
        const months = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'];

        months.forEach((month, monthIndex) => {
            const cohortSize = 1000 + Math.random() * 500;
            const retentionData = [];

            for (let period = 0; period <= 5 - monthIndex; period++) {
                let retention = 100;
                if (period > 0) {
                    retention = Math.max(20, 100 - (period * 15) - Math.random() * 10);
                }

                retentionData.push({
                    period,
                    retention: Math.round(retention),
                    subscribers: Math.round((cohortSize * retention) / 100),
                    revenue: Math.round((cohortSize * retention * (50 + Math.random() * 100)) / 100)
                });
            }

            cohorts.push({
                month,
                monthIndex,
                cohortSize: Math.round(cohortSize),
                data: retentionData
            });
        });

        return cohorts;
    };

    const cohortData = generateCohortData();

    const getRetentionColor = (retention) => {
        if (retention >= 80) return 'bg-success text-white';
        if (retention >= 60) return 'bg-success-100 text-success-700';
        if (retention >= 40) return 'bg-warning-100 text-warning-700';
        if (retention >= 20) return 'bg-error-100 text-error-700';
        return 'bg-secondary-100 text-secondary-600';
    };

    const handleCohortClick = (cohort, period) => {
        setSelectedCohort({ cohort, period });
    };

    return (
        <div className="bg-surface border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                        Cohort Analysis
                    </h3>
                    <p className="text-sm text-text-secondary">
                        Subscriber retention and revenue patterns over time
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    {/* View Type Toggle */}
                    <div className="flex items-center bg-secondary-50 rounded-lg p-1">
                        <button
                            onClick={() => setViewType('retention')}
                            className={`px-3 py-1 text-sm font-medium rounded nav-transition ${viewType === 'retention' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            Retention
                        </button>
                        <button
                            onClick={() => setViewType('revenue')}
                            className={`px-3 py-1 text-sm font-medium rounded nav-transition ${viewType === 'revenue' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            Revenue
                        </button>
                    </div>

                    <button className="p-2 hover:bg-secondary-50 rounded-lg nav-transition">
                        <Icon name="Download" size={16} className="text-text-secondary" />
                    </button>
                </div>
            </div>

            {/* Cohort Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left p-3 text-sm font-medium text-text-secondary">
                                Cohort
                            </th>
                            <th className="text-center p-3 text-sm font-medium text-text-secondary">
                                Size
                            </th>
                            {Array.from({ length: 6 }, (_, i) => (
                                <th key={i} className="text-center p-3 text-sm font-medium text-text-secondary">
                                    Month {i}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cohortData.map((cohort) => (
                            <tr key={cohort.month} className="border-b border-border hover:bg-secondary-50">
                                <td className="p-3">
                                    <div className="font-medium text-text-primary text-sm">
                                        {cohort.month}
                                    </div>
                                </td>
                                <td className="p-3 text-center">
                                    <div className="font-medium text-text-primary text-sm">
                                        {cohort.cohortSize.toLocaleString()}
                                    </div>
                                </td>
                                {Array.from({ length: 6 }, (_, periodIndex) => {
                                    const periodData = cohort.data.find(d => d.period === periodIndex);

                                    if (!periodData) {
                                        return <td key={periodIndex} className="p-3"></td>;
                                    }

                                    const displayValue = viewType === 'retention'
                                        ? `${periodData.retention}%`
                                        : `$${(periodData.revenue / 1000).toFixed(1)}k`;

                                    return (
                                        <td key={periodIndex} className="p-3 text-center">
                                            <button
                                                onClick={() => handleCohortClick(cohort, periodIndex)}
                                                className={`px-2 py-1 rounded text-xs font-medium micro-interaction ${getRetentionColor(periodData.retention)
                                                    }`}
                                            >
                                                {displayValue}
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Selected Cohort Details */}
            {selectedCohort && (
                <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-text-primary">
                            {selectedCohort.cohort.month} - Month {selectedCohort.period} Details
                        </h4>
                        <button
                            onClick={() => setSelectedCohort(null)}
                            className="p-1 hover:bg-primary-100 rounded micro-transition"
                        >
                            <Icon name="X" size={14} className="text-text-secondary" />
                        </button>
                    </div>

                    {(() => {
                        const periodData = selectedCohort.cohort.data.find(d => d.period === selectedCohort.period);
                        return (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-primary">
                                        {periodData.retention}%
                                    </div>
                                    <div className="text-xs text-text-secondary">Retention Rate</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-success">
                                        {periodData.subscribers.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-text-secondary">Active Subscribers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-accent">
                                        ${(periodData.revenue / 1000).toFixed(1)}k
                                    </div>
                                    <div className="text-xs text-text-secondary">Revenue Generated</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-text-primary">
                                        ${(periodData.revenue / periodData.subscribers).toFixed(2)}
                                    </div>
                                    <div className="text-xs text-text-secondary">Revenue per User</div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* Cohort Insights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-success-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <Icon name="TrendingUp" size={16} className="text-success" />
                        <span className="font-medium text-success text-sm">Best Performing</span>
                    </div>
                    <div className="text-sm text-text-secondary">
                        {cohortData.reduce((best, cohort) => {
                            const month1Retention = cohort.data.find(d => d.period === 1)?.retention || 0;
                            const bestMonth1 = best.data.find(d => d.period === 1)?.retention || 0;
                            return month1Retention > bestMonth1 ? cohort : best;
                        }).month} cohort shows highest Month 1 retention
                    </div>
                </div>

                <div className="p-4 bg-warning-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning" />
                        <span className="font-medium text-warning text-sm">Needs Attention</span>
                    </div>
                    <div className="text-sm text-text-secondary">
                        Recent cohorts showing 15% lower retention than average
                    </div>
                </div>

                <div className="p-4 bg-primary-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Target" size={16} className="text-primary" />
                        <span className="font-medium text-primary text-sm">Opportunity</span>
                    </div>
                    <div className="text-sm text-text-secondary">
                        Implement re-engagement campaigns for Month 2-3 subscribers
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CohortAnalysis;