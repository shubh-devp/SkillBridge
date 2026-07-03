import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/services/auth.service';
import { cn } from '@/lib/utils';

const resetSchema = z.object({
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Must contain an uppercase letter').regex(/[a-z]/, 'Must contain a lowercase letter').regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data) => {
    if (!token) { toast.error('Invalid reset link'); return; }
    setIsSubmitting(true);
    try {
      await resetPassword(token, data.password);
      setSuccess(true);
      toast.success('Password reset successfully');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-5 text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Password reset successful</h1>
          <p className="mt-1 text-sm text-muted-foreground/70">Your password has been updated. Sign in with your new password.</p>
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
        <h1 className="text-xl font-bold text-foreground">Reset your password</h1>
        <p className="mt-1 text-sm text-muted-foreground/70">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/40" />
            <Input id="new-password" type={showPassword ? 'text' : 'password'} className={cn('pl-9 pr-9', errors.password && 'border-destructive')} aria-invalid={!!errors.password} {...register('password')} autoComplete="new-password" placeholder="New password" />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors" aria-label={showPassword ? 'Hide password' : 'Show password'} tabIndex={-1}>
              {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm-new-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/40" />
            <Input id="confirm-new-password" type={showConfirm ? 'text' : 'password'} className={cn('pl-9 pr-9', errors.confirmPassword && 'border-destructive')} aria-invalid={!!errors.confirmPassword} {...register('confirmPassword')} autoComplete="new-password" placeholder="Confirm new password" />
            <button type="button" onClick={() => setShowConfirm((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors" aria-label={showConfirm ? 'Hide password' : 'Show password'} tabIndex={-1}>
              {showConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
          Reset Password
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
