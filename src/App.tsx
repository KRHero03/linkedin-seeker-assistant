import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Rocket,
  Target,
  MessageSquare,
  Users,
  Settings,
  Coins,
  Sparkles,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Search,
  Home,
  Briefcase,
  Menu,
  X,
  Crown,
} from 'lucide-react';
import { ViewType } from './types';
import { mockUser } from './mockData';
import Dashboard from './components/Dashboard';
import OutreachWizard from './components/OutreachWizard';
import CampaignsView from './components/CampaignsView';
import ConversationsView from './components/ConversationsView';
import LeadsView from './components/LeadsView';
import SettingsView from './components/SettingsView';
import CreditsView from './components/CreditsView';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'outreach', label: 'New Outreach', icon: Rocket },
  { id: 'campaigns', label: 'Campaigns', icon: Target },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare, badge: 3 },
  { id: 'leads', label: 'Leads', icon: Users, badge: 1 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'credits', label: 'Credits', icon: Coins },
];

function App() {
  // Get initial view from URL hash
  const getViewFromHash = (): ViewType => {
    const hash = window.location.hash.slice(1);
    const validViews: ViewType[] = ['dashboard', 'outreach', 'campaigns', 'conversations', 'leads', 'settings', 'credits'];
    return validViews.includes(hash as ViewType) ? (hash as ViewType) : 'dashboard';
  };

  const [currentView, setCurrentView] = useState<ViewType>(getViewFromHash());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNudge, setShowNudge] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'lead', message: 'Sarah Chen from Google is interested in your profile!', time: '2h ago', read: false },
    { id: 2, type: 'connection', message: 'Michael Roberts accepted your connection request', time: '5h ago', read: false },
    { id: 3, type: 'message', message: 'New response from Emily Watson at Netflix', time: '1d ago', read: true },
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sync URL hash with view for easy screenshot navigation
  useEffect(() => {
    window.location.hash = currentView;
  }, [currentView]);

  useEffect(() => {
    const handleHashChange = () => {
      const newView = getViewFromHash();
      setCurrentView(newView);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const markNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onStartOutreach={() => setCurrentView('outreach')} />;
      case 'outreach':
        return <OutreachWizard onComplete={() => setCurrentView('campaigns')} />;
      case 'campaigns':
        return <CampaignsView />;
      case 'conversations':
        return <ConversationsView />;
      case 'leads':
        return <LeadsView />;
      case 'settings':
        return <SettingsView />;
      case 'credits':
        return <CreditsView />;
      default:
        return <Dashboard onStartOutreach={() => setCurrentView('outreach')} />;
    }
  };

  return (
    <div className="min-h-screen bg-li-bg-secondary text-li-text-primary">
      {/* LinkedIn-style Top Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-li-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left side - Logo & Search */}
            <div className="flex items-center gap-2">
              {/* LinkedIn Logo */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-linkedin-blue rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">in</span>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative ml-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-li-text-secondary" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-64 pl-9 pr-4 py-2 bg-li-bg-tertiary rounded-md text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-linkedin-blue/20"
                />
              </div>
            </div>

            {/* Center - Main Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { icon: Home, label: 'Home', active: false },
                { icon: Users, label: 'My Network', active: false },
                { icon: Briefcase, label: 'Jobs', active: false },
                { icon: MessageSquare, label: 'Messaging', active: false },
                { icon: Bell, label: 'Notifications', active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex flex-col items-center px-4 py-2 text-li-text-secondary hover:text-li-text-primary transition-colors ${
                    item.active ? 'text-li-text-primary border-b-2 border-li-text-primary' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs mt-0.5">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right side - Premium + Profile */}
            <div className="flex items-center gap-4">
              {/* Premium Plus Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-li-premium-gold/30 rounded-full">
                <Crown className="w-4 h-4 text-li-premium-gold" />
                <span className="text-xs font-semibold text-li-premium-gold">Premium Plus</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-full hover:bg-li-bg-secondary transition-colors"
                >
                  <Bell className="w-5 h-5 text-li-text-secondary" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-linkedin-hover border border-li-border overflow-hidden"
                    >
                      <div className="p-4 border-b border-li-border flex items-center justify-between">
                        <h3 className="font-semibold">Notifications</h3>
                        <button 
                          onClick={markAllNotificationsRead}
                          className="text-sm text-linkedin-blue hover:underline"
                        >
                          Mark all read
                        </button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                          <button
                            key={notif.id}
                            onClick={() => markNotificationRead(notif.id)}
                            className={`w-full p-4 text-left hover:bg-li-bg-secondary transition-colors border-b border-li-border ${
                              !notif.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                !notif.read ? 'bg-linkedin-blue' : 'bg-transparent'
                              }`} />
                              <div>
                                <p className="text-sm text-li-text-primary">{notif.message}</p>
                                <p className="text-xs text-li-text-secondary mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 rounded hover:bg-li-bg-secondary transition-colors"
                >
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="hidden sm:flex items-center gap-1">
                    <span className="text-xs text-li-text-secondary">Me</span>
                    <ChevronDown className={`w-4 h-4 text-li-text-secondary transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-linkedin-hover border border-li-border overflow-hidden"
                    >
                      <div className="p-4 border-b border-li-border">
                        <div className="flex items-center gap-3">
                          <img
                            src={mockUser.avatar}
                            alt={mockUser.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold">{mockUser.name}</p>
                            <p className="text-sm text-li-text-secondary">Software Engineer</p>
                          </div>
                        </div>
                        <button className="w-full mt-3 py-1.5 text-sm font-semibold text-linkedin-blue border border-linkedin-blue rounded-full hover:bg-blue-50 transition-colors">
                          View Profile
                        </button>
                      </div>
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-li-text-primary hover:bg-li-bg-secondary rounded transition-colors">
                          <User className="w-4 h-4" />
                          Settings & Privacy
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-li-text-primary hover:bg-li-bg-secondary rounded transition-colors">
                          <Coins className="w-4 h-4" />
                          Credits: <span className="text-linkedin-blue font-semibold">{mockUser.credits}</span>
                        </button>
                        <hr className="my-2 border-li-border" />
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-li-text-primary hover:bg-li-bg-secondary rounded transition-colors">
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 transition-all duration-300`}>
            <div className="sticky top-20">
              {/* Profile Card */}
              <div className="li-card overflow-hidden mb-4">
                {/* Cover */}
                <div className="h-14 bg-gradient-to-r from-linkedin-blue to-linkedin-blue-dark" />
                {/* Profile */}
                <div className="px-4 pb-4">
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-16 h-16 rounded-full border-2 border-white -mt-8 relative"
                  />
                  {!sidebarCollapsed && (
                    <>
                      <h3 className="font-semibold mt-2">{mockUser.name}</h3>
                      <p className="text-sm text-li-text-secondary">Software Engineer seeking new opportunities</p>
                      
                      {/* Premium Plus Badge */}
                      <div className="mt-3 flex items-center gap-2 px-3 py-2 li-premium-bg rounded-lg">
                        <Crown className="w-5 h-5 text-li-premium-gold" />
                        <div>
                          <p className="text-sm font-semibold text-li-premium-gold">Premium Plus</p>
                          <p className="text-xs text-li-text-secondary">Seeker Assistant active</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Seeker Assistant Nav */}
              <div className="li-card p-2">
                <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} p-3 mb-2`}>
                  {!sidebarCollapsed && (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-linkedin-blue" />
                      <span className="font-semibold text-sm">Seeker Assistant</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-1 hover:bg-li-bg-secondary rounded transition-colors"
                  >
                    {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => setCurrentView(item.id as ViewType)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-blue-50 text-linkedin-blue border-l-2 border-linkedin-blue'
                            : 'text-li-text-secondary hover:bg-li-bg-secondary hover:text-li-text-primary'
                        }`}
                        whileHover={{ x: sidebarCollapsed ? 0 : 2 }}
                        whileTap={{ scale: 0.98 }}
                        title={sidebarCollapsed ? item.label : undefined}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-linkedin-blue' : ''}`} />
                        {!sidebarCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.badge && (
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                item.id === 'leads' 
                                  ? 'bg-li-success text-white' 
                                  : 'bg-linkedin-blue text-white'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Credits Indicator */}
                {!sidebarCollapsed && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-li-premium-gold/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-li-text-secondary">Outreach Credits</span>
                      <span className="text-sm font-bold text-li-premium-gold">{mockUser.credits}/{mockUser.maxCredits}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-li-premium-gold to-li-premium-gold-light rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(mockUser.credits / mockUser.maxCredits) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <button
                      onClick={() => setCurrentView('credits')}
                      className="w-full mt-2 text-xs font-semibold text-li-premium-gold hover:underline"
                    >
                      Get More Credits →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Nudge Banner */}
            <AnimatePresence>
              {showNudge && currentView === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="li-card p-4 mb-4 border-l-4 border-linkedin-blue bg-gradient-to-r from-blue-50 to-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-linkedin-blue flex items-center justify-center pulse-glow">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
      <div>
                        <h3 className="font-semibold text-li-text-primary">Ready to accelerate your job search?</h3>
                        <p className="text-sm text-li-text-secondary">Let your AI assistant reach out to recruiters for you. Start a new outreach campaign!</p>
                      </div>
      </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCurrentView('outreach')}
                        className="li-btn-primary"
                      >
                        Start Outreach
                      </button>
                      <button
                        onClick={() => setShowNudge(false)}
                        className="p-2 text-li-text-secondary hover:bg-li-bg-secondary rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
        </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* View Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Click outside handlers */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
