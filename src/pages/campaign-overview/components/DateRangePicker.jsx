import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DateRangePicker = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dateRangeOptions = [
        { value: '1d', label: 'Last 24 Hours', description: 'Recent activity' },
        { value: '7d', label: 'Last 7 Days', description: 'Weekly overview' },
        { value: '30d', label: 'Last 30 Days', description: 'Monthly trends' },
        { value: '90d', label: 'Last 3 Months', description: 'Quarterly analysis' },
        { value: '6m', label: 'Last 6 Months', description: 'Seasonal patterns' },
        { value: '1y', label: 'Last 12 Months', description: 'Annual performance' },
        { value: 'custom', label: 'Custom Range', description: 'Select specific dates' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOptionSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const getCurrentLabel = () => {
        const option = dateRangeOptions.find(opt => opt.value === value);
        return option ? option.label : 'Select Range';
    };

    const getDateRangeDisplay = () => {
        const now = new Date();
        let startDate;

        switch (value) {
            case '1d':
                startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                break;
            case '7d':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '30d':
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case '90d':
                startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                break;
            case '6m':
                startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
                break;
            case '1y':
                startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                break;
            default:
                return null;
        }

        return {
            start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            end: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };
    };

    const dateDisplay = getDateRangeDisplay();

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="max-[450px]:w-full flex items-center gap-3 px-4 py-2 bg-(--secondary-50) hover:bg-(--secondary-100) border border-(--border) rounded-lg nav-transition"
            >
                <Icon name="Calendar" size={16} className="text-(--text-secondary)" />
                <div className="text-left">
                    <div className="font-medium text-sm text-(--text-primary)">
                        {getCurrentLabel()}
                    </div>
                    {dateDisplay && (
                        <div className="text-xs text-(--text-secondary)">
                            {dateDisplay.start} - {dateDisplay.end}
                        </div>
                    )}
                </div>
                <Icon
                    name={isOpen ? "ChevronUp" : "ChevronDown"}
                    size={14}
                    className="text-(--text-secondary)"
                />
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full mt-1 w-64 bg-(--surface) border border-(--border) rounded-lg shadow-elevation-md z-1100 animate-slide-down">
                    <div className="p-2">
                        <div className="text-xs font-medium text-(--text-secondary) px-3 py-2 border-b border-(--border) mb-2">
                            Select Date Range
                        </div>

                        {dateRangeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleOptionSelect(option.value)}
                                className={`w-full flex items-start gap-3 p-3 hover:bg-(--secondary-50) rounded-lg nav-transition ${value === option.value ? 'bg-(--primary-50) border-r-2 border-(--primary)' : ''
                                    }`}
                            >
                                <div className="flex-1 text-left">
                                    <div className={`font-medium text-sm ${value === option.value ? 'text-(--primary)' : 'text-(--text-primary)'
                                        }`}>
                                        {option.label}
                                    </div>
                                    <div className="text-xs text-(--text-secondary)">
                                        {option.description}
                                    </div>
                                </div>

                                {value === option.value && (
                                    <Icon name="Check" size={16} className="text-(--primary)" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="p-3 border-t border-(--border) bg-(--secondary-50)">
                        <div className="flex items-center justify-between text-xs text-(--text-secondary)">
                            <span>Quick select</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOptionSelect('7d')}
                                    className="px-2 py-1 bg-(--surface) hover:bg-(--secondary-100) rounded text-(--text-primary) nav-transition"
                                >
                                    7D
                                </button>
                                <button
                                    onClick={() => handleOptionSelect('30d')}
                                    className="px-2 py-1 bg-(--surface) hover:bg-(--secondary-100) rounded text-text-primary nav-transition"
                                >
                                    30D
                                </button>
                                <button
                                    onClick={() => handleOptionSelect('90d')}
                                    className="px-2 py-1 bg-(--surface) hover:bg-(--secondary-100) rounded text-text-primary nav-transition"
                                >
                                    90D
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;