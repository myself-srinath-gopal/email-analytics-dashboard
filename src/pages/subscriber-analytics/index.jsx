import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import CampaignContextSelector from '../../components/CampaignContextSelector';
import ExportActionControls from '../../components/ExportActionControls';
import Icon from '../../components/AppIcon';

import SubscriberMetricsCards from './components/SubscriberMetricsCards';
import EngagementHeatmap from './components/EngagementHeatmap';
import SubscriberStatusChart from './components/SubscriberStatusChart';
import GeographicDistribution from './components/GeographicDistribution';
import SubscriberLifecycleFunnel from './components/SubscriberLifecycleFunnel';
import SegmentationControls from './components/SegmentationControls';
import CohortAnalysis from './components/CohortAnalysis';

const SubscriberAnalyticsDashboard = () => {
    const [selectedCampaigns, setSelectedCampaigns] = useState(['campaign-1']);
    const [comparisonMode, setComparisonMode] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('30d');
    const [selectedSegment, setSelectedSegment] = useState('all');
    const [showCohortAnalysis, setShowCohortAnalysis] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const periodOptions = [
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '90 Days' },
        { value: '1y', label: '1 Year' }
    ];

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [selectedCampaigns, selectedPeriod, selectedSegment]);

    useEffect(() => {
        // Auto-refresh data every 15 minutes
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 900000);

        return () => clearInterval(interval);
    }, []);

    const handleCampaignSelect = (campaigns) => {
        setSelectedCampaigns(campaigns);
        setIsLoading(true);
    };

    const handleComparisonModeToggle = (enabled) => {
        setComparisonMode(enabled);
    };

    const handleExport = async (exportType, campaigns) => {
        console.log('Exporting:', exportType, 'for campaigns:', campaigns);
        // Simulate export process
        return new Promise(resolve => setTimeout(resolve, 2000));
    };

    const handleAction = (actionType, campaigns) => {
        console.log('Action:', actionType, 'for campaigns:', campaigns);
    };

    const handleSegmentChange = (segment) => {
        setSelectedSegment(segment);
        setIsLoading(true);
    };

    const formatLastUpdate = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-(--background)">
                <Header />
                <CampaignContextSelector
                    onCampaignSelect={handleCampaignSelect}
                    onComparisonModeToggle={handleComparisonModeToggle}
                />

                <div className="pt-32">
                    <div className="px-6 py-8">
                        {/* Loading Skeleton */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="skeleton-loading h-8 w-64 rounded-lg"></div>
                                <div className="skeleton-loading h-10 w-48 rounded-lg"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="skeleton-loading h-32 rounded-lg"></div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-16 gap-6 mb-8">
                                <div className="lg:col-span-10 skeleton-loading h-96 rounded-lg"></div>
                                <div className="lg:col-span-6 space-y-6">
                                    <div className="skeleton-loading h-48 rounded-lg"></div>
                                    <div className="skeleton-loading h-48 rounded-lg"></div>
                                </div>
                            </div>

                            <div className="skeleton-loading h-64 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-(--background)">
            <Header />
            <CampaignContextSelector
                onCampaignSelect={handleCampaignSelect}
                onComparisonModeToggle={handleComparisonModeToggle}
            />

            <div className="pt-32">
                <div className="px-6 py-8">
                    {/* Dashboard Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                        <div className="mb-4 lg:mb-0">
                            <h1 className="text-2xl font-bold text-(--text-primary) mb-2">
                                Subscriber Analytics Dashboard
                            </h1>
                            <p className="text-(--text-secondary)">
                                Comprehensive subscriber behavior and segmentation analysis
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            {/* Period Selector */}
                            <div className="flex items-center space-x-2">
                                <Icon name="Calendar" size={16} className="text-(--text-secondary)" />
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="px-3 py-2 border border-(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-100) focus:border-(--primary) text-sm"
                                >
                                    {periodOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Last Updated */}
                            <div className="flex items-center space-x-2 text-xs text-(--text-secondary)">
                                <Icon name="Clock" size={14} />
                                <span>Updated {formatLastUpdate(lastUpdated)}</span>
                            </div>

                            <ExportActionControls
                                screenContext="subscribers"
                                selectedCampaigns={selectedCampaigns}
                                onExport={handleExport}
                                onAction={handleAction}
                            />
                        </div>
                    </div>

                    {/* Segmentation Controls */}
                    <SegmentationControls
                        selectedSegment={selectedSegment}
                        onSegmentChange={handleSegmentChange}
                        showCohortAnalysis={showCohortAnalysis}
                        onCohortToggle={setShowCohortAnalysis}
                    />

                    {/* Key Metrics Cards */}
                    <SubscriberMetricsCards
                        selectedCampaigns={selectedCampaigns}
                        selectedPeriod={selectedPeriod}
                        selectedSegment={selectedSegment}
                        comparisonMode={comparisonMode}
                    />

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-16 gap-6 mb-8">
                        {/* Engagement Heatmap */}
                        <div className="lg:col-span-16">
                            <EngagementHeatmap
                                selectedCampaigns={selectedCampaigns}
                                selectedPeriod={selectedPeriod}
                                selectedSegment={selectedSegment}
                            />
                        </div>

                        {/* Right Panel */}
                        <div className="lg:col-span-16 space-y-6">
                            <SubscriberStatusChart
                                selectedCampaigns={selectedCampaigns}
                                selectedSegment={selectedSegment}
                            />

                            <GeographicDistribution
                                selectedCampaigns={selectedCampaigns}
                                selectedSegment={selectedSegment}
                            />
                        </div>
                    </div>

                    {/* Subscriber Lifecycle Funnel */}
                    <SubscriberLifecycleFunnel
                        selectedCampaigns={selectedCampaigns}
                        selectedPeriod={selectedPeriod}
                        selectedSegment={selectedSegment}
                        comparisonMode={comparisonMode}
                    />

                    {/* Cohort Analysis */}
                    {showCohortAnalysis && (
                        <CohortAnalysis
                            selectedCampaigns={selectedCampaigns}
                            selectedPeriod={selectedPeriod}
                            selectedSegment={selectedSegment}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriberAnalyticsDashboard;