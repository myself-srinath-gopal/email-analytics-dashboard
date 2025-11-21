import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SegmentationControls = ({
    selectedSegment,
    onSegmentChange,
    showCohortAnalysis,
    onCohortToggle
}) => {
    const [isSegmentOpen, setIsSegmentOpen] = useState(false);
    const [isDemographicOpen, setIsDemographicOpen] = useState(false);
    const [isBehaviorOpen, setIsBehaviorOpen] = useState(false);
    const segmentRef = useRef(null);
    const demographicRef = useRef(null);
    const behaviorRef = useRef(null);

    const segmentOptions = [
        { id: 'all', label: 'All Subscribers', count: 45678, icon: 'Users' },
        { id: 'active', label: 'Active Subscribers', count: 32450, icon: 'UserCheck' },
        { id: 'inactive', label: 'Inactive Subscribers', count: 8920, icon: 'UserX' },
        { id: 'new', label: 'New Subscribers (30d)', count: 3890, icon: 'UserPlus' },
        { id: 'loyal', label: 'Loyal Customers', count: 11156, icon: 'Crown' },
        { id: 'at-risk', label: 'At-Risk Subscribers', count: 2340, icon: 'AlertTriangle' }
    ];

    const demographicFilters = [
        { id: 'age-18-25', label: '18-25 years', count: 8920 },
        { id: 'age-26-35', label: '26-35 years', count: 15670 },
        { id: 'age-36-45', label: '36-45 years', count: 12340 },
        { id: 'age-46-55', label: '46-55 years', count: 6780 },
        { id: 'age-55+', label: '55+ years', count: 1968 }
    ];

    const behaviorFilters = [
        { id: 'high-engagement', label: 'High Engagement', count: 12450, description: '80%+ open rate' },
        { id: 'medium-engagement', label: 'Medium Engagement', count: 18920, description: '40-80% open rate' },
        { id: 'low-engagement', label: 'Low Engagement', count: 8760, description: '<40% open rate' },
        { id: 'frequent-clickers', label: 'Frequent Clickers', count: 5670, description: '5+ clicks/month' },
        { id: 'purchase-ready', label: 'Purchase Ready', count: 3450, description: 'High intent signals' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (segmentRef.current && !segmentRef.current.contains(event.target)) {
                setIsSegmentOpen(false);
            }
            if (demographicRef.current && !demographicRef.current.contains(event.target)) {
                setIsDemographicOpen(false);
            }
            if (behaviorRef.current && !behaviorRef.current.contains(event.target)) {
                setIsBehaviorOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedSegmentData = segmentOptions.find(s => s.id === selectedSegment);

    const handleSegmentSelect = (segmentId) => {
        onSegmentChange(segmentId);
        setIsSegmentOpen(false);
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg p-4 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Segmentation Controls */}
                <div className="flex flex-wrap items-center gap-4">
                    {/* Primary Segment Selector */}
                    <div className="relative" ref={segmentRef}>
                        <button
                            onClick={() => setIsSegmentOpen(!isSegmentOpen)}
                            className="flex items-center space-x-2 px-4 py-2 bg-(--primary-50) hover:bg-(--primary-100) border border-(--primary-100) rounded-lg nav-transition"
                        >
                            <Icon name={selectedSegmentData?.icon || 'Users'} size={16} className="text-(--primary)" />
                            <span className="font-medium text-(--primary) text-sm">
                                {selectedSegmentData?.label || 'Select Segment'}
                            </span>
                            <span className="text-xs text-(--primary-600)">
                                ({selectedSegmentData?.count.toLocaleString()})
                            </span>
                            <Icon name="ChevronDown" size={14} className="text-(--primary)" />
                        </button>

                        {isSegmentOpen && (
                            <div className="absolute top-full left-0 mt-1 w-64 bg-(--surface) border border-(--border) rounded-lg shadow-md z-1100 animate-slide-down">
                                <div className="p-2">
                                    <div className="text-xs font-medium text-(--text-secondary) px-3 py-2 border-b border-(--border) mb-2">
                                        Subscriber Segments
                                    </div>
                                    {segmentOptions.map((segment) => (
                                        <button
                                            key={segment.id}
                                            onClick={() => handleSegmentSelect(segment.id)}
                                            className={`w-full flex items-center justify-between p-3 hover:bg-(--secondary-50) rounded-lg nav-transition ${selectedSegment === segment.id ? 'bg-(--primary-50) border-r-2 border-(--primary)' : ''
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Icon name={segment.icon} size={16} className="text-(--primary)" />
                                                <span className="font-medium text-sm text-(--text-primary)">
                                                    {segment.label}
                                                </span>
                                            </div>
                                            <span className="text-xs text-(--text-secondary)">
                                                {segment.count.toLocaleString()}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Demographic Filter */}
                    <div className="relative" ref={demographicRef}>
                        <button
                            onClick={() => setIsDemographicOpen(!isDemographicOpen)}
                            className="flex items-center space-x-2 px-3 py-2 bg-(--secondary-50) hover:bg-(--secondary-100) border border-(--border) rounded-lg nav-transition"
                        >
                            <Icon name="User" size={14} className="text-(--text-secondary)" />
                            <span className="text-sm text-(--text-secondary)">Demographics</span>
                            <Icon name="ChevronDown" size={12} className="text-(--text-secondary)" />
                        </button>

                        {isDemographicOpen && (
                            <div className="absolute top-full left-0 mt-1 w-56 bg-(--surface) border border-(--border) rounded-lg shadow-md z-1100 animate-slide-down">
                                <div className="p-2">
                                    <div className="text-xs font-medium text-(--text-secondary) px-3 py-2 border-b border-(--border) mb-2">
                                        Age Groups
                                    </div>
                                    {demographicFilters.map((filter) => (
                                        <button
                                            key={filter.id}
                                            className="w-full flex items-center justify-between p-2 hover:bg-(--secondary-50) rounded nav-transition"
                                        >
                                            <span className="text-sm text-(--text-primary)">{filter.label}</span>
                                            <span className="text-xs text-(--text-secondary)">
                                                {filter.count.toLocaleString()}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Behavior Filter */}
                    <div className="relative" ref={behaviorRef}>
                        <button
                            onClick={() => setIsBehaviorOpen(!isBehaviorOpen)}
                            className="flex items-center space-x-2 px-3 py-2 bg-(--secondary-50) hover:bg-(--secondary-100) border border-(--border) rounded-lg nav-transition"
                        >
                            <Icon name="Activity" size={14} className="text-(--text-secondary)" />
                            <span className="text-sm text-(--text-secondary)">Behavior</span>
                            <Icon name="ChevronDown" size={12} className="text-(--text-secondary)" />
                        </button>

                        {isBehaviorOpen && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-(--surface) border border-(--border) rounded-lg shadow-md z-1100 animate-slide-down">
                                <div className="p-2">
                                    <div className="text-xs font-medium text-(--text-secondary) px-3 py-2 border-b border-(--border) mb-2">
                                        Engagement Levels
                                    </div>
                                    {behaviorFilters.map((filter) => (
                                        <button
                                            key={filter.id}
                                            className="w-full flex items-start justify-between p-3 hover:bg-(--secondary-50) rounded-lg nav-transition"
                                        >
                                            <div className="text-left">
                                                <div className="text-sm font-medium text-(--text-primary)">
                                                    {filter.label}
                                                </div>
                                                <div className="text-xs text-(--text-secondary)">
                                                    {filter.description}
                                                </div>
                                            </div>
                                            <span className="text-xs text-(--text-secondary) ml-2">
                                                {filter.count.toLocaleString()}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Advanced Controls */}
                <div className="flex items-center space-x-4">
                    {/* Cohort Analysis Toggle */}
                    <button
                        onClick={() => onCohortToggle(!showCohortAnalysis)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg nav-transition ${showCohortAnalysis
                            ? 'bg-(--accent-50) text-(--accent) border border-(--accent-100)' : 'bg-(--secondary-50) text-(--text-secondary) hover:bg-(--secondary-100)'
                            }`}
                    >
                        <Icon name="BarChart3" size={14} />
                        <span className="text-sm font-medium">Cohort Analysis</span>
                    </button>

                    {/* A/B Test Groups */}
                    <button className="flex items-center space-x-2 px-3 py-2 bg-(--secondary-50) hover:bg-(--secondary-100) text-(--text-secondary) rounded-lg nav-transition">
                        <Icon name="GitBranch" size={14} />
                        <span className="text-sm font-medium">A/B Groups</span>
                    </button>

                    {/* Clear Filters */}
                    <button
                        onClick={() => {
                            onSegmentChange('all');
                            onCohortToggle(false);
                        }}
                        className="flex items-center space-x-1 px-2 py-1 text-xs text-(--text-secondary) hover:text-(--text-primary) nav-transition"
                    >
                        <Icon name="RotateCcw" size={12} />
                        <span>Clear</span>
                    </button>
                </div>
            </div>

            {/* Active Filters Summary */}
            {selectedSegment !== 'all' && (
                <div className="mt-4 pt-4 border-t border-(--border)">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-(--text-secondary)">Active filters:</span>
                        <div className="flex items-center space-x-1 px-2 py-1 bg-(--primary-50) text-(--primary) rounded text-xs">
                            <Icon name={selectedSegmentData?.icon} size={12} />
                            <span>{selectedSegmentData?.label}</span>
                            <button
                                onClick={() => onSegmentChange('all')}
                                className="ml-1 hover:bg-(--primary-100) rounded"
                            >
                                <Icon name="X" size={10} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SegmentationControls;