import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Phone, Lock, Eye, EyeOff, GraduationCap, Presentation, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/store/auth-context';
import { cn } from '@/lib/utils';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone is required').regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian phone number'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Must contain an uppercase letter').regex(/[a-z]/, 'Must contain a lowercase letter').regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  role: z.enum(['student', 'teacher'], { required_error: 'Please select a role' }),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: 'bg-muted' };
  let score = 0;
  if (password.length >= 8) score += 2;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 2;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 2;
  if (/[^A-Za-z0-9]/.test(password)) score += 2;
  if (score <= 3) return { score, label: 'Weak', color: 'bg-destructive' };
  if (score <= 5) return { score, label: 'Fair', color: 'bg-accent' };
  if (score <= 7) return { score, label: 'Good', color: 'bg-primary' };
  return { score, label: 'Strong', color: 'bg-emerald-500' };
}

const passwordRequirements = [
  { label: '8+ characters', test: (pw) => pw.length >= 8 },
  { label: 'Uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'Lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { label: 'One number', test: (pw) => /[0-9]/.test(pw) },
];

const roles = [
  { value: 'student', label: 'Student', icon: GraduationCap, desc: 'Access courses, track progress, take tests' },
  { value: 'teacher', label: 'Teacher / Educator', icon: Presentation, desc: 'Create courses, manage students, earn revenue' },
];

export default function Register() {
  const { isAuthenticated, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '', role: undefined, acceptTerms: false },
  });

  const passwordValue = watch('password');
  const acceptTermsValue = watch('acceptTerms');
  const selectedRole = watch('role');

  const strength = useMemo(() => getPasswordStrength(passwordValue || ''), [passwordValue]);
  const requirements = useMemo(() => passwordRequirements.map((r) => ({ ...r, met: r.test(passwordValue || '') })), [passwordValue]);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { confirmPassword, acceptTerms, ...payload } = data;
      await registerUser(payload);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground/70">Join thousands of learners on SkillBridge</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-wider mb-3">Personal Information</p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" className={cn(errors.name && 'border-destructive')} aria-invalid={!!errors.name} {...register('name')} autoComplete="name" placeholder="John Doe" />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" className={cn(errors.email && 'border-destructive')} aria-invalid={!!errors.email} {...register('email')} autoComplete="email" placeholder="you@example.com" />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" className={cn(errors.phone && 'border-destructive')} aria-invalid={!!errors.phone} {...register('phone')} autoComplete="tel" maxLength={10} placeholder="9876543210" />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-wider mb-3">Security</p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="reg-password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/40" />
                <Input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  className={cn('pl-9 pr-9', errors.password && 'border-destructive')}
                  aria-invalid={!!errors.password}
                  {...register('password')}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors" aria-label={showPassword ? 'Hide password' : 'Show password'} tabIndex={-1}>
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>

              {passwordValue && (
                <div className="space-y-2 pt-1">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div className={cn('h-full rounded-full', strength.color)} initial={{ width: '0%' }} animate={{ width: strength.label === 'Strong' ? '100%' : strength.label === 'Good' ? '75%' : strength.label === 'Fair' ? '50%' : '25%' }} transition={{ duration: 0.25 }} />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {requirements.map((req) => (
                      <div key={req.label} className="flex items-center gap-1.5">
                        <div className={cn('w-3 h-3 rounded-full border', req.met ? 'bg-emerald-500 border-emerald-500' : 'border-muted-foreground/20')}>
                          {req.met && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </div>
                        <span className={cn('text-[10px]', req.met ? 'text-emerald-600 font-medium' : 'text-muted-foreground/40')}>{req.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/40" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={cn('pl-9 pr-9', errors.confirmPassword && 'border-destructive')}
                  aria-invalid={!!errors.confirmPassword}
                  {...register('confirmPassword')}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                />
                <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors" aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} tabIndex={-1}>
                  {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-wider mb-3">Account Type</p>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((role) => {
              const isSelected = selectedRole === role.value;
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setValue('role', role.value, { shouldValidate: true })}
                  className={cn(
                    'relative rounded-lg border p-3.5 text-left transition-all',
                    isSelected ? 'border-primary bg-primary/5' : 'border-border/60 bg-surface hover:border-border',
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-all',
                    isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground/60',
                  )}>
                    <role.icon className="w-4 h-4" />
                  </div>
                  <p className={cn('text-xs font-semibold', isSelected ? 'text-primary' : 'text-foreground')}>{role.label}</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5 leading-snug">{role.desc}</p>
                </button>
              );
            })}
          </div>
          {errors.role && <p className="mt-1.5 text-xs text-destructive">{errors.role.message}</p>}
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <Checkbox
            id="acceptTerms"
            checked={acceptTermsValue}
            onCheckedChange={(checked) => setValue('acceptTerms', checked === true, { shouldValidate: true })}
            className={cn(errors.acceptTerms && 'border-destructive')}
            aria-invalid={!!errors.acceptTerms}
          />
          <Label htmlFor="acceptTerms" className="cursor-pointer text-xs font-normal leading-5 text-muted-foreground/70">
            I agree to the{' '}
            <Link to="/terms" className="font-medium text-primary hover:text-primary/80 transition-colors">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="font-medium text-primary hover:text-primary/80 transition-colors">Privacy Policy</Link>
          </Label>
        </div>
        {errors.acceptTerms && <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>}

        <Button type="submit" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
          Create Account
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground/70">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
