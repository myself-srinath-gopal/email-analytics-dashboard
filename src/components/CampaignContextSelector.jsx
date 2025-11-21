import React, { useState, useRef, useEffect } from 'react';
import Icon from './AppIcon';

const CampaignContextSelector = ({ onCampaignSelect, onComparisonModeToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCampaigns, setSelectedCampaigns] = useState(['campaign-1']);
    const [comparisonMode, setComparisonMode] = useState(false);
    const dropdownRef = useRef(null);

    // Mock campaign data
    const campaigns = [
        { id: 'campaign-1', name: 'Holiday Sale 2024', status: 'active', performance: 'high' },
        { id: 'campaign-2', name: 'Product Launch Newsletter', status: 'active', performance: 'medium' },
        { id: 'campaign-3', name: 'Customer Retention Series', status: 'paused', performance: 'high' },
        { id: 'campaign-4', name: 'Welcome Email Sequence', status: 'active', performance: 'low' },
        { id: 'campaign-5', name: 'Black Friday Promotion', status: 'completed', performance: 'high' },
        { id: 'campaign-6', name: 'Monthly Newsletter', status: 'active', performance: 'medium' },
    ];

    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCampaignToggle = (campaignId) => {
        if (comparisonMode) {
            setSelectedCampaigns(prev => {
                const newSelection = prev.includes(campaignId)
                    ? prev.filter(id => id !== campaignId)
                    : [...prev, campaignId].slice(0, 4); // Max 4 campaigns for comparison

                onCampaignSelect?.(newSelection);
                return newSelection;
            });
        } else {
            setSelectedCampaigns([campaignId]);
            onCampaignSelect?.([campaignId]);
            setIsOpen(false);
        }
    };

    const toggleComparisonMode = () => {
        const newMode = !comparisonMode;
        setComparisonMode(newMode);
        onComparisonModeToggle?.(newMode);

        if (!newMode && selectedCampaigns.length > 1) {
            const firstCampaign = [selectedCampaigns[0]];
            setSelectedCampaigns(firstCampaign);
            onCampaignSelect?.(firstCampaign);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-(--success) bg-(--success-50)';
            case 'paused': return 'text-(--warning) bg-(--warning-50)';
            case 'completed': return 'text-(--secondary) bg-(--secondary-100)';
            default: return 'text-(--secondary) bg-(--secondary-100)';
        }
    };

    const getPerformanceIcon = (performance) => {
        switch (performance) {
            case 'high': return { icon: 'TrendingUp', color: 'text-(--success)' };
            case 'medium': return { icon: 'Minus', color: 'text-(--warning)' };
            case 'low': return { icon: 'TrendingDown', color: 'text-(--error)' };
            default: return { icon: 'Minus', color: 'text-(--secondary)' };
        }
    };

    const selectedCampaignNames = selectedCampaigns
        .map(id => campaigns.find(c => c.id === id)?.name)
        .filter(Boolean);

    return (
        <div className="relative w-full bg-(surface) border-b border-(--border)" ref={dropdownRef}>
            <div className="px-6 py-3">
                <div className="flex flex-wrap items-center justify-between">
                    {/* Campaign Selector */}
                    <div className="flex-1 max-w-2xl">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex items-center justify-between px-4 py-2 bg-(--secondary-50) hover:bg-(--secondary-100) border border-(--border) rounded-lg nav-transition"
                        >
                            <div className="flex items-center gap-3">
                                <Icon name="Target" size={18} className="text-(--primary)" />
                                <div className="text-left">
                                    <div className="font-medium text-sm text-(--text-primary)">
                                        {comparisonMode ?
                                            `${selectedCampaigns.length} Campaign${selectedCampaigns.length !== 1 ? 's' : ''} Selected` :
                                            selectedCampaignNames[0] || 'Select Campaign'
                                        }
                                    </div>
                                    {comparisonMode && selectedCampaigns.length > 0 && (
                                        <div className="text-xs text-(--text-secondary) truncate max-w-md">
                                            {selectedCampaignNames.join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Icon
                                name={isOpen ? "ChevronUp" : "ChevronDown"}
                                size={16}
                                className="text-(--text-secondary)"
                            />
                        </button>
                    </div>

                    {/* Comparison Mode Toggle */}
                    <div className="flex items-center gap-4 ml-6">
                        <button
                            onClick={toggleComparisonMode}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg nav-transition ${comparisonMode
                                ? 'bg-(--primary-50) text-(--primary) border border-(--primary-100)' : 'bg-(--secondary-50) text-(--text-secondary) hover:bg-(--secondary-100)'
                                }`}
                            title="Toggle comparison mode"
                        >
                            <Icon name="GitCompare" size={16} />
                            <span className="text-sm font-medium">Compare</span>
                        </button>

                        {comparisonMode && selectedCampaigns.length > 1 && (
                            <div className="text-xs text-(--text-secondary)">
                                {selectedCampaigns.length}/4 campaigns
                            </div>
                        )}
                    </div>
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute left-6 right-6 top-full mt-1 bg-(--surface) border border-(--border) rounded-lg shadow-elevation-md z-1100 animate-slide-down">
                        {/* Search */}
                        <div className="p-3 border-b border-(--border)">
                            <div className="relative">
                                <Icon
                                    name="Search"
                                    size={16}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-(--text-secondary)"
                                />
                                <input
                                    type="text"
                                    placeholder="Search campaigns..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-100) focus:border-(--primary) text-sm"
                                />
                            </div>
                        </div>

                        {/* Campaign List */}
                        <div className="max-h-64 overflow-y-auto">
                            {filteredCampaigns.length === 0 ? (
                                <div className="p-4 text-center text-(--text-secondary) text-sm">
                                    No campaigns found
                                </div>
                            ) : (
                                filteredCampaigns.map((campaign) => {
                                    const isSelected = selectedCampaigns.includes(campaign.id);
                                    const performanceData = getPerformanceIcon(campaign.performance);

                                    return (
                                        <button
                                            key={campaign.id}
                                            onClick={() => handleCampaignToggle(campaign.id)}
                                            className={`w-full flex items-center justify-between p-3 hover:bg-(--secondary-50) nav-transition ${isSelected ? 'bg-(--primary-50) border-r-2 border-(--primary)' : ''
                                                }`}
                                            disabled={comparisonMode && !isSelected && selectedCampaigns.length >= 4}
                                        >
                                            <div className="flex items-center gap-3">
                                                {comparisonMode && (
                                                    <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${isSelected
                                                        ? 'bg-(--primary) border-(--primary)' : 'border-(--border)'
                                                        }`}>
                                                        {isSelected && (
                                                            <Icon name="Check" size={12} color="white" />
                                                        )}
                                                    </div>
                                                )}

                                                <div className="text-left">
                                                    <div className="font-medium text-sm text-(--text-primary)">
                                                        {campaign.name}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                                                            {campaign.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Icon
                                                    name={performanceData.icon}
                                                    size={16}
                                                    className={performanceData.color}
                                                />
                                                <span className={`text-xs font-medium ${performanceData.color}`}>
                                                    {campaign.performance}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer */}
                        {comparisonMode && (
                            <div className="p-3 border-t border-(--border) bg-(--secondary-50)">
                                <div className="flex items-center justify-between text-xs text-(--text-secondary)">
                                    <span>Select up to 4 campaigns for comparison</span>
                                    {selectedCampaigns.length > 0 && (
                                        <button
                                            onClick={() => {
                                                setSelectedCampaigns([]);
                                                onCampaignSelect?.([]);
                                            }}
                                            className="text-(--primary) hover:text-(--primary-700) font-medium"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignContextSelector;