import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import CustomTooltip from '../../../components/CustomTooltip';

const CampaignFunnelChart = ({ isLoading }) => {
    // Mock funnel data
    const funnelData = [
        {
            stage: 'Sent',
            value: 125840,
            percentage: 100,
            color: '#2563EB',
            icon: 'Send',
            description: 'Total emails delivered to recipients'
        },
        {
            stage: 'Delivered',
            value: 123580,
            percentage: 98.2,
            color: '#3B82F6',
            icon: 'CheckCircle',
            description: 'Successfully delivered emails'
        },
        {
            stage: 'Opened',
            value: 31208,
            percentage: 25.2,
            color: '#10B981',
            icon: 'Mail',
            description: 'Recipients who opened the email'
        },
        {
            stage: 'Clicked',
            value: 4027,
            percentage: 3.2,
            color: '#F59E0B',
            icon: 'MousePointer',
            description: 'Recipients who clicked links'
        },
        {
            stage: 'Converted',
            value: 523,
            percentage: 0.4,
            color: '#8B5CF6',
            icon: 'Target',
            description: 'Recipients who completed desired action'
        }
    ];

    const FunnelStage = ({ stage, index }) => {
        const conversionRate = index > 0 ? ((stage.value / funnelData[index - 1].value) * 100).toFixed(1) : null;

        return (
            <div className="flex items-center gap-4 p-4 bg-(--surface) border border-(--border) not-last:border-b-0 rounded-lg hover:shadow--sm nav-transition">
                <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stage.color}20` }}
                >
                    <Icon name={stage.icon} size={20} style={{ color: stage.color }} />
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-(--text-primary)">{stage.stage}</span>
                        <span className="text-sm font-medium text-(--text-primary)">
                            {stage.value.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-24 bg-(--secondary-100) rounded-full h-2">
                                <div
                                    className="h-2 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${stage.percentage}%`,
                                        backgroundColor: stage.color
                                    }}
                                />
                            </div>
                            <span className="text-xs text-(--text-secondary)">
                                {stage.percentage}%
                            </span>
                        </div>

                        {conversionRate && (
                            <span className="text-xs text-(--text-secondary)">
                                {conversionRate}% conversion
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-(--text-primary)">
                        Campaign Funnel Analysis
                    </h3>
                    <p className="text-sm text-(--text-secondary)">
                        Conversion rates through the email marketing funnel
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-(--secondary-50) rounded-lg nav-transition" title="Refresh data">
                        <Icon name="RefreshCw" size={16} className="text-(--text-secondary)" />
                    </button>
                    <button className="p-2 hover:bg-(--secondary-50) rounded-lg nav-transition" title="View details">
                        <Icon name="Maximize2" size={16} className="text-(--text-secondary)" />
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="gap-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="flex items-center gap-4 p-4 bg-(--secondary-50) rounded-lg">
                                <div className="w-12 h-12 bg-(--secondary-100) rounded-lg"></div>
                                <div className="flex-1">
                                    <div className="w-32 h-4 bg-(--secondary-100) rounded mb-2"></div>
                                    <div className="w-24 h-2 bg-(--secondary-100) rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Funnel Visualization */}
                    <div className="mb-6">
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={funnelData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="stage"
                                        tick={{ fontSize: 12, fill: '#64748B' }}
                                        axisLine={{ stroke: '#E2E8F0' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#64748B' }}
                                        axisLine={{ stroke: '#E2E8F0' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {funnelData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Detailed Funnel Stages */}
                    <div className="gap-3">
                        <h4 className="font-medium text-(--text-primary) mb-3">
                            Detailed Breakdown
                        </h4>
                        {funnelData.map((stage, index) => (
                            <FunnelStage key={stage.stage} stage={stage} index={index} />
                        ))}
                    </div>

                    {/* Funnel Insights */}
                    <div className="mt-6 p-4 bg-(--secondary-50) rounded-lg">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-(--primary-50) rounded-lg flex items-center justify-center shrink-0">
                                <Icon name="Lightbulb" size={16} className="text-(--primary)" />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <h4 className="font-medium text-(--text-primary)">
                                    Optimization Opportunities
                                </h4>
                                <ul className="flex flex-col gap-1.5 text-sm text-(--text-secondary)">
                                    <li>Open rate of 25.2% is above industry average (21.3%)</li>
                                    <li>Click-to-open rate of 12.9% suggests engaging content</li>
                                    <li>Consider A/B testing subject lines to improve open rates</li>
                                    <li>Conversion rate could be improved with better landing pages</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CampaignFunnelChart;