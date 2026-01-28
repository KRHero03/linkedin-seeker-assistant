import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Clock,
  Shield,
  Bell,
  Sliders,
  AlertCircle,
  Info,
  Save,
  RefreshCw,
  Check,
  ChevronRight,
} from 'lucide-react';
import { mockAgentSettings } from '../mockData';

export default function SettingsView() {
  const [settings, setSettings] = useState(mockAgentSettings);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    newLead: true,
    connectionAccepted: true,
    newMessage: true,
    dailySummary: false,
    creditAlerts: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getTemperatureLabel = (temp: number) => {
    if (temp <= 0.3) return { label: 'Manual Review', color: 'text-linkedin-blue', desc: 'You review every message' };
    if (temp <= 0.7) return { label: 'Balanced', color: 'text-li-warning', desc: 'AI handles routine responses' };
    return { label: 'Autopilot', color: 'text-li-success', desc: 'AI operates independently' };
  };

  const tempInfo = getTemperatureLabel(settings.temperature);

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Temperature Control */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="li-card"
      >
        <div className="p-4 border-b border-li-border bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linkedin-blue flex items-center justify-center">
              <Sliders className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-li-text-primary">Agent Autonomy (Temperature)</h3>
              <p className="text-sm text-li-text-secondary">Control how independently your AI assistant operates</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="p-4 rounded-lg bg-li-bg-secondary mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-li-text-primary">{(settings.temperature * 100).toFixed(0)}%</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  settings.temperature > 0.7
                    ? 'bg-li-success-bg text-li-success'
                    : settings.temperature > 0.3
                    ? 'bg-li-warning-bg text-li-warning'
                    : 'bg-blue-50 text-linkedin-blue'
                }`}>
                  {tempInfo.label}
                </span>
              </div>
              <p className="text-sm text-li-text-secondary">{tempInfo.desc}</p>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={settings.temperature * 100}
              onChange={(e) => setSettings({ ...settings, temperature: parseInt(e.target.value) / 100 })}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-li-border"
              style={{
                background: `linear-gradient(to right, #0A66C2 0%, #0A66C2 ${settings.temperature * 100}%, #E0DFDC ${settings.temperature * 100}%, #E0DFDC 100%)`,
              }}
            />

            <div className="flex items-center justify-between mt-2 text-xs text-li-text-secondary">
              <span>0% - Manual</span>
              <span>50% - Balanced</span>
              <span>100% - Autopilot</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSettings({ ...settings, temperature: 0.2 })}
              className={`p-3 rounded-lg border text-left transition-all ${
                settings.temperature <= 0.3
                  ? 'border-linkedin-blue bg-blue-50'
                  : 'border-li-border hover:border-li-border-dark'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${settings.temperature <= 0.3 ? 'bg-linkedin-blue' : 'bg-li-text-secondary'}`} />
                <span className="font-medium text-sm text-li-text-primary">Manual</span>
              </div>
              <p className="text-xs text-li-text-secondary">
                Review every message before sending
              </p>
            </button>
            <button
              onClick={() => setSettings({ ...settings, temperature: 0.5 })}
              className={`p-3 rounded-lg border text-left transition-all ${
                settings.temperature > 0.3 && settings.temperature <= 0.7
                  ? 'border-li-warning bg-li-warning-bg'
                  : 'border-li-border hover:border-li-border-dark'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${settings.temperature > 0.3 && settings.temperature <= 0.7 ? 'bg-li-warning' : 'bg-li-text-secondary'}`} />
                <span className="font-medium text-sm text-li-text-primary">Balanced</span>
              </div>
              <p className="text-xs text-li-text-secondary">
                AI handles routine, you review key decisions
              </p>
            </button>
            <button
              onClick={() => setSettings({ ...settings, temperature: 0.9 })}
              className={`p-3 rounded-lg border text-left transition-all ${
                settings.temperature > 0.7
                  ? 'border-li-success bg-li-success-bg'
                  : 'border-li-border hover:border-li-border-dark'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${settings.temperature > 0.7 ? 'bg-li-success' : 'bg-li-text-secondary'}`} />
                <span className="font-medium text-sm text-li-text-primary">Autopilot</span>
              </div>
              <p className="text-xs text-li-text-secondary">
                AI operates fully, alerts only for leads
              </p>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Auto Respond Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="li-card"
      >
        <div className="p-4 border-b border-li-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-li-success flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-li-text-primary">Auto-Response Settings</h3>
              <p className="text-sm text-li-text-secondary">Configure how your AI responds to messages</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-li-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-li-text-secondary" />
              <div>
                <p className="font-medium text-sm text-li-text-primary">Auto-respond to messages</p>
                <p className="text-xs text-li-text-secondary">Let AI reply to recruiter messages automatically</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, autoRespond: !settings.autoRespond })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.autoRespond ? 'bg-linkedin-blue' : 'bg-li-border'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${
                settings.autoRespond ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-li-text-secondary" />
              <div>
                <p className="font-medium text-sm text-li-text-primary">Working Hours Only</p>
                <p className="text-xs text-li-text-secondary">Only send messages during business hours</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={settings.workingHours.start}
                onChange={(e) => setSettings({
                  ...settings,
                  workingHours: { ...settings.workingHours, start: e.target.value }
                })}
                className="px-2 py-1 rounded border border-li-border text-sm bg-white text-li-text-primary focus:outline-none focus:border-linkedin-blue"
              />
              <span className="text-li-text-secondary">to</span>
              <input
                type="time"
                value={settings.workingHours.end}
                onChange={(e) => setSettings({
                  ...settings,
                  workingHours: { ...settings.workingHours, end: e.target.value }
                })}
                className="px-2 py-1 rounded border border-li-border text-sm bg-white text-li-text-primary focus:outline-none focus:border-linkedin-blue"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-li-text-secondary" />
              <div>
                <p className="font-medium text-sm text-li-text-primary">Max Daily Outreach</p>
                <p className="text-xs text-li-text-secondary">Limit connection requests per day</p>
              </div>
            </div>
            <input
              type="number"
              value={settings.maxDailyOutreach}
              onChange={(e) => setSettings({ ...settings, maxDailyOutreach: parseInt(e.target.value) })}
              className="w-16 px-2 py-1 rounded border border-li-border text-sm text-center bg-white text-li-text-primary focus:outline-none focus:border-linkedin-blue"
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-li-text-secondary" />
              <div>
                <p className="font-medium text-sm text-li-text-primary">Cooldown Period</p>
                <p className="text-xs text-li-text-secondary">Days before re-contacting declined connections</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={settings.cooldownPeriodDays}
                onChange={(e) => setSettings({ ...settings, cooldownPeriodDays: parseInt(e.target.value) })}
                className="w-16 px-2 py-1 rounded border border-li-border text-sm text-center bg-white text-li-text-primary focus:outline-none focus:border-linkedin-blue"
              />
              <span className="text-sm text-li-text-secondary">days</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Privacy Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="li-card"
      >
        <div className="p-4 border-b border-li-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-li-text-primary">Privacy & Consent</h3>
              <p className="text-sm text-li-text-secondary">Control how others can interact with you</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="p-3 rounded-lg bg-li-warning-bg border border-li-warning/20 mb-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-li-warning mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm text-li-warning">Recruiter Setting</p>
                <p className="text-xs text-li-text-primary mt-0.5">
                  If you're a recruiter, you can opt-out of being contacted by AI agents. This setting is respected across LinkedIn.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-li-bg-secondary transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-li-text-secondary" />
              <div>
                <p className="font-medium text-sm text-li-text-primary">Allow Agent Contact</p>
                <p className="text-xs text-li-text-secondary">Allow other AI assistants to reach out to me</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, allowAgentContact: !settings.allowAgentContact })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.allowAgentContact ? 'bg-linkedin-blue' : 'bg-li-border'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${
                settings.allowAgentContact ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-start gap-2 p-3 mt-2 rounded-lg bg-blue-50">
            <Info className="w-4 h-4 text-linkedin-blue mt-0.5 flex-shrink-0" />
            <p className="text-xs text-li-text-secondary">
              Your data is encrypted and processed in compliance with LinkedIn's privacy policy. AI-generated messages are clearly marked as automated communications.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="li-card"
      >
        <div className="p-4 border-b border-li-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-li-error flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-li-text-primary">Notifications</h3>
              <p className="text-sm text-li-text-secondary">Choose what alerts you receive</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-li-border">
          {[
            { key: 'newLead', label: 'New lead generated', description: 'When a conversation is converted to a lead' },
            { key: 'connectionAccepted', label: 'Connection accepted', description: 'When a recruiter accepts your connection' },
            { key: 'newMessage', label: 'New message received', description: 'When a recruiter sends a message' },
            { key: 'dailySummary', label: 'Daily summary', description: 'Daily report of your outreach activity' },
            { key: 'creditAlerts', label: 'Credit alerts', description: 'When your credits are running low' },
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 hover:bg-li-bg-secondary transition-colors">
              <div>
                <p className="font-medium text-sm text-li-text-primary">{notification.label}</p>
                <p className="text-xs text-li-text-secondary">{notification.description}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ 
                  ...prev, 
                  [notification.key]: !prev[notification.key as keyof typeof prev] 
                }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  notifications[notification.key as keyof typeof notifications] ? 'bg-linkedin-blue' : 'bg-li-border'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${
                  notifications[notification.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <button
          onClick={handleSave}
          className={`px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all ${
            saved
              ? 'bg-li-success text-white'
              : 'bg-linkedin-blue text-white hover:bg-linkedin-blue-dark'
          }`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
