import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetricsCards = ({ templates }) => {
    const calculateAverageMetrics = () => {
        if (templates.length === 0) return { openRate: 0, clickRate: 0, conversionRate: 0, engagementScore: 0 };

        const totals = templates.reduce((acc, template) => ({
            openRate: acc.openRate + template.openRate,
            clickRate: acc.clickRate + template.clickRate,
            conversionRate: acc.conversionRate + template.conversionRate,
            engagementScore: acc.engagementScore + template.engagementScore
        }), { openRate: 0, clickRate: 0, conversionRate: 0, engagementScore: 0 });

        return {
            openRate: totals.openRate / templates.length,
            clickRate: totals.clickRate / templates.length,
            conversionRate: totals.conversionRate / templates.length,
            engagementScore: totals.engagementScore / templates.length
        };
    };

    const metrics = calculateAverageMetrics();

    const benchmarks = {
        openRate: 25.0,
        clickRate: 3.5,
        conversionRate: 2.0,
        engagementScore: 75
    };

    const cards = [
        {
            title: 'Average Open Rate',
            value: metrics.openRate,
            benchmark: benchmarks.openRate,
            format: 'percentage',
            icon: 'Mail',
            color: 'primary',
            description: 'Email open performance across all templates'
        },
        {
            title: 'Average Click Rate',
            value: metrics.clickRate,
            benchmark: benchmarks.clickRate,
            format: 'percentage',
            icon: 'MousePointer',
            color: 'success',
            description: 'Click-through performance across all templates'
        },
        {
            title: 'Average Conversion Rate',
            value: metrics.conversionRate,
            benchmark: benchmarks.conversionRate,
            format: 'percentage',
            icon: 'Target',
            color: 'accent',
            description: 'Conversion performance across all templates'
        },
        {
            title: 'Average Engagement Score',
            value: metrics.engagementScore,
            benchmark: benchmarks.engagementScore,
            format: 'number',
            icon: 'TrendingUp',
            color: 'secondary',
            description: 'Overall engagement score across all templates'
        }
    ];

    const formatValue = (value, format) => {
        if (format === 'percentage') {
            return `${value.toFixed(1)}%`;
        }
        return Math.round(value);
    };

    const getPerformanceIndicator = (value, benchmark) => {
        const difference = value - benchmark;
        const percentage = (difference / benchmark) * 100;

        if (percentage > 5) {
            return { icon: 'TrendingUp', color: 'text-(--success)', text: `+${percentage.toFixed(1)}%` };
        } else if (percentage < -5) {
            return { icon: 'TrendingDown', color: 'text-(--error)', text: `${percentage.toFixed(1)}%` };
        } else {
            return { icon: 'Minus', color: 'text-(--warning)', text: `${percentage.toFixed(1)}%` };
        }
    };

    const getColorClasses = (color) => {
        const colorMap = {
            primary: 'bg-(--primary-50) text-(--primary)',
            success: 'bg-(--success-50) text-(--success)',
            accent: 'bg-(--accent-50) text-(--accent)',
            secondary: 'bg-(--secondary-100) text-(--secondary-600)'
        };
        return colorMap[color] || colorMap.primary;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {cards.map((card, index) => {
                const indicator = getPerformanceIndicator(card.value, card.benchmark);

                return (
                    <div key={index} className="bg-(--surface) border border-(--border) rounded-lg p-6 hover:shadow-elevation-md nav-transition">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(card.color)}`}>
                                <Icon name={card.icon} size={24} />
                            </div>
                            <div className={`flex items-center space-x-1 ${indicator.color}`}>
                                <Icon name={indicator.icon} size={16} />
                                <span className="text-sm font-medium">{indicator.text}</span>
                            </div>
                        </div>

                        <div className="mb-2">
                            <h3 className="text-sm font-medium text-(--text-secondary) mb-1">
                                {card.title}
                            </h3>
                            <div className="text-2xl font-bold text-(--text-primary)">
                                {formatValue(card.value, card.format)}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <span className="text-(--text-secondary)">
                                Benchmark: {formatValue(card.benchmark, card.format)}
                            </span>
                            <div className="flex items-center space-x-1">
                                <Icon name="Info" size={12} className="text-(--text-secondary)" />
                                <span className="text-(--text-secondary)" title={card.description}>
                                    Info
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3">
                            <div className="w-full bg-(--secondary-100) rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-500 ${card.value >= card.benchmark ? 'bg-(--success)' : 'bg-(--warning)'
                                        }`}
                                    style={{
                                        width: `${Math.min((card.value / (card.benchmark * 1.5)) * 100, 100)}%`
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PerformanceMetricsCards;