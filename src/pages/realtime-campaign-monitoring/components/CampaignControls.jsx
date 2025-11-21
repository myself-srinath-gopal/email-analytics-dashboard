import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CampaignControls = ({ selectedCampaigns, campaignHealth }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [lastAction, setLastAction] = useState(null);

    // Mock campaign data
    const campaignData = {
        'campaign-1': {
            name: 'Holiday Sale 2024',
            status: 'active',
            progress: 67,
            totalEmails: 15000,
            sentEmails: 10050
        }
    };

    const currentCampaign = campaignData[selectedCampaigns[0]] || campaignData['campaign-1'];

    const handleAction = async (action) => {
        setIsProcessing(true);
        setLastAction(action);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            console.log(`${action} executed for campaigns:`, selectedCampaigns);
        }, 2000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-(--success) bg-(--success-50)';
            case 'paused': return 'text-(--warning) bg-(--warning-50)';
            case 'completed': return 'text-(--secondary) bg-(--secondary-100)';
            default: return 'text-(--secondary) bg-(--secondary-100)';
        }
    };

    const getHealthColor = (status) => {
        switch (status) {
            case 'healthy': return 'text-(--success)';
            case 'warning': return 'text-(--warning)';
            case 'critical': return 'text-(--error)';
            default: return 'text-(--secondary)';
        }
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-xl">
            <div className="p-4 border-b border-(--border)">
                <div className="flex items-center space-x-2">
                    <Icon name="Settings" size={20} className="text-(--primary)" />
                    <h3 className="font-semibold text-(--text-primary)">
                        Campaign Controls
                    </h3>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Campaign Status */}
                <div className="space-y-3">
                    <div>
                        <h4 className="font-medium text-sm text-(--text-primary) mb-2">
                            Current Campaign
                        </h4>
                        <div className="bg-(--secondary-50) rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm text-(--text-primary)">
                                    {currentCampaign.name}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentCampaign.status)}`}>
                                    {currentCampaign.status}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-(--text-secondary)">
                                    <span>Progress</span>
                                    <span>{currentCampaign.progress}%</span>
                                </div>
                                <div className="w-full bg-(--secondary-200) rounded-full h-2">
                                    <div
                                        className="bg-(--primary) h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${currentCampaign.progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-(--text-secondary)">
                                    <span>{currentCampaign.sentEmails.toLocaleString()} sent</span>
                                    <span>{currentCampaign.totalEmails.toLocaleString()} total</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Health Status */}
                    <div>
                        <h4 className="font-medium text-sm text-(--text-primary) mb-2">
                            Health Status
                        </h4>
                        <div className="bg-(--secondary-50) rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-(--text-secondary)">Overall Health</span>
                                <span className={`font-medium text-sm ${getHealthColor(campaignHealth.status)}`}>
                                    {campaignHealth.score}/100
                                </span>
                            </div>

                            <div className="w-full bg-(--secondary-200) rounded-full h-2 mb-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${campaignHealth.status === 'healthy' ? 'bg-(--success)' :
                                        campaignHealth.status === 'warning' ? 'bg-(--warning)' : 'bg-(--error)'
                                        }`}
                                    style={{ width: `${campaignHealth.score}%` }}
                                />
                            </div>

                            {campaignHealth.issues.length > 0 && (
                                <div className="text-xs text-(--text-secondary)">
                                    {campaignHealth.issues.length} issue{campaignHealth.issues.length !== 1 ? 's' : ''} detected
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h4 className="font-medium text-sm text-(--text-primary) mb-3">
                        Quick Actions
                    </h4>

                    <div className="space-y-2">
                        {/* Pause/Resume Campaign */}
                        <button
                            onClick={() => handleAction(currentCampaign.status === 'active' ? 'pause' : 'resume')}
                            disabled={isProcessing}
                            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg nav-transition ${currentCampaign.status === 'active' ? 'bg-(--warning) hover:bg-(--warning-600) text-white' : 'bg-(--success) hover:bg-(--success-600) text-white'
                                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isProcessing && lastAction === (currentCampaign.status === 'active' ? 'pause' : 'resume') ? (
                                <Icon name="Loader2" size={16} className="animate-spin" />
                            ) : (
                                <Icon name={currentCampaign.status === 'active' ? "Pause" : "Play"} size={16} />
                            )}
                            <span className="font-medium">
                                {currentCampaign.status === 'active' ? 'Pause Campaign' : 'Resume Campaign'}
                            </span>
                        </button>

                        {/* Emergency Stop */}
                        <button
                            onClick={() => handleAction('emergency-stop')}
                            disabled={isProcessing || currentCampaign.status !== 'active'}
                            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-(--error) hover:bg-(--error-700) text-white rounded-lg nav-transition ${isProcessing || currentCampaign.status !== 'active' ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isProcessing && lastAction === 'emergency-stop' ? (
                                <Icon name="Loader2" size={16} className="animate-spin" />
                            ) : (
                                <Icon name="StopCircle" size={16} />
                            )}
                            <span className="font-medium">Emergency Stop</span>
                        </button>

                        {/* Adjust Send Rate */}
                        <button
                            onClick={() => handleAction('adjust-rate')}
                            disabled={isProcessing}
                            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-(--secondary-100) hover:(--bg-secondary-200) text-(--text-primary) rounded-lg nav-transition ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isProcessing && lastAction === 'adjust-rate' ? (
                                <Icon name="Loader2" size={16} className="animate-spin" />
                            ) : (
                                <Icon name="Gauge" size={16} />
                            )}
                            <span className="font-medium">Adjust Send Rate</span>
                        </button>
                    </div>
                </div>

                {/* Performance Actions */}
                {campaignHealth.status !== 'healthy' && (
                    <div>
                        <h4 className="font-medium text-sm text-(--text-primary) mb-3">
                            Performance Actions
                        </h4>

                        <div className="space-y-2">
                            <button
                                onClick={() => handleAction('optimize-delivery')}
                                disabled={isProcessing}
                                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-(--primary) hover:(--bg-primary-700) text-white rounded-lg nav-transition ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isProcessing && lastAction === 'optimize-delivery' ? (
                                    <Icon name="Loader2" size={16} className="animate-spin" />
                                ) : (
                                    <Icon name="Zap" size={16} />
                                )}
                                <span className="font-medium">Optimize Delivery</span>
                            </button>

                            <button
                                onClick={() => handleAction('review-list')}
                                disabled={isProcessing}
                                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-(--accent) hover:bg-(--accent-600) text-white rounded-lg nav-transition ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isProcessing && lastAction === 'review-list' ? (
                                    <Icon name="Loader2" size={16} className="animate-spin" />
                                ) : (
                                    <Icon name="UserCheck" size={16} />
                                )}
                                <span className="font-medium">Review Email List</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Last Action Status */}
                {lastAction && !isProcessing && (
                    <div className="bg-(--success-50) border border-(--success-100) rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-(--success)" />
                            <span className="text-sm font-medium text-(--success)">
                                Action completed successfully
                            </span>
                        </div>
                        <p className="text-xs text-(--success) mt-1">
                            {lastAction.replace('-', ' ')} executed for selected campaigns
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignControls;