import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import Section from '@/components/shared/Section';

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            Privacy Policy
            <Eye className="w-6 h-6 text-accent" />
          </span>
        }
        subtitle="How SkillBridge collects, uses, and protects your data"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Privacy Policy' },
        ]}
        size="lg"
      />

      <Section>
        <div className="max-w-3xl mx-auto prose prose-sm dark:prose-invert">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide during registration (name, email, phone number), course progress data, payment information (processed securely by third-party gateways), and usage analytics to improve your learning experience.</p>

          <h2>2. How We Use Your Information</h2>
          <p>Your data is used to deliver courses, personalise recommendations, process payments, send updates and notifications, and improve our platform. We do not sell your personal information to third parties.</p>

          <h2>3. Data Security</h2>
          <p>We implement industry-standard encryption and security measures to protect your personal data. However, no method of transmission over the internet is 100% secure.</p>

          <h2>4. Cookies</h2>
          <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyse site traffic, and deliver personalised content. You can manage cookie preferences in your browser settings.</p>

          <h2>5. Third-Party Services</h2>
          <p>We may share data with trusted third-party service providers for payment processing, email delivery, and analytics. These providers are contractually bound to protect your data.</p>

          <h2>6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. You may also request a copy of the data we hold about you by contacting our support team.</p>

          <h2>7. Data Retention</h2>
          <p>We retain your personal data for as long as your account is active or as needed to provide services. After account deletion, data is anonymised or deleted within 90 days.</p>

          <h2>8. Updates to This Policy</h2>
          <p>We may update this policy periodically. Changes will be posted on this page with a revised effective date. Continued use of the platform constitutes acceptance of the updated policy.</p>

          <h2>9. Contact Us</h2>
          <p>For privacy-related inquiries, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.</p>
        </div>
      </Section>
    </div>
  );
}
