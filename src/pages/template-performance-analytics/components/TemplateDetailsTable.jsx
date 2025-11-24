import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TemplateDetailsTable = ({ templates }) => {
    const [expandedRows, setExpandedRows] = useState(new Set());

    const toggleRowExpansion = (templateId) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(templateId)) {
            newExpanded.delete(templateId);
        } else {
            newExpanded.add(templateId);
        }
        setExpandedRows(newExpanded);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'winner': return 'bg-(--success-50) text-(--success)';
            case 'loser': return 'bg-(--error-50) text-(--error)';
            case 'testing': return 'bg-(--warning-50) text-(--warning)';
            case 'control': return 'bg-(--secondary-100) text-(--secondary-600)';
            default: return 'bg-(--secondary-100) text-(--secondary-600)';
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

        if (value >= threshold.high) return 'text-(--success)';
        if (value >= threshold.medium) return 'text-(--warning)';
        return 'text-(--error)';
    };

    const getOptimizationPriority = (recommendations) => {
        if (recommendations.length >= 3) return { label: 'High', color: 'text-(--error)' };
        if (recommendations.length >= 2) return { label: 'Medium', color: 'text-(--warning)' };
        if (recommendations.length >= 1) return { label: 'Low', color: 'text-(--success)' };
        return { label: 'None', color: 'text-(--secondary)' };
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg">
            <div className="p-6 border-b border-(--border)">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-(--text-primary)">
                            Detailed Performance Table
                        </h2>
                        <p className="text-sm text-(--text-secondary) mt-1">
                            Comprehensive template metrics with optimization recommendations
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-(--text-secondary)">
                        <Icon name="Table" size={16} />
                        <span>{templates.length} templates</span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-(--secondary-50) border-b border-(--border)">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                                Template
                            </th>
                            <th className="text-center px-6 py-3 text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                                Open Rate
                            </th>
                            <th className="text-center px-6 py-3 text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                                Click Rate
                            </th>
                            <th className="text-center px-6 py-3 text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                                Conversion
                            </th>
                            <th className="text-center px-6 py-3 text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                                Engagement
                            </th>
                            <th className="text-center px-6 py-3 text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                                A/B Status
                            </th>
                            <th className="text-center px-6 py-3 text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                                Usage
                            </th>
                            <th className="text-center px-6 py-3 text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                                Priority
                            </th>
                            <th className="text-center px-6 py-3 text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {templates.map((template) => {
                            const isExpanded = expandedRows.has(template.id);
                            const priority = getOptimizationPriority(template.recommendations);

                            return (
                                <React.Fragment key={template.id}>
                                    <tr className="hover:bg-(--secondary-50) nav-transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => toggleRowExpansion(template.id)}
                                                    className="p-1 hover:bg-(--secondary-100) rounded nav-transition"
                                                >
                                                    <Icon
                                                        name={isExpanded ? "ChevronDown" : "ChevronRight"}
                                                        size={16}
                                                        className="text-(--text-secondary)"
                                                    />
                                                </button>
                                                <div>
                                                    <div className="font-medium text-(--text-primary)">
                                                        {template.name}
                                                    </div>
                                                    <div className="text-sm text-(--text-secondary)">
                                                        {template.category} • Last used {new Date(template.lastUsed).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`font-medium ${getPerformanceColor(template.openRate, 'openRate')}`}>
                                                {template.openRate.toFixed(1)}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`font-medium ${getPerformanceColor(template.clickRate, 'clickRate')}`}>
                                                {template.clickRate.toFixed(1)}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`font-medium ${getPerformanceColor(template.conversionRate, 'conversionRate')}`}>
                                                {template.conversionRate.toFixed(1)}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`font-medium ${getPerformanceColor(template.engagementScore, 'engagementScore')}`}>
                                                {Math.round(template.engagementScore)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.abTestStatus)}`}>
                                                {template.abTestStatus}
                                                {template.abTestLift && (
                                                    <span className="ml-1">
                                                        ({template.abTestLift > 0 ? '+' : ''}{template.abTestLift.toFixed(1)}%)
                                                    </span>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-medium text-(--text-primary)">
                                                {template.usageCount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`font-medium ${priority.color}`}>
                                                {priority.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    className="p-2 hover:bg-(--secondary-100) rounded-lg nav-transition"
                                                    title="View template"
                                                >
                                                    <Icon name="Eye" size={16} className="text-(--text-secondary)" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-(--secondary-100) rounded-lg nav-transition"
                                                    title="Edit template"
                                                >
                                                    <Icon name="Edit" size={16} className="text-(--text-secondary)" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-(--secondary-100) rounded-lg nav-transition"
                                                    title="Clone template"
                                                >
                                                    <Icon name="Copy" size={16} className="text-(--text-secondary)" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Expanded Row */}
                                    {isExpanded && (
                                        <tr className="bg-(secondary-50)">
                                            <td colSpan="9" className="px-6 py-4">
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                    {/* Performance Details */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-(--text-primary) mb-3">
                                                            Performance Details
                                                        </h4>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-(--text-secondary)">Device Compatibility:</span>
                                                                <span className="font-medium text-(--text-primary)">{template.deviceCompatibility}%</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-(--text-secondary)">Subject Line Performance:</span>
                                                                <span className={`font-medium capitalize ${template.subjectLinePerformance === 'high' ? 'text-(--success)' :
                                                                    template.subjectLinePerformance === 'medium' ? 'text-(--warning)' : 'text-(--error)'
                                                                    }`}>
                                                                    {template.subjectLinePerformance}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-text-secondary">Send Time Optimization:</span>
                                                                <span className={`font-medium capitalize ${template.sendTimeOptimization === 'optimal' ? 'text-(--success)' :
                                                                    template.sendTimeOptimization === 'good' ? 'text-(--warning)' : 'text-(--error)'
                                                                    }`}>
                                                                    {template.sendTimeOptimization.replace('_', ' ')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Optimization Recommendations */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-(--text-primary) mb-3">
                                                            Optimization Recommendations
                                                        </h4>
                                                        {template.recommendations.length > 0 ? (
                                                            <ul className="space-y-2">
                                                                {template.recommendations.map((recommendation, index) => (
                                                                    <li key={index} className="flex items-start space-x-2 text-sm">
                                                                        <Icon name="ArrowRight" size={14} className="text-(--primary) mt-0.5 shrink-0" />
                                                                        <span className="text-(--text-secondary)">{recommendation}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-sm text-(--text-secondary)">
                                                                No optimization recommendations at this time.
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Quick Actions */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-(--text-primary) mb-3">
                                                            Quick Actions
                                                        </h4>
                                                        <div className="space-y-2">
                                                            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-(--primary) hover:bg-(--primary-700) text-white rounded-lg nav-transition text-sm">
                                                                <Icon name="GitBranch" size={14} />
                                                                <span>Start A/B Test</span>
                                                            </button>
                                                            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-(--secondary-100) hover:bg-(--secondary-200) text-(--text-primary) rounded-lg nav-transition text-sm">
                                                                <Icon name="Copy" size={14} />
                                                                <span>Clone Template</span>
                                                            </button>
                                                            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-(--secondary-100) hover:bg-(--secondary-200) text-(--text-primary) rounded-lg nav-transition text-sm">
                                                                <Icon name="Download" size={14} />
                                                                <span>Export Performance</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {templates.length === 0 && (
                <div className="text-center py-12">
                    <Icon name="FileText" size={48} className="text-(--secondary) mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-(--text-primary) mb-2">
                        No Templates Found
                    </h3>
                    <p className="text-(--text-secondary)">
                        No templates match your current filter criteria
                    </p>
                </div>
            )}
        </div>
    );
};

export default TemplateDetailsTable;