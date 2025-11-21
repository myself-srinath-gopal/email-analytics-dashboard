import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TemplatePerformanceMatrix = ({ templates, onTemplateClick, sortBy }) => {
    const [hoveredTemplate, setHoveredTemplate] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'winner': return 'bg-(--success) text-white';
            case 'loser': return 'bg-(--error) text-white';
            case 'testing': return 'bg-(--warning) text-white';
            case 'control': return 'bg-(--secondary) text-white';
            default: return 'bg-(--secondary)-100 text-(--text-secondary)';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'winner': return 'Trophy';
            case 'loser': return 'X';
            case 'testing': return 'TestTube';
            case 'control': return 'Circle';
            default: return 'Circle';
        }
    };

    const formatMetricValue = (value, metric) => {
        // Handle undefined, null, or invalid values more robustly
        if (value === undefined || value === null || value === '' || typeof value === 'object') {
            return '--';
        }

        // Convert to number and handle conversion failures
        let numericValue;
        try {
            numericValue = parseFloat(value);
        } catch (error) {
            return '--';
        }

        // Check if the conversion resulted in a valid number
        if (isNaN(numericValue) || !isFinite(numericValue)) {
            return '--';
        }

        // Handle specific metric formatting
        if (metric === 'engagementScore') {
            return Math.round(numericValue).toString();
        }

        // Ensure the number is within reasonable bounds before using toFixed
        if (numericValue > 999999 || numericValue < -999999) {
            return '--';
        }

        return `${numericValue.toFixed(1)}%`;
    };

    const formatLiftValue = (liftValue) => {
        // Handle undefined, null, or invalid values for A/B test lift
        if (liftValue === undefined || liftValue === null || liftValue === '' || typeof liftValue === 'object') {
            return null;
        }

        // Convert to number and handle conversion failures
        let numericValue;
        try {
            numericValue = parseFloat(liftValue);
        } catch (error) {
            return null;
        }

        // Check if the conversion resulted in a valid number
        if (isNaN(numericValue) || !isFinite(numericValue)) {
            return null;
        }

        // Ensure the number is within reasonable bounds before using toFixed
        if (numericValue > 999999 || numericValue < -999999) {
            return null;
        }

        return `${numericValue > 0 ? '+' : ''}${numericValue.toFixed(1)}%`;
    };

    const getPerformanceColor = (value, metric) => {
        // Handle undefined/null values more robustly
        if (value === undefined || value === null || value === '' || typeof value === 'object') {
            return 'text-(--text-secondary)';
        }

        // Convert to number safely
        let numericValue;
        try {
            numericValue = parseFloat(value);
        } catch (error) {
            return 'text-(--text-secondary)';
        }

        // Check if the conversion resulted in a valid number
        if (isNaN(numericValue) || !isFinite(numericValue)) {
            return 'text-(--text-secondary)';
        }

        const thresholds = {
            openRate: { high: 30, medium: 20 },
            clickRate: { high: 5, medium: 3 },
            conversionRate: { high: 3, medium: 2 },
            engagementScore: { high: 85, medium: 70 }
        };

        const threshold = thresholds[metric] || thresholds.engagementScore;

        if (numericValue >= threshold.high) return 'text-(--success)';
        if (numericValue >= threshold.medium) return 'text-(--warning)';
        return 'text-(--error)';
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg">
            <div className="p-6 border-b border-(--border)">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-(--text-primary)">
                            Template Performance Matrix
                        </h2>
                        <p className="text-sm text-(--text-secondary) mt-1">
                            Visual overview of template performance with sortable metrics
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-(--text-secondary)">
                        <Icon name="Grid3X3" size={16} />
                        <span>{templates.length} templates</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {templates.length === 0 ? (
                    <div className="text-center py-12">
                        <Icon name="FileText" size={48} className="text-(--secondary) mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-(--text-primary) mb-2">
                            No Templates Found
                        </h3>
                        <p className="text-(--text-secondary)">
                            No templates match your current filter criteria
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => {
                            const formattedLift = formatLiftValue(template.abTestLift);

                            return (
                                <div
                                    key={template.id}
                                    className="group relative bg-(--secondary-50) rounded-lg overflow-hidden hover:shadow-md transition duration-200 cursor-pointer"
                                    onMouseEnter={() => setHoveredTemplate(template.id)}
                                    onMouseLeave={() => setHoveredTemplate(null)}
                                    onClick={() => onTemplateClick(template)}
                                >
                                    {/* Template Thumbnail */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={template.thumbnail}
                                            alt={template.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />

                                        {/* A/B Test Status Badge */}
                                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(template.abTestStatus)}`}>
                                            <Icon name={getStatusIcon(template.abTestStatus)} size={12} />
                                            <span className="capitalize">{template.abTestStatus}</span>
                                        </div>

                                        {/* A/B Test Lift Badge */}
                                        {formattedLift && (
                                            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${template.abTestLift > 0 ? 'bg-(--success) text-white' : 'bg-(--error) text-white'
                                                }`}>
                                                {formattedLift}
                                            </div>
                                        )}

                                        {/* Hover Overlay */}
                                        {hoveredTemplate === template.id && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center animate-fade-in">
                                                <div className="text-center text-white">
                                                    <Icon name="Eye" size={24} className="mx-auto mb-2" />
                                                    <span className="text-sm font-medium">View Details</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Template Info */}
                                    <div className="p-4">
                                        <div className="mb-3">
                                            <h3 className="font-medium text-(--text-primary) mb-1 line-clamp-1">
                                                {template.name}
                                            </h3>
                                            <div className="flex items-center justify-between text-xs text-(--text-secondary)">
                                                <span className="capitalize">{template.category}</span>
                                                <span>{template.usageCount || 0} uses</span>
                                            </div>
                                        </div>

                                        {/* Performance Metrics */}
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <div className="text-center">
                                                <div className={`text-lg font-bold ${getPerformanceColor(template.openRate, 'openRate')}`}>
                                                    {formatMetricValue(template.openRate, 'openRate')}
                                                </div>
                                                <div className="text-xs text-(--text-secondary)">Open Rate</div>
                                            </div>
                                            <div className="text-center">
                                                <div className={`text-lg font-bold ${getPerformanceColor(template.clickRate, 'clickRate')}`}>
                                                    {formatMetricValue(template.clickRate, 'clickRate')}
                                                </div>
                                                <div className="text-xs text-(--text-secondary)">Click Rate</div>
                                            </div>
                                            <div className="text-center">
                                                <div className={`text-lg font-bold ${getPerformanceColor(template.conversionRate, 'conversionRate')}`}>
                                                    {formatMetricValue(template.conversionRate, 'conversionRate')}
                                                </div>
                                                <div className="text-xs text-(--text-secondary)">Conversion</div>
                                            </div>
                                            <div className="text-center">
                                                <div className={`text-lg font-bold ${getPerformanceColor(template.engagementScore, 'engagementScore')}`}>
                                                    {formatMetricValue(template.engagementScore, 'engagementScore')}
                                                </div>
                                                <div className="text-xs text-(--text-secondary)">Engagement</div>
                                            </div>
                                        </div>

                                        {/* Performance Indicators */}
                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1">
                                                    <Icon name="Smartphone" size={12} className="text-(--text-secondary)" />
                                                    <span className="text-(--text-secondary)">{template.deviceCompatibility || 0}%</span>
                                                </div>
                                                <div className={`px-2 py-1 rounded-full text-xs ${template.subjectLinePerformance === 'high' ? 'bg-(--success-50) text-(--success)' :
                                                    template.subjectLinePerformance === 'medium' ? 'bg-(--warning-50) text-(--warning)' : 'bg-(--error-50) text-(--error)'
                                                    }`}>
                                                    Subject: {template.subjectLinePerformance || 'unknown'}
                                                </div>
                                            </div>

                                            <div className="text-(--text-secondary)">
                                                {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : '--'}
                                            </div>
                                        </div>

                                        {/* Sort Indicator */}
                                        {sortBy && (
                                            <div className="mt-2 pt-2 border-t border-(--border)">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-(--text-secondary)">
                                                        Sorted by: {sortBy.replace('_', ' ')}
                                                    </span>
                                                    <div className="flex items-center space-x-1">
                                                        <Icon name="ArrowUp" size={12} className="text-(--primary)" />
                                                        <span className="text-(--primary) font-medium">
                                                            {formatMetricValue(template[sortBy], sortBy)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplatePerformanceMatrix;