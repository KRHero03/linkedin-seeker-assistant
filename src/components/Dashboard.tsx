import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  MessageSquare,
  Target,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Hourglass,
  ChevronRight,
  Zap,
  Calendar,
  Eye,
  ThumbsUp,
} from 'lucide-react';
import { mockRecruiters, mockLeads, mockOutreachConfigs } from '../mockData';

interface DashboardProps {
  onStartOutreach: () => void;
}

const statusIcons = {
  pending: { icon: Hourglass, color: 'text-li-text-secondary', bg: 'bg-gray-100' },
  connected: { icon: CheckCircle2, color: 'text-linkedin-blue', bg: 'bg-blue-50' },
  responded: { icon: MessageSquare, color: 'text-li-success', bg: 'bg-li-success-bg' },
  lead: { icon: Sparkles, color: 'text-li-premium-gold', bg: 'bg-amber-50' },
  cooldown: { icon: Clock, color: 'text-li-warning', bg: 'bg-li-warning-bg' },
  declined: { icon: XCircle, color: 'text-li-error', bg: 'bg-li-error-bg' },
};

export default function Dashboard({ onStartOutreach }: DashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');
  const [showAllRecruiters, setShowAllRecruiters] = useState(false);

  const stats = [
    {
      label: 'Active Campaigns',
      value: '1',
      change: '+1 this week',
      icon: Target,
      color: 'bg-linkedin-blue',
    },
    {
      label: 'Connections Sent',
      value: '24',
      change: '+8 this week',
      icon: Users,
      color: 'bg-li-success',
    },
    {
      label: 'Conversations',
      value: '6',
      change: '+3 this week',
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
    {
      label: 'Leads Generated',
      value: '1',
      change: '+1 this week',
      icon: TrendingUp,
      color: 'bg-li-premium-gold',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const displayedRecruiters = showAllRecruiters ? mockRecruiters : mockRecruiters.slice(0, 4);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="li-card p-4 card-hover cursor-pointer"
              onClick={() => {
                if (stat.label === 'Leads Generated') onStartOutreach();
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-li-text-secondary">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1 text-li-text-primary">{stat.value}</p>
                  <p className="text-xs text-li-success mt-2 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Active Campaign */}
        <motion.div variants={itemVariants} className="col-span-2 li-card">
          <div className="p-4 border-b border-li-border flex items-center justify-between">
            <h3 className="font-semibold text-li-text-primary">Active Campaign</h3>
            <span className="px-3 py-1 rounded-full bg-li-success-bg text-li-success text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-li-success animate-pulse" />
              Running
            </span>
          </div>

          {mockOutreachConfigs.length > 0 ? (
            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-linkedin-blue flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-li-text-primary">{mockOutreachConfigs[0].name}</h4>
                  <p className="text-sm text-li-text-secondary">
                    Targeting {mockOutreachConfigs[0].targetCompanies.slice(0, 3).join(', ')}
                    {mockOutreachConfigs[0].targetCompanies.length > 3 && ` +${mockOutreachConfigs[0].targetCompanies.length - 3} more`}
                  </p>
                </div>
                <button className="li-btn-secondary text-sm">
                  View Details
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 mt-4">
                <div className="p-3 rounded-lg bg-li-bg-secondary text-center">
                  <p className="text-2xl font-bold text-li-text-primary">24</p>
                  <p className="text-xs text-li-text-secondary">Sent</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 text-center">
                  <p className="text-2xl font-bold text-linkedin-blue">12</p>
                  <p className="text-xs text-li-text-secondary">Connected</p>
                </div>
                <div className="p-3 rounded-lg bg-li-success-bg text-center">
                  <p className="text-2xl font-bold text-li-success">6</p>
                  <p className="text-xs text-li-text-secondary">Responded</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 text-center">
                  <p className="text-2xl font-bold text-li-premium-gold">1</p>
                  <p className="text-xs text-li-text-secondary">Leads</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-li-text-secondary">Campaign Progress</span>
                  <span className="font-medium text-li-text-primary">24/50 connections</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-linkedin-blue rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '48%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-li-bg-secondary flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-li-text-secondary" />
              </div>
              <p className="text-li-text-secondary mb-4">No active campaigns</p>
              <button onClick={onStartOutreach} className="li-btn-primary">
                Start Your First Outreach
              </button>
            </div>
          )}
        </motion.div>

        {/* Hot Leads */}
        <motion.div variants={itemVariants} className="li-card">
          <div className="p-4 border-b border-li-border flex items-center justify-between">
            <h3 className="font-semibold text-li-text-primary flex items-center gap-2">
              Hot Leads 
              <span className="text-lg">🔥</span>
            </h3>
            <span className="text-sm text-li-text-secondary">{mockLeads.length} total</span>
          </div>

          {mockLeads.length > 0 ? (
            <div className="p-4 space-y-3">
              {mockLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 rounded-lg li-premium-bg cursor-pointer hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={lead.recruiter.avatar}
                      alt={lead.recruiter.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-li-premium-gold"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-li-text-primary truncate">{lead.recruiter.name}</h4>
                      <p className="text-xs text-li-text-secondary truncate">
                        {lead.recruiter.title}
                      </p>
                      <p className="text-xs text-linkedin-blue font-medium">
                        {lead.recruiter.company}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded bg-li-premium-gold text-white text-xs font-semibold">
                      HIGH
                    </span>
                  </div>
                  <p className="text-xs text-li-text-secondary mt-2 line-clamp-2">{lead.notes}</p>
                  <button className="w-full mt-2 py-1.5 text-xs font-semibold text-linkedin-blue border border-linkedin-blue rounded-full hover:bg-blue-50 transition-colors">
                    View Conversation
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Sparkles className="w-10 h-10 text-li-text-secondary mx-auto mb-3" />
              <p className="text-sm text-li-text-secondary">No leads yet. Keep going!</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="li-card">
        <div className="p-4 border-b border-li-border flex items-center justify-between">
          <h3 className="font-semibold text-li-text-primary">Recent Recruiter Activity</h3>
          <div className="flex items-center gap-2">
            {(['week', 'month', 'all'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-linkedin-blue text-white'
                    : 'text-li-text-secondary hover:bg-li-bg-secondary'
                }`}
              >
                {timeframe === 'week' ? 'This Week' : timeframe === 'month' ? 'This Month' : 'All Time'}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-li-border">
          {displayedRecruiters.map((recruiter, index) => {
            const statusConfig = statusIcons[recruiter.status];
            const StatusIcon = statusConfig.icon;
            return (
              <motion.div
                key={recruiter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 hover:bg-li-bg-secondary transition-colors cursor-pointer"
              >
                <img
                  src={recruiter.avatar}
                  alt={recruiter.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-li-text-primary">{recruiter.name}</h4>
                    <span className="text-xs text-li-text-secondary">•</span>
                    <span className="text-xs text-linkedin-blue font-medium">{recruiter.company}</span>
                  </div>
                  <p className="text-sm text-li-text-secondary truncate">{recruiter.title}</p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusConfig.bg}`}>
                      <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.color}`} />
                      <span className={`text-xs font-medium capitalize ${statusConfig.color}`}>
                        {recruiter.status}
                      </span>
                    </div>
                    <p className="text-xs text-li-text-secondary mt-1">
                      {recruiter.matchScore}% match
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-li-text-secondary" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {mockRecruiters.length > 4 && (
          <div className="p-4 border-t border-li-border">
            <button
              onClick={() => setShowAllRecruiters(!showAllRecruiters)}
              className="w-full py-2 text-sm font-semibold text-linkedin-blue hover:bg-blue-50 rounded-lg transition-colors"
            >
              {showAllRecruiters ? 'Show Less' : `Show All ${mockRecruiters.length} Recruiters`}
            </button>
          </div>
        )}
      </motion.div>

      {/* AI Insights */}
      <motion.div variants={itemVariants} className="li-card overflow-hidden">
        <div className="p-4 border-b border-li-border bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linkedin-blue flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-li-text-primary">AI Insights</h3>
              <p className="text-sm text-li-text-secondary">Personalized recommendations from your Seeker Assistant</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-li-border">
          <div className="p-4 hover:bg-li-bg-secondary transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-li-success" />
              <span className="text-sm font-medium text-li-success">Best Time</span>
            </div>
            <p className="text-sm text-li-text-primary">
              Your response rate is <strong>25% higher</strong> when reaching out on Tuesday mornings.
            </p>
          </div>
          <div className="p-4 hover:bg-li-bg-secondary transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-linkedin-blue" />
              <span className="text-sm font-medium text-linkedin-blue">Top Match</span>
            </div>
            <p className="text-sm text-li-text-primary">
              Recruiters from <strong>Netflix</strong> have a 40% higher response rate to your profile.
            </p>
          </div>
          <div className="p-4 hover:bg-li-bg-secondary transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-li-premium-gold" />
              <span className="text-sm font-medium text-li-premium-gold">Action Needed</span>
            </div>
            <p className="text-sm text-li-text-primary">
              <strong>3 connections</strong> are waiting for a follow-up. Reach out today!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
        <button
          onClick={onStartOutreach}
          className="li-card p-4 text-left hover:shadow-linkedin-hover transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linkedin-blue group-hover:bg-linkedin-blue-dark transition-colors flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-li-text-primary">Quick Outreach</h4>
              <p className="text-xs text-li-text-secondary">Start reaching out to recruiters</p>
            </div>
          </div>
        </button>

        <button className="li-card p-4 text-left hover:shadow-linkedin-hover transition-shadow group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-li-success group-hover:bg-green-700 transition-colors flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-li-text-primary">Review Responses</h4>
              <p className="text-xs text-li-text-secondary">3 pending AI responses</p>
            </div>
          </div>
        </button>

        <button className="li-card p-4 text-left hover:shadow-linkedin-hover transition-shadow group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500 group-hover:bg-purple-600 transition-colors flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-li-text-primary">Refine Targeting</h4>
              <p className="text-xs text-li-text-secondary">Improve your match quality</p>
            </div>
          </div>
        </button>
      </motion.div>
    </motion.div>
  );
}
