import React, { useState } from 'react';
import Header from '../../components/Header';
import CampaignContextSelector from '../../components/CampaignContextSelector';
import ExportActionControls from '../../components/ExportActionControls';
import Icon from '../../components/AppIcon';

import TemplatePerformanceMatrix from './components/TemplatePerformanceMatrix';
import ABTestResultsSummary from './components/ABTestResultsSummary';
import PerformanceMetricsCards from './components/PerformanceMetricsCards';
import TemplateDetailsTable from './components/TemplateDetailsTable';
import TemplatePreviewModal from './components/TemplatePreviewModal';

const TemplatePerformanceAnalytics = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('30d');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [abTestFilter, setAbTestFilter] = useState('all');
    const [sortBy, setSortBy] = useState('open_rate');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedCampaigns, setSelectedCampaigns] = useState(['campaign-1']);

    // Mock template data
    const templates = [
        {
            id: 'template-1',
            name: 'Holiday Sale Newsletter',
            category: 'promotional',
            thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
            openRate: 28.5,
            clickRate: 4.2,
            conversionRate: 2.1,
            engagementScore: 85,
            usageCount: 45,
            lastUsed: '2024-01-15',
            abTestStatus: 'winner',
            abTestLift: 15.3,
            deviceCompatibility: 98,
            subjectLinePerformance: 'high',
            sendTimeOptimization: 'optimal',
            recommendations: ['Increase CTA button size', 'Test different color scheme']
        },
        {
            id: 'template-2',
            name: 'Welcome Email Series',
            category: 'transactional',
            thumbnail: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
            openRate: 45.2,
            clickRate: 8.7,
            conversionRate: 5.4,
            engagementScore: 92,
            usageCount: 128,
            lastUsed: '2024-01-14',
            abTestStatus: 'testing',
            abTestLift: null,
            deviceCompatibility: 95,
            subjectLinePerformance: 'high',
            sendTimeOptimization: 'good',
            recommendations: ['Optimize for mobile', 'A/B test subject line']
        },
        {
            id: 'template-3',
            name: 'Product Launch Announcement',
            category: 'promotional',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            openRate: 22.1,
            clickRate: 3.8,
            conversionRate: 1.9,
            engagementScore: 72,
            usageCount: 23,
            lastUsed: '2024-01-13',
            abTestStatus: 'loser',
            abTestLift: -8.2,
            deviceCompatibility: 89,
            subjectLinePerformance: 'medium',
            sendTimeOptimization: 'needs_improvement',
            recommendations: ['Redesign header section', 'Improve mobile responsiveness', 'Test new subject lines']
        },
        {
            id: 'template-4',
            name: 'Monthly Newsletter',
            category: 'newsletter',
            thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
            openRate: 31.7,
            clickRate: 5.1,
            conversionRate: 2.8,
            engagementScore: 78,
            usageCount: 67,
            lastUsed: '2024-01-12',
            abTestStatus: 'control',
            abTestLift: null,
            deviceCompatibility: 92,
            subjectLinePerformance: 'high',
            sendTimeOptimization: 'optimal',
            recommendations: ['Add more interactive elements', 'Test different layouts']
        },
        {
            id: 'template-5',
            name: 'Cart Abandonment Recovery',
            category: 'transactional',
            thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
            openRate: 38.9,
            clickRate: 12.3,
            conversionRate: 8.7,
            engagementScore: 94,
            usageCount: 89,
            lastUsed: '2024-01-11',
            abTestStatus: 'winner',
            abTestLift: 22.1,
            deviceCompatibility: 97,
            subjectLinePerformance: 'high',
            sendTimeOptimization: 'optimal',
            recommendations: ['Maintain current design', 'Test urgency messaging']
        },
        {
            id: 'template-6',
            name: 'Event Invitation',
            category: 'promotional',
            thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
            openRate: 26.4,
            clickRate: 6.2,
            conversionRate: 3.5,
            engagementScore: 81,
            usageCount: 34,
            lastUsed: '2024-01-10',
            abTestStatus: 'testing',
            abTestLift: null,
            deviceCompatibility: 94,
            subjectLinePerformance: 'medium',
            sendTimeOptimization: 'good',
            recommendations: ['Enhance visual hierarchy', 'Test different CTA placement']
        }
    ];

    const categories = [
        { id: 'all', label: 'All Categories', count: templates.length },
        { id: 'promotional', label: 'Promotional', count: templates.filter(t => t.category === 'promotional').length },
        { id: 'transactional', label: 'Transactional', count: templates.filter(t => t.category === 'transactional').length },
        { id: 'newsletter', label: 'Newsletter', count: templates.filter(t => t.category === 'newsletter').length }
    ];

    const periods = [
        { id: '7d', label: 'Last 7 days' },
        { id: '30d', label: 'Last 30 days' },
        { id: '90d', label: 'Last 90 days' },
        { id: '1y', label: 'Last year' }
    ];

    const abTestFilters = [
        { id: 'all', label: 'All Templates' },
        { id: 'testing', label: 'Currently Testing' },
        { id: 'winner', label: 'A/B Winners' },
        { id: 'loser', label: 'A/B Losers' },
        { id: 'control', label: 'Control Templates' }
    ];

    const sortOptions = [
        { id: 'open_rate', label: 'Open Rate' },
        { id: 'click_rate', label: 'Click Rate' },
        { id: 'conversion_rate', label: 'Conversion Rate' },
        { id: 'engagement_score', label: 'Engagement Score' },
        { id: 'usage_count', label: 'Usage Count' },
        { id: 'last_used', label: 'Last Used' }
    ];

    const filteredTemplates = templates.filter(template => {
        if (selectedCategory !== 'all' && template.category !== selectedCategory) return false;
        if (abTestFilter !== 'all' && template.abTestStatus !== abTestFilter) return false;
        return true;
    });

    const sortedTemplates = [...filteredTemplates].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'last_used') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (sortOrder === 'desc') {
            return bValue > aValue ? 1 : -1;
        } else {
            return aValue > bValue ? 1 : -1;
        }
    });

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
        setIsPreviewOpen(true);
    };

    const handleExport = async (exportType, campaigns) => {
        console.log('Exporting template data:', exportType, campaigns);
    };

    const handleAction = (actionType, campaigns) => {
        console.log('Template action:', actionType, campaigns);
    };

    return (
        <div className="min-h-screen bg-(--background)">
            <Header />

            <div className="pt-20">
                <CampaignContextSelector
                    onCampaignSelect={setSelectedCampaigns}
                    onComparisonModeToggle={(mode) => console.log('Comparison mode:', mode)}
                />

                <div className="px-6 py-6">
                    {/* Page Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-(--text-primary) mb-2">
                                Template Performance Analytics
                            </h1>
                            <p className="text-(--text-secondary)">
                                Analyze email template effectiveness and optimize design elements through A/B testing metrics
                            </p>
                        </div>

                        <div className="mt-4 lg:mt-0">
                            <ExportActionControls
                                screenContext="templates"
                                selectedCampaigns={selectedCampaigns}
                                onExport={handleExport}
                                onAction={handleAction}
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-(--surface) border border-(--border) rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-(--text-primary) mb-2">
                                    Template Category
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-100) focus:border-(--primary) text-sm"
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.label} ({category.count})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Period Selector */}
                            <div>
                                <label className="block text-sm font-medium text-(--text-primary) mb-2">
                                    Performance Period
                                </label>
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="w-full px-3 py-2 border border-(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-100) focus:border-(--primary) text-sm"
                                >
                                    {periods.map(period => (
                                        <option key={period.id} value={period.id}>
                                            {period.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* A/B Test Filter */}
                            <div>
                                <label className="block text-sm font-medium text-(--text-primary) mb-2">
                                    A/B Test Status
                                </label>
                                <select
                                    value={abTestFilter}
                                    onChange={(e) => setAbTestFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-100) focus:border-(--primary) text-sm"
                                >
                                    {abTestFilters.map(filter => (
                                        <option key={filter.id} value={filter.id}>
                                            {filter.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort Options */}
                            <div>
                                <label className="block text-sm font-medium text-(--text-primary) mb-2">
                                    Sort By
                                </label>
                                <div className="flex space-x-2">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-100) focus:border-(--primary) text-sm"
                                    >
                                        {sortOptions.map(option => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                                        className="px-3 py-2 border border-(--border) rounded-lg hover:bg-(--secondary-50) nav-transition"
                                        title={`Sort ${sortOrder === 'desc' ? 'ascending' : 'descending'}`}
                                    >
                                        <Icon
                                            name={sortOrder === 'desc' ? 'ArrowDown' : 'ArrowUp'}
                                            size={16}
                                            className="text-(--text-secondary)"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics Cards */}
                    <PerformanceMetricsCards templates={filteredTemplates} />

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                        {/* Template Performance Matrix */}
                        <div className="xl:col-span-2">
                            <TemplatePerformanceMatrix
                                templates={sortedTemplates}
                                onTemplateClick={handleTemplateClick}
                                sortBy={sortBy}
                            />
                        </div>

                        {/* A/B Test Results Summary */}
                        <div className="xl:col-span-1">
                            <ABTestResultsSummary templates={templates} />
                        </div>
                    </div>

                    {/* Detailed Performance Table */}
                    <TemplateDetailsTable
                        templates={sortedTemplates}
                        onTemplateClick={handleTemplateClick}
                    />
                </div>
            </div>

            {/* Template Preview Modal */}
            {isPreviewOpen && selectedTemplate && (
                <TemplatePreviewModal
                    template={selectedTemplate}
                    onClose={() => setIsPreviewOpen(false)}
                />
            )}
        </div>
    );
};

export default TemplatePerformanceAnalytics;