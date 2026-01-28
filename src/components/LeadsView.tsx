import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Star,
  MessageSquare,
  Calendar,
  ExternalLink,
  MapPin,
  ChevronRight,
  Clock,
  CheckCircle2,
  TrendingUp,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { mockLeads } from '../mockData';

const priorityColors = {
  high: 'bg-li-error-bg text-li-error border-li-error/20',
  medium: 'bg-li-warning-bg text-li-warning border-li-warning/20',
  low: 'bg-li-success-bg text-li-success border-li-success/20',
};

export default function LeadsView() {
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'score'>('date');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [expandedLead, setExpandedLead] = useState<string | null>(mockLeads[0]?.id || null);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="li-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-li-premium-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-li-text-primary">{mockLeads.length}</p>
              <p className="text-xs text-li-text-secondary">Total Leads</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="li-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-li-error flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-li-text-primary">1</p>
              <p className="text-xs text-li-text-secondary">High Priority</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="li-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-li-success flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-li-text-primary">0</p>
              <p className="text-xs text-li-text-secondary">Followed Up</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="li-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linkedin-blue flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-li-text-primary">4%</p>
              <p className="text-xs text-li-text-secondary">Conversion Rate</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="li-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-li-text-secondary" />
              <span className="text-sm text-li-text-secondary">Filter:</span>
              {(['all', 'high', 'medium', 'low'] as const).map((priority) => (
                <button
                  key={priority}
                  onClick={() => setFilterPriority(priority)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    filterPriority === priority
                      ? 'bg-linkedin-blue text-white'
                      : 'bg-li-bg-secondary text-li-text-secondary hover:bg-li-bg-tertiary'
                  }`}
                >
                  {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-li-text-secondary" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'score')}
              className="text-sm bg-transparent border-none text-li-text-primary focus:outline-none cursor-pointer"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="score">Sort by Match Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="grid grid-cols-2 gap-4">
        {mockLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`li-card overflow-hidden cursor-pointer transition-shadow ${
              expandedLead === lead.id ? 'shadow-linkedin-hover' : ''
            }`}
            onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
          >
            {/* Header */}
            <div className="p-4 border-b border-li-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={lead.recruiter.avatar}
                    alt={lead.recruiter.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-li-premium-gold"
                  />
                  <div>
                    <h3 className="font-semibold text-li-text-primary">{lead.recruiter.name}</h3>
                    <p className="text-sm text-li-text-secondary">{lead.recruiter.title}</p>
                    <p className="text-sm text-linkedin-blue font-medium">{lead.recruiter.company}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold border ${priorityColors[lead.priority]}`}>
                  {lead.priority.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="p-4 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-li-text-secondary" />
                <span className="text-li-text-primary">{lead.recruiter.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-li-text-secondary" />
                <span className="text-li-text-primary">
                  {lead.convertedAt.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-li-premium-gold" />
                <span className="text-li-text-primary">{lead.recruiter.matchScore}% Match</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-li-text-secondary" />
                <span className="text-li-text-primary">
                  {lead.conversation.messages.length} messages
                </span>
              </div>
            </div>

            {/* AI Notes */}
            <div className="px-4 pb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-white border border-linkedin-blue/10">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3 h-3 text-linkedin-blue" />
                  <span className="text-xs font-semibold text-linkedin-blue">AI Notes</span>
                </div>
                <p className="text-sm text-li-text-primary">{lead.notes}</p>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedLead === lead.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-li-border"
              >
                {/* Key Takeaways */}
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-li-text-primary mb-2">Key Takeaways</h4>
                  <ul className="space-y-1">
                    {lead.conversation.keyPoints?.slice(0, 3).map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-li-success mt-0.5 flex-shrink-0" />
                        <span className="text-li-text-primary">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggested Actions */}
                <div className="px-4 pb-4">
                  <div className="p-3 rounded-lg bg-li-warning-bg border border-li-warning/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3 h-3 text-li-warning" />
                      <span className="text-xs font-semibold text-li-warning">Suggested Actions</span>
                    </div>
                    <ul className="space-y-1">
                      {lead.conversation.nextSteps?.slice(0, 2).map((step, i) => (
                        <li key={i} className="text-sm text-li-text-primary flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-li-warning text-white text-xs flex items-center justify-center font-bold">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contact Options */}
                <div className="p-4 bg-li-bg-secondary border-t border-li-border">
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full bg-linkedin-blue text-white font-semibold text-sm hover:bg-linkedin-blue-dark transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      View Conversation
                    </button>
                    <button className="p-2 rounded-full border border-li-border hover:bg-white transition-colors">
                      <ExternalLink className="w-4 h-4 text-li-text-secondary" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Empty State / Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="li-card p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-li-border"
        >
          <div className="w-14 h-14 rounded-full bg-li-bg-secondary flex items-center justify-center mb-3">
            <Sparkles className="w-7 h-7 text-li-text-secondary" />
          </div>
          <h3 className="font-semibold text-li-text-primary">More Leads Coming</h3>
          <p className="text-sm text-li-text-secondary mt-1 max-w-xs">
            Your AI assistant is actively working on converting more conversations into leads.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-li-text-secondary">
            <div className="w-2 h-2 rounded-full bg-li-success animate-pulse" />
            6 conversations in progress
          </div>
        </motion.div>
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="li-card"
      >
        <div className="p-4 border-b border-li-border bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linkedin-blue flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-li-text-primary">Lead Conversion Tips</h3>
              <p className="text-sm text-li-text-secondary">AI recommendations based on your performance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-li-border">
          <div className="p-4 hover:bg-li-bg-secondary transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-li-success" />
              <span className="text-sm font-medium text-li-success">Best Performing</span>
            </div>
            <p className="text-sm text-li-text-primary">
              Messages mentioning <strong>specific projects</strong> have a 40% higher response rate.
            </p>
          </div>
          <div className="p-4 hover:bg-li-bg-secondary transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-linkedin-blue" />
              <span className="text-sm font-medium text-linkedin-blue">Optimal Timing</span>
            </div>
            <p className="text-sm text-li-text-primary">
              Recruiters are most responsive between <strong>10 AM - 2 PM</strong> Pacific Time.
            </p>
          </div>
          <div className="p-4 hover:bg-li-bg-secondary transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-li-premium-gold" />
              <span className="text-sm font-medium text-li-premium-gold">Pro Tip</span>
            </div>
            <p className="text-sm text-li-text-primary">
              Follow up within <strong>24 hours</strong> of being marked as a lead for best results.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
