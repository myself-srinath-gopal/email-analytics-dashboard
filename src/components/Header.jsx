import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from './AppIcon';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connected');
    const [lastUpdate, setLastUpdate] = useState(new Date());

    const navigationItems = [
        {
            label: 'Dashboard',
            path: '/',
            icon: 'BarChart3',
            tooltip: 'Campaign Performance Overview'
        },
        {
            label: 'Live Monitoring',
            path: '/realtime-campaign-monitoring',
            icon: 'Activity',
            tooltip: 'Real-Time Campaign Monitoring'
        },
        {
            label: 'Subscribers',
            path: '/subscriber-analytics',
            icon: 'Users',
            tooltip: 'Subscriber Analytics Dashboard'
        },
        {
            label: 'Templates',
            path: '/template-performance-analytics',
            icon: 'FileText',
            tooltip: 'Template Performance Analytics'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdate(new Date());
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const getConnectionStatusColor = () => {
        switch (connectionStatus) {
            case 'connected': return 'text-(--success)';
            case 'connecting': return 'text-(--warning)';
            case 'disconnected': return 'text-(--error)';
            default: return 'text-(--secondary)';
        }
    };

    const formatLastUpdate = (date) => {
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        return `${Math.floor(diff / 3600)}h ago`;
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-1000 bg-(--surface) border-b border-(--border)">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-(--primary) rounded-lg">
                            <Icon name="Mail" size={20} color="white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-semibold text-(--text-primary) font-heading">
                                EmailAnalytics
                            </h1>
                            <p className="text-xs text-(--text-secondary) font-caption">
                                Marketing Intelligence Platform
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8" role="navigation">
                        {navigationItems.map((item) => (

                            <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={`group relative flex items-center gap-3 px-4 py-2 rounded-lg nav-transition ${location.pathname === item.path
                                    ? 'bg-(--primary-50) text-(--primary) border border-(--primary-100)' : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--secondary-50)'
                                    }`}
                                aria-current={location.pathname === item.path ? 'page' : undefined}
                                title={item.tooltip}
                            >
                                <Icon
                                    name={item.icon}
                                    size={18}
                                    className={location.pathname === item.path ? 'text-(--primary)' : 'text-(--current)'}
                                />
                                <span className="font-medium text-sm">{item.label}</span>

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-(--secondary-800) text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-1500">
                                    {item.tooltip}
                                </div>
                            </button>
                        ))}
                    </nav>

                    {/* Real-Time Status & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        {/* Real-Time Status Indicator */}
                        <div className="hidden md:flex items-center gap-3 px-3 py-2 bg-(-color-secondary-50) rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-(--success) animate-pulse' :
                                    connectionStatus === 'connecting' ? 'bg-(--warning)' : 'bg-(--error)'
                                    }`} />
                                <span className={`text-xs font-medium ${getConnectionStatusColor()}`}>
                                    {connectionStatus === 'connected' ? 'Live' :
                                        connectionStatus === 'connecting' ? 'Connecting' : 'Offline'}
                                </span>
                            </div>
                            <div className="text-xs text-(--text-secondary)">
                                {formatLastUpdate(lastUpdate)}
                            </div>
                            <button
                                onClick={() => setLastUpdate(new Date())}
                                className="p-1 hover:bg-(--secondary-100) rounded micro-interaction"
                                title="Refresh data"
                            >
                                <Icon name="RefreshCw" size={12} className="text-(--text-secondary)" />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 hover:bg-(--secondary-50) rounded-lg nav-transition"
                            aria-label="Toggle navigation menu"
                        >
                            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} className="text-(--text-primary)" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pt-4 border-t border-(--border) animate-slide-down">
                        <nav className="gap-2" role="navigation">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg nav-transition ${location.pathname === item.path
                                        ? 'bg-(--primary-50) text-(--primary) border border-(--primary-100)' : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--secondary-50)'
                                        }`}
                                    aria-current={location.pathname === item.path ? 'page' : undefined}
                                >
                                    <Icon
                                        name={item.icon}
                                        size={20}
                                        className={location.pathname === item.path ? 'text-(--primary)' : 'text-(--current)'}
                                    />
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-sm">{item.label}</div>
                                        <div className="text-xs text-(--text-secondary)">{item.tooltip}</div>
                                    </div>
                                </button>
                            ))}
                        </nav>

                        {/* Mobile Status Indicator */}
                        <div className="mt-4 pt-4 border-t border-(--border)">
                            <div className="flex items-center justify-between px-4 py-2 bg-(--secondary-50) rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-(--success) animate-(--pulse)' :
                                        connectionStatus === 'connecting' ? 'bg-(--warning)' : 'bg-(--error)'
                                        }`} />
                                    <span className={`text-xs font-medium ${getConnectionStatusColor()}`}>
                                        {connectionStatus === 'connected' ? 'Live Data' :
                                            connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}
                                    </span>
                                </div>
                                <div className="text-xs text-(--text-secondary)">
                                    Updated {formatLastUpdate(lastUpdate)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;