import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coins,
  Sparkles,
  Check,
  Star,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  CreditCard,
  Gift,
  ChevronRight,
  X,
  Crown,
} from 'lucide-react';
import { mockUser, mockCreditPackages } from '../mockData';

export default function CreditsView() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className="space-y-4">
      {/* Current Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="li-card li-premium-bg"
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-li-premium-gold to-amber-600 flex items-center justify-center">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-li-text-secondary mb-1">Your Credit Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-li-text-primary">{mockUser.credits}</span>
                  <span className="text-li-text-secondary">/ {mockUser.maxCredits} credits</span>
                </div>
                <p className="text-sm text-li-premium-gold mt-1 flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  ≈ {mockUser.credits} more recruiters you can reach
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="w-40 h-2 bg-white rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-li-premium-gold to-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(mockUser.credits / mockUser.maxCredits) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-li-text-secondary mt-2">
                Credits refresh monthly with Premium Plus
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pricing Packages */}
      <div>
        <h3 className="text-lg font-semibold text-li-text-primary mb-4">Buy More Credits</h3>
        <div className="grid grid-cols-3 gap-4">
          {mockCreditPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`relative li-card p-5 cursor-pointer transition-all ${
                selectedPackage === pkg.id
                  ? 'border-2 border-linkedin-blue shadow-linkedin-hover'
                  : pkg.popular
                  ? 'border border-li-premium-gold'
                  : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-li-premium-gold text-white text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-4 pt-2">
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                  pkg.popular
                    ? 'bg-li-premium-gold'
                    : pkg.id === 'cp3'
                    ? 'bg-purple-500'
                    : 'bg-linkedin-blue'
                }`}>
                  {pkg.id === 'cp1' && <Zap className="w-6 h-6 text-white" />}
                  {pkg.id === 'cp2' && <Star className="w-6 h-6 text-white" />}
                  {pkg.id === 'cp3' && <Shield className="w-6 h-6 text-white" />}
                </div>
                <h4 className="text-lg font-bold text-li-text-primary">{pkg.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-li-text-primary">${pkg.price}</span>
                </div>
                <p className="text-sm text-li-text-secondary mt-1">{pkg.credits} credits</p>
              </div>

              <ul className="space-y-2 mb-4">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 ${pkg.popular ? 'text-li-premium-gold' : 'text-li-success'}`} />
                    <span className="text-li-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPackage(pkg.id);
                  setShowPayment(true);
                }}
                className={`w-full py-2.5 rounded-full font-semibold text-sm transition-all ${
                  selectedPackage === pkg.id || pkg.popular
                    ? 'bg-linkedin-blue text-white hover:bg-linkedin-blue-dark'
                    : 'border border-linkedin-blue text-linkedin-blue hover:bg-blue-50'
                }`}
              >
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Credit History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="li-card"
      >
        <div className="p-4 border-b border-li-border flex items-center justify-between">
          <h3 className="font-semibold text-li-text-primary">Credit History</h3>
          <button className="text-sm text-linkedin-blue hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-li-border">
          {[
            { type: 'used', amount: -3, description: 'Outreach to 3 recruiters', date: 'Today', icon: TrendingUp },
            { type: 'used', amount: -5, description: 'Outreach to 5 recruiters', date: 'Yesterday', icon: TrendingUp },
            { type: 'added', amount: +100, description: 'Monthly Premium Plus refresh', date: 'Jan 1, 2026', icon: Gift },
            { type: 'used', amount: -45, description: 'December outreach activity', date: 'Dec 31, 2025', icon: TrendingUp },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-li-bg-secondary transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === 'added' ? 'bg-li-success-bg' : 'bg-li-bg-secondary'
                  }`}>
                    <Icon className={`w-5 h-5 ${item.type === 'added' ? 'text-li-success' : 'text-li-text-secondary'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-li-text-primary">{item.description}</p>
                    <p className="text-xs text-li-text-secondary">{item.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${item.type === 'added' ? 'text-li-success' : 'text-li-text-secondary'}`}>
                  {item.amount > 0 ? '+' : ''}{item.amount}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Why Credits Info */}
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
              <h3 className="font-semibold text-li-text-primary">Why Credits?</h3>
              <p className="text-sm text-li-text-secondary">Keeping LinkedIn authentic and spam-free</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-li-border">
          <div className="p-4">
            <Shield className="w-6 h-6 text-li-success mb-2" />
            <p className="font-medium text-sm text-li-text-primary mb-1">Spam Prevention</p>
            <p className="text-xs text-li-text-secondary">
              Credits ensure meaningful, targeted outreach rather than mass messaging.
            </p>
          </div>
          <div className="p-4">
            <TrendingUp className="w-6 h-6 text-linkedin-blue mb-2" />
            <p className="font-medium text-sm text-li-text-primary mb-1">Quality Connections</p>
            <p className="text-xs text-li-text-secondary">
              Limited credits encourage thoughtful selection of who to reach out to.
            </p>
          </div>
          <div className="p-4">
            <Clock className="w-6 h-6 text-li-premium-gold mb-2" />
            <p className="font-medium text-sm text-li-text-primary mb-1">Fair Platform</p>
            <p className="text-xs text-li-text-secondary">
              Ensures recruiters aren't overwhelmed and can respond to genuine candidates.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPayment(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-li-text-primary">Complete Purchase</h3>
                <button 
                  onClick={() => setShowPayment(false)}
                  className="p-1 hover:bg-li-bg-secondary rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-li-text-secondary" />
                </button>
              </div>

              <div className="text-center mb-4">
                <div className="w-14 h-14 mx-auto rounded-xl bg-linkedin-blue flex items-center justify-center mb-3">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <p className="text-li-text-secondary">
                  {mockCreditPackages.find(p => p.id === selectedPackage)?.name} Package
                </p>
              </div>

              <div className="p-4 rounded-lg bg-li-bg-secondary mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-li-text-secondary">Credits</span>
                  <span className="font-bold text-li-text-primary">
                    {mockCreditPackages.find(p => p.id === selectedPackage)?.credits}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-li-text-secondary">Total</span>
                  <span className="text-2xl font-bold text-li-text-primary">
                    ${mockCreditPackages.find(p => p.id === selectedPackage)?.price}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full px-4 py-2.5 rounded-lg li-input"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-4 py-2.5 rounded-lg li-input"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="px-4 py-2.5 rounded-lg li-input"
                  />
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowPayment(false);
                  // Show success state
                }}
                className="w-full py-3 rounded-full bg-linkedin-blue text-white font-bold hover:bg-linkedin-blue-dark transition-colors"
              >
                Pay ${mockCreditPackages.find(p => p.id === selectedPackage)?.price}
              </button>

              <p className="text-xs text-li-text-secondary text-center mt-4 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Secured by LinkedIn Payment Services
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
