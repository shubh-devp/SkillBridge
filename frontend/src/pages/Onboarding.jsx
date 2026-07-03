import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Target, Check, ChevronRight, Sparkles, ArrowLeft, Star, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/store/auth-context';
import { cn } from '@/lib/utils';

const learningGoals = [
  { value: 'competitive-exams', label: 'Competitive Exams', desc: 'IIT-JEE, NEET, GATE, UPSC', icon: Target },
  { value: 'board-exams', label: 'Board Exams', desc: 'CBSE, State Boards, ICSE', icon: BookOpen },
  { value: 'skill-development', label: 'Skill Development', desc: 'Programming, Data Science, AI', icon: Star },
  { value: 'academic-support', label: 'Academic Support', desc: 'School & college coursework help', icon: GraduationCap },
];

const interests = [
  { value: 'physics', label: 'Physics', emoji: '⚛️' },
  { value: 'chemistry', label: 'Chemistry', emoji: '🧪' },
  { value: 'biology', label: 'Biology', emoji: '🧬' },
  { value: 'mathematics', label: 'Mathematics', emoji: '📐' },
  { value: 'computer-science', label: 'Computer Science', emoji: '💻' },
  { value: 'history', label: 'History', emoji: '📜' },
  { value: 'english', label: 'English', emoji: '📝' },
  { value: 'economics', label: 'Economics', emoji: '📊' },
];

const steps = [
  { title: 'Welcome', subtitle: 'Let\'s get you started' },
  { title: 'Your Goal', subtitle: 'What brings you here?' },
  { title: 'Interests', subtitle: 'Pick your subjects' },
  { title: 'All Set!', subtitle: 'Your personalized experience' },
];

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (val) => {
    setSelectedInterests((prev) => prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]);
  };

  const handleComplete = () => {
    const path = user?.role === 'teacher' ? '/dashboard/teacher' : user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/student';
    navigate(path, { replace: true });
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-surface to-surface flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <Card className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-foreground">Skill<span className="text-primary">Bridge</span></span>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground/70 mb-2">
              <span>Step {step + 1} of {steps.length}</span>
              <span>{steps[step].subtitle}</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="welcome" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Rocket className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Welcome to SkillBridge!</h1>
                  <p className="text-sm text-muted-foreground/70 mt-2 max-w-sm mx-auto">
                    We're excited to have you{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! Let's personalize your learning experience in just a few steps.
                  </p>
                </div>
                <Button onClick={() => setStep(1)} className="mt-2 gap-1.5">
                  Get Started <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="goal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">What's your learning goal?</h2>
                  <p className="text-sm text-muted-foreground/70 mt-1">Choose the option that best describes you</p>
                </div>
                <div className="space-y-2.5">
                  {learningGoals.map((g) => {
                    const isSelected = goal === g.value;
                    return (
                      <button key={g.value} onClick={() => setGoal(g.value)}
                        className={cn('w-full text-left p-3.5 rounded-lg border transition-all flex items-center gap-3.5',
                          isSelected ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-border hover:bg-muted/30')}
                      >
                        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                          isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground/60')}>
                          <g.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className={cn('text-sm font-semibold', isSelected ? 'text-primary' : 'text-foreground')}>{g.label}</p>
                          <p className="text-xs text-muted-foreground/70">{g.desc}</p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2 pt-1">
                  <Button variant="ghost" onClick={() => setStep(0)} className="gap-1.5"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button onClick={() => setStep(2)} className="flex-1 gap-1.5" disabled={!goal}>
                    Continue <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="interests" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">What subjects interest you?</h2>
                  <p className="text-sm text-muted-foreground/70 mt-1">Pick at least 3 to help us recommend the best courses</p>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {interests.map((interest) => {
                    const isSelected = selectedInterests.includes(interest.value);
                    return (
                      <button key={interest.value} onClick={() => toggleInterest(interest.value)}
                        className={cn('flex items-center gap-2.5 p-3 rounded-lg border transition-all text-left',
                          isSelected ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-border hover:bg-muted/30')}
                      >
                        <span className="text-lg">{interest.emoji}</span>
                        <span className={cn('text-sm font-medium', isSelected ? 'text-primary' : 'text-foreground')}>{interest.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2 pt-1">
                  <Button variant="ghost" onClick={() => setStep(1)} className="gap-1.5"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button onClick={() => setStep(3)} className="flex-1 gap-1.5" disabled={selectedInterests.length < 3}>
                    Continue <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="complete" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-4 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">You're all set!</h2>
                  <p className="text-sm text-muted-foreground/70 mt-2 max-w-sm mx-auto">
                    We've personalized your experience based on your preferences. Here's what we've prepared:
                  </p>
                </div>
                <div className="bg-muted/40 rounded-lg p-4 space-y-2.5 text-left">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Goal:</strong> {learningGoals.find(g => g.value === goal)?.label}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Interests:</strong> {selectedInterests.length} subjects selected</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Dashboard:</strong> Curated courses & recommendations</span>
                  </div>
                </div>
                <Button onClick={handleComplete} className="gap-1.5">
                  Go to Dashboard <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}
