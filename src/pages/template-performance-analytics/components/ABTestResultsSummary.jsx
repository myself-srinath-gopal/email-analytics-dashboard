import React from 'react';
import Icon from '../../../components/AppIcon';

const ABTestResultsSummary = ({ templates }) => {
    const abTestStats = {
        total: templates.length,
        testing: templates.filter(t => t.abTestStatus === 'testing').length,
        winners: templates.filter(t => t.abTestStatus === 'winner').length,
        losers: templates.filter(t => t.abTestStatus === 'loser').length,
        control: templates.filter(t => t.abTestStatus === 'control').length
    };

    const winningTemplates = templates
        .filter(t => t.abTestStatus === 'winner' && t.abTestLift)
        .sort((a, b) => b.abTestLift - a.abTestLift)
        .slice(0, 5);

    const currentTests = templates
        .filter(t => t.abTestStatus === 'testing')
        .slice(0, 3);

    const averageLift = winningTemplates.length > 0
        ? winningTemplates.reduce((sum, t) => sum + t.abTestLift, 0) / winningTemplates.length
        : 0;

    const getStatusColor = (status) => {
        switch (status) {
            case 'winner': return 'text-(--success)';
            case 'loser': return 'text-(--error)';
            case 'testing': return 'text-(--warning)';
            case 'control': return 'text-(--secondary)';
            default: return 'text-(--secondary)';
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case 'winner': return 'bg-(--success-50)';
            case 'loser': return 'bg-(--error-50)';
            case 'testing': return 'bg-(--warning-50)';
            case 'control': return 'bg-(--secondary-50)';
            default: return 'bg-(--secondary-50)';
        }
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg">
            <div className="p-6 border-b border-(--border)">
                <div className="flex items-center space-x-2">
                    <Icon name="GitBranch" size={20} className="text-(--primary)" />
                    <h2 className="text-lg font-semibold text-(--text-primary)">
                        A/B Test Results Summary
                    </h2>
                </div>
                <p className="text-sm text-(--text-secondary) mt-1">
                    Performance insights from template testing
                </p>
            </div>

            <div className="p-6 space-y-6">
                {/* Test Statistics */}
                <div>
                    <h3 className="text-sm font-medium text-(--text-primary) mb-3">
                        Test Overview
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-(--secondary-50) rounded-lg">
                            <div className="text-2xl font-bold text-(--text-primary)">
                                {abTestStats.testing}
                            </div>
                            <div className="text-xs text-(--text-secondary)">Currently Testing</div>
                        </div>
                        <div className="text-center p-3 bg-(--success-50) rounded-lg">
                            <div className="text-2xl font-bold text-(--success)">
                                {abTestStats.winners}
                            </div>
                            <div className="text-xs text-(--text-secondary)">Winners</div>
                        </div>
                    </div>

                    <div className="mt-3 p-3 bg-(--primary-50) rounded-lg text-center">
                        <div className="text-lg font-bold text-(--primary)">
                            +{averageLift.toFixed(1)}%
                        </div>
                        <div className="text-xs text-(--text-secondary)">Average Lift</div>
                    </div>
                </div>

                {/* Test Status Distribution */}
                <div>
                    <h3 className="text-sm font-medium text-(--text-primary) mb-3">
                        Status Distribution
                    </h3>
                    <div className="space-y-2">
                        {[
                            { status: 'testing', label: 'Currently Testing', count: abTestStats.testing },
                            { status: 'winner', label: 'A/B Winners', count: abTestStats.winners },
                            { status: 'loser', label: 'A/B Losers', count: abTestStats.losers },
                            { status: 'control', label: 'Control Templates', count: abTestStats.control }
                        ].map((item) => {
                            const percentage = abTestStats.total > 0 ? (item.count / abTestStats.total) * 100 : 0;

                            return (
                                <div key={item.status} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-3 h-3 rounded-full ${getStatusBg(item.status)} ${getStatusColor(item.status)}`} />
                                        <span className="text-sm text-(--text-primary)">{item.label}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-(--text-primary)">{item.count}</span>
                                        <span className="text-xs text-(--text-secondary)">({percentage.toFixed(0)}%)</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Top Performing Winners */}
                {winningTemplates.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-(--text-primary) mb-3">
                            Top Performing Winners
                        </h3>
                        <div className="space-y-3">
                            {winningTemplates.map((template, index) => (
                                <div key={template.id} className="flex max-[420px]:flex-col max-[420px]:items-start max-[420px]:space-y-2 items-center justify-between p-3 bg-(--success-50) rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-(--success) text-white rounded-full flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-(--text-primary) line-clamp-1">
                                                {template.name}
                                            </div>
                                            <div className="text-xs text-(--text-secondary)">
                                                {template.category} • {template.usageCount} uses
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-[420px]:text-left max-[420px]:space-y-1 text-right">
                                        <div className="text-sm font-bold text-(--success)">
                                            +{template.abTestLift.toFixed(1)}%
                                        </div>
                                        <div className="text-xs text-(--text-secondary)">Lift</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Current Tests */}
                {currentTests.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-(--text-primary) mb-3">
                            Currently Testing
                        </h3>
                        <div className="space-y-3">
                            {currentTests.map((template) => (
                                <div key={template.id} className="flex max-[420px]:flex-col max-[420px]:items-start max-[420px]:space-y-2 items-center justify-between p-3 bg-(--warning-50) rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-(--warning) text-white rounded-full flex items-center justify-center">
                                            <Icon name="TestTube" size={14} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-(--text-primary) line-clamp-1">
                                                {template.name}
                                            </div>
                                            <div className="text-xs text-(--text-secondary)">
                                                {template.category} • Running test
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-[420px]:text-left max-[420px]:space-y-1 text-right">
                                        <div className="text-sm font-medium text-(--warning)">
                                            In Progress
                                        </div>
                                        <div className="text-xs text-(--text-secondary)">
                                            {template.usageCount} samples
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="pt-4 border-t border-(--border)">
                    <div className="grid grid-cols-1 gap-2">
                        <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-(--primary) hover:bg-(--primary-700) text-white rounded-lg nav-transition">
                            <Icon name="Plus" size={16} />
                            <span className="text-sm font-medium">Start New A/B Test</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-(--secondary-50) hover:bg-(--secondary-100) text-(--text-primary) rounded-lg nav-transition">
                            <Icon name="BarChart3" size={16} />
                            <span className="text-sm font-medium">View Detailed Results</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ABTestResultsSummary;