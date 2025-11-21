import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicDistribution = () => {
    const [zoomLevel, setZoomLevel] = useState(4);
    const [selectedRegion, setSelectedRegion] = useState(null);

    // Mock geographic data
    const geographicData = [
        { country: 'United States', subscribers: 18450, percentage: 40.4, lat: 39.8283, lng: -98.5795, growth: 5.2 },
        { country: 'United Kingdom', subscribers: 8920, percentage: 19.5, lat: 55.3781, lng: -3.4360, growth: 3.8 },
        { country: 'Canada', subscribers: 6780, percentage: 14.8, lat: 56.1304, lng: -106.3468, growth: 4.1 },
        { country: 'Australia', subscribers: 4560, percentage: 10.0, lat: -25.2744, lng: 133.7751, growth: 6.3 },
        { country: 'Germany', subscribers: 3890, percentage: 8.5, lat: 51.1657, lng: 10.4515, growth: 2.9 },
        { country: 'France', subscribers: 2340, percentage: 5.1, lat: 46.2276, lng: 2.2137, growth: 1.8 },
        { country: 'Others', subscribers: 780, percentage: 1.7, lat: 0, lng: 0, growth: 0.5 }
    ];

    const topRegions = geographicData.slice(0, 6);

    const handleZoomIn = () => {
        setZoomLevel(Math.min(zoomLevel + 2, 12));
    };

    const handleZoomOut = () => {
        setZoomLevel(Math.max(zoomLevel - 2, 2));
    };

    const handleRegionClick = (region) => {
        setSelectedRegion(selectedRegion?.country === region.country ? null : region);
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-(--text-primary) mb-1">
                        Geographic Distribution
                    </h3>
                    <p className="text-sm text-(--text-secondary)">
                        Subscriber locations with zoom capabilities
                    </p>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleZoomOut}
                        className="p-1 hover:bg-(--secondary-50) rounded nav-transition"
                        title="Zoom out"
                    >
                        <Icon name="ZoomOut" size={16} className="text-(--text-secondary)" />
                    </button>
                    <span className="text-xs text-(--text-secondary) px-2">
                        {zoomLevel}x
                    </span>
                    <button
                        onClick={handleZoomIn}
                        className="p-1 hover:bg-(--secondary-50) rounded nav-transition"
                        title="Zoom in"
                    >
                        <Icon name="ZoomIn" size={16} className="text-(--text-secondary)" />
                    </button>
                </div>
            </div>

            {/* Map Container */}
            <div className="relative h-48 mb-6 bg-(--secondary-50) rounded-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Subscriber Geographic Distribution"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=39.8283,-98.5795&z=${zoomLevel}&output=embed`}
                    className="border-0"
                />

                {/* Map Overlay with Region Markers */}
                <div className="absolute inset-0 pointer-events-none">
                    {topRegions.map((region, index) => (
                        <div
                            key={region.country}
                            className="absolute pointer-events-auto"
                            style={{
                                left: `${20 + (index % 3) * 25}%`,
                                top: `${20 + Math.floor(index / 3) * 30}%`
                            }}
                        >
                            <button
                                onClick={() => handleRegionClick(region)}
                                className={`w-3 h-3 rounded-full border-2 border-white shadow-md micro-interaction ${selectedRegion?.country === region.country
                                    ? 'bg-(--primary) scale-150' : 'bg-(--accent) hover:bg-(--accent-600)'
                                    }`}
                                title={`${region.country}: ${region.subscribers.toLocaleString()} subscribers`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Region List */}
            <div className="space-y-2">
                {topRegions.map((region, index) => (
                    <button
                        key={region.country}
                        onClick={() => handleRegionClick(region)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg nav-transition ${selectedRegion?.country === region.country
                            ? 'bg-(--primary-50) border border-(--primary-100)' : 'bg-(--secondary-50) hover:bg-(--secondary-100)'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-6 h-6 bg-(--accent) rounded-full text-white text-xs font-bold">
                                {index + 1}
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-(--text-primary) text-sm">
                                    {region.country}
                                </div>
                                <div className="text-xs text-(--text-secondary)">
                                    {region.percentage}% of total
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="font-bold text-(--text-primary) text-sm">
                                {region.subscribers.toLocaleString()}
                            </div>
                            <div className="flex items-center space-x-1">
                                <Icon
                                    name={region.growth > 0 ? "ArrowUp" : "ArrowDown"}
                                    size={10}
                                    className={region.growth > 0 ? "text-(--success)" : "text-(--error)"}
                                />
                                <span className={`text-xs ${region.growth > 0 ? "text-(--success)" : "text-(--error)"}`}>
                                    {Math.abs(region.growth)}%
                                </span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Selected Region Details */}
            {selectedRegion && (
                <div className="mt-4 p-4 bg-(--primary-50) border border-(--primary-100) rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-(--text-primary)">
                            {selectedRegion.country} Details
                        </h4>
                        <button
                            onClick={() => setSelectedRegion(null)}
                            className="p-1 hover:bg-(--primary-100) rounded micro-transition"
                        >
                            <Icon name="X" size={14} className="text-(--text-secondary)" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-lg font-bold text-(--primary)">
                                {selectedRegion.subscribers.toLocaleString()}
                            </div>
                            <div className="text-xs text-(--text-secondary)">Total Subscribers</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-(--success)">
                                +{selectedRegion.growth}%
                            </div>
                            <div className="text-xs text-(--text-secondary)">Growth Rate</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            <div className="mt-6 pt-4 border-t border-(--border)">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="text-sm font-bold text-(--text-primary)">
                            {topRegions.length}
                        </div>
                        <div className="text-xs text-(--text-secondary)">Active Regions</div>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-(--text-primary)">
                            {(topRegions.reduce((sum, r) => sum + r.growth, 0) / topRegions.length).toFixed(1)}%
                        </div>
                        <div className="text-xs text-(--text-secondary)">Avg Growth</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeographicDistribution;