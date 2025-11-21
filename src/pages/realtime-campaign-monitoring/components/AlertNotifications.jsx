import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AlertNotifications = ({ campaignHealth, liveMetrics }) => {
    const [alerts, setAlerts] = useState([]);
    const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

    // Generate alerts based on campaign health and metrics
    useEffect(() => {
        const newAlerts = [];

        // Delivery rate alerts
        if (liveMetrics.deliveryRate < 95) {
            newAlerts.push({
                id: 'delivery-rate-low',
                type: 'warning',
                title: 'Low Delivery Rate',
                message: `Delivery rate dropped to ${liveMetrics.deliveryRate.toFixed(1)}%`,
                timestamp: new Date(),
                action: 'Check sender reputation',
                priority: 'medium'
            });
        }

        // Bounce rate alerts
        if (liveMetrics.bounceRate > 3) {
            newAlerts.push({
                id: 'bounce-rate-high',
                type: 'critical',
                title: 'High Bounce Rate',
                message: `Bounce rate exceeded 3% (${liveMetrics.bounceRate.toFixed(1)}%)`,
                timestamp: new Date(),
                action: 'Review email list quality',
                priority: 'high'
            });
        }

        // Engagement alerts
        if (liveMetrics.openRate < 15) {
            newAlerts.push({
                id: 'engagement-low',
                type: 'warning',
                title: 'Low Engagement',
                message: `Open rate below 15% (${liveMetrics.openRate.toFixed(1)}%)`,
                timestamp: new Date(),
                action: 'Optimize subject lines',
                priority: 'medium'
            });
        }

        // Send rate alerts
        if (liveMetrics.sendRate < 100) {
            newAlerts.push({
                id: 'send-rate-slow',
                type: 'info',
                title: 'Slow Send Rate',
                message: `Send rate below expected (${liveMetrics.sendRate}/min)`,
                timestamp: new Date(),
                action: 'Check server capacity',
                priority: 'low'
            });
        }

        // Update alerts, filtering out dismissed ones
        setAlerts(prev => {
            const existingIds = new Set(prev.map(alert => alert.id));
            const filteredNew = newAlerts.filter(alert =>
                !existingIds.has(alert.id) && !dismissedAlerts.has(alert.id)
            );
            return [...prev, ...filteredNew].slice(-10); // Keep last 10 alerts
        });
    }, [liveMetrics, dismissedAlerts]);

    const getAlertIcon = (type) => {
        switch (type) {
            case 'critical': return 'XCircle';
            case 'warning': return 'AlertTriangle';
            case 'info': return 'Info';
            case 'success': return 'CheckCircle';
            default: return 'Bell';
        }
    };

    const getAlertColor = (type) => {
        switch (type) {
            case 'critical': return 'text-(--error) bg-(color-error-50) border-(color-error-100)';
            case 'warning': return 'text-(--warning) bg-(color-warning-50) border-(color-warning-100)';
            case 'info': return 'text-(--primary) bg-(color-primary-50) border-(color-primary-100)';
            case 'success': return 'text-(--success) bg-(color-success-50) border-(color-success-100)';
            default: return 'text-(--secondary) bg-(color-secondary-50) border-(color-secondary-100)';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-(--error)';
            case 'medium': return 'bg-(--warning)';
            case 'low': return 'bg-(--primary)';
            default: return 'bg-(--secondary)';
        }
    };

    const dismissAlert = (alertId) => {
        setDismissedAlerts(prev => new Set([...prev, alertId]));
        setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    };

    const clearAllAlerts = () => {
        setAlerts([]);
        setDismissedAlerts(new Set());
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-xl">
            <div className="p-4 border-b border-(--border)">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Icon name="Bell" size={20} className="text-(--primary)" />
                        <h3 className="font-semibold text-(--text-primary)">
                            Alert Notifications
                        </h3>
                        {alerts.length > 0 && (
                            <span className="px-2 py-1 bg-(--error) text-white text-xs rounded-full">
                                {alerts.length}
                            </span>
                        )}
                    </div>

                    {alerts.length > 0 && (
                        <button
                            onClick={clearAllAlerts}
                            className="text-xs text-(--text-secondary) hover:text-(--text-primary)"
                        >
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
                {alerts.length === 0 ? (
                    <div className="p-6 text-center">
                        <Icon name="CheckCircle" size={32} className="text-(--success) mx-auto mb-2" />
                        <p className="text-sm text-(--text-secondary)">
                            No active alerts
                        </p>
                        <p className="text-xs text-(--text-secondary) mt-1">
                            All systems operating normally
                        </p>
                    </div>
                ) : (
                    <div className="p-4 space-y-3">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`border rounded-lg p-3 ${getAlertColor(alert.type)}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <Icon
                                            name={getAlertIcon(alert.type)}
                                            size={18}
                                            className={alert.type === 'critical' ? 'text-(--error)' :
                                                alert.type === 'warning' ? 'text-(--warning)' :
                                                    alert.type === 'info' ? 'text-(--primary)' : 'text-(--success)'}
                                        />

                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4 className="font-medium text-sm text-(--text-primary)">
                                                    {alert.title}
                                                </h4>
                                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(alert.priority)}`} />
                                            </div>

                                            <p className="text-sm text-(--text-secondary) mb-2">
                                                {alert.message}
                                            </p>

                                            {alert.action && (
                                                <div className="flex items-center space-x-2">
                                                    <Icon name="Lightbulb" size={12} className="text-(--accent)" />
                                                    <span className="text-xs text-(--accent) font-medium">
                                                        {alert.action}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="text-xs text-(--text-secondary) mt-2">
                                                {formatTime(alert.timestamp)}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => dismissAlert(alert.id)}
                                        className="shrink-0 p-1 hover:bg-(--secondary-100) rounded"
                                    >
                                        <Icon name="X" size={14} className="text-(--text-secondary)" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Recommendations Section */}
            {campaignHealth.recommendations.length > 0 && (
                <div className="border-t border-(--border) p-4 bg-(--secondary-50)">
                    <h4 className="font-medium text-sm text-(--text-primary) mb-3 flex items-center space-x-2">
                        <Icon name="Lightbulb" size={16} className="text-(--accent)" />
                        <span>Recommended Actions</span>
                    </h4>

                    <div className="space-y-2">
                        {campaignHealth.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-start space-x-2">
                                <Icon name="ArrowRight" size={12} className="text-(--accent) mt-1" />
                                <span className="text-xs text-(--text-secondary)">
                                    {recommendation}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlertNotifications;