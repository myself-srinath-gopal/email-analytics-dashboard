import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import CampaignContextSelector from '../../components/CampaignContextSelector';
import ExportActionControls from '../../components/ExportActionControls';
import Icon from '../../components/AppIcon';
import LiveActivityStream from './components/LiveActivityStream';
import AlertNotifications from './components/AlertNotifications';
import RealTimeChart from './components/RealTimeChart';
import CampaignControls from './components/CampaignControls';

const RealTimeCampaignMonitoring = () => {
    const [selectedCampaigns, setSelectedCampaigns] = useState(['campaign-1']);
    const [refreshInterval, setRefreshInterval] = useState(30);
    const [isLiveMode, setIsLiveMode] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState('connected');
    const [lastUpdate, setLastUpdate] = useState(new Date());

    // Mock real-time metrics data
    const [liveMetrics, setLiveMetrics] = useState({
        emailsSent: 12847,
        deliveryRate: 98.2,
        openRate: 24.7,
        clickRate: 3.8,
        bounceRate: 1.8,
        unsubscribeRate: 0.3,
        sendRate: 145, // emails per minute
        engagementVelocity: 2.1, // interactions per minute
        deliverySpeed: 142 // emails delivered per minute
    });

    // Mock campaign health status
    const [campaignHealth, setCampaignHealth] = useState({
        status: 'healthy', // healthy, warning, critical
        score: 92,
        issues: [],
        recommendations: []
    });

    // Simulate real-time updates
    useEffect(() => {
        if (!isLiveMode) return;

        const interval = setInterval(() => {
            setLiveMetrics(prev => ({
                ...prev,
                emailsSent: prev.emailsSent + Math.floor(Math.random() * 10) + 1,
                deliveryRate: Math.max(95, Math.min(100, prev.deliveryRate + (Math.random() - 0.5) * 0.5)),
                openRate: Math.max(15, Math.min(35, prev.openRate + (Math.random() - 0.5) * 0.8)),
                clickRate: Math.max(2, Math.min(8, prev.clickRate + (Math.random() - 0.5) * 0.3)),
                bounceRate: Math.max(0.5, Math.min(5, prev.bounceRate + (Math.random() - 0.5) * 0.2)),
                sendRate: Math.max(100, Math.min(200, prev.sendRate + (Math.random() - 0.5) * 20)),
                engagementVelocity: Math.max(1, Math.min(5, prev.engagementVelocity + (Math.random() - 0.5) * 0.5))
            }));
            setLastUpdate(new Date());
        }, refreshInterval * 1000);

        return () => clearInterval(interval);
    }, [isLiveMode, refreshInterval]);

    // Determine health status based on metrics
    useEffect(() => {
        const { deliveryRate, bounceRate, openRate } = liveMetrics;
        let status = 'healthy';
        let score = 100;
        const issues = [];
        const recommendations = [];

        if (deliveryRate < 95) {
            status = 'warning';
            score -= 15;
            issues.push('Low delivery rate detected');
            recommendations.push('Check sender reputation and email content');
        }

        if (bounceRate > 3) {
            status = 'critical';
            score -= 25;
            issues.push('High bounce rate detected');
            recommendations.push('Review email list quality and remove invalid addresses');
        }

        if (openRate < 15) {
            status = status === 'critical' ? 'critical' : 'warning';
            score -= 10;
            issues.push('Low engagement detected');
            recommendations.push('Consider optimizing subject lines and send times');
        }

        setCampaignHealth({ status, score: Math.max(0, score), issues, recommendations });
    }, [liveMetrics]);

    const getHealthStatusColor = (status) => {
        switch (status) {
            case 'healthy': return 'bg-(--success) text-white';
            case 'warning': return 'bg-(--warning) text-white';
            case 'critical': return 'bg-(--error) text-white';
            default: return 'bg-(--secondary) text-white';
        }
    };

    const getHealthStatusIcon = (status) => {
        switch (status) {
            case 'healthy': return 'CheckCircle';
            case 'warning': return 'AlertTriangle';
            case 'critical': return 'XCircle';
            default: return 'HelpCircle';
        }
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num);
    };

    const formatRate = (rate) => {
        return `${rate.toFixed(1)}%`;
    };

    const handleCampaignSelect = (campaigns) => {
        setSelectedCampaigns(campaigns);
    };

    const handleExport = (exportType, campaigns) => {
        console.log('Exporting:', exportType, campaigns);
    };

    const handleAction = (actionType, campaigns) => {
        console.log('Action:', actionType, campaigns);
    };

    return (
        <div className="min-h-screen bg-(--background)">
            <Header />

            <div className="pt-20">
                <CampaignContextSelector
                    onCampaignSelect={handleCampaignSelect}
                />

                <div className="px-6 py-6">
                    {/* Page Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-(--text-primary) mb-2">
                                Real-Time Campaign Monitoring
                            </h1>
                            <p className="text-(--text-secondary)">
                                Live performance tracking and instant alerts for active campaigns
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
                            {/* Refresh Controls */}
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-(--text-secondary)">Refresh:</span>
                                    <select
                                        value={refreshInterval}
                                        onChange={(e) => setRefreshInterval(Number(e.target.value))}
                                        className="px-3 py-1 border border-(--border) rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-100)"
                                    >
                                        <option value={10}>10s</option>
                                        <option value={30}>30s</option>
                                        <option value={60}>60s</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => setIsLiveMode(!isLiveMode)}
                                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg nav-transition ${isLiveMode
                                        ? 'bg-(--success) text-white' : 'bg-(--secondary-100) text-(--text-secondary) hover:bg-(--secondary-200)'
                                        }`}
                                >
                                    <Icon name={isLiveMode ? "Pause" : "Play"} size={14} />
                                    <span className="text-sm font-medium">
                                        {isLiveMode ? 'Live' : 'Paused'}
                                    </span>
                                </button>
                            </div>

                            <ExportActionControls
                                screenContext="monitoring"
                                selectedCampaigns={selectedCampaigns}
                                onExport={handleExport}
                                onAction={handleAction}
                            />
                        </div>
                    </div>

                    {/* Campaign Health Status - Large Indicator */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-1">
                            <div className={`p-6 rounded-xl ${getHealthStatusColor(campaignHealth.status)} text-center`}>
                                <div className="flex items-center justify-center mb-4">
                                    <Icon
                                        name={getHealthStatusIcon(campaignHealth.status)}
                                        size={48}
                                        color="white"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">
                                    Campaign Health
                                </h3>
                                <div className="text-4xl font-bold mb-2">
                                    {campaignHealth.score}
                                </div>
                                <div className="text-lg font-medium capitalize">
                                    {campaignHealth.status}
                                </div>
                                {campaignHealth.issues.length > 0 && (
                                    <div className="mt-4 text-sm opacity-90">
                                        {campaignHealth.issues.length} issue{campaignHealth.issues.length !== 1 ? 's' : ''} detected
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Connection Status & Last Update */}
                        <div className="lg:col-span-2">
                            <div className="bg-(--surface) border border-(--border) rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-(--text-primary)">
                                        Connection Status
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-(--success) animate-pulse' :
                                            connectionStatus === 'connecting' ? 'bg-(--warning)' : 'bg-(--error)'
                                            }`} />
                                        <span className={`text-sm font-medium ${connectionStatus === 'connected' ? 'text-success' :
                                            connectionStatus === 'connecting' ? 'text-(--warning)' : 'text-(--error)'
                                            }`}>
                                            {connectionStatus === 'connected' ? 'Connected' :
                                                connectionStatus === 'connecting' ? 'Connecting' : 'Disconnected'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-(--text-primary)">
                                            {formatNumber(liveMetrics.emailsSent)}
                                        </div>
                                        <div className="text-sm text-(--text-secondary)">Total Sent</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-(--success)">
                                            {formatRate(liveMetrics.deliveryRate)}
                                        </div>
                                        <div className="text-sm text-(--text-secondary)">Delivery Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-(--primary)">
                                            {liveMetrics.sendRate.toFixed(2)}/min
                                        </div>
                                        <div className="text-sm text-(--text-secondary)">Send Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-(--text-secondary) mb-1">Last Update</div>
                                        <div className="text-sm font-medium text-(--text-primary)">
                                            {lastUpdate.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                        <div className="bg-(--surface) border border-(--border) rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Icon name="Send" size={20} className="text-(--primary)" />
                                <div className="text-xs text-(--success) font-medium">
                                    +{Math.floor(Math.random() * 10) + 1}/min
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-(--text-primary) mb-1">
                                {formatNumber(liveMetrics.emailsSent)}
                            </div>
                            <div className="text-sm text-(--text-secondary)">Emails Sent</div>
                        </div>

                        <div className="bg-(--surface) border border-(--border) rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Icon name="CheckCircle" size={20} className="text-(--success)" />
                                <div className="text-xs text-(--success) font-medium">
                                    {formatRate(liveMetrics.deliveryRate)}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-(--success) mb-1">
                                {formatNumber(Math.floor(liveMetrics.emailsSent * liveMetrics.deliveryRate / 100))}
                            </div>
                            <div className="text-sm text-(--text-secondary)">Delivered</div>
                        </div>

                        <div className="bg-(--surface) border border-(--border) rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Icon name="Eye" size={20} className="text-(--accent)" />
                                <div className="text-xs text-(--accent) font-medium">
                                    {formatRate(liveMetrics.openRate)}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-(--accent) mb-1">
                                {formatNumber(Math.floor(liveMetrics.emailsSent * liveMetrics.openRate / 100))}
                            </div>
                            <div className="text-sm text-(--text-secondary)">Opens</div>
                        </div>

                        <div className="bg-(--surface) border border-(--border) rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Icon name="MousePointer" size={20} className="text-(--primary)" />
                                <div className="text-xs text-(--primary) font-medium">
                                    {formatRate(liveMetrics.clickRate)}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-(--primary) mb-1">
                                {formatNumber(Math.floor(liveMetrics.emailsSent * liveMetrics.clickRate / 100))}
                            </div>
                            <div className="text-sm text-(--text-secondary)">Clicks</div>
                        </div>

                        <div className="bg-(--surface) border border-(--border) rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Icon name="AlertTriangle" size={20} className="text-(--error)" />
                                <div className="text-xs text-(--error) font-medium">
                                    {formatRate(liveMetrics.bounceRate)}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-(--error) mb-1">
                                {formatNumber(Math.floor(liveMetrics.emailsSent * liveMetrics.bounceRate / 100))}
                            </div>
                            <div className="text-sm text-(--text-secondary)">Bounces</div>
                        </div>

                        <div className="bg-(--surface) border border-(--border) rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Icon name="UserMinus" size={20} className="text-(--warning)" />
                                <div className="text-xs text-(--warning) font-medium">
                                    {formatRate(liveMetrics.unsubscribeRate)}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-(--warning) mb-1">
                                {formatNumber(Math.floor(liveMetrics.emailsSent * liveMetrics.unsubscribeRate / 100))}
                            </div>
                            <div className="text-sm text-text-secondary">Unsubscribes</div>
                        </div>
                    </div>

                    {/* Main Monitoring Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Live Activity Stream */}
                        <div className="lg:col-span-2">
                            <LiveActivityStream
                                isLiveMode={isLiveMode}
                                refreshInterval={refreshInterval}
                            />
                        </div>

                        {/* Alert Notifications & Controls */}
                        <div className="space-y-6">
                            <AlertNotifications
                                campaignHealth={campaignHealth}
                                liveMetrics={liveMetrics}
                            />

                            <CampaignControls
                                selectedCampaigns={selectedCampaigns}
                                campaignHealth={campaignHealth}
                            />
                        </div>
                    </div>

                    {/* Real-Time Performance Chart */}
                    <div className="bg-(--surface) border border-(--border) rounded-xl p-6">
                        <RealTimeChart
                            liveMetrics={liveMetrics}
                            isLiveMode={isLiveMode}
                            refreshInterval={refreshInterval}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealTimeCampaignMonitoring;