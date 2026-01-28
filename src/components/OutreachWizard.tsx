import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Building2,
  Briefcase,
  Code2,
  FileText,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  X,
  Loader2,
  AlertCircle,
  Info,
} from 'lucide-react';

interface OutreachWizardProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, title: 'Location', icon: MapPin, description: 'Where do you want to work?' },
  { id: 2, title: 'Companies', icon: Building2, description: 'Which companies interest you?' },
  { id: 3, title: 'Roles', icon: Briefcase, description: 'What positions are you seeking?' },
  { id: 4, title: 'Skills', icon: Code2, description: 'Highlight your expertise' },
  { id: 5, title: 'Resume', icon: FileText, description: 'Upload your credentials' },
  { id: 6, title: 'Message', icon: MessageSquare, description: 'Craft your outreach' },
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
  'Netherlands', 'Ireland', 'Singapore', 'Australia', 'India',
];

const companies = [
  { name: 'Google', logo: '🔍', employees: '150K+' },
  { name: 'Meta', logo: '📘', employees: '80K+' },
  { name: 'Apple', logo: '🍎', employees: '160K+' },
  { name: 'Amazon', logo: '📦', employees: '1.5M+' },
  { name: 'Microsoft', logo: '🪟', employees: '220K+' },
  { name: 'Netflix', logo: '🎬', employees: '12K+' },
  { name: 'Stripe', logo: '💳', employees: '8K+' },
  { name: 'Airbnb', logo: '🏠', employees: '6K+' },
  { name: 'Uber', logo: '🚗', employees: '30K+' },
  { name: 'LinkedIn', logo: '💼', employees: '20K+' },
  { name: 'Salesforce', logo: '☁️', employees: '70K+' },
  { name: 'Twitter/X', logo: '🐦', employees: '2K+' },
];

const roles = [
  'Software Engineer',
  'Senior Software Engineer',
  'Staff Engineer',
  'Principal Engineer',
  'Tech Lead',
  'Engineering Manager',
  'Full Stack Developer',
  'Frontend Engineer',
  'Backend Engineer',
  'DevOps Engineer',
  'Data Engineer',
  'ML Engineer',
];

const skills = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust',
  'React', 'Vue', 'Angular', 'Node.js', 'Django', 'FastAPI',
  'AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'Terraform',
  'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs',
  'System Design', 'Microservices', 'CI/CD',
];

