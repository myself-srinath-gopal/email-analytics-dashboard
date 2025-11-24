import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TemplatePreviewModal = ({ template, onClose }) => {
    const [activeTab, setActiveTab] = useState('preview');

    const tabs = [
        { id: 'preview', label: 'Preview', icon: 'Eye' },
        { id: 'metrics', label: 'Metrics', icon: 'BarChart3' },
        { id: 'abtest', label: 'A/B Test', icon: 'GitBranch' },
        { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'winner': return 'bg-(--success) text-white';
            case 'loser': return 'bg-(--error) text-white';
            case 'testing': return 'bg-(--warning) text-white';
            case 'control': return 'bg-(--secondary) text-white';
            default: return 'bg-(--secondary-100) text-(--text-secondary)';
        }
    };

    const getPerformanceColor = (value, metric) => {
        const thresholds = {
            openRate: { high: 30, medium: 20 },
            clickRate: { high: 5, medium: 3 },
            conversionRate: { high: 3, medium: 2 },
            engagementScore: { high: 85, medium: 70 }
        };

        const threshold = thresholds[metric] || thresholds.engagementScore;

        if (value >= threshold.high) return 'text-success';
        if (value >= threshold.medium) return 'text-warning';
        return 'text-error';
    };

    const mockEmailContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <header style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">${template.name}</h1>
        </header>
        <main style="padding: 30px;">
            <p style="font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 20px;">
                This is a preview of the ${template.name} email template. The actual content would be customized based on your campaign requirements.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Call to Action
                </a>
            </div>
            <p style="font-size: 14px; color: #64748b; text-align: center;">
                Thank you for your interest in our ${template.category} campaigns.
            </p>
        </main>
        <footer style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>`;

    return (
        <div className="fixed inset-0 z-1200 overflow-scroll">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 transition-opacity bg-black/50"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose
                    }}
                >

                    {/* Modal */}
                    <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-(--surface) shadow-elevation-lg rounded-lg">
                        {/* Header */}
                        <div className="flex max-[550px]:flex-col max-[550px]:items-start max-[550px]:space-y-4 items-center justify-between p-6 border-b border-(--border)">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden">
                                    <Image
                                        src={template.thumbnail}
                                        alt={template.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-(--text-primary)">
                                        {template.name}
                                    </h2>
                                    <div className="flex items-center space-x-3 mt-1">
                                        <span className="text-sm text-(--text-secondary) capitalize">
                                            {template.category}
                                        </span>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.abTestStatus)}`}>
                                            {template.abTestStatus}
                                        </span>
                                        {template.abTestLift && (
                                            <span className={`text-xs font-medium ${template.abTestLift > 0 ? 'text-(--success)' : 'text-(--error)'
                                                }`}>
                                                {template.abTestLift > 0 ? '+' : ''}{template.abTestLift.toFixed(1)}% lift
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    className="p-2 hover:bg-(--secondary-100) rounded-lg nav-transition"
                                    title="Edit template"
                                >
                                    <Icon name="Edit" size={20} className="text-(--text-secondary)" />
                                </button>
                                <button
                                    className="p-2 hover:bg-(--secondary-100) rounded-lg nav-transition"
                                    title="Clone template"
                                >
                                    <Icon name="Copy" size={20} className="text-(--text-secondary)" />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-(--secondary-100) rounded-lg nav-transition"
                                    title="Close modal"
                                >
                                    <Icon name="X" size={20} className="text-(--text-secondary)" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-(--border)">
                            <nav className="flex max-[550px]:flex-col space-x-8 px-6">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 py-4 min-[550px]:border-b-2 font-medium text-sm nav-transition ${activeTab === tab.id
                                            ? 'min-[550px]:border-(--primary) text-(--primary)' : 'border-transparent text-(--text-secondary) hover:text-(--text-primary)'
                                            }`}
                                    >
                                        <Icon name={tab.icon} size={16} />
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {activeTab === 'preview' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Template Preview */}
                                    <div>
                                        <h3 className="text-lg font-medium text-(--text-primary) mb-4">
                                            Email Preview
                                        </h3>
                                        <div className="border border-(--border) rounded-lg overflow-hidden">
                                            <div className="bg-(--secondary-50) p-3 border-b border-(--border)">
                                                <div className="flex items-center space-x-2 text-sm text-(--text-secondary)">
                                                    <Icon name="Monitor" size={16} />
                                                    <span>Desktop View</span>
                                                </div>
                                            </div>
                                            <div className="h-96 overflow-y-auto">
                                                <iframe
                                                    srcDoc={mockEmailContent}
                                                    className="w-full h-full border-0"
                                                    title="Email preview"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template Info */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium text-(--text-primary) mb-4">
                                                Template Information
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Category:</span>
                                                    <span className="font-medium text-(--text-primary) capitalize">{template.category}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Usage Count:</span>
                                                    <span className="font-medium text-(--text-primary)">{template.usageCount} times</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Last Used:</span>
                                                    <span className="font-medium text-(--text-primary)">
                                                        {new Date(template.lastUsed).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Device Compatibility:</span>
                                                    <span className="font-medium text-(--text-primary)">{template.deviceCompatibility}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-(--text-primary) mb-4">
                                                Quick Metrics
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center p-3 bg-(--secondary-50) rounded-lg">
                                                    <div className={`text-xl font-bold ${getPerformanceColor(template.openRate, 'openRate')}`}>
                                                        {template.openRate.toFixed(1)}%
                                                    </div>
                                                    <div className="text-xs text-(--text-secondary)">Open Rate</div>
                                                </div>
                                                <div className="text-center p-3 bg-(--secondary-50) rounded-lg">
                                                    <div className={`text-xl font-bold ${getPerformanceColor(template.clickRate, 'clickRate')}`}>
                                                        {template.clickRate.toFixed(1)}%
                                                    </div>
                                                    <div className="text-xs text-(--text-secondary)">Click Rate</div>
                                                </div>
                                                <div className="text-center p-3 bg-(--secondary-50) rounded-lg">
                                                    <div className={`text-xl font-bold ${getPerformanceColor(template.conversionRate, 'conversionRate')}`}>
                                                        {template.conversionRate.toFixed(1)}%
                                                    </div>
                                                    <div className="text-xs text-(--text-secondary)">Conversion</div>
                                                </div>
                                                <div className="text-center p-3 bg-(--secondary-50) rounded-lg">
                                                    <div className={`text-xl font-bold ${getPerformanceColor(template.engagementScore, 'engagementScore')}`}>
                                                        {Math.round(template.engagementScore)}
                                                    </div>
                                                    <div className="text-xs text-(--text-secondary)">Engagement</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'metrics' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-(--text-primary)">
                                        Detailed Performance Metrics
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Open Rate', value: template.openRate, format: 'percentage', metric: 'openRate' },
                                            { label: 'Click Rate', value: template.clickRate, format: 'percentage', metric: 'clickRate' },
                                            { label: 'Conversion Rate', value: template.conversionRate, format: 'percentage', metric: 'conversionRate' },
                                            { label: 'Engagement Score', value: template.engagementScore, format: 'number', metric: 'engagementScore' }
                                        ].map((metric, index) => (
                                            <div key={index} className="bg-(--secondary-50) p-4 rounded-lg">
                                                <div className="text-sm text-(--text-secondary) mb-2">{metric.label}</div>
                                                <div className={`text-2xl font-bold ${getPerformanceColor(metric.value, metric.metric)}`}>
                                                    {metric.format === 'percentage' ? `${metric.value.toFixed(1)}%` : Math.round(metric.value)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-(--secondary-50) p-4 rounded-lg">
                                            <h4 className="font-medium text-(--text-primary) mb-3">Performance Breakdown</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Subject Line Performance:</span>
                                                    <span className={`font-medium capitalize ${template.subjectLinePerformance === 'high' ? 'text-(--success)' :
                                                        template.subjectLinePerformance === 'medium' ? 'text-(--warning)' : 'text-(--error)'
                                                        }`}>
                                                        {template.subjectLinePerformance}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Send Time Optimization:</span>
                                                    <span className={`font-medium capitalize ${template.sendTimeOptimization === 'optimal' ? 'text-(--success)' :
                                                        template.sendTimeOptimization === 'good' ? 'text-(--warning)' : 'text-(--error)'
                                                        }`}>
                                                        {template.sendTimeOptimization.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Device Compatibility:</span>
                                                    <span className="font-medium text-(--text-primary)">{template.deviceCompatibility}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-secondary-50 p-4 rounded-lg">
                                            <h4 className="font-medium text-(--text-primary) mb-3">Usage Statistics</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Total Uses:</span>
                                                    <span className="font-medium text-(--text-primary)">{template.usageCount}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Last Used:</span>
                                                    <span className="font-medium text-(--text-primary)">
                                                        {new Date(template.lastUsed).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-(--text-secondary)">Category:</span>
                                                    <span className="font-medium text-(--text-primary) capitalize">{template.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'abtest' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-(--text-primary)">
                                        A/B Test Information
                                    </h3>

                                    <div className="bg-(--secondary-50) p-6 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(template.abTestStatus)}`}>
                                                    {template.abTestStatus}
                                                </span>
                                                {template.abTestLift && (
                                                    <span className={`text-lg font-bold ${template.abTestLift > 0 ? 'text-(--success)' : 'text-(--error)'
                                                        }`}>
                                                        {template.abTestLift > 0 ? '+' : ''}{template.abTestLift.toFixed(1)}% lift
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {template.abTestStatus === 'testing' && (
                                            <div className="space-y-4">
                                                <p className="text-(--text-secondary)">
                                                    This template is currently being A/B tested. Results will be available once the test reaches statistical significance.
                                                </p>
                                                <div className="flex space-x-4">
                                                    <button className="px-4 py-2 bg-(--primary) hover:bg-(--primary-700) text-white rounded-lg nav-transition">
                                                        View Test Details
                                                    </button>
                                                    <button className="px-4 py-2 bg-(--secondary-100) hover:bg-(--secondary-200) text-(--text-primary) rounded-lg nav-transition">
                                                        Stop Test
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {template.abTestStatus === 'winner' && (
                                            <div className="space-y-4">
                                                <p className="text-(--text-secondary)">
                                                    This template won its A/B test with a {template.abTestLift.toFixed(1)}% improvement over the control variant.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="text-center p-3 bg-(--success-50) rounded-lg">
                                                        <div className="text-lg font-bold text-(--success)">Winner</div>
                                                        <div className="text-xs text-(--text-secondary)">Test Result</div>
                                                    </div>
                                                    <div className="text-center p-3 bg-(--primary-50) rounded-lg">
                                                        <div className="text-lg font-bold text-(--primary)">+{template.abTestLift.toFixed(1)}%</div>
                                                        <div className="text-xs text-(--text-secondary)">Performance Lift</div>
                                                    </div>
                                                    <div className="text-center p-3 bg-(--secondary-100) rounded-lg">
                                                        <div className="text-lg font-bold text-(--text-primary)">{template.usageCount}</div>
                                                        <div className="text-xs text-(--text-secondary)">Sample Size</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {template.abTestStatus === 'loser' && (
                                            <div className="space-y-4">
                                                <p className="text-(--text-secondary)">
                                                    This template performed {Math.abs(template.abTestLift).toFixed(1)}% worse than the control variant in A/B testing.
                                                </p>
                                                <div className="flex space-x-4">
                                                    <button className="px-4 py-2 bg-(--primary) hover:bg-(--primary-700) text-white rounded-lg nav-transition">
                                                        Start New Test
                                                    </button>
                                                    <button className="px-4 py-2 bg-(--secondary-100) hover:bg-(--secondary-200) text-(--text-primary) rounded-lg nav-transition">
                                                        View Recommendations
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {template.abTestStatus === 'control' && (
                                            <div className="space-y-4">
                                                <p className="text-(--text-secondary)">
                                                    This template is currently being used as a control in A/B testing.
                                                </p>
                                                <button className="px-4 py-2 bg-(--primary) hover:bg-(--primary-700) text-white rounded-lg nav-transition">
                                                    Create Test Variant
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'recommendations' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-(--text-primary)">
                                        Optimization Recommendations
                                    </h3>

                                    {template.recommendations.length > 0 ? (
                                        <div className="space-y-4">
                                            {template.recommendations.map((recommendation, index) => (
                                                <div key={index} className="flex items-start space-x-3 p-4 bg-(--secondary-50) rounded-lg">
                                                    <div className="w-6 h-6 bg-(--primary) text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-(--text-primary)">{recommendation}</p>
                                                    </div>
                                                    <button className="px-3 py-1 bg-(--primary) hover:bg-(--primary-700) text-white rounded text-xs nav-transition">
                                                        Apply
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Icon name="CheckCircle" size={48} className="text-(--success) mx-auto mb-4" />
                                            <h4 className="text-lg font-medium text-(--text-primary) mb-2">
                                                No Recommendations
                                            </h4>
                                            <p className="text-(--text-secondary)">
                                                This template is performing well and doesn't require immediate optimization.
                                            </p>
                                        </div>
                                    )}

                                    <div className="border-t border-(--border) pt-6">
                                        <h4 className="font-medium text-(--text-primary) mb-4">
                                            Suggested Actions
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <button className="flex items-center space-x-2 px-4 py-3 bg-(--primary) hover:bg-(--primary-700) text-white rounded-lg nav-transition">
                                                <Icon name="GitBranch" size={16} />
                                                <span>Start A/B Test</span>
                                            </button>
                                            <button className="flex items-center space-x-2 px-4 py-3 bg-(--secondary-100) hover:bg-(--secondary-200) text-(--text-primary) rounded-lg nav-transition">
                                                <Icon name="Copy" size={16} />
                                                <span>Clone & Modify</span>
                                            </button>
                                            <button className="flex items-center space-x-2 px-4 py-3 bg-(--secondary-100) hover:bg-(--secondary-200) text-(--text-primary) rounded-lg nav-transition">
                                                <Icon name="BarChart3" size={16} />
                                                <span>View Analytics</span>
                                            </button>
                                            <button className="flex items-center space-x-2 px-4 py-3 bg-(--secondary-100) hover:bg-(--secondary-200) text-(--text-primary) rounded-lg nav-transition">
                                                <Icon name="Download" size={16} />
                                                <span>Export Template</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplatePreviewModal;