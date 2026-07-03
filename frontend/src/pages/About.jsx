import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Users, GraduationCap, TrendingUp, Target, Shield,
  Heart, Lightbulb, Handshake, Rocket, Award, Globe,
  ArrowRight, Quote, CheckCircle, Sparkles, Eye,
  MapPin, Mail, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Section, { SectionHeader, staggerContainer, staggerItem } from '@/components/shared/Section';
import PageHeader from '@/components/shared/PageHeader';
import { cn } from '@/lib/utils';

const stats = [
  { value: 50000, suffix: '+', label: 'Active Students', icon: Users },
  { value: 500, suffix: '+', label: 'Courses Available', icon: BookOpen },
  { value: 200, suffix: '+', label: 'Expert Teachers', icon: GraduationCap },
  { value: 95, suffix: '%', label: 'Success Rate', icon: TrendingUp },
];

const teamMembers = [
  { id: 1, name: 'Dr. Amitabh Saxena', role: 'Founder & CEO', qualification: 'Ph.D. Education, IIT Delhi', initials: 'AS', bio: 'Visionary educator with 25+ years in the education sector. Former Dean at IIT Delhi.' },
  { id: 2, name: 'Prof. Neha Gupta', role: 'Chief Academic Officer', qualification: 'Ph.D. Physics, IIT Kanpur', initials: 'NG', bio: 'Academic excellence expert with 20 years of experience in curriculum design and exam preparation.' },
  { id: 3, name: 'Mr. Rajesh Verma', role: 'Chief Technology Officer', qualification: 'B.Tech CSE, IIT Bombay', initials: 'RV', bio: 'Tech innovator building India\'s most advanced edtech platform with AI-powered learning.' },
  { id: 4, name: 'Dr. Sunita Patel', role: 'Head of Student Success', qualification: 'Ph.D. Psychology, DU', initials: 'SP', bio: 'Student mentor dedicated to ensuring every learner achieves their academic goals.' },
  { id: 5, name: 'Mr. Arvind Kumar', role: 'Head of Operations', qualification: 'MBA, IIM Ahmedabad', initials: 'AK', bio: 'Operations expert ensuring smooth delivery of educational programs across India.' },
  { id: 6, name: 'Ms. Kavita Sharma', role: 'Head of Marketing', qualification: 'MBA, IIM Bangalore', initials: 'KS', bio: 'Marketing strategist driving SkillBridge\'s mission to reach every student in India.' },
];

const values = [
  { icon: Target, title: 'Excellence', desc: 'We strive for the highest quality in education, constantly innovating our teaching methods and curriculum design.' },
  { icon: Heart, title: 'Passion', desc: 'Our team is driven by a genuine passion for education and a deep commitment to every student\'s success.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We leverage cutting-edge technology and AI to create personalized learning experiences for every student.' },
  { icon: Handshake, title: 'Integrity', desc: 'Transparent pricing, honest communication, and ethical practices in everything we do.' },
  { icon: Rocket, title: 'Growth Mindset', desc: 'We believe every student can excel with the right guidance, support, and resources.' },
  { icon: Globe, title: 'Accessibility', desc: 'Making quality education affordable and accessible to students across all of India.' },
];

const milestones = [
  { year: '2020', title: 'Founded', desc: 'SkillBridge founded in IIT Delhi incubation lab by a team of educators from IITs and IIMs.' },
  { year: '2021', title: '1,000 Students', desc: 'Crossed 1,000 students in our first year with rave reviews and 95% satisfaction rate.' },
  { year: '2022', title: 'Pan-India Reach', desc: 'Expanded to 15,000+ students across 400+ cities and towns in India.' },
  { year: '2023', title: 'AI-Powered Platform', desc: 'Launched AI-powered personalized learning engine with adaptive testing and analytics.' },
  { year: '2024', title: '50K+ Students', desc: 'Reached 50,000+ students with 500+ courses and 200+ expert teachers.' },
  { year: '2025', title: 'Global Expansion', desc: 'Started international programs for NRI students and expanded to Middle East markets.' },
];

function AnimatedCounter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen">
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            About SkillBridge
            <Sparkles className="w-6 h-6 text-accent" />
          </span>
        }
        subtitle="Empowering India's next generation of achievers through world-class online education"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About' },
        ]}
        size="lg"
      />

      {/* Mission Statement */}
      <section className="relative -mt-8 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-background to-accent/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
              <Quote className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 tracking-tight">
              Our mission is to make<br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">quality education accessible</span><br />
              to every student in India
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At SkillBridge, we believe that every student deserves access to world-class education regardless of their location or background. Founded in 2020 by educationists from IITs and IIMs, we have grown to become India's premier online learning platform, serving over 50,000 students across the country.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 px-3 py-1 border-primary/20 text-primary bg-primary/5">
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
              The Story Behind SkillBridge
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                SkillBridge was born from a simple observation: talented students across India were not getting access to the quality education they deserved. The best teachers were concentrated in top cities, leaving millions of aspirants without proper guidance.
              </p>
              <p>
                In 2020, a group of educators from IIT Delhi, IIT Bombay, and IIM Ahmedabad came together with a shared vision — to democratize education in India. They built SkillBridge as a platform that connects students with India's finest teachers through live, interactive online classes.
              </p>
              <p>
                Today, SkillBridge has grown into a comprehensive learning ecosystem with 500+ courses, 200+ expert teachers, and over 50,000 successful students. We have helped students secure top ranks in JEE Advanced, JEE Main, NEET, and various other competitive exams.
              </p>
              <p>
                Our AI-powered learning platform, 24/7 doubt resolution, and personalized mentoring have set new standards in online education. We continue to innovate and expand our reach, with a mission to impact 10 million students by 2030.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.06] via-transparent to-transparent" />
              <div className="text-center relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary/20">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">Est. 2020</p>
                <p className="text-sm text-muted-foreground">IIT Delhi Incubated</p>
              </div>
            </div>

            {/* Timeline overlay */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {milestones.slice(0, 4).map((m) => (
                <div key={m.year} className="p-3 rounded-xl bg-card border text-center">
                  <p className="text-sm font-bold text-primary">{m.year}</p>
                  <p className="text-xs text-muted-foreground">{m.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="border-0 shadow-lg shadow-primary/5 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-card-foreground">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-sm text-muted-foreground mt-1.5">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <Section>
        <SectionHeader
          badge="Our Core Values"
          title="What Drives Us"
          subtitle="The principles that guide everything we do at SkillBridge"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {values.map((value) => (
            <motion.div key={value.title} variants={staggerItem}>
              <Card className="card-hover-premium border-0 shadow-lg shadow-primary/5 rounded-2xl h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/20">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Team Section */}
      <Section bg="muted">
        <SectionHeader
          badge="Our Leadership"
          title="Meet the Team"
          subtitle="The passionate people behind SkillBridge's mission to transform education"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={staggerItem}>
              <Card className="card-hover-premium rounded-2xl text-center h-full border-0 shadow-lg shadow-primary/5">
                <CardContent className="p-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl font-bold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-base font-semibold text-card-foreground mb-1">{member.name}</h3>
                  <p className="text-xs text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground mb-3">{member.qualification}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <Sparkles className="w-10 h-10 text-white/30 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Join India's Learning Revolution
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Be part of a community that's transforming education. Start your journey with India's most trusted learning platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white/15 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30 rounded-xl"
            />
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 shadow-xl rounded-xl w-full sm:w-auto font-semibold">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Free 7-day trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Cancel anytime</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