export default function OutreachWizard({ onComplete }: OutreachWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    countries: [] as string[],
    companies: [] as string[],
    roles: [] as string[],
    skills: [] as string[],
    resumeName: '',
    qualifications: '',
    customMessage: '',
  });

  const toggleSelection = (field: 'countries' | 'companies' | 'roles' | 'skills', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  const generateMessage = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const selectedRoles = formData.roles.length > 0 ? formData.roles[0] : 'engineering';
      const selectedSkills = formData.skills.length > 0 ? formData.skills.slice(0, 3).join(', ') : 'software development';
      setFormData(prev => ({
        ...prev,
        customMessage: `Hi! I noticed you're hiring for ${selectedRoles} roles. I'm a passionate engineer with expertise in ${selectedSkills}. With my background in building scalable systems, I'd love to connect and learn about opportunities at your company. Looking forward to connecting!`,
      }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.countries.length > 0;
      case 2: return formData.companies.length > 0;
      case 3: return formData.roles.length > 0;
      case 4: return formData.skills.length > 0;
      case 5: return true; // Resume is optional
      case 6: return formData.customMessage.length > 20;
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-li-text-primary mb-1">Target Locations</h3>
              <p className="text-sm text-li-text-secondary">Select countries where you'd like to work</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {countries.map(country => (
                <motion.button
                  key={country}
                  onClick={() => toggleSelection('countries', country)}
                  className={`p-3 rounded-lg text-left transition-all border ${
                    formData.countries.includes(country)
                      ? 'bg-blue-50 border-linkedin-blue'
                      : 'bg-white border-li-border hover:border-li-border-dark'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${formData.countries.includes(country) ? 'text-linkedin-blue' : 'text-li-text-secondary'}`} />
                      <span className={`text-sm font-medium ${formData.countries.includes(country) ? 'text-linkedin-blue' : 'text-li-text-primary'}`}>
                        {country}
                      </span>
                    </div>
                    {formData.countries.includes(country) && (
                      <Check className="w-4 h-4 text-linkedin-blue" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            {formData.countries.length > 0 && (
              <p className="text-sm text-li-success flex items-center gap-1">
                <Check className="w-4 h-4" />
                {formData.countries.length} location{formData.countries.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-li-text-primary mb-1">Target Companies</h3>
              <p className="text-sm text-li-text-secondary">Select companies you're interested in working for</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {companies.map(company => (
                <motion.button
                  key={company.name}
                  onClick={() => toggleSelection('companies', company.name)}
                  className={`p-3 rounded-lg text-left transition-all border ${
                    formData.companies.includes(company.name)
                      ? 'bg-blue-50 border-linkedin-blue'
                      : 'bg-white border-li-border hover:border-li-border-dark'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{company.logo}</span>
                      <div>
                        <span className={`text-sm font-medium block ${formData.companies.includes(company.name) ? 'text-linkedin-blue' : 'text-li-text-primary'}`}>
                          {company.name}
                        </span>
                        <span className="text-xs text-li-text-secondary">{company.employees}</span>
                      </div>
                    </div>
                    {formData.companies.includes(company.name) && (
                      <Check className="w-4 h-4 text-linkedin-blue" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            {formData.companies.length > 0 && (
              <p className="text-sm text-li-success flex items-center gap-1">
                <Check className="w-4 h-4" />
                {formData.companies.length} compan{formData.companies.length > 1 ? 'ies' : 'y'} selected
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-li-text-primary mb-1">Target Roles</h3>
              <p className="text-sm text-li-text-secondary">What positions are you looking for?</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(role => (
                <motion.button
                  key={role}
                  onClick={() => toggleSelection('roles', role)}
                  className={`p-3 rounded-lg text-left transition-all border ${
                    formData.roles.includes(role)
                      ? 'bg-blue-50 border-linkedin-blue'
                      : 'bg-white border-li-border hover:border-li-border-dark'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className={`w-4 h-4 ${formData.roles.includes(role) ? 'text-linkedin-blue' : 'text-li-text-secondary'}`} />
                      <span className={`text-sm font-medium ${formData.roles.includes(role) ? 'text-linkedin-blue' : 'text-li-text-primary'}`}>
                        {role}
                      </span>
                    </div>
                    {formData.roles.includes(role) && (
                      <Check className="w-4 h-4 text-linkedin-blue" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            {formData.roles.length > 0 && (
              <p className="text-sm text-li-success flex items-center gap-1">
                <Check className="w-4 h-4" />
                {formData.roles.length} role{formData.roles.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-li-text-primary mb-1">Your Skills</h3>
              <p className="text-sm text-li-text-secondary">Select skills that match your expertise</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <motion.button
                  key={skill}
                  onClick={() => toggleSelection('skills', skill)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    formData.skills.includes(skill)
                      ? 'bg-linkedin-blue text-white border-linkedin-blue'
                      : 'bg-white text-li-text-primary border-li-border hover:border-linkedin-blue'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {skill}
                  {formData.skills.includes(skill) && (
                    <X className="w-3 h-3 inline ml-1" />
                  )}
                </motion.button>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-li-text-primary mb-2">Additional Qualifications</label>
              <textarea
                value={formData.qualifications}
                onChange={(e) => setFormData(prev => ({ ...prev, qualifications: e.target.value }))}
                placeholder="E.g., MS in Computer Science, 5+ years experience, Previous FAANG experience..."
                className="w-full h-20 px-3 py-2 rounded-lg li-input resize-none"
              />
            </div>
            {formData.skills.length > 0 && (
              <p className="text-sm text-li-success flex items-center gap-1">
                <Check className="w-4 h-4" />
                {formData.skills.length} skill{formData.skills.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-li-text-primary mb-1">Upload Resume</h3>
              <p className="text-sm text-li-text-secondary">Help the AI personalize your outreach (optional)</p>
            </div>
            <div 
              className="border-2 border-dashed border-li-border rounded-lg p-8 text-center hover:border-linkedin-blue transition-colors cursor-pointer"
              onClick={() => setFormData(prev => ({ ...prev, resumeName: 'Alex_Johnson_Resume_2026.pdf' }))}
            >
              <Upload className="w-10 h-10 text-li-text-secondary mx-auto mb-3" />
              <p className="font-medium text-li-text-primary">Drag & drop your resume here</p>
              <p className="text-sm text-li-text-secondary mt-1">or click to browse</p>
              <p className="text-xs text-li-text-secondary mt-3">Supports PDF, DOC, DOCX (Max 5MB)</p>
            </div>
            {formData.resumeName && (
              <div className="flex items-center gap-3 p-3 bg-li-success-bg rounded-lg border border-li-success/20">
                <FileText className="w-8 h-8 text-li-success" />
                <div className="flex-1">
                  <p className="font-medium text-li-text-primary">{formData.resumeName}</p>
                  <p className="text-sm text-li-success">Ready to use</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData(prev => ({ ...prev, resumeName: '' }));
                  }}
                  className="p-1 text-li-text-secondary hover:text-li-error transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <Info className="w-4 h-4 text-linkedin-blue mt-0.5 flex-shrink-0" />
              <p className="text-sm text-li-text-secondary">
                Your resume helps the AI craft more personalized messages by understanding your experience and achievements.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-li-text-primary mb-1">Connection Message</h3>
              <p className="text-sm text-li-text-secondary">Personalize your outreach message</p>
            </div>
            <div className="flex gap-2 mb-3">
              <button
                onClick={generateMessage}
                disabled={isGenerating}
                className="li-btn-primary flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate with AI
                  </>
                )}
              </button>
              <button className="li-btn-secondary">
                Use Template
              </button>
            </div>
            <textarea
              value={formData.customMessage}
              onChange={(e) => setFormData(prev => ({ ...prev, customMessage: e.target.value }))}
              placeholder="Write your personalized message to recruiters..."
              className="w-full h-32 px-3 py-2 rounded-lg li-input resize-none"
            />
            <div className="flex items-center justify-between text-sm">
              <span className={`${formData.customMessage.length > 300 ? 'text-li-error' : 'text-li-text-secondary'}`}>
                {formData.customMessage.length}/300 characters
              </span>
              {formData.customMessage.length >= 20 && formData.customMessage.length <= 300 && (
                <span className="text-li-success flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Good length for connection requests
                </span>
              )}
            </div>

            {/* Preview */}
            {formData.customMessage && (
              <div className="p-4 bg-li-bg-secondary rounded-lg border border-li-border">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-linkedin-blue" />
                  <span className="text-sm font-medium text-li-text-primary">Message Preview</span>
                </div>
                <div className="bg-white rounded-lg p-3 border border-li-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-linkedin-blue flex items-center justify-center text-white text-xs font-bold">
                      AJ
                    </div>
                    <div>
                      <p className="text-sm font-medium text-li-text-primary">You</p>
                      <p className="text-xs text-li-text-secondary">Just now</p>
                    </div>
                  </div>
                  <p className="text-sm text-li-text-primary whitespace-pre-wrap">
                    {formData.customMessage}
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="li-card p-8 text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-li-success-bg flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-li-success" />
        </div>
        <h2 className="text-2xl font-bold text-li-text-primary mb-2">Campaign Launched! 🎉</h2>
        <p className="text-li-text-secondary mb-4">
          Your Seeker Assistant is now reaching out to recruiters matching your criteria.
        </p>
        <div className="p-4 bg-blue-50 rounded-lg inline-block">
          <p className="text-sm text-linkedin-blue">
            You'll be notified when recruiters respond. Good luck with your job search!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="li-card">
      {/* Progress Steps */}
      <div className="p-4 border-b border-li-border">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-li-success text-white'
                        : isCurrent
                        ? 'bg-linkedin-blue text-white'
                        : 'bg-li-bg-secondary text-li-text-secondary'
                    }`}
                    animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <p className={`text-xs mt-1 font-medium ${isCurrent ? 'text-linkedin-blue' : 'text-li-text-secondary'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 mt-[-12px] ${
                    currentStep > step.id ? 'bg-li-success' : 'bg-li-border'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[350px]"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-4 border-t border-li-border bg-li-bg-secondary">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
            currentStep === 1
              ? 'text-li-text-secondary cursor-not-allowed'
              : 'text-li-text-primary hover:bg-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-li-text-secondary">
            Step {currentStep} of {steps.length}
          </span>
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all ${
              isStepValid()
                ? 'bg-linkedin-blue text-white hover:bg-linkedin-blue-dark'
                : 'bg-li-border text-li-text-secondary cursor-not-allowed'
            }`}
          >
            {currentStep === 6 ? (
              <>
                <Sparkles className="w-4 h-4" />
                Launch Campaign
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Validation Warning */}
      {!isStepValid() && (
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 text-li-warning text-sm">
            <AlertCircle className="w-4 h-4" />
            Please make a selection to continue
          </div>
        </div>
      )}
    </div>
  );
}
