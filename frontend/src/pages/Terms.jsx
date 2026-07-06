import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import Section from '@/components/shared/Section';

export default function Terms() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            Terms of Service
            <Shield className="w-6 h-6 text-accent" />
          </span>
        }
        subtitle="Please read these terms carefully before using SkillBridge"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Terms of Service' },
        ]}
        size="lg"
      />

      <Section>
        <div className="max-w-3xl mx-auto prose prose-sm dark:prose-invert">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using SkillBridge, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>

          <h2>2. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. You must provide accurate and complete information during registration.</p>

          <h2>3. Course Enrollment & Access</h2>
          <p>Enrolled courses grant you a non-exclusive, non-transferable license to access the content for your personal educational use. Sharing account access is strictly prohibited.</p>

          <h2>4. Payments & Refunds</h2>
          <p>All payments are processed securely through our payment partners. Refund requests are evaluated on a case-by-case basis as per our refund policy published on the platform.</p>

          <h2>5. User Conduct</h2>
          <p>You agree not to misuse the platform, engage in plagiarism, distribute copyrighted material, or harass other users. Violations may result in account suspension.</p>

          <h2>6. Intellectual Property</h2>
          <p>All course content, including videos, assignments, and assessments, is the intellectual property of SkillBridge and its instructors. Unauthorized reproduction or distribution is prohibited.</p>

          <h2>7. Limitation of Liability</h2>
          <p>SkillBridge shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform.</p>

          <h2>8. Modifications</h2>
          <p>We reserve the right to update these terms at any time. Users will be notified of material changes via email or platform notification.</p>

          <h2>9. Contact</h2>
          <p>For questions about these terms, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.</p>
        </div>
      </Section>
    </div>
  );
}
