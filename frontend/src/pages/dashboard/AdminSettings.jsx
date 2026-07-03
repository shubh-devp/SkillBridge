import { useState } from 'react';
import { Save, Globe, Mail, Bell, Shield, CreditCard, Palette, Languages } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved successfully');
    }, 800);
  };

  return (
    <div className="pb-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground/70 mt-0.5">Manage platform configuration</p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/5"><Globe className="w-4 h-4 text-primary" /></div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Platform Settings</h2>
            <p className="text-xs text-muted-foreground/70">General platform configuration</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Platform Name</Label>
            <Input defaultValue="SkillBridge" />
          </div>
          <div className="space-y-1.5">
            <Label>Support Email</Label>
            <Input defaultValue="support@skillbridge.in" />
          </div>
          <div className="space-y-1.5">
            <Label>Default Currency</Label>
            <Select defaultValue="inr">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="inr">INR (₹)</SelectItem>
                <SelectItem value="usd">USD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Timezone</Label>
            <Select defaultValue="ist">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/5"><Bell className="w-4 h-4 text-primary" /></div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
            <p className="text-xs text-muted-foreground/70">Configure email and platform notifications</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          {[
            { label: 'New user registrations', desc: 'Get notified when someone signs up' },
            { label: 'New course submissions', desc: 'When a teacher submits a new course for review' },
            { label: 'Payment notifications', desc: 'Receipts, refunds, and payout alerts' },
            { label: 'System alerts', desc: 'Server issues, errors, and maintenance notices' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground/70">{item.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/5"><Shield className="w-4 h-4 text-primary" /></div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Security</h2>
            <p className="text-xs text-muted-foreground/70">Security and access control</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
              <p className="text-xs text-muted-foreground/70">Require 2FA for admin accounts</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Maintenance mode</p>
              <p className="text-xs text-muted-foreground/70">Disable user access during maintenance</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2" isLoading={saving}>
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      </div>
    </div>
  );
}
