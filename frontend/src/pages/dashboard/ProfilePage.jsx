import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/store/auth-context';
import { updateProfile } from '@/services/auth.service';
import { cn } from '@/lib/utils';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian phone number').optional().or(z.literal('')),
});

export default function ProfilePage() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await updateProfile(data);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-8 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground/70 mt-0.5">Manage your personal information</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-14 h-14">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-muted text-muted-foreground/70 text-lg font-medium">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{user?.name || 'User'}</p>
            <p className="text-sm text-muted-foreground/70">{user?.email || ''}</p>
            <p className="text-xs text-muted-foreground/50 capitalize mt-0.5">{user?.role || ''}</p>
          </div>
        </div>

        <Separator className="mb-6" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input
                id="profile-name"
                className={cn(errors.name && 'border-destructive')}
                aria-invalid={!!errors.name}
                {...register('name')}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" value={user?.email || ''} disabled className="bg-muted/50" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-phone">Phone</Label>
              <Input
                id="profile-phone"
                type="tel"
                maxLength={10}
                className={cn(errors.phone && 'border-destructive')}
                aria-invalid={!!errors.phone}
                {...register('phone')}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-role">Role</Label>
              <Input id="profile-role" value={user?.role || ''} disabled className="bg-muted/50 capitalize" />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="gap-2" isLoading={isSubmitting} disabled={isSubmitting}>
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
