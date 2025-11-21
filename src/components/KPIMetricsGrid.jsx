import React from 'react';
import Icon from './AppIcon';

const KPIMetricsGrid = ({ selectedCampaigns, comparisonMode, isLoading }) => {
    // Mock KPI data
    const kpiData = {
        sends: {
            value: 125840,
            change: 12.5,
            trend: 'up',
            icon: 'Send',
            label: 'Total Sends',
            color: 'text-(--primary)'
        },
        openRate: {
            value: 24.8,
            change: -2.1,
            trend: 'down',
            icon: 'Mail',
            label: 'Open Rate',
            color: 'text-(--success)',
            suffix: '%'
        },
        clickRate: {
            value: 3.2,
            change: 8.7,
            trend: 'up',
            icon: 'MousePointer',
            label: 'Click Rate',
            color: 'text-(--warning)',
            suffix: '%'
        },
        bounceRate: {
            value: 1.8,
            change: -15.3,
            trend: 'down',
            icon: 'AlertTriangle',
            label: 'Bounce Rate',
            color: 'text-(--error)',
            suffix: '%'
        },
        unsubscribeRate: {
            value: 0.4,
            change: 5.2,
            trend: 'up',
            icon: 'UserMinus',
            label: 'Unsubscribe Rate',
            color: 'text-(--error)',
            suffix: '%'
        },
        roi: {
            value: 4250,
            change: 18.9,
            trend: 'up',
            icon: 'DollarSign',
            label: 'ROI',
            color: 'text-(--success)',
            prefix: '$'
        }
    };

    const formatValue = (value, prefix = '', suffix = '') => {
        if (value >= 1000000) {
            return `${prefix}${(value / 1000000).toFixed(1)}M${suffix}`;
        } else if (value >= 1000) {
            return `${prefix}${(value / 1000).toFixed(1)}K${suffix}`;
        }
        return `${prefix}${value.toLocaleString()}${suffix}`;
    };

    const KPICard = ({ data }) => (
        <div className="bg-(--surface) border border-(--border) rounded-lg p-6 hover:shadow-(--elevation-md) nav-transition">
            {isLoading ? (
                <div className="animate-(--pulse)">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-8 h-8 bg-(--secondary-100) rounded-lg"></div>
                        <div className="w-16 h-4 bg-(--secondary-100) rounded"></div>
                    </div>
                    <div className="w-20 h-8 bg-(--secondary-100) rounded mb-2"></div>
                    <div className="w-24 h-4 bg-(--secondary-100) rounded"></div>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-(--secondary-50) flex items-center justify-center`}>
                            <Icon name={data.icon} size={20} className={data.color} />
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${data.trend === 'up' ? 'bg-(--success-50) text-(--success)' : 'bg-(--error-50) text-(--error)'
                            }`}>
                            <Icon
                                name={data.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                                size={12}
                            />
                            <span>{Math.abs(data.change)}%</span>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="text-2xl font-bold text-(--text-primary)">
                            {formatValue(data.value, data.prefix || '', data.suffix || '')}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-(--text-secondary)">
                            {data.label}
                        </span>
                        <span className="text-xs text-(--text-secondary)">
                            vs. prev period
                        </span>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-(--text-primary)">
                        Performance Overview
                    </h2>
                    <p className="text-sm text-(--text-secondary)">
                        Key metrics for {comparisonMode ? `${selectedCampaigns.length} campaigns` : 'selected campaign'}
                    </p>
                </div>

                {comparisonMode && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-(--primary-50) border border-(--primary-100) rounded-lg">
                        <Icon name="GitCompare" size={16} className="text-(--primary)" />
                        <span className="text-sm font-medium text-(--primary)">
                            Comparison Mode
                        </span>
                    </div>
                )}
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {Object.entries(kpiData).map(([key, data]) => (
                    <KPICard key={key} metric={key} data={data} />
                ))}
            </div>

            {/* Summary Insights */}
            {!isLoading && (
                <div className="bg-(--surface) border border-(--border) rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-(--primary-50) rounded-lg flex items-center justify-center shrink-0">
                            <Icon name="TrendingUp" size={16} className="text-(--primary)" />
                        </div>
                        <div>
                            <h3 className="font-medium text-(--text-primary) mb-1">
                                Performance Insights
                            </h3>
                            <p className="text-sm text-(--text-secondary)">
                                Your campaigns are performing {kpiData.openRate.change > 0 ? 'above' : 'below'} average with a {Math.abs(kpiData.openRate.change)}% change in open rates.
                                ROI has increased by {kpiData.roi.change}% indicating strong campaign effectiveness.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KPIMetricsGrid;