import React from 'react';
import Icon from '../../../components/AppIcon';

const SubscriberMetricsCards = ({
    selectedCampaigns,
    comparisonMode
}) => {
    // Mock data for subscriber metrics
    const metricsData = {
        totalSubscribers: {
            current: 45678,
            previous: 43210,
            trend: 'up',
            sparkline: [42000, 42500, 43000, 43500, 44000, 44500, 45000, 45678]
        },
        growthRate: {
            current: 5.7,
            previous: 4.2,
            trend: 'up',
            sparkline: [3.8, 4.1, 4.5, 4.8, 5.2, 5.4, 5.6, 5.7]
        },
        engagementScore: {
            current: 78.5,
            previous: 76.2,
            trend: 'up',
            sparkline: [74, 75, 76, 77, 78, 78.2, 78.4, 78.5]
        },
        churnRate: {
            current: 2.3,
            previous: 2.8,
            trend: 'down',
            sparkline: [3.2, 3.0, 2.8, 2.6, 2.5, 2.4, 2.3, 2.3]
        }
    };

    const metrics = [
        {
            id: 'subscribers',
            title: 'Total Subscribers',
            value: metricsData.totalSubscribers.current.toLocaleString(),
            change: ((metricsData.totalSubscribers.current - metricsData.totalSubscribers.previous) / metricsData.totalSubscribers.previous * 100).toFixed(1),
            trend: metricsData.totalSubscribers.trend,
            icon: 'Users',
            color: 'text-(--primary)',
            bgColor: 'bg-(--primary-50)',
            sparkline: metricsData.totalSubscribers.sparkline,
            suffix: ''
        },
        {
            id: 'growth',
            title: 'Growth Rate',
            value: metricsData.growthRate.current.toFixed(1),
            change: ((metricsData.growthRate.current - metricsData.growthRate.previous) / metricsData.growthRate.previous * 100).toFixed(1),
            trend: metricsData.growthRate.trend,
            icon: 'TrendingUp',
            color: 'text-(--success)',
            bgColor: 'bg-(--success-50)',
            sparkline: metricsData.growthRate.sparkline,
            suffix: '%'
        },
        {
            id: 'engagement',
            title: 'Engagement Score',
            value: metricsData.engagementScore.current.toFixed(1),
            change: ((metricsData.engagementScore.current - metricsData.engagementScore.previous) / metricsData.engagementScore.previous * 100).toFixed(1),
            trend: metricsData.engagementScore.trend,
            icon: 'Heart',
            color: 'text-(--accent)',
            bgColor: 'bg-(--accent-50)',
            sparkline: metricsData.engagementScore.sparkline,
            suffix: '/100'
        },
        {
            id: 'churn',
            title: 'Churn Rate',
            value: metricsData.churnRate.current.toFixed(1),
            change: Math.abs((metricsData.churnRate.current - metricsData.churnRate.previous) / metricsData.churnRate.previous * 100).toFixed(1),
            trend: metricsData.churnRate.trend,
            icon: 'UserMinus',
            color: 'text-(--error)',
            bgColor: 'bg-(--error-50)',
            sparkline: metricsData.churnRate.sparkline,
            suffix: '%'
        }
    ];

    const renderSparkline = (data, trend) => {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min;

        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * 60;
            const y = 20 - ((value - min) / range) * 20;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg width="60" height="20" className="ml-auto">
                <polyline
                    points={points}
                    fill="none"
                    stroke={trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#64748B'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
                <div
                    key={metric.id}
                    className="bg-(--surface) border border-(--border) rounded-lg p-6 hover:shadow-md data-transition"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                            <Icon name={metric.icon} size={20} className={metric.color} />
                        </div>
                        {renderSparkline(metric.sparkline, metric.trend)}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-(--text-secondary)">
                            {metric.title}
                        </h3>

                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-(--text-primary)">
                                {metric.value}
                            </span>
                            {metric.suffix && (
                                <span className="text-sm text-(--text-secondary)">
                                    {metric.suffix}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center space-x-1">
                            <Icon
                                name={metric.trend === 'up' ? 'ArrowUp' : metric.trend === 'down' ? 'ArrowDown' : 'Minus'}
                                size={14}
                                className={
                                    metric.trend === 'up' ? 'text-(--success)' :
                                        metric.trend === 'down' ? (metric.id === 'churn' ? 'text-(--success)' : 'text-(--error)') :
                                            'text-(--secondary)'
                                }
                            />
                            <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-(--success)' :
                                metric.trend === 'down' ? (metric.id === 'churn' ? 'text-(--success)' : 'text-(--error)') :
                                    'text-(--secondary)'
                                }`}>
                                {metric.change}%
                            </span>
                            <span className="text-sm text-(--text-secondary)">
                                vs last period
                            </span>
                        </div>
                    </div>

                    {comparisonMode && selectedCampaigns.length > 1 && (
                        <div className="mt-4 pt-4 border-t border-(--border)">
                            <div className="text-xs text-(--text-secondary)">
                                Comparing {selectedCampaigns.length} campaigns
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SubscriberMetricsCards;