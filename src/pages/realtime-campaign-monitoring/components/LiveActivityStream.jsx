import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveActivityStream = ({ isLiveMode }) => {
    const [activities, setActivities] = useState([]);

    // Mock activity types
    const activityTypes = [
        { type: 'email_sent', icon: 'Send', color: 'text-(--primary)', bgColor: 'bg-(--primary-50)' },
        { type: 'email_opened', icon: 'Eye', color: 'text-(--accent)', bgColor: 'bg-(--accent-50)' },
        { type: 'link_clicked', icon: 'MousePointer', color: 'text-(--success)', bgColor: 'bg-(--success-50)' },
        { type: 'email_bounced', icon: 'AlertTriangle', color: 'text-(--error)', bgColor: 'bg-(--error-50)' },
        { type: 'unsubscribed', icon: 'UserMinus', color: 'text-(--warning)', bgColor: 'bg-(--warning-50)' },
        { type: 'spam_complaint', icon: 'Flag', color: 'text-(--error)', bgColor: 'bg-(--error-50)' },
        { type: 'forward', icon: 'Share', color: 'text-(--secondary)', bgColor: 'bg-(--secondary-50)' }
    ];

    // Mock subscriber data
    const mockSubscribers = [
        "john.doe@email.com", "sarah.smith@gmail.com", "mike.johnson@company.com",
        "lisa.brown@business.org", "david.wilson@startup.io", "emma.davis@tech.com",
        "alex.miller@design.co", "sophia.garcia@marketing.net", "james.martinez@sales.biz",
        "olivia.rodriguez@creative.agency", "william.lopez@consulting.firm", "ava.gonzalez@media.group"
    ];

    // Generate mock activity
    const generateActivity = () => {
        const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const subscriber = mockSubscribers[Math.floor(Math.random() * mockSubscribers.length)];

        const activity = {
            id: Date.now() + Math.random(),
            type: activityType.type,
            icon: activityType.icon,
            color: activityType.color,
            bgColor: activityType.bgColor,
            subscriber: subscriber,
            timestamp: new Date(),
            details: getActivityDetails(activityType.type, subscriber)
        };

        return activity;
    };

    const getActivityDetails = (type, subscriber) => {
        const links = ['Product Page', 'Special Offer', 'Learn More', 'Contact Us', 'Download'];
        const bounceTypes = ['Hard bounce', 'Soft bounce', 'Block bounce'];
        switch (type) {
            case 'email_sent':
                return `Email delivered to ${subscriber}`;
            case 'email_opened':
                return `${subscriber} opened the email`;
            case 'link_clicked':
                return `${subscriber} clicked "${links[Math.floor(Math.random() * links.length)]}"`;
            case 'email_bounced':
                return `${subscriber} - ${bounceTypes[Math.floor(Math.random() * bounceTypes.length)]}`;
            case 'unsubscribed':
                return `${subscriber} unsubscribed from the list`;
            case 'spam_complaint':
                return `${subscriber} marked email as spam`;
            case 'forward':
                return `${subscriber} forwarded the email`;
            default:
                return `Activity from ${subscriber}`;
        }
    };

    // Simulate real-time activities
    useEffect(() => {
        if (!isLiveMode) return;

        // Generate initial activities
        const initialActivities = Array.from({ length: 15 }, () => generateActivity());
        setActivities(initialActivities.sort((a, b) => b.timestamp - a.timestamp));

        // Add new activities periodically
        const interval = setInterval(() => {
            const newActivity = generateActivity();
            setActivities(prev => [newActivity, ...prev.slice(0, 49)]); // Keep last 50 activities
        }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds

        return () => clearInterval(interval);
    }, [isLiveMode]);

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const diff = Math.floor((now - timestamp) / 1000);

        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        return `${Math.floor(diff / 3600)}h ago`;
    };

    return (
        <div className="bg-(--surface) border border-(--border) rounded-xl">
            <div className="p-6 border-b border-(--border)">
                <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4 items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Icon name="Activity" size={24} className="text-(--primary)" />
                        <div>
                            <h3 className="text-lg font-semibold text-(--text-primary)">
                                Live Activity Stream
                            </h3>
                            <p className="text-sm text-(--text-secondary)">
                                Real-time subscriber interactions as they happen
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {isLiveMode && (
                            <div className="flex items-center space-x-2 px-3 py-1 bg-(--success-50) rounded-full">
                                <div className="w-2 h-2 bg-(--success) rounded-full animate-pulse" />
                                <span className="text-xs font-medium text-(--success)">Live</span>
                            </div>
                        )}
                        <span className="text-xs text-(--text-secondary)">
                            {activities.length} activities
                        </span>
                    </div>
                </div>
            </div>

            <div className="h-96 overflow-y-auto">
                {activities.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <Icon name="Activity" size={48} className="text-(--secondary-300) mx-auto mb-4" />
                            <p className="text-(--text-secondary)">
                                {isLiveMode ? 'Waiting for activity...' : 'Live monitoring paused'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 space-y-3">
                        {activities.map((activity, index) => (
                            <div
                                key={activity.id}
                                className={`flex max-[600px]:flex-col max-[600px]:gap-2 items-start space-x-3 p-3 rounded-lg hover:bg-(--secondary-50) nav-transition truncate ${index === 0 && isLiveMode ? 'animate-pulse bg-(--primary-50)' : ''
                                    }`}
                            >
                                <div className={`shrink-0 w-8 h-8 rounded-full ${activity.bgColor} flex items-center justify-center`}>
                                    <Icon name={activity.icon} size={16} className={activity.color} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-1 items-center justify-between">
                                        <p className="text-sm font-medium text-(--text-primary) truncate">
                                            {activity.details}
                                        </p>
                                        <div className="shrink-0 max-[600px]:ml-0 ml-2">
                                            <span className="text-xs text-(--text-secondary)">
                                                {formatTime(activity.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-1 items-center justify-between mt-1">
                                        <span className="text-xs text-(--text-secondary)">
                                            {activity.subscriber}
                                        </span>
                                        <span className="text-xs text-(--text-secondary)">
                                            {getTimeAgo(activity.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {activities.length > 0 && (
                <div className="p-4 border-t border-(--border) bg-(--secondary-50)">
                    <div className="flex items-center justify-between text-xs text-(--text-secondary)">
                        <span>Showing latest {Math.min(activities.length, 50)} activities</span>
                        <button
                            onClick={() => setActivities([])}
                            className="text-(--primary) hover:text-(--primary-700) font-medium"
                        >
                            Clear history
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveActivityStream;