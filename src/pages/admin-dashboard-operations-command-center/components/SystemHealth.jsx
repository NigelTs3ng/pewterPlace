import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHealth = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    serverStatus: 'healthy',
    databaseStatus: 'healthy',
    apiStatus: 'healthy',
    paymentGateway: 'healthy',
    lastBackup: '2025-08-31 02:00:00',
    uptime: '99.98%',
    responseTime: '145ms',
    activeUsers: 1247,
    errorRate: '0.02%'
  });

  const [performanceData, setPerformanceData] = useState([
    { time: '14:30', cpu: 45, memory: 62, disk: 78 },
    { time: '14:35', cpu: 52, memory: 65, disk: 78 },
    { time: '14:40', cpu: 48, memory: 68, disk: 79 },
    { time: '14:45', cpu: 41, memory: 64, disk: 79 },
    { time: '14:49', cpu: 38, memory: 61, disk: 80 }
  ]);

  const systemServices = [
    {
      id: 1,
      name: 'Web Server',
      status: 'running',
      uptime: '15d 8h 32m',
      cpu: '12%',
      memory: '2.4GB',
      lastRestart: '2025-08-16 06:00:00'
    },
    {
      id: 2,
      name: 'Database Server',
      status: 'running',
      uptime: '15d 8h 32m',
      cpu: '8%',
      memory: '4.1GB',
      lastRestart: '2025-08-16 06:00:00'
    },
    {
      id: 3,
      name: 'Payment Gateway',
      status: 'running',
      uptime: '30d 12h 15m',
      cpu: '3%',
      memory: '512MB',
      lastRestart: '2025-08-01 10:30:00'
    },
    {
      id: 4,
      name: 'Email Service',
      status: 'warning',
      uptime: '2d 4h 18m',
      cpu: '15%',
      memory: '1.2GB',
      lastRestart: '2025-08-29 10:31:00'
    },
    {
      id: 5,
      name: 'Image Processing',
      status: 'running',
      uptime: '7d 16h 42m',
      cpu: '25%',
      memory: '3.8GB',
      lastRestart: '2025-08-24 22:07:00'
    },
    {
      id: 6,
      name: 'Search Engine',
      status: 'running',
      uptime: '12d 3h 55m',
      cpu: '18%',
      memory: '2.9GB',
      lastRestart: '2025-08-19 11:54:00'
    }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: 'info',
      title: 'SSL Certificate Renewal',
      message: 'SSL certificate will expire in 45 days',
      timestamp: '2025-08-31 14:30:00',
      severity: 'low'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Failed Login Attempts',
      message: '12 failed login attempts from IP 192.168.1.100',
      timestamp: '2025-08-31 13:45:00',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Security Scan Complete',
      message: 'No vulnerabilities detected in latest security scan',
      timestamp: '2025-08-31 12:00:00',
      severity: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': case'running': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': case'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': case'running': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': case'down': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-l-error bg-error/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-accent bg-accent/5';
      default: return 'border-l-border bg-background';
    }
  };

  const getPerformanceColor = (value, type) => {
    if (type === 'cpu' || type === 'memory') {
      if (value >= 80) return 'text-error';
      if (value >= 60) return 'text-warning';
      return 'text-success';
    }
    if (type === 'disk') {
      if (value >= 90) return 'text-error';
      if (value >= 75) return 'text-warning';
      return 'text-success';
    }
    return 'text-muted-foreground';
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prev => {
        const newData = [...prev?.slice(1)];
        const now = new Date();
        const timeString = `${now?.getHours()}:${now?.getMinutes()?.toString()?.padStart(2, '0')}`;
        
        newData?.push({
          time: timeString,
          cpu: Math.floor(Math.random() * 30) + 30,
          memory: Math.floor(Math.random() * 20) + 55,
          disk: Math.floor(Math.random() * 10) + 75
        });
        
        return newData;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="bg-card rounded-lg border border-border card-shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">System Health Overview</h3>
            <p className="text-sm text-muted-foreground mt-1">Real-time system monitoring and status</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Live</span>
            </div>
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
            <Icon name="Server" size={32} className="mx-auto mb-3 text-success" />
            <h4 className="text-lg font-bold text-success">Operational</h4>
            <p className="text-sm text-muted-foreground">All systems running</p>
          </div>
          
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <Icon name="Clock" size={32} className="mx-auto mb-3 text-accent" />
            <h4 className="text-lg font-bold text-accent">{systemMetrics?.uptime}</h4>
            <p className="text-sm text-muted-foreground">System uptime</p>
          </div>
          
          <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Icon name="Zap" size={32} className="mx-auto mb-3 text-blue-500" />
            <h4 className="text-lg font-bold text-blue-500">{systemMetrics?.responseTime}</h4>
            <p className="text-sm text-muted-foreground">Avg response time</p>
          </div>
          
          <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <Icon name="Users" size={32} className="mx-auto mb-3 text-purple-500" />
            <h4 className="text-lg font-bold text-purple-500">{systemMetrics?.activeUsers?.toLocaleString()}</h4>
            <p className="text-sm text-muted-foreground">Active users</p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-foreground">CPU Usage</h5>
              <span className={`text-sm font-bold ${getPerformanceColor(performanceData?.[performanceData?.length - 1]?.cpu, 'cpu')}`}>
                {performanceData?.[performanceData?.length - 1]?.cpu}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  performanceData?.[performanceData?.length - 1]?.cpu >= 80 ? 'bg-error' :
                  performanceData?.[performanceData?.length - 1]?.cpu >= 60 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${performanceData?.[performanceData?.length - 1]?.cpu}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-foreground">Memory Usage</h5>
              <span className={`text-sm font-bold ${getPerformanceColor(performanceData?.[performanceData?.length - 1]?.memory, 'memory')}`}>
                {performanceData?.[performanceData?.length - 1]?.memory}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  performanceData?.[performanceData?.length - 1]?.memory >= 80 ? 'bg-error' :
                  performanceData?.[performanceData?.length - 1]?.memory >= 60 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${performanceData?.[performanceData?.length - 1]?.memory}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-foreground">Disk Usage</h5>
              <span className={`text-sm font-bold ${getPerformanceColor(performanceData?.[performanceData?.length - 1]?.disk, 'disk')}`}>
                {performanceData?.[performanceData?.length - 1]?.disk}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  performanceData?.[performanceData?.length - 1]?.disk >= 90 ? 'bg-error' :
                  performanceData?.[performanceData?.length - 1]?.disk >= 75 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${performanceData?.[performanceData?.length - 1]?.disk}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Services Status & Security Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Services Status */}
        <div className="bg-card rounded-lg border border-border card-shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-base font-semibold text-foreground">System Services</h4>
              <p className="text-sm text-muted-foreground">Service status and resource usage</p>
            </div>
            <Button variant="outline" size="sm" iconName="Settings">
              Manage
            </Button>
          </div>

          <div className="space-y-3">
            {systemServices?.map((service) => (
              <div key={service?.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getStatusIcon(service?.status)} 
                    size={20} 
                    className={getStatusColor(service?.status)} 
                  />
                  <div>
                    <h5 className="font-medium text-foreground text-sm">{service?.name}</h5>
                    <p className="text-xs text-muted-foreground">Uptime: {service?.uptime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>CPU: {service?.cpu}</span>
                    <span>•</span>
                    <span>RAM: {service?.memory}</span>
                  </div>
                  <p className={`text-xs font-medium ${getStatusColor(service?.status)}`}>
                    {service?.status?.charAt(0)?.toUpperCase() + service?.status?.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-card rounded-lg border border-border card-shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-base font-semibold text-foreground">Security Alerts</h4>
              <p className="text-sm text-muted-foreground">Recent security events and notifications</p>
            </div>
            <Button variant="outline" size="sm" iconName="Shield">
              Security Center
            </Button>
          </div>

          <div className="space-y-3">
            {securityAlerts?.map((alert) => (
              <div key={alert?.id} className={`border-l-4 p-3 rounded-lg ${getAlertColor(alert?.severity)}`}>
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getAlertIcon(alert?.type)} 
                    size={16} 
                    className={`mt-0.5 ${
                      alert?.type === 'success' ? 'text-success' :
                      alert?.type === 'warning' ? 'text-warning' :
                      alert?.type === 'error' ? 'text-error' : 'text-accent'
                    }`} 
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-foreground">{alert?.title}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{alert?.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(alert.timestamp)?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View All Security Events
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;