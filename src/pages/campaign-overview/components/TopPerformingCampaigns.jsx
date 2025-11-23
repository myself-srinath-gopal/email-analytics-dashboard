import React from 'react';
import Icon from '../../../components/AppIcon';

const TopPerformingCampaigns = ({ isLoading }) => {
    // Mock top performing campaigns data
    const topCampaigns = [
        {
            id: 'campaign-1',
            name: 'Holiday Sale 2024',
            openRate: 28.5,
            clickRate: 4.2,
            conversionRate: 0.8,
            revenue: 15420,
            sends: 45200,
            trend: 'up',
            change: 12.3,
            status: 'active'
        },
        {
            id: 'campaign-2',
            name: 'Product Launch Newsletter',
            openRate: 26.1,
            clickRate: 3.8,
            conversionRate: 0.6,
            revenue: 8950,
            sends: 32100,
            trend: 'up',
            change: 8.7,
            status: 'active'
        },
        {
            id: 'campaign-3',
            name: 'Customer Retention Series',
            openRate: 24.9,
            clickRate: 3.1,
            conversionRate: 0.4,
            revenue: 6780,
            sends: 28400,
            trend: 'down',
            change: -2.1,
            status: 'paused'
        },
        {
            id: 'campaign-4',
            name: 'Welcome Email Sequence',
            openRate: 22.3,
            clickRate: 2.9,
            conversionRate: 0.3,
            revenue: 4320,
            sends: 18900,
            trend: 'up',
            change: 5.4,
            status: 'active'
        },
        {
            id: 'campaign-5',
            name: 'Black Friday Promotion',
            openRate: 31.2,
            clickRate: 5.1,
            conversionRate: 1.2,
            revenue: 22100,
            sends: 52300,
            trend: 'up',
            change: 18.9,
            status: 'completed'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-(--success) bg-(--success-50)';
            case 'paused': return 'text-(--warning) bg-(--warning-50)';
            case 'completed': return 'text-(--secondary) bg-(--secondary-100)';
            default: return 'text-(--secondary) bg-(--secondary-100)';
        }
    };

    const formatRevenue = (value) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value.toLocaleString()}`;
    };

    const CampaignCard = ({ campaign, rank }) => (
        <div className="flex max-[470px]:items-start items-center gap-x-4 max-[470px]:p-1 p-4 sm:hover:bg-(--secondary-50) rounded-lg nav-transition">
            {/* Rank Badge */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${rank === 1 ? 'bg-(--warning) text-white' :
                rank === 2 ? 'bg-(--secondary-300) text-white' :
                    rank === 3 ? 'bg-(--accent-600) text-white' : 'bg-(--secondary-100) text-(--text-secondary)'
                }`}>
                {rank}
            </div>

            <div className="flex-1 min-w-0">
                {/* Campaign Name & Status */}
                <div className="flex max-[425px]:flex-col max-[425px]:items-start max-[425px]:space-y-2 items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-(--text-primary) truncate">
                        {campaign.name}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                    </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid max-[470px]:grid-cols-1 grid-cols-2 gap-3 text-xs">
                    <div>
                        <span className="text-(--text-secondary)">Open Rate:</span>
                        <span className="font-medium text-(--text-primary) ml-1">
                            {campaign.openRate}%
                        </span>
                    </div>
                    <div>
                        <span className="text-(--text-secondary)">Click Rate:</span>
                        <span className="font-medium text-(--text-primary) ml-1">
                            {campaign.clickRate}%
                        </span>
                    </div>
                    <div>
                        <span className="text-(--text-secondary)">Revenue:</span>
                        <span className="font-medium text-(--success) ml-1">
                            {formatRevenue(campaign.revenue)}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-(--text-secondary)">Trend:</span>
                        <div className={`flex items-center ml-1 ${campaign.trend === 'up' ? 'text-(--success)' : 'text-(--error)'
                            }`}>
                            <Icon
                                name={campaign.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                                size={10}
                            />
                            <span className="font-medium ml-1">
                                {Math.abs(campaign.change)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-(--text-primary)">
                        Top Performers
                    </h3>
                    <p className="text-sm text-(--text-secondary)">
                        Best campaigns by engagement & revenue
                    </p>
                </div>

                <button className="p-2 hover:bg-(--secondary-50) rounded-lg nav-transition" title="View all campaigns">
                    <Icon name="BarChart3" size={16} className="text-(--text-secondary)" />
                </button>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="flex items-center space-x-4 p-4 bg-(--secondary-50) rounded-lg">
                                <div className="w-8 h-8 bg-(--secondary-100) rounded-full"></div>
                                <div className="flex-1">
                                    <div className="w-32 h-4 bg-(--secondary-100) rounded mb-2"></div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="w-16 h-3 bg-(--secondary-100) rounded"></div>
                                        <div className="w-16 h-3 bg-(--secondary-100) rounded"></div>
                                        <div className="w-16 h-3 bg-(--secondary-100) rounded"></div>
                                        <div className="w-16 h-3 bg-(--secondary-100) rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Campaign List */}
                    <div className="space-y-3 mb-6">
                        {topCampaigns.slice(0, 5).map((campaign, index) => (
                            <CampaignCard key={campaign.id} campaign={campaign} rank={index + 1} />
                        ))}
                    </div>

                    {/* Performance Summary */}
                    <div className="pt-4 border-t border-(--border)">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div className="text-lg font-bold text-(--text-primary)">
                                    {(topCampaigns.reduce((sum, c) => sum + c.openRate, 0) / topCampaigns.length).toFixed(1)}%
                                </div>
                                <div className="text-xs text-(--text-secondary)">
                                    Avg Open Rate
                                </div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-(--success)">
                                    {formatRevenue(topCampaigns.reduce((sum, c) => sum + c.revenue, 0))}
                                </div>
                                <div className="text-xs text-(--text-secondary)">
                                    Total Revenue
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-4 pt-4 border-t border-(--border)">
                        <div className="flex max-[365px]:flex-col max-[365px]:space-y-2 space-x-2">
                            <button className="max-[365px]:w-full flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-(--primary-50) hover:bg-(--primary-100) text-(--primary) rounded-lg nav-transition">
                                <Icon name="Copy" size={14} />
                                <span className="text-xs font-medium">Duplicate Best</span>
                            </button>
                            <button className="max-[365px]:w-full flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-(--secondary-50) hover:bg-(--secondary-100) text-(--text-secondary) rounded-lg nav-transition">
                                <Icon name="BarChart3" size={14} />
                                <span className="text-xs font-medium">Compare</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TopPerformingCampaigns;