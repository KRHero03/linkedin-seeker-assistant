import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Play,
  Pause,
  MoreVertical,
  Users,
  MessageSquare,
  TrendingUp,
  MapPin,
  Building2,
  Briefcase,
  Calendar,
  ChevronRight,
  Sparkles,
  Edit3,
  Trash2,
  Copy,
} from 'lucide-react';
import { mockOutreachConfigs, mockRecruiters } from '../mockData';

const statusColors = {
  active: 'bg-li-success-bg text-li-success border-li-success/20',
  paused: 'bg-li-warning-bg text-li-warning border-li-warning/20',
  completed: 'bg-blue-50 text-linkedin-blue border-linkedin-blue/20',
  draft: 'bg-li-bg-secondary text-li-text-secondary border-li-border',
};

export default function CampaignsView() {
  const [selectedCampaign, setSelectedCampaign] = useState(mockOutreachConfigs[0]);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [campaignStatus, setCampaignStatus] = useState<'active' | 'paused'>('active');

  const toggleCampaignStatus = () => {
    setCampaignStatus(campaignStatus === 'active' ? 'paused' : 'active');
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Campaigns List */}
      <div className="col-span-1 space-y-4">
        <div className="li-card">
          <div className="p-4 border-b border-li-border flex items-center justify-between">
            <h3 className="font-semibold text-li-text-primary">Your Campaigns</h3>
            <button className="li-btn-primary text-sm py-1.5 px-3">
              + New
            </button>
          </div>

          <div className="p-2">
            {mockOutreachConfigs.map((campaign) => (
              <motion.button
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign)}
                className={`w-full p-3 rounded-lg text-left transition-all mb-1 ${
                  selectedCampaign.id === campaign.id
                    ? 'bg-blue-50 border border-linkedin-blue'
                    : 'hover:bg-li-bg-secondary border border-transparent'
                }`}
                whileHover={{ x: 2 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linkedin-blue flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-li-text-primary">{campaign.name}</h4>
                      <p className="text-xs text-li-text-secondary mt-0.5">
                        {campaign.targetCompanies.length} companies
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusColors[campaignStatus]}`}>
                    {campaignStatus}
                  </span>
                </div>
              </motion.button>
            ))}

            {/* Demo additional campaign */}
            <motion.button
              className="w-full p-3 rounded-lg hover:bg-li-bg-secondary border border-transparent text-left transition-all"
              whileHover={{ x: 2 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-li-premium-gold flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-li-text-primary">Startup Exploration</h4>
                    <p className="text-xs text-li-text-secondary mt-0.5">8 companies</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusColors.draft}`}>
                  draft
                </span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="col-span-2 space-y-4">
        {/* Header */}
        <div className="li-card">
          <div className="p-4 border-b border-li-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-linkedin-blue flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-li-text-primary">{selectedCampaign.name}</h2>
                  <p className="text-sm text-li-text-secondary mt-0.5">
                    Created {selectedCampaign.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleCampaignStatus}
                  className={`p-2 rounded-full transition-colors ${
                    campaignStatus === 'active' 
                      ? 'bg-li-warning-bg text-li-warning hover:bg-amber-100' 
                      : 'bg-li-success-bg text-li-success hover:bg-green-100'
                  }`}
                  title={campaignStatus === 'active' ? 'Pause Campaign' : 'Resume Campaign'}
                >
                  {campaignStatus === 'active' ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowMenu(showMenu ? null : 'main')}
                    className="p-2 rounded-full hover:bg-li-bg-secondary transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-li-text-secondary" />
                  </button>
                  {showMenu === 'main' && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-linkedin-hover border border-li-border py-1 z-10">
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-li-text-primary hover:bg-li-bg-secondary">
                        <Edit3 className="w-4 h-4" />
                        Edit Campaign
                      </button>
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-li-text-primary hover:bg-li-bg-secondary">
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </button>
                      <hr className="my-1 border-li-border" />
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-li-error hover:bg-li-bg-secondary">
                        <Trash2 className="w-4 h-4" />
                        Delete Campaign
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 divide-x divide-li-border">
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-li-text-secondary mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">Connections</span>
              </div>
              <p className="text-2xl font-bold text-li-text-primary">24</p>
              <p className="text-xs text-li-success">+8 this week</p>
            </div>
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-li-text-secondary mb-1">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs">Responses</span>
              </div>
              <p className="text-2xl font-bold text-linkedin-blue">12</p>
              <p className="text-xs text-li-success">50% rate</p>
            </div>
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-li-text-secondary mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs">Leads</span>
              </div>
              <p className="text-2xl font-bold text-li-premium-gold">1</p>
              <p className="text-xs text-li-text-secondary">4% conversion</p>
            </div>
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-li-text-secondary mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Credits Used</span>
              </div>
              <p className="text-2xl font-bold text-li-text-primary">24</p>
              <p className="text-xs text-li-warning">of 50 limit</p>
            </div>
          </div>
        </div>

        {/* Targeting */}
        <div className="li-card">
          <div className="p-4 border-b border-li-border">
            <h3 className="font-semibold text-li-text-primary">Targeting Criteria</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-li-text-secondary mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Locations</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedCampaign.targetCountries.map(country => (
                  <span key={country} className="px-2 py-1 rounded-full bg-li-bg-secondary text-xs text-li-text-primary">
                    {country}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-li-text-secondary mb-2">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Companies</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedCampaign.targetCompanies.map(company => (
                  <span key={company} className="px-2 py-1 rounded-full bg-li-bg-secondary text-xs text-li-text-primary">
                    {company}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-li-text-secondary mb-2">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">Roles</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedCampaign.targetRoles.map(role => (
                  <span key={role} className="px-2 py-1 rounded-full bg-li-bg-secondary text-xs text-li-text-primary">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-li-text-secondary mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Skills</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedCampaign.targetSkills.slice(0, 6).map(skill => (
                  <span key={skill} className="px-2 py-1 rounded-full bg-blue-50 text-linkedin-blue text-xs">
                    {skill}
                  </span>
                ))}
                {selectedCampaign.targetSkills.length > 6 && (
                  <span className="px-2 py-1 rounded-full bg-li-bg-secondary text-xs text-li-text-secondary">
                    +{selectedCampaign.targetSkills.length - 6} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Outreach */}
        <div className="li-card">
          <div className="p-4 border-b border-li-border flex items-center justify-between">
            <h3 className="font-semibold text-li-text-primary">Recent Outreach</h3>
            <button className="text-sm text-linkedin-blue hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-li-border">
            {mockRecruiters.slice(0, 4).map((recruiter) => (
              <div
                key={recruiter.id}
                className="flex items-center gap-4 p-4 hover:bg-li-bg-secondary transition-colors cursor-pointer"
              >
                <img
                  src={recruiter.avatar}
                  alt={recruiter.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-li-text-primary">{recruiter.name}</h4>
                  <p className="text-xs text-li-text-secondary truncate">
                    {recruiter.title} at <span className="text-linkedin-blue">{recruiter.company}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    recruiter.status === 'lead'
                      ? 'bg-amber-50 text-li-premium-gold'
                      : recruiter.status === 'responded'
                      ? 'bg-li-success-bg text-li-success'
                      : recruiter.status === 'connected'
                      ? 'bg-blue-50 text-linkedin-blue'
                      : 'bg-li-bg-secondary text-li-text-secondary'
                  }`}>
                    {recruiter.status}
                  </span>
                  <p className="text-xs text-li-text-secondary mt-1">
                    {recruiter.matchScore}% match
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Temperature */}
        <div className="li-card overflow-hidden">
          <div className="p-4 border-b border-li-border bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-linkedin-blue flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-li-text-primary">Agent Autonomy</h3>
                <p className="text-sm text-li-text-secondary">Temperature: {(selectedCampaign.temperature * 100).toFixed(0)}%</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-li-text-secondary">Manual</span>
              <div className="flex-1 h-2 bg-li-bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-linkedin-blue rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedCampaign.temperature * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs text-li-text-secondary">Autopilot</span>
            </div>
            <p className="text-xs text-li-text-secondary mt-3">
              At 70%, your agent handles routine responses automatically but asks for approval on important decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Click outside handler for menu */}
      {showMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowMenu(null)} />
      )}
    </div>
  );
}
