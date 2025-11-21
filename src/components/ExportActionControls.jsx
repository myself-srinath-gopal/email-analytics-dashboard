import React, { useState, useRef, useEffect } from 'react';
import Icon from './AppIcon';

const ExportActionControls = ({
    screenContext = 'dashboard',
    selectedCampaigns = [],
    onExport,
    onAction
}) => {
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const exportRef = useRef(null);
    const actionRef = useRef(null);

    const exportOptions = {
        dashboard: [
            { id: 'pdf-report', label: 'PDF Report', icon: 'FileText', description: 'Complete performance summary' },
            { id: 'excel-data', label: 'Excel Data', icon: 'FileSpreadsheet', description: 'Raw metrics and KPIs' },
            { id: 'csv-export', label: 'CSV Export', icon: 'Download', description: 'Campaign data for analysis' },
            { id: 'png-charts', label: 'Chart Images', icon: 'Image', description: 'Visual charts as PNG files' }
        ],
        monitoring: [
            { id: 'live-snapshot', label: 'Live Snapshot', icon: 'Camera', description: 'Current real-time state' },
            { id: 'activity-log', label: 'Activity Log', icon: 'FileText', description: 'Detailed event timeline' },
            { id: 'alerts-export', label: 'Alerts Export', icon: 'AlertTriangle', description: 'Alert history and settings' }
        ],
        subscribers: [
            { id: 'segment-data', label: 'Segment Data', icon: 'Users', description: 'Subscriber segments and metrics' },
            { id: 'engagement-report', label: 'Engagement Report', icon: 'BarChart3', description: 'Detailed engagement analytics' },
            { id: 'subscriber-list', label: 'Subscriber List', icon: 'Download', description: 'Complete subscriber database' }
        ],
        templates: [
            { id: 'template-performance', label: 'Template Performance', icon: 'FileText', description: 'A/B test results and metrics' },
            { id: 'design-assets', label: 'Design Assets', icon: 'Image', description: 'Template images and resources' },
            { id: 'code-export', label: 'HTML Code', icon: 'Code', description: 'Template HTML and CSS' }
        ]
    };

    const actionOptions = {
        dashboard: [
            { id: 'schedule-report', label: 'Schedule Report', icon: 'Calendar', description: 'Automated report delivery' },
            { id: 'create-alert', label: 'Create Alert', icon: 'Bell', description: 'Performance threshold alerts' },
            { id: 'share-dashboard', label: 'Share Dashboard', icon: 'Share2', description: 'Generate shareable link' }
        ],
        monitoring: [
            { id: 'pause-campaign', label: 'Pause Campaign', icon: 'Pause', description: 'Stop active campaigns', danger: true },
            { id: 'duplicate-campaign', label: 'Duplicate Campaign', icon: 'Copy', description: 'Create campaign copy' },
            { id: 'edit-campaign', label: 'Edit Campaign', icon: 'Edit', description: 'Modify campaign settings' }
        ],
        subscribers: [
            { id: 'create-segment', label: 'Create Segment', icon: 'Users', description: 'New subscriber segment' },
            { id: 'bulk-action', label: 'Bulk Actions', icon: 'Settings', description: 'Mass subscriber operations' },
            { id: 'import-subscribers', label: 'Import Subscribers', icon: 'Upload', description: 'Add new subscribers' }
        ],
        templates: [
            { id: 'create-template', label: 'Create Template', icon: 'Plus', description: 'New email template' },
            { id: 'run-ab-test', label: 'Run A/B Test', icon: 'GitBranch', description: 'Template performance test' },
            { id: 'clone-template', label: 'Clone Template', icon: 'Copy', description: 'Duplicate existing template' }
        ]
    };

    const currentExportOptions = exportOptions[screenContext] || exportOptions.dashboard;
    const currentActionOptions = actionOptions[screenContext] || actionOptions.dashboard;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (exportRef.current && !exportRef.current.contains(event.target)) {
                setIsExportOpen(false);
            }
            if (actionRef.current && !actionRef.current.contains(event.target)) {
                setIsActionOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleExport = async (exportType) => {
        setIsExporting(true);
        setIsExportOpen(false);

        try {
            await onExport?.(exportType, selectedCampaigns);

            // Simulate export process
            setTimeout(() => {
                setIsExporting(false);
            }, 2000);
        } catch (error) {
            console.error('Export failed:', error);
            setIsExporting(false);
        }
    };

    const handleAction = (actionType) => {
        setIsActionOpen(false);
        onAction?.(actionType, selectedCampaigns);
    };

    return (
        <div className="flex max-[490px]:flex-col min-[490px]:items-center gap-3">
            {/* Export Controls */}
            <div className="relative" ref={exportRef}>
                <button
                    onClick={() => setIsExportOpen(!isExportOpen)}
                    disabled={isExporting}
                    className={`max-[490px]:w-full flex items-center gap-2 px-4 py-2 bg-(--secondary-50) hover:bg-(--secondary-100) border border-(--border) rounded-lg nav-transition ${isExporting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    title="Export data"
                >
                    {isExporting ? (
                        <>
                            <Icon name="Loader2" size={16} className="text-(--text-secondary) animate-spin" />
                            <span className="text-sm font-medium text-(--text-secondary)">Exporting...</span>
                        </>
                    ) : (
                        <>
                            <Icon name="Download" size={16} className="text-(--text-secondary)" />
                            <span className="text-sm font-medium text-(--text-secondary)">Export</span>
                            <Icon name="ChevronDown" size={14} className="text-(--text-secondary)" />
                        </>
                    )}
                </button>

                {isExportOpen && !isExporting && (
                    <div className="max-[490px]:w-full absolute left-0 lg:right-0 top-full mt-1 w-64 bg-(--surface) border border-(--border) rounded-lg shadow-elevation-md z-1100 animate-slide-down">
                        <div className="p-2">
                            <div className="text-xs font-medium text-(--text-secondary) px-3 py-2 border-b border-(--border) mb-2">
                                Export Options
                            </div>
                            {currentExportOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleExport(option.id)}
                                    className="w-full flex items-start gap-3 p-3 hover:bg-(--secondary-50) rounded-lg nav-transition"
                                >
                                    <Icon name={option.icon} size={16} className="text-(--primary) mt-0.5" />
                                    <div className="text-left">
                                        <div className="font-medium text-sm text-(--text-primary)">
                                            {option.label}
                                        </div>
                                        <div className="text-xs text-(--text-secondary)">
                                            {option.description}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Action Controls */}
            <div className="relative" ref={actionRef}>
                <button
                    onClick={() => setIsActionOpen(!isActionOpen)}
                    className="max-[490px]:w-full flex items-center gap-2 px-4 py-2 bg-(--primary) hover:bg-(--primary-700) text-white rounded-lg nav-transition"
                    title="Campaign actions"
                >
                    <Icon name="Settings" size={16} />
                    <span className="text-sm font-medium">Actions</span>
                    <Icon name="ChevronDown" size={14} />
                </button>

                {isActionOpen && (
                    <div className="max-[490px]:w-full absolute left-0 lg:right-0 top-full mt-1 w-64 bg-(--surface) border border-(--border) rounded-lg shadow-elevation-md z-1100 animate-slide-down">
                        <div className="p-2">
                            <div className="text-xs font-medium text-(--text-secondary) px-3 py-2 border-b border-(--border) mb-2">
                                Quick Actions
                            </div>
                            {currentActionOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleAction(option.id)}
                                    className={`w-full flex items-start gap-3 p-3 hover:bg-(--secondary-50) rounded-lg nav-transition ${option.danger ? 'hover:bg-(--error-50)' : ''
                                        }`}
                                >
                                    <Icon
                                        name={option.icon}
                                        size={16}
                                        className={`mt-0.5 ${option.danger ? 'text-(--error)' : 'text-(--primary)'}`}
                                    />
                                    <div className="text-left">
                                        <div className={`font-medium text-sm ${option.danger ? 'text-(--error)' : 'text-(--text-primary)'
                                            }`}>
                                            {option.label}
                                        </div>
                                        <div className="text-xs text-(--text-secondary)">
                                            {option.description}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Campaigns Indicator */}
            {selectedCampaigns.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-(--primary-50) border border-(--primary-100) rounded-lg">
                    <Icon name="Target" size={14} className="text-(--primary)" />
                    <span className="text-xs font-medium text-(--primary)">
                        {selectedCampaigns.length} campaign{selectedCampaigns.length !== 1 ? 's' : ''} selected
                    </span>
                </div>
            )}
        </div>
    );
};

export default ExportActionControls;