import { Link } from 'react-router-dom';
import {
  GraduationCap, Mail, Phone, MapPin, Youtube, Instagram,
  Twitter, Linkedin, Facebook,
} from 'lucide-react';

const quickLinks = [
  { label: 'Courses', path: '/courses' },
  { label: 'Teachers', path: '/teachers' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const contactInfo = [
  { icon: Phone, value: '1800-123-456 (Toll Free)', href: 'tel:+911800123456' },
  { icon: Mail, value: 'hello@skillbridge.in', href: 'mailto:hello@skillbridge.in' },
  { icon: MapPin, value: 'SkillBridge Tower, Sector 62, Noida, UP 201301' },
];

const socialLinks = [
  { icon: Youtube, href: 'https://youtube.com/@skillbridge', label: 'YouTube' },
  { icon: Instagram, href: 'https://instagram.com/skillbridge', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/skillbridge', label: 'Twitter/X' },
  { icon: Linkedin, href: 'https://linkedin.com/company/skillbridge', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com/skillbridge', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-foreground">
                Skill<span className="text-primary">Bridge</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
              India&apos;s premier online learning platform. Empowering over 50,000 students with expert-led courses for academic and career success.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-muted/80 text-muted-foreground flex items-center justify-center transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              {contactInfo.map((item) => (
                <div key={item.value} className="flex items-start gap-2.5">
                  <item.icon className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                  {item.href ? (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
