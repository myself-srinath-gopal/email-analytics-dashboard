import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const SubscriberStatusChart = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Mock subscriber status data
    const statusData = [
        { name: 'Active', value: 32450, percentage: 71.2, color: '#10B981' },
        { name: 'Inactive', value: 8920, percentage: 19.5, color: '#F59E0B' },
        { name: 'Bounced', value: 2890, percentage: 6.3, color: '#EF4444' },
        { name: 'Unsubscribed', value: 1380, percentage: 3.0, color: '#64748B' }
    ];

    const totalSubscribers = statusData.reduce((sum, item) => sum + item.value, 0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(null);
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-(--text-primary) mb-1">
                        Subscriber Status Distribution
                    </h3>
                    <p className="text-sm text-(--text-secondary)">
                        Current subscriber segmentation breakdown
                    </p>
                </div>

                <button className="p-2 hover:bg-(--secondary-50) rounded-lg nav-transition">
                    <Icon name="MoreVertical" size={16} className="text-(--text-secondary)" />
                </button>
            </div>

            {/* Pie Chart */}
            <div className="h-64 mb-6">
                <PieChart width={"100%"} height={"100%"}>
                    <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                    >
                        {statusData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke={activeIndex === index ? '#ffffff' : 'none'}
                                strokeWidth={activeIndex === index ? 2 : 0}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </div>

            {/* Legend with Values */}
            <div className="space-y-3">
                {statusData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-(--secondary-50) rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <div>
                                <div className="font-medium text-(--text-primary)">{item.name}</div>
                                <div className="text-xs text-(--text-secondary)">{item.percentage}% of total</div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="font-bold text-(--text-primary)">
                                {item.value.toLocaleString()}
                            </div>
                            <div className="text-xs text-(--text-secondary)">subscribers</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Summary */}
            <div className="mt-6 pt-4 border-t border-(--border)">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-(--text-primary)">Total Subscribers</span>
                    <span className="text-xl font-bold text-(--primary)">
                        {totalSubscribers.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 grid max-[380px]:grid-cols-1 grid-cols-2 gap-2">
                <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-(--primary-50) hover:bg-(--primary-100) text-(--primary) rounded-lg nav-transition">
                    <Icon name="UserPlus" size={14} />
                    <span className="text-sm font-medium">Add Segment</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-(--secondary-50) hover:bg-(--secondary-100) text-(--text-secondary) rounded-lg nav-transition">
                    <Icon name="Download" size={14} />
                    <span className="text-sm font-medium">Export List</span>
                </button>
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-(--surface) border border-(--border) rounded-lg p-3 shadow-md">
                <div className="font-medium text-(--text-primary)">{data.name}</div>
                <div className="text-sm text-(--text-secondary)">
                    {data.value.toLocaleString()} subscribers ({data.percentage}%)
                </div>
            </div>
        );
    }
    return null;
};


export default SubscriberStatusChart;