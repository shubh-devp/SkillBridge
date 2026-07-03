import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Send, Facebook, Twitter,
  Instagram, Linkedin, Youtube, CheckCircle, AlertCircle,
  Building2, MessageSquare, ChevronDown, Sparkles, X,
  IndianRupee,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHeader from '@/components/shared/PageHeader';
import Section from '@/components/shared/Section';
import { cn } from '@/lib/utils';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Address',
    lines: ['SkillBridge Tower, Plot No. 42', 'Sector 62, Noida', 'Uttar Pradesh 201301, India'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    title: 'Phone Number',
    lines: ['Toll Free: 1800-123-456', 'Mobile: +91 98765 43210', 'WhatsApp: +91 98765 43210'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Mail,
    title: 'Email Address',
    lines: ['support@skillbridge.in', 'admissions@skillbridge.in', 'careers@skillbridge.in'],
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Mon-Fri: 6:00 AM - 10:00 PM', 'Saturday: 7:00 AM - 8:00 PM', 'Sunday: 8:00 AM - 6:00 PM'],
    color: 'from-orange-500 to-amber-500',
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-[#1877F2]' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-[#E4405F]' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-[#0A66C2]' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-[#FF0000]' },
];

const courseInterests = [
  'JEE Advanced', 'JEE Main', 'NEET UG', 'CBSE Class 12', 'CBSE Class 10',
  'Programming', 'Skill Development', 'Other',
];

const subjects = [
  'Admission Inquiry', 'Course Information', 'Fee & Payment',
  'Technical Support', 'Partnership Inquiry', 'Career', 'Other',
];

function InfoCard({ icon: Icon, title, lines, color }) {
  return (
    <Card className="border-0 shadow-lg shadow-primary/5 rounded-2xl overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={cn('w-11 h-11 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg', color)}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground text-sm mb-1.5">{title}</h3>
            {lines.map((line, i) => (
              <p key={i} className="text-sm text-muted-foreground">{line}</p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    courseInterest: [],
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Please enter a valid email address';
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) errs.phone = 'Please enter a valid phone number';
    if (!formData.subject) errs.subject = 'Please select a subject';
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleCourseInterest = (course) => {
    setFormData((prev) => ({
      ...prev,
      courseInterest: prev.courseInterest.includes(course)
        ? prev.courseInterest.filter((c) => c !== course)
        : [...prev.courseInterest, course],
    }));
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', subject: '', courseInterest: [], message: '' });
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            Get in Touch
            <Sparkles className="w-6 h-6 text-accent" />
          </span>
        }
        subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact' },
        ]}
      />

      <Section className="pt-0 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="card-premium rounded-2xl p-10 md:p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Thank you for reaching out to SkillBridge. Our team will review your message and get back to you within 24 hours during business days.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="rounded-xl border-2"
                    >
                      Send Another Message
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/'}
                      className="bg-primary hover:bg-primary/90 text-white rounded-xl"
                    >
                      Back to Home
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="border-0 shadow-xl shadow-primary/5 rounded-2xl">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="text-xl font-semibold text-card-foreground mb-2">Send Us a Message</h2>
                      <p className="text-sm text-muted-foreground mb-6">Fill in the form below and we'll get back to you shortly.</p>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-foreground">
                              Full Name <span className="text-destructive">*</span>
                            </label>
                            <Input
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={handleChange('name')}
                              className={cn('rounded-xl', errors.name && 'border-destructive')}
                            />
                            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-foreground">
                              Email Address <span className="text-destructive">*</span>
                            </label>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={handleChange('email')}
                              className={cn('rounded-xl', errors.email && 'border-destructive')}
                            />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-foreground">Phone Number</label>
                            <Input
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={handleChange('phone')}
                              className={cn('rounded-xl', errors.phone && 'border-destructive')}
                            />
                            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-foreground">
                              Subject <span className="text-destructive">*</span>
                            </label>
                            <Select
                              value={formData.subject}
                              onValueChange={(v) => {
                                setFormData((prev) => ({ ...prev, subject: v }));
                                if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                              }}
                            >
                              <SelectTrigger className={cn('h-10 rounded-xl', errors.subject && 'border-destructive')}>
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                              <SelectContent>
                                {subjects.map((s) => (
                                  <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                          </div>
                        </div>

                        {/* Course Interest - Multi-select Tags */}
                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-foreground">Course Interest (Optional)</label>
                          <div className="flex flex-wrap gap-2">
                            {courseInterests.map((course) => (
                              <button
                                key={course}
                                type="button"
                                onClick={() => toggleCourseInterest(course)}
                                className={cn(
                                  'px-3 py-1.5 rounded-xl text-xs font-medium transition-all border',
                                  formData.courseInterest.includes(course)
                                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                    : 'bg-card text-muted-foreground border-muted hover:border-primary/30',
                                )}
                              >
                                {course}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-foreground">
                            Message <span className="text-destructive">*</span>
                          </label>
                          <Textarea
                            placeholder="Tell us how we can help you..."
                            value={formData.message}
                            onChange={handleChange('message')}
                            rows={5}
                            className={cn('rounded-xl resize-none', errors.message && 'border-destructive')}
                          />
                          {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl h-12"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </span>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <InfoCard key={info.title} {...info} />
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="rounded-2xl overflow-hidden border-0 shadow-lg shadow-primary/5">
              <div className="h-52 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.04] via-transparent to-transparent" />
                <div className="text-center relative z-10">
                  <Building2 className="w-12 h-12 text-primary/30 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">SkillBridge Campus Map</p>
                    <p className="text-[10px] text-muted-foreground">Sector 62, Noida, UP 201301</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-card-foreground">Visit Our Campus</h3>
                    <p className="text-xs text-muted-foreground">SkillBridge Tower, Sector 62, Noida</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">Open Now</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="rounded-2xl border-0 shadow-lg shadow-primary/5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-card-foreground text-sm">Follow Us</h3>
                  <span className="text-[10px] text-muted-foreground">Stay connected</span>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={cn(
                        'w-10 h-10 rounded-xl bg-muted/50 border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:text-white hover:scale-110 hover:-translate-y-0.5',
                        social.color,
                      )}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Response */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Quick Response Time</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We typically respond within 24 hours on business days. For urgent inquiries, please call our toll-free number <strong className="text-foreground">1800-123-456</strong>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
