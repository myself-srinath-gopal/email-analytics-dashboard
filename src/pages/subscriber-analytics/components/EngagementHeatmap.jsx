import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EngagementHeatmap = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);

    // Mock engagement data - 7 days x 24 hours
    const generateHeatmapData = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = [];

        days.forEach((day, dayIndex) => {
            for (let hour = 0; hour < 24; hour++) {
                // Simulate realistic engagement patterns
                let engagement = Math.random() * 100;

                // Higher engagement during business hours (9-17)
                if (hour >= 9 && hour <= 17) {
                    engagement = Math.max(engagement, 40 + Math.random() * 60);
                }

                // Lower engagement during night hours (22-6)
                if (hour >= 22 || hour <= 6) {
                    engagement = Math.min(engagement, 30);
                }

                // Weekend patterns
                if (dayIndex >= 5) {
                    engagement *= 0.7; // Lower weekend engagement
                }

                data.push({
                    day: dayIndex,
                    dayName: day,
                    hour,
                    engagement: Math.round(engagement),
                    opens: Math.round(engagement * 12 + Math.random() * 100),
                    clicks: Math.round(engagement * 3 + Math.random() * 20)
                });
            }
        });

        return data;
    };

    const heatmapData = generateHeatmapData();

    const getIntensityColor = (engagement) => {
        if (engagement >= 80) return 'bg-(--primary) text-white';
        if (engagement >= 60) return 'bg-(--primary-500) text-white';
        if (engagement >= 40) return 'bg-(--primary-100) text-(--primary-700)';
        if (engagement >= 20) return 'bg-(--primary-50) text-(--primary-600)';
        return 'bg-(--secondary-50) text-(--secondary-600)';
    };

    const handleCellClick = (day, hour) => {
        setSelectedDay(day);
        setSelectedHour(hour);
    };

    const getSelectedCellData = () => {
        if (selectedDay === null || selectedHour === null) return null;
        return heatmapData.find(d => d.day === selectedDay && d.hour === selectedHour);
    };

    const selectedData = getSelectedCellData();

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-(--text-primary) mb-1">
                        Subscriber Engagement Heatmap
                    </h3>
                    <p className="text-sm text-(--text-secondary)">
                        Activity patterns by day and hour with click-to-filter functionality
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Legend */}
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-(--text-secondary)">Low</span>
                        <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-(--secondary-50) rounded"></div>
                            <div className="w-3 h-3 bg-(--primary-50) rounded"></div>
                            <div className="w-3 h-3 bg-(--primary-100) rounded"></div>
                            <div className="w-3 h-3 bg-(--primary-500) rounded"></div>
                            <div className="w-3 h-3 bg-(--primary) rounded"></div>
                        </div>
                        <span className="text-xs text-(--text-secondary)">High</span>
                    </div>

                    <button
                        onClick={() => {
                            setSelectedDay(null);
                            setSelectedHour(null);
                        }}
                        className="flex items-center space-x-1 px-3 py-1 text-xs bg-(--secondary-50) hover:bg-(--secondary-100) rounded-lg nav-transition"
                    >
                        <Icon name="RotateCcw" size={12} />
                        <span>Reset</span>
                    </button>
                </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
                <div className="min-w-full">
                    {/* Hour Headers */}
                    <div className="flex mb-2">
                        <div className="w-12"></div> {/* Day label space */}
                        {Array.from({ length: 24 }, (_, hour) => (
                            <div
                                key={hour}
                                className="flex-1 min-w-6 text-center text-xs text-(--text-secondary) font-medium"
                            >
                                {hour === 0 ? '12a' : hour <= 12 ? `${hour}${hour === 12 ? 'p' : 'a'}` : `${hour - 12}p`}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap Rows */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
                        <div key={day} className="flex mb-1">
                            <div className="w-12 flex items-center justify-center text-xs font-medium text-(--text-secondary)">
                                {day}
                            </div>
                            {Array.from({ length: 24 }, (_, hour) => {
                                const cellData = heatmapData.find(d => d.day === dayIndex && d.hour === hour);
                                const isSelected = selectedDay === dayIndex && selectedHour === hour;

                                return (
                                    <button
                                        key={hour}
                                        onClick={() => handleCellClick(dayIndex, hour)}
                                        className={`flex-1 min-w-6 h-8 m-0.5 rounded text-xs font-medium micro-interaction ${getIntensityColor(cellData.engagement)
                                            } ${isSelected ? 'ring-2 ring-(--primary) ring-offset-1' : ''}`}
                                        title={`${day} ${hour}:00 - ${cellData.engagement}% engagement`}
                                    >
                                        {cellData.engagement}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Selected Cell Details */}
            {selectedData && (
                <div className="mt-6 p-4 bg-(--primary-50) border border-(--primary-100) rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-(--text-primary)">
                            {selectedData.dayName} at {selectedData.hour === 0 ? '12:00 AM' :
                                selectedData.hour <= 12 ? `${selectedData.hour}:00 AM` :
                                    `${selectedData.hour - 12}:00 PM`}
                        </h4>
                        <button
                            onClick={() => {
                                setSelectedDay(null);
                                setSelectedHour(null);
                            }}
                            className="p-1 hover:bg-(--primary-100) rounded micro-transition"
                        >
                            <Icon name="X" size={14} className="text-(--text-secondary)" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-lg font-bold text-(--primary)">
                                {selectedData.engagement}%
                            </div>
                            <div className="text-xs text-(--text-secondary)">Engagement</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-(--success)">
                                {selectedData.opens.toLocaleString()}
                            </div>
                            <div className="text-xs text-(--text-secondary)">Opens</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-(--accent)">
                                {selectedData.clicks.toLocaleString()}
                            </div>
                            <div className="text-xs text-(--text-secondary)">Clicks</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-(--secondary-50) rounded-lg">
                    <div className="text-sm font-bold text-(--text-primary)">
                        {Math.round(heatmapData.reduce((sum, d) => sum + d.engagement, 0) / heatmapData.length)}%
                    </div>
                    <div className="text-xs text-(--text-secondary)">Avg Engagement</div>
                </div>
                <div className="text-center p-3 bg-(--secondary-50) rounded-lg">
                    <div className="text-sm font-bold text-(--text-primary)">
                        {Math.max(...heatmapData.map(d => d.engagement))}%
                    </div>
                    <div className="text-xs text-(--text-secondary)">Peak Engagement</div>
                </div>
                <div className="text-center p-3 bg-(--secondary-50) rounded-lg">
                    <div className="text-sm font-bold text-(--text-primary)">
                        2-4 PM
                    </div>
                    <div className="text-xs text-(--text-secondary)">Best Time</div>
                </div>
                <div className="text-center p-3 bg-(--secondary-50) rounded-lg">
                    <div className="text-sm font-bold text-(--text-primary)">
                        Tue-Thu
                    </div>
                    <div className="text-xs text-(--text-secondary)">Best Days</div>
                </div>
            </div>
        </div>
    );
};

export default EngagementHeatmap;