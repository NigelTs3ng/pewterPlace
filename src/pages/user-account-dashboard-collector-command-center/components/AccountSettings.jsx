import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Chen',
    email: 'alex.chen@email.com',
    phone: '+65 9123 4567',
    address: '123 Orchard Road',
    city: 'Singapore',
    postalCode: '238858',
    country: 'Singapore'
  });

  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    stockAlerts: true,
    orderUpdates: true,
    newsletter: false,
    promotions: true
  });

  const sections = [
    { id: 'profile', name: 'Profile', icon: 'User' },
    { id: 'security', name: 'Security', icon: 'Shield' },
    { id: 'notifications', name: 'Notifications', icon: 'Bell' },
    { id: 'preferences', name: 'Preferences', icon: 'Settings' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          />
          <Input
            label="Last Name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          />
          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            className="md:col-span-2"
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Shipping Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Address"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            className="md:col-span-2"
          />
          <Input
            label="City"
            value={formData?.city}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
          />
          <Input
            label="Postal Code"
            value={formData?.postalCode}
            onChange={(e) => handleInputChange('postalCode', e?.target?.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="default">
          <Icon name="Save" size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Password & Security</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Password</p>
              <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Login Sessions</p>
              <p className="text-sm text-muted-foreground">Manage your active sessions</p>
            </div>
            <Button variant="outline" size="sm">
              View Sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h4>
        <div className="space-y-4">
          {Object.entries(notifications)?.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground capitalize">
                  {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {key === 'priceAlerts' && 'Get notified when prices drop on your watchlist'}
                  {key === 'stockAlerts' && 'Alerts when out-of-stock items become available'}
                  {key === 'orderUpdates' && 'Updates about your order status and shipping'}
                  {key === 'newsletter' && 'Weekly newsletter with collecting tips and trends'}
                  {key === 'promotions' && 'Special offers and exclusive deals'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNotificationChange(key, e?.target?.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Display Preferences</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Currency</p>
              <p className="text-sm text-muted-foreground">Choose your preferred currency</p>
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
              <option value="SGD">SGD (Singapore Dollar)</option>
              <option value="USD">USD (US Dollar)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Language</p>
              <p className="text-sm text-muted-foreground">Select your preferred language</p>
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Theme</p>
              <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg card-shadow">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-border">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>
            <nav className="space-y-1">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section?.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span>{section?.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {activeSection === 'profile' && renderProfileSection()}
          {activeSection === 'security' && renderSecuritySection()}
          {activeSection === 'notifications' && renderNotificationsSection()}
          {activeSection === 'preferences' && renderPreferencesSection()}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;