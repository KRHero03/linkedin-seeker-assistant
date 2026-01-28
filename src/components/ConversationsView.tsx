import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw,
  AlertCircle,
  Check,
} from 'lucide-react';
import { mockConversations } from '../mockData';
import { Conversation } from '../types';

export default function ConversationsView() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messageFeedback, setMessageFeedback] = useState<{ [key: string]: 'up' | 'down' | null }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sentimentColors = {
    positive: 'text-li-success bg-li-success-bg',
    neutral: 'text-li-text-secondary bg-li-bg-secondary',
    negative: 'text-li-error bg-li-error-bg',
  };

  const handleFeedback = (messageId: string, type: 'up' | 'down') => {
    setMessageFeedback(prev => ({
      ...prev,
      [messageId]: prev[messageId] === type ? null : type
    }));
  };

  const handleCopy = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage('');
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-[calc(100vh-14rem)] min-h-[500px]">
      {/* Conversations List */}
      <div className="col-span-4 li-card flex flex-col overflow-hidden">
        <div className="p-4 border-b border-li-border flex items-center justify-between flex-shrink-0">
          <h3 className="font-semibold text-li-text-primary">Conversations</h3>
          <span className="px-2 py-0.5 rounded-full bg-linkedin-blue text-white text-xs font-medium">
            {mockConversations.length} active
          </span>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {mockConversations.map((conversation) => (
            <motion.button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full p-4 text-left transition-all border-b border-li-border ${
                selectedConversation?.id === conversation.id
                  ? 'bg-blue-50 border-l-2 border-l-linkedin-blue'
                  : 'hover:bg-li-bg-secondary'
              }`}
              whileHover={{ x: 2 }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={conversation.recruiter.avatar}
                    alt={conversation.recruiter.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    conversation.sentiment === 'positive' ? 'bg-li-success' :
                    conversation.sentiment === 'negative' ? 'bg-li-error' : 'bg-li-text-secondary'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-li-text-primary truncate">{conversation.recruiter.name}</h4>
                    <span className="text-xs text-li-text-secondary">
                      {conversation.messages[conversation.messages.length - 1]?.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-linkedin-blue font-medium">
                    {conversation.recruiter.company}
                  </p>
                  <p className="text-xs text-li-text-secondary truncate mt-0.5">
                    {conversation.messages[conversation.messages.length - 1]?.content.slice(0, 40)}...
                  </p>
                </div>
              </div>
              {conversation.status === 'converted' && (
                <div className="mt-2 px-2 py-1 rounded bg-amber-50 text-li-premium-gold text-xs font-medium inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Lead Generated
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="col-span-5 li-card flex flex-col overflow-hidden">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-li-border flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation.recruiter.avatar}
                    alt={selectedConversation.recruiter.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-sm text-li-text-primary">{selectedConversation.recruiter.name}</h4>
                    <p className="text-xs text-li-text-secondary">
                      {selectedConversation.recruiter.title} at <span className="text-linkedin-blue">{selectedConversation.recruiter.company}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${sentimentColors[selectedConversation.sentiment]}`}>
                    {selectedConversation.sentiment}
                  </span>
                  {selectedConversation.status === 'converted' && (
                    <span className="px-2 py-1 rounded bg-amber-50 text-li-premium-gold text-xs font-medium">
                      Lead
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-li-bg-secondary min-h-0">
              {selectedConversation.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.isAgent ? '' : 'flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isAgent
                      ? 'bg-linkedin-blue'
                      : ''
                  }`}>
                    {message.isAgent ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <img
                        src={message.senderAvatar}
                        alt={message.senderName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div className={`max-w-[75%] ${message.isAgent ? '' : 'text-right'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-li-text-primary">
                        {message.isAgent ? 'Seeker AI' : message.senderName}
                      </span>
                      <span className="text-xs text-li-text-secondary">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.isAgent
                        ? 'bg-white border border-linkedin-blue/20'
                        : 'bg-white border border-li-border'
                    }`}>
                      <p className="text-sm text-li-text-primary">{message.content}</p>
                    </div>
                    {message.isAgent && (
                      <div className="flex items-center gap-1 mt-1">
                        <button 
                          onClick={() => handleFeedback(message.id, 'up')}
                          className={`p-1 rounded transition-colors ${
                            messageFeedback[message.id] === 'up' 
                              ? 'text-li-success bg-li-success-bg' 
                              : 'text-li-text-secondary hover:bg-li-bg-secondary'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleFeedback(message.id, 'down')}
                          className={`p-1 rounded transition-colors ${
                            messageFeedback[message.id] === 'down' 
                              ? 'text-li-error bg-li-error-bg' 
                              : 'text-li-text-secondary hover:bg-li-bg-secondary'
                          }`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleCopy(message.id, message.content)}
                          className={`p-1 rounded transition-colors ${
                            copiedId === message.id
                              ? 'text-li-success'
                              : 'text-li-text-secondary hover:bg-li-bg-secondary'
                          }`}
                        >
                          {copiedId === message.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                        <button className="p-1 text-li-text-secondary hover:bg-li-bg-secondary rounded transition-colors">
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-li-border bg-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message or let AI respond..."
                    className="w-full px-4 py-2.5 pr-10 rounded-full li-input"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-linkedin-blue hover:text-linkedin-blue-dark transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={handleSendMessage}
                  className="p-2.5 rounded-full bg-linkedin-blue text-white hover:bg-linkedin-blue-dark transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-li-text-secondary mt-2 flex items-center gap-1">
                <Bot className="w-3 h-3" />
                AI is handling this conversation at 70% autonomy
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-li-text-secondary mx-auto mb-3" />
              <p className="text-li-text-secondary">Select a conversation to view</p>
            </div>
          </div>
        )}
      </div>

      {/* Insights Panel */}
      <div className="col-span-3 space-y-4 overflow-y-auto min-h-0">
        {selectedConversation && (
          <>
            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="li-card"
            >
              <div className="p-3 border-b border-li-border flex items-center gap-2 bg-gradient-to-r from-blue-50 to-white">
                <Sparkles className="w-4 h-4 text-linkedin-blue" />
                <h4 className="font-semibold text-sm text-li-text-primary">AI Summary</h4>
              </div>
              <div className="p-3">
                <p className="text-sm text-li-text-primary">
                  {selectedConversation.summary}
                </p>
              </div>
            </motion.div>

            {/* Key Points */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="li-card"
            >
              <div className="p-3 border-b border-li-border flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-li-success" />
                <h4 className="font-semibold text-sm text-li-text-primary">Key Points</h4>
              </div>
              <div className="p-3">
                <ul className="space-y-2">
                  {selectedConversation.keyPoints?.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-li-text-primary">
                      <ChevronRight className="w-4 h-4 text-li-success mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="li-card"
            >
              <div className="p-3 border-b border-li-border flex items-center gap-2">
                <Clock className="w-4 h-4 text-li-premium-gold" />
                <h4 className="font-semibold text-sm text-li-text-primary">Next Steps</h4>
              </div>
              <div className="p-3">
                <ul className="space-y-2">
                  {selectedConversation.nextSteps?.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-li-text-primary">
                      <span className="w-5 h-5 rounded-full bg-amber-50 text-li-premium-gold text-xs flex items-center justify-center flex-shrink-0 font-semibold">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Action Required */}
            {selectedConversation.status === 'converted' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="li-card li-premium-bg"
              >
                <div className="p-3 border-b border-li-premium-gold/20 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-li-premium-gold" />
                  <h4 className="font-semibold text-sm text-li-premium-gold">Action Required</h4>
                </div>
                <div className="p-3">
                  <p className="text-sm text-li-text-primary mb-3">
                    This conversation has been marked as a lead. Ready to take over?
                  </p>
                  <button className="w-full py-2 rounded-full bg-li-premium-gold text-white font-semibold hover:bg-amber-600 transition-colors text-sm">
                    Take Over Conversation
                  </button>
                </div>
              </motion.div>
            )}

            {/* Recruiter Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="li-card"
            >
              <div className="p-3 border-b border-li-border flex items-center gap-2">
                <User className="w-4 h-4 text-linkedin-blue" />
                <h4 className="font-semibold text-sm text-li-text-primary">Recruiter Profile</h4>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={selectedConversation.recruiter.avatar}
                    alt={selectedConversation.recruiter.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-semibold text-sm text-li-text-primary">{selectedConversation.recruiter.name}</h5>
                    <p className="text-xs text-li-text-secondary">{selectedConversation.recruiter.title}</p>
                    <p className="text-xs text-linkedin-blue font-medium">{selectedConversation.recruiter.company}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-li-text-secondary">Location</span>
                    <span className="text-li-text-primary">{selectedConversation.recruiter.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-li-text-secondary">Match Score</span>
                    <span className="text-li-success font-semibold">{selectedConversation.recruiter.matchScore}%</span>
                  </div>
                </div>
                <button className="w-full mt-3 py-1.5 text-xs font-semibold text-linkedin-blue border border-linkedin-blue rounded-full hover:bg-blue-50 transition-colors">
                  View Full Profile
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
