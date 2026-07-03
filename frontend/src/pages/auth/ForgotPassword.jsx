import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPassword } from '@/services/auth.service';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const [emailError, setEmailError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) { setEmailError('Email is required'); return; }
    if (!emailRegex.test(email)) { setEmailError('Please enter a valid email'); return; }
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      setSent(true);
      toast.success('Reset link sent to your email');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to send reset link');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="space-y-5 text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Check your email</h1>
          <p className="mt-1 text-sm text-muted-foreground/70">
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </p>
        </div>
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Forgot password?</h1>
        <p className="mt-1 text-sm text-muted-foreground/70">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/40" />
            <Input
              id="email"
              type="email"
              className={cn('pl-9', emailError && 'border-destructive')}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              required
              autoComplete="email"
            />
          </div>
          {emailError && <p className="text-xs text-destructive">{emailError}</p>}
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
          Send Reset Link
        </Button>
      </form>

      <div className="text-center">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
      </div>
    </div>
  );
}
