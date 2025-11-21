import React, { useState, useEffect } from 'react';
import CampaignContextSelector from '../../components/CampaignContextSelector';
import ExportActionControls from '../../components/ExportActionControls';
import KPIMetricsGrid from '../../components/KPIMetricsGrid';
import CampaignFunnelChart from './components/CampaignFunnelChart';
import RealtimeActivityFeed from './components/RealtimeActivityFeed';
import TopPerformingCampaigns from './components/TopPerformingCampaigns';
import EngagementTimelineChart from './components/EngagementTimelineChart';
import DateRangePicker from './components/DateRangePicker';
import Icon from '../../components/AppIcon';
import Header from '../../components/Header';

const CampaignPerformanceOverviewDashboard = () => {
    const [selectedCampaigns, setSelectedCampaigns] = useState(['campaign-1']);
    const [comparisonMode, setComparisonMode] = useState(false);
    const [dateRange, setDateRange] = useState('7d');
    const [isLoading, setIsLoading] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState('connected');
    const [lastUpdate, setLastUpdate] = useState(new Date());

    // Simulate data loading
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsLoading(false);
        };

        loadData();
    }, [selectedCampaigns, dateRange]);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdate(new Date());
            // Simulate connection status changes
            const statuses = ['connected', 'connecting', 'connected'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            setConnectionStatus(randomStatus);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const handleCampaignSelect = (campaigns) => {
        setSelectedCampaigns(campaigns);
    };

    const handleComparisonModeToggle = (mode) => {
        setComparisonMode(mode);
    };

    const handleDateRangeChange = (range) => {
        setDateRange(range);
    };

    const handleExport = async (exportType, campaigns) => {
        console.log('Exporting:', exportType, 'for campaigns:', campaigns);
        // Simulate export process
        return new Promise(resolve => setTimeout(resolve, 2000));
    };

    const handleAction = (actionType, campaigns) => {
        console.log('Action:', actionType, 'for campaigns:', campaigns);
    };

    return (
        <div className="min-h-screen bg-(--background)">
            <Header />

            <main className="pt-20">
                {/* Campaign Context & Controls */}
                <CampaignContextSelector
                    onCampaignSelect={handleCampaignSelect}
                    onComparisonModeToggle={handleComparisonModeToggle}
                />

                {/* Global Controls Bar */}
                <div className="bg-(--surface) border-b border-(--border)">
                    <div className="px-6 py-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            {/* Left Controls */}
                            <div className="flex max-[450px]:flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                                <DateRangePicker
                                    value={dateRange}
                                    onChange={handleDateRangeChange}
                                />

                                {/* Connection Status */}
                                <div className="flex items-center gap-2 px-3 py-2 bg-(--secondary-50) rounded-lg">
                                    <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-(--success) animate-pulse' :
                                        connectionStatus === 'connecting' ? 'bg-(--warning)' : 'bg-(--error)'
                                        }`} />
                                    <span className="text-xs font-medium text-text-secondary">
                                        Last updated: {lastUpdate.toLocaleTimeString()}
                                    </span>
                                    <button
                                        onClick={() => setLastUpdate(new Date())}
                                        className="p-1 hover:bg-(--secondary-100) rounded micro-interaction"
                                        title="Refresh data"
                                    >
                                        <Icon name="RefreshCw" size={12} className="text-(--text-secondary)" />
                                    </button>
                                </div>
                            </div>

                            {/* Right Controls */}
                            <ExportActionControls
                                screenContext="dashboard"
                                selectedCampaigns={selectedCampaigns}
                                onExport={handleExport}
                                onAction={handleAction}
                            />
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="px-6 py-6">
                    {/* KPI Metrics Grid */}
                    <div className="mb-8">
                        <KPIMetricsGrid
                            selectedCampaigns={selectedCampaigns}
                            comparisonMode={comparisonMode}
                            dateRange={dateRange}
                            isLoading={isLoading}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 my-4">
                        {/* Funnel Chart - Main Visualization */}
                        <div className="xl:col-span-8">
                            <CampaignFunnelChart
                                selectedCampaigns={selectedCampaigns}
                                comparisonMode={comparisonMode}
                                dateRange={dateRange}
                                isLoading={isLoading}
                            />
                        </div>

                        {/* Right Sidebar */}
                        <div className="xl:col-span-4 gap-6">
                            <RealtimeActivityFeed
                                selectedCampaigns={selectedCampaigns}
                                isLoading={isLoading}
                            />

                            <TopPerformingCampaigns
                                selectedCampaigns={selectedCampaigns}
                                dateRange={dateRange}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>

                    {/* Engagement Timeline - Full Width */}
                    <div className="mb-6">
                        <EngagementTimelineChart
                            selectedCampaigns={selectedCampaigns}
                            comparisonMode={comparisonMode}
                            dateRange={dateRange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CampaignPerformanceOverviewDashboard;