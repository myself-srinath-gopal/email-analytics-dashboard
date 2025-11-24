import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SubscriberLifecycleFunnel = ({
    selectedCampaigns,
    comparisonMode
}) => {
    const [selectedStage, setSelectedStage] = useState(null);

    // Mock funnel data
    const funnelData = [
        {
            stage: 'Acquisition',
            count: 50000,
            percentage: 100,
            conversionRate: null,
            color: 'bg-(--primary-50)',
            textColor: 'text-(--primary)',
            icon: 'UserPlus',
            description: 'New subscribers acquired through various channels',
            details: {
                organic: 18500,
                paid: 15200,
                referral: 8900,
                social: 7400
            }
        },
        {
            stage: 'Activation',
            count: 42500,
            percentage: 85,
            conversionRate: 85.0,
            color: 'bg-(--success-50)',
            textColor: 'text-(--success)',
            icon: 'Mail',
            description: 'Subscribers who opened their first email',
            details: {
                welcomeEmail: 38250,
                confirmationEmail: 4250
            }
        },
        {
            stage: 'Engagement',
            count: 31875,
            percentage: 63.8,
            conversionRate: 75.0,
            color: 'bg-purple-50',
            textColor: 'text-purple-600',
            icon: 'MousePointer',
            description: 'Subscribers who clicked on email content',
            details: {
                regularClickers: 25500,
                occasionalClickers: 6375
            }
        },
        {
            stage: 'Retention',
            count: 22312,
            percentage: 44.6,
            conversionRate: 70.0,
            color: 'bg-(--accent-50)',
            textColor: 'text-(--accent)',
            icon: 'Repeat',
            description: 'Subscribers active for 30+ days',
            details: {
                highlyActive: 13387,
                moderatelyActive: 8925
            }
        },
        {
            stage: 'Advocacy',
            count: 11156,
            percentage: 22.3,
            conversionRate: 50.0,
            color: 'bg-(--error-50)',
            textColor: 'text-(--error)',
            icon: 'Share2',
            description: 'Subscribers who shared or referred others',
            details: {
                referrers: 6694,
                socialSharers: 4462
            }
        }
    ];

    const handleStageClick = (stage) => {
        setSelectedStage(selectedStage?.stage === stage.stage ? null : stage);
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-(--text-primary) mb-1">
                        Subscriber Lifecycle Funnel
                    </h3>
                    <p className="text-sm text-(--text-secondary)">
                        Progression from acquisition to loyal customer with conversion rates
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    {comparisonMode && selectedCampaigns.length > 1 && (
                        <div className="text-xs text-(--text-secondary) bg-(--primary-50) px-2 py-1 rounded">
                            Comparing {selectedCampaigns.length} campaigns
                        </div>
                    )}

                    <button className="p-2 hover:bg-(--secondary-50) rounded-lg nav-transition">
                        <Icon name="MoreVertical" size={16} className="text-(--text-secondary)" />
                    </button>
                </div>
            </div>

            {/* Funnel Visualization */}
            <div className="space-y-4 mb-8">
                {funnelData.map((stage) => (
                    <div key={stage.stage} className={`relative h-full`}>
                        {/* Funnel Stage */}
                        <button
                            onClick={() => handleStageClick(stage)}
                            className={`w-full group relative overflow-hidden rounded-lg border nav-transition ${selectedStage?.stage === stage.stage
                                ? 'border-(--primary) bg-(--primary-50)' : 'border-(--border) hover:border-(--secondary-300) bg-(--surface)'
                                }`}
                        >
                            {/* Funnel Bar */}
                            <div
                                className={`h-16 flex max-[670px]:my-4 max-[670px]:flex-col max-[670px]:h-max max-[670px]:items-start max-[670px]:gap-6 items-center min-[670px]:justify-between px-6 relative`}
                            >
                                <div className="flex items-center space-x-4 z-10">
                                    <div
                                        className={`p-2 rounded-lg ${stage?.color}`}
                                    >
                                        <Icon name={stage.icon} size={20} className={stage.textColor} />
                                    </div>

                                    <div className="text-left">
                                        <div className="font-semibold text-(--text-primary)">
                                            {stage.stage}
                                        </div>
                                        <div className="text-xs md:text-sm text-(--text-secondary)">
                                            {stage.description}
                                        </div>
                                    </div>
                                </div>

                                <div className="min-[670px]:text-right text-left z-10">
                                    <div className="font-semibold md:font-bold text-base md:text-lg text-(--text-primary)">
                                        {stage.count.toLocaleString()}
                                    </div>
                                    <div className="text-xs md:text-sm text-(--text-secondary)">
                                        {stage.percentage}% of total
                                    </div>
                                </div>
                            </div>

                            {/* Conversion Rate Arrow */}
                            {stage.conversionRate && (
                                <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="flex items-center space-x-1 bg-(--surface) border border-(--border) rounded-full px-2 py-1 shadow-xs">
                                        <Icon name="ArrowDown" size={12} className="text-(--text-secondary)" />
                                        <span className="text-xs font-medium text-(--text-primary)">
                                            {stage.conversionRate}%
                                        </span>
                                    </div>
                                </div>
                            )}
                        </button>

                        {/* Stage Details */}
                        {selectedStage?.stage === stage.stage && (
                            <div className="mt-4 p-4 bg-(--secondary-50) border border-(--border) rounded-lg animate-slide-down">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-(--text-primary)">
                                        {stage.stage} Breakdown
                                    </h4>
                                    <button
                                        onClick={() => setSelectedStage(null)}
                                        className="p-1 hover:bg-(--secondary-100) rounded micro-transition"
                                    >
                                        <Icon name="X" size={14} className="text-(--text-secondary)" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(stage.details).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between p-3 bg-(--surface) rounded-lg">
                                            <span className="text-sm text-(--text-secondary) capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                            <span className="font-medium text-(--text-primary)">
                                                {value.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Funnel Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-(--border)">
                <div className="text-center p-4 bg-(--primary-50) rounded-lg">
                    <div className="text-lg font-bold text-(--primary)">
                        {((funnelData[funnelData.length - 1].count / funnelData[0].count) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-(--text-secondary)">Overall Conversion</div>
                </div>

                <div className="text-center p-4 bg-(--success-50) rounded-lg">
                    <div className="text-lg font-bold text-(--success)">
                        {funnelData.filter(s => s.conversionRate && s.conversionRate >= 70).length}
                    </div>
                    <div className="text-sm text-(--text-secondary)">High-Performing Stages</div>
                </div>

                <div className="text-center p-4 bg-(--warning-50) rounded-lg">
                    <div className="text-lg font-bold text-(--warning)">
                        {Math.min(...funnelData.filter(s => s.conversionRate).map(s => s.conversionRate)).toFixed(1)}%
                    </div>
                    <div className="text-sm text-(--text-secondary)">Lowest Conversion</div>
                </div>

                <div className="text-center p-4 bg-(--accent-50) rounded-lg">
                    <div className="text-lg font-bold text-(--accent)">
                        {funnelData[funnelData.length - 1].count.toLocaleString()}
                    </div>
                    <div className="text-sm text-(--text-secondary)">Loyal Customers</div>
                </div>
            </div>

            {/* Optimization Recommendations */}
            <div className="mt-6 p-4 bg-(--secondary-50) border border-(--border) rounded-lg">
                <h4 className="font-medium text-(--text-primary) mb-3 flex items-center space-x-2">
                    <Icon name="Lightbulb" size={16} className="text-(--accent)" />
                    <span>Optimization Recommendations</span>
                </h4>

                <div className="space-y-2 text-sm text-(--text-secondary)">
                    <div className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={14} className="text-(--primary) mt-0.5" />
                        <span>Focus on improving Advocacy stage conversion (currently 50%)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={14} className="text-(--primary) mt-0.5" />
                        <span>Implement re-engagement campaigns for inactive subscribers</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={14} className="text-(--primary) mt-0.5" />
                        <span>A/B test welcome email sequences to improve activation rates</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriberLifecycleFunnel;