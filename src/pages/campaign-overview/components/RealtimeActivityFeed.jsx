import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealtimeActivityFeed = ({ isLoading }) => {
  const [activities, setActivities] = useState([]);

  // Mock real-time activities
  const mockActivities = [
    {
      id: 1,
      type: 'open',
      campaign: 'Holiday Sale 2024',
      subscriber: 'john.doe@email.com',
      timestamp: new Date(Date.now() - 30000),
      location: 'New York, US',
      device: 'Mobile'
    },
    {
      id: 2,
      type: 'click',
      campaign: 'Product Launch Newsletter',
      subscriber: 'sarah.wilson@email.com',
      timestamp: new Date(Date.now() - 120000),
      location: 'London, UK',
      device: 'Desktop'
    },
    {
      id: 3,
      type: 'bounce',
      campaign: 'Holiday Sale 2024',
      subscriber: 'invalid@domain.com',
      timestamp: new Date(Date.now() - 180000),
      bounceType: 'Hard Bounce'
    },
    {
      id: 4,
      type: 'unsubscribe',
      campaign: 'Monthly Newsletter',
      subscriber: 'user@example.com',
      timestamp: new Date(Date.now() - 300000),
      reason: 'Too frequent'
    },
    {
      id: 5,
      type: 'conversion',
      campaign: 'Product Launch Newsletter',
      subscriber: 'buyer@email.com',
      timestamp: new Date(Date.now() - 420000),
      value: '$89.99'
    },
    {
      id: 6,
      type: 'open',
      campaign: 'Welcome Email Sequence',
      subscriber: 'newuser@email.com',
      timestamp: new Date(Date.now() - 480000),
      location: 'Toronto, CA',
      device: 'Tablet'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: ['open', 'click', 'bounce', 'unsubscribe'][Math.floor(Math.random() * 4)],
        campaign: 'Holiday Sale 2024',
        subscriber: `user${Math.floor(Math.random() * 1000)}@email.com`,
        timestamp: new Date(),
        location: 'Various',
        device: ['Mobile', 'Desktop', 'Tablet'][Math.floor(Math.random() * 3)]
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'open': return { icon: 'Mail', color: 'text-(--success)' };
      case 'click': return { icon: 'MousePointer', color: 'text-(--primary)' };
      case 'bounce': return { icon: 'AlertTriangle', color: 'text-(--error)' };
      case 'unsubscribe': return { icon: 'UserMinus', color: 'text-(--error)' };
      case 'conversion': return { icon: 'Target', color: 'text-(--success)' };
      default: return { icon: 'Activity', color: 'text-(--secondary)' };
    }
  };

  const getActivityLabel = (type) => {
    switch (type) {
      case 'open': return 'Email Opened';
      case 'click': return 'Link Clicked';
      case 'bounce': return 'Email Bounced';
      case 'unsubscribe': return 'Unsubscribed';
      case 'conversion': return 'Conversion';
      default: return 'Activity';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="bg-(--surface) border border-(--border) rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-(--success) rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-(--text-primary)">
            Live Activity
          </h3>
        </div>

        <button className="p-2 hover:bg-(--secondary-50) rounded-lg nav-transition" title="View all activities">
          <Icon name="ExternalLink" size={16} className="text-(--text-secondary)" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-start gap-3 p-3 bg-(--secondary-50) rounded-lg">
                <div className="w-8 h-8 bg-(--secondary-100) rounded-lg"></div>
                <div className="flex-1">
                  <div className="w-32 h-4 bg-(--secondary-100) rounded mb-2"></div>
                  <div className="w-24 h-3 bg-(--secondary-100) rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map((activity) => {
            const activityData = getActivityIcon(activity.type);

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 hover:bg-(--secondary-50) rounded-lg nav-transition"
              >
                <div className={`w-8 h-8 rounded-lg bg-(--secondary-50) flex items-center justify-center shrink-0`}>
                  <Icon name={activityData.icon} size={16} className={activityData.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-(--text-primary)">
                      {getActivityLabel(activity.type)}
                    </span>
                    <span className="text-xs text-(--text-secondary)">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>

                  <div className="text-xs text-(--text-secondary) space-y-1">
                    <div className="truncate">
                      {activity.subscriber}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="truncate">{activity.campaign}</span>
                      {activity.location && (
                        <>
                          <span>•</span>
                          <span>{activity.device}</span>
                        </>
                      )}
                    </div>
                    {activity.value && (
                      <div className="font-medium text-(--success)">
                        {activity.value}
                      </div>
                    )}
                    {activity.bounceType && (
                      <div className="font-medium text-(--error)">
                        {activity.bounceType}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Activity Summary */}
      {!isLoading && (
        <div className="mt-6 pt-4 border-t border-(--border)">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-(--text-primary)">
                {activities.filter(a => a.type === 'open').length}
              </div>
              <div className="text-xs text-(--text-secondary)">
                Opens (last hour)
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-(--text-primary)">
                {activities.filter(a => a.type === 'click').length}
              </div>
              <div className="text-xs text-(--text-secondary)">
                Clicks (last hour)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealtimeActivityFeed;