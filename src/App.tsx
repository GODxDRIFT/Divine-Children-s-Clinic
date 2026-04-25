/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { 
  Stethoscope, Menu, X, Phone, Mail, Clock, MapPin, 
  ChevronRight, Calendar, User, Baby, Activity, 
  ShieldCheck, Star, ArrowUp, Send, CheckCircle2, ArrowLeft 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceDot 
} from 'recharts';
import { CLINIC_DATA } from './constants';

// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants = {
    primary: 'bg-accent text-white hover:bg-amber-600 shadow-lg shadow-amber-200',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-text-dark hover:bg-gray-100',
  };
  return (
    <button 
      className={`px-8 py-3 rounded-full font-bold transition-all duration-300 active:scale-95 ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Section 1: Navbar ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: isHome ? '#home' : '/' },
    { name: 'About', href: isHome ? '#about' : '/#about' },
    { name: 'Services', href: isHome ? '#services' : '/#services' },
    { name: 'Growth Tracker', href: '/growth-tracker' },
    { name: 'Doctor', href: isHome ? '#doctor' : '/#doctor' },
    { name: 'Gallery', href: isHome ? '#gallery' : '/#gallery' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  const handleLinkClick = (e: any, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 shadow-xl py-3' : 'bg-white/70 py-4'} blur-nav`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 gradient-primary rounded-xl text-white transform group-hover:rotate-12 transition-transform">
            <Stethoscope size={28} />
          </div>
          <span className="font-heading font-extrabold text-xl md:text-2xl text-primary tracking-tight">
            Divine <span className="text-secondary">Children's</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('#') || (link.href.startsWith('/') && link.href.length > 1) ? (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-semibold text-text-dark hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                className="font-semibold text-text-dark hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
              >
                {link.name}
              </Link>
            )
          ))}
          <Button onClick={() => {
            if (isHome) {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.href = '/#contact';
            }
          }}>Book Appointment</Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white overflow-hidden shadow-2xl border-t border-gray-100"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-text-dark border-b border-gray-50 pb-2"
                >
                  {link.name}
                </a>
              ))}
              <Button className="w-full mt-2">Book Appointment</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Section 3: Announcement Bar ---

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full gradient-primary text-white py-3 overflow-hidden z-[60]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center">
        <marquee className="font-bold text-xs md:text-sm whitespace-nowrap tracking-wide leading-none">
          📢 Free Vaccination Camp this Sunday! • New clinic timings: {CLINIC_DATA.contact.timings} • Next Patient Slot: Today • Welcoming new patients in Lajpat Nagar I
        </marquee>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-4 hover:scale-110 transition-transform flex-shrink-0"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

// --- Section 2: Hero ---

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] pt-12 pb-24 flex items-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-blue-100/50 rounded-bl-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-green-100/50 rounded-tr-full blur-3xl opacity-50" />
      
      {/* Animated Particles */}
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="particle" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            width: `${Math.random() * 50 + 20}px`,
            height: `${Math.random() * 50 + 20}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 15 + 10}s`
          }} 
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1 bg-blue-100 text-primary font-bold rounded-full text-sm">
              ✨ Trusted by 500+ Happy Families
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Your Child's <span className="text-secondary">Health</span>, <br />
              <span className="relative">
                Our Priority
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-accent/20 -z-10 rounded-full" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed">
              Expert pediatric care for newborns up to 18 years in the heart of {CLINIC_DATA.contact.address.split(',')[4].trim()}, New Delhi. Dedicated to your child's growth and well-being.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Button className="w-full sm:w-auto">Book Appointment</Button>
            <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2">
              <Phone size={20} /> Call Now
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6"
          >
            {[
              { label: 'Experience', val: '12+ Yrs', icon: <ShieldCheck size={20} className="text-blue-500" /> },
              { label: 'Families', val: '500+', icon: <Star size={20} className="text-amber-500" /> },
              { label: 'Available', val: '6 Days', icon: <Clock size={20} className="text-green-500" /> },
            ].map((badge) => (
              <div key={badge.label} className="bg-white/80 p-3 rounded-2xl border border-white flex flex-col items-center lg:items-start shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  {badge.icon}
                  <span className="font-bold text-lg">{badge.val}</span>
                </div>
                <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">{badge.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Floating Availability Card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-xl shadow-blue-100 max-w-fit mx-auto lg:mx-0 border border-blue-50"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-bold text-sm">Next Available Slot: <span className="text-primary font-extrabold uppercase">Today</span></span>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 relative"
        >
          <div className="relative z-10 w-full max-w-[500px] mx-auto group">
            <div className="absolute inset-0 gradient-primary rounded-[2rem] rotate-6 scale-105 opacity-20 transition-transform group-hover:rotate-12" />
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
              alt="Dr. Aman Sharma with a happy child" 
              className="relative z-10 w-full aspect-square object-cover rounded-[2rem] shadow-2xl transition-transform group-hover:-translate-y-2 duration-500"
            />
            {/* Overlay Info */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 hidden md:block animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary">
                  <Baby />
                </div>
                <div>
                  <p className="font-extrabold text-sm">Painless Vaccination</p>
                  <p className="text-xs text-text-muted">Safe & Modern Approach</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Section 4: Services ---

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            What We <span className="text-primary">Treat</span>
          </h2>
          <div className="w-24 h-1.5 gradient-primary mx-auto rounded-full" />
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Comprehensive pediatric care under one roof. From routine checkups to specialized treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLINIC_DATA.services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl bg-${service.color}-50 text-${service.color}-600 group-hover:scale-110 transition-transform duration-500`}>
                <i className={`fa-solid ${service.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-text-muted leading-relaxed mb-6">{service.desc}</p>
              <Link to={`/service/${service.slug}`} className="inline-flex items-center gap-2 font-bold text-primary text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                Learn More <ChevronRight size={16} />
              </Link>
              <div className="absolute top-0 left-0 w-full h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Section 5: Why Choose Us ---

const WhyChooseUs = () => {
  const features = [
    { title: "Child-Friendly Environment", desc: "Our clinic is designed to be a happy space with toys, books, and colorful decor to ensure zero fear.", icon: <Baby size={32} /> },
    { title: "No Long Waiting", desc: "We respect your time. Our appointment-based system ensures punctual consultations with minimal wait.", icon: <Clock size={32} /> },
    { title: "Transparent Consultation", desc: "Clear diagnosis and direct communication. We believe in providing only necessary tests and treatments.", icon: <ShieldCheck size={32} /> },
    { title: "Affordable Care", desc: "Quality healthcare should be accessible. We maintain reasonable fees with no hidden charges.", icon: <Send size={32} /> },
  ];

  return (
    <section id="about" className="py-24 bg-bg-soft relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070&auto=format&fit=crop" className="w-full h-64 object-cover rounded-3xl shadow-xl" alt="Clinic interior" />
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop" className="w-full h-48 object-cover rounded-3xl shadow-xl" alt="Pediatric equipment" />
            </div>
            <div className="pt-12">
              <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop" className="w-full h-full object-cover rounded-3xl shadow-xl" alt="Medical checkup" />
            </div>
          </div>

          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold tracking-tight">Why Parents <span className="text-secondary">Trust Us</span></h2>
              <div className="w-20 h-1.5 gradient-primary rounded-full" />
            </div>

            <div className="space-y-8">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-lg border border-white group-hover:gradient-primary group-hover:text-white transition-all duration-500">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{f.title}</h4>
                    <p className="text-text-muted leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 6: Doctor Profile ---

const DoctorProfile = () => {
  return (
    <section id="doctor" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] -rotate-6 scale-[0.95]" />
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop" 
              className="relative z-10 w-full rounded-[3rem] shadow-2xl object-cover hover:scale-[1.02] transition-transform duration-500"
              alt={CLINIC_DATA.doctor.name}
            />
            <div className="absolute -bottom-10 -right-10 z-20 bg-white p-8 rounded-3xl shadow-2xl border border-blue-50 hidden lg:block">
              <img src="https://upload.wikimedia.org/wikipedia/en/2/21/Indian_Academy_of_Pediatrics_Logo.png" className="h-16 w-auto opacity-50 grayscale hover:grayscale-0 transition-all" alt="IAP Logo" />
              <p className="mt-2 font-bold text-xs text-text-muted text-center uppercase tracking-widest">IAP Member</p>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-bold text-sm uppercase tracking-widest bg-blue-50 px-4 py-1 rounded-full">Meet Your Doctor</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{CLINIC_DATA.doctor.name}</h2>
              <p className="text-2xl font-bold text-secondary">{CLINIC_DATA.doctor.qualifications}</p>
              <p className="text-xl text-text-muted font-medium">{CLINIC_DATA.doctor.designation}</p>
            </div>

            <p className="text-lg text-text-muted leading-relaxed italic border-l-4 border-primary pl-6">
              "{CLINIC_DATA.doctor.bio}"
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Experience', val: CLINIC_DATA.doctor.experience },
                { label: 'Kids Treated', val: CLINIC_DATA.doctor.childrenTreated },
                { label: 'Associated With', val: 'Top Hospitals' },
                { label: 'Research', val: CLINIC_DATA.doctor.papers },
              ].map((stat, i) => (
                <div key={i} className="bg-bg-soft p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-3xl font-black text-primary mb-1">{stat.val}</p>
                  <p className="text-sm font-bold text-text-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button className="w-full md:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 7: How It Works ---

const HowItWorks = () => {
  const steps = [
    { title: "Book Appointment", desc: "Call us or fill the online form to select your preferred time slot.", icon: <Calendar size={32} /> },
    { title: "Visit Clinic", desc: `Arrive at our child-friendly clinic in ${CLINIC_DATA.contact.address.split(',')[4].trim()} for your scheduled visit.`, icon: <MapPin size={32} /> },
    { title: "Expert Consultation", desc: "Get specialized medical attention and a clear plan for your child's health.", icon: <CheckCircle2 size={32} /> },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-blue-700 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight">Easy 3-Step Process</h2>
          <p className="text-blue-100 text-lg">Getting expert care for your child is now simpler than ever.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/20 -translate-y-1/2 z-0" />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex-1 w-full flex flex-col items-center text-center group z-10"
            >
              <div className="w-24 h-24 rounded-full bg-white text-primary flex items-center justify-center mb-6 shadow-2xl relative group-hover:scale-110 transition-transform duration-500">
                <span className="absolute -top-2 -right-2 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-black text-xl border-4 border-blue-600">
                  {i + 1}
                </span>
                {step.icon}
              </div>
              <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
              <p className="text-blue-100 max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Updated Footer Placeholder in main export ---

// --- Section 8: Vaccination Schedule ---

const VaccinationSchedule = () => {
  return (
    <section className="py-24 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight">Vaccination <span className="text-primary">Chart</span></h2>
          <div className="w-20 h-1.5 gradient-primary mx-auto rounded-full" />
          <p className="text-text-muted">Universal Immunization Program (UIP) India Recommendations</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="gradient-primary text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Age</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Vaccines Due</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {CLINIC_DATA.vaccinationSchedule.map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-primary">{row.age}</td>
                    <td className="px-6 py-4 text-text-muted">{row.vaccines}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === 'Vital' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted italic flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              *Please consult our pediatrician before starting any vaccination.
            </p>
            <Button variant="outline" className="text-sm px-6 py-2">
              Download Full PDF Chart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 9: Testimonials ---

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % CLINIC_DATA.testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight">What Parents <span className="text-secondary">Say</span></h2>
          <div className="w-20 h-1.5 gradient-primary mx-auto rounded-full" />
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="flex text-amber-400">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-sm font-bold text-text-muted">{CLINIC_DATA.rating}/5 on Google Maps ({CLINIC_DATA.reviews}+ Reviews)</span>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-bg-soft p-10 md:p-16 rounded-[3rem] relative shadow-xl border border-white"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-lg border border-blue-50 text-3xl">
                <i className="fa-solid fa-quote-left"></i>
              </div>

              <div className="space-y-6 text-center">
                <div className="flex justify-center gap-1">
                  {[...Array(CLINIC_DATA.testimonials[index].rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium text-text-dark leading-relaxed">
                  "{CLINIC_DATA.testimonials[index].text}"
                </p>
                <div className="pt-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {CLINIC_DATA.testimonials[index].name.charAt(0)}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                       <img src="https://www.google.com/images/branding/product/ico/maps15_24dp.ico" alt="Google Maps" className="w-5 h-5" />
                    </div>
                  </div>
                  <h5 className="text-xl font-bold">{CLINIC_DATA.testimonials[index].name}</h5>
                  <p className="text-text-muted font-semibold">{CLINIC_DATA.testimonials[index].age}</p>
                </div>
                <div className="pt-4">
                  <a 
                    href={CLINIC_DATA.contact.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                  >
                    View on Google Maps <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            {CLINIC_DATA.testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className={`h-3 rounded-full transition-all duration-300 ${index === i ? 'w-10 bg-primary' : 'w-3 bg-blue-200'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 10: Gallery ---

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { url: 'https://images.unsplash.com/photo-1543333995-a78433f8ecdb?q=80&w=2070&auto=format&fit=crop', category: 'Clinic' },
    { url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop', category: 'Clinic' },
    { url: 'https://images.unsplash.com/photo-1533227268408-a76e7ddbf764?q=80&w=2030&auto=format&fit=crop', category: 'Kids' },
    { url: 'https://images.unsplash.com/photo-1631217818242-1049bbade858?q=80&w=2075&auto=format&fit=crop', category: 'Doctor' },
    { url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1988&auto=format&fit=crop', category: 'Kids' },
    { url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop', category: 'Clinic' },
    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop', category: 'Doctor' },
    { url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070&auto=format&fit=crop', category: 'Kids' },
    { url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2070&auto=format&fit=crop', category: 'Clinic' },
  ];

  const filtered = activeFilter === 'All' ? images : images.filter(img => img.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight">Our <span className="text-primary">Gallery</span></h2>
          <div className="w-20 h-1.5 gradient-primary mx-auto rounded-full" />
          
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {['All', 'Clinic', 'Doctor', 'Kids'].map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${activeFilter === f ? 'bg-primary text-white shadow-lg shadow-blue-200' : 'bg-white text-text-muted hover:bg-gray-50 border border-gray-100'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer overflow-hidden rounded-3xl"
                onClick={() => setSelectedImage(img.url)}
              >
                <img src={img.url} alt="Clinic Gallery" className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl">
                    <i className="fa-solid fa-expand"></i>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:scale-110 transition-transform">
              <X size={48} />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImage} 
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Section 11: Appointment Form ---

const AppointmentForm = () => {
  const [formStep, setFormStep] = useState('input'); // input, loading, success
  const [formData, setFormData] = useState({
    parent: '', child: '', age: '', mobile: '', reason: '', date: '', time: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Parent Name validation: No numbers
    if (/\d/.test(formData.parent)) {
      newErrors.parent = "Parent name cannot contain numbers";
    } else if (formData.parent.trim().length < 3) {
      newErrors.parent = "Please enter a valid name";
    }

    // Child Name validation: No numbers
    if (/\d/.test(formData.child)) {
      newErrors.child = "Child's name cannot contain numbers";
    } else if (formData.child.trim().length < 2) {
      newErrors.child = "Please enter a valid name";
    }

    // Mobile validation: Exactly 10 digits
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.age) newErrors.age = "Please select age group";
    if (!formData.reason) newErrors.reason = "Please select visit reason";
    if (!formData.date) newErrors.date = "Please select a date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setFormStep('loading');
      setTimeout(() => setFormStep('success'), 1500);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (formStep === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[3rem] shadow-2xl text-center space-y-6 border border-green-100"
      >
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-5xl">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-3xl font-extrabold">Appointment Requested!</h3>
        <p className="text-text-muted text-lg">
          Thank you, <strong>{formData.parent}</strong>. We have received your request for <strong>{formData.child}</strong>. Our team will call you at <strong>{formData.mobile}</strong> shortly to confirm the slot.
        </p>
        <Button onClick={() => setFormStep('input')}>Book Another</Button>
      </motion.div>
    );
  }

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form */}
          <div className="flex-[1.5]">
            <div className="mb-12 space-y-4">
              <h2 className="text-4xl font-extrabold tracking-tight">Book an <span className="text-primary">Appointment</span></h2>
              <p className="text-text-muted">Take the first step towards your child's better health today.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Parent Name *</label>
                <input 
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={formData.parent}
                  onChange={(e) => handleInputChange('parent', e.target.value)}
                  className={`w-full px-6 py-4 rounded-2xl bg-bg-soft border ${errors.parent ? 'border-red-500' : 'border-gray-100'} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all`}
                />
                {errors.parent && <p className="text-red-500 text-xs font-bold">{errors.parent}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Child Name *</label>
                <input 
                  type="text"
                  placeholder="Enter child's name"
                  required
                  value={formData.child}
                  onChange={(e) => handleInputChange('child', e.target.value)}
                  className={`w-full px-6 py-4 rounded-2xl bg-bg-soft border ${errors.child ? 'border-red-500' : 'border-gray-100'} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all`}
                />
                {errors.child && <p className="text-red-500 text-xs font-bold">{errors.child}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Mobile Number *</label>
                <input 
                  type="tel"
                  placeholder="10-digit mobile number"
                  required
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={`w-full px-6 py-4 rounded-2xl bg-bg-soft border ${errors.mobile ? 'border-red-500' : 'border-gray-100'} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all`}
                />
                {errors.mobile && <p className="text-red-500 text-xs font-bold">{errors.mobile}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Child's Age *</label>
                <select 
                  required
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`w-full px-6 py-4 rounded-2xl bg-bg-soft border ${errors.age ? 'border-red-500' : 'border-gray-100'} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all`}
                >
                  <option value="">Select Age Group</option>
                  <option>0-6 Months</option>
                  <option>6m-1yr</option>
                  <option>1-3 yrs</option>
                  <option>3-6 yrs</option>
                  <option>6-12 yrs</option>
                  <option>12-18 yrs</option>
                </select>
                {errors.age && <p className="text-red-500 text-xs font-bold">{errors.age}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Reason for Visit *</label>
                <select 
                  required
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className={`w-full px-6 py-4 rounded-2xl bg-bg-soft border ${errors.reason ? 'border-red-500' : 'border-gray-100'} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all`}
                >
                  <option value="">Select Service</option>
                  <option>General Checkup</option>
                  <option>Vaccination</option>
                  <option>Fever / Illness</option>
                  <option>Newborn Consultation</option>
                  <option>Other</option>
                </select>
                {errors.reason && <p className="text-red-500 text-xs font-bold">{errors.reason}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Preferred Date *</label>
                <input 
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={`w-full px-6 py-4 rounded-2xl bg-bg-soft border ${errors.date ? 'border-red-500' : 'border-gray-100'} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all`}
                />
                {errors.date && <p className="text-red-500 text-xs font-bold">{errors.date}</p>}
              </div>

              <div className="md:col-span-2">
                <Button type="submit" disabled={formStep === 'loading'} className="w-full py-5 text-xl flex items-center justify-center gap-3">
                  {formStep === 'loading' ? 'Processing...' : (
                    <>
                      Book Appointment Now <ChevronRight size={24} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Info & Map */}
          <div className="flex-1 space-y-10">
            <div className="bg-bg-soft p-10 rounded-[3rem] space-y-8 border border-white">
              <h3 className="text-2xl font-bold">Contact Details</h3>
              <div className="space-y-6">
                {[
                  { icon: <Phone size={24} />, label: 'Call Us', val: CLINIC_DATA.contact.phone, href: `tel:${CLINIC_DATA.contact.phone}` },
                  { icon: <Mail size={24} />, label: 'Email', val: CLINIC_DATA.contact.email, href: `mailto:${CLINIC_DATA.contact.email}` },
                  { icon: <MapPin size={24} />, label: 'Visit Clinic', val: CLINIC_DATA.contact.address, href: CLINIC_DATA.contact.mapsUrl },
                ].map((item, i) => (
                  <a key={i} href={item.href} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:gradient-primary group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-muted uppercase tracking-widest">{item.label}</p>
                      <p className="text-lg font-bold text-text-dark">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="w-full h-80 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.1482087588147!2d77.2372!3d28.5658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3b700000001%3A0x0!2sLajpat%20Nagar%20I%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1714045000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 12: FAQ ---

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-bg-soft">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight">Common <span className="text-primary">Queries</span></h2>
        </div>

        <div className="space-y-4">
          {CLINIC_DATA.faq.map((item, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-8 py-6 flex justify-between items-center text-left"
              >
                <span className="text-lg font-bold text-text-dark">{item.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-primary text-white rotate-180' : 'bg-bg-soft text-primary'}`}>
                  <ChevronRight size={20} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-text-muted leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Section 13: Footer ---

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-primary rounded-xl text-white">
              <Stethoscope size={28} />
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight">Divine <span className="text-secondary">Children's</span></span>
          </div>
          <p className="text-gray-400">Expert pediatric care for newborns up to 18 years. Trustworthy, compassionate, and affordable care in Lajpat Nagar.</p>
          <div className="flex gap-4">
            {['facebook', 'instagram', 'youtube', 'whatsapp'].map(s => (
              <a key={s} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:gradient-primary transition-all">
                <i className={`fa-brands fa-${s}`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            {['Home', 'About', 'Services', 'Doctor', 'Gallery', 'Contact'].map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-colors">→ {l}</a></li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold">Services</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            {['Newborn Care', 'Vaccination', 'Checkups', 'Nutrition', 'Emergency', 'Development'].map(l => (
              <li key={l}><span className="hover:text-primary cursor-default transition-colors">• {l}</span></li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold">Clinic Hours</h4>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">{CLINIC_DATA.contact.timings.split(' ')[0]} (Morn)</span>
              <span className="font-bold">10:00 AM - 02:00 PM</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">{CLINIC_DATA.contact.timings.split(' ')[0]} (Eve)</span>
              <span className="font-bold">05:00 PM - 08:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sunday</span>
              <span className="text-rose-400 font-bold uppercase">Closed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-white/5 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2024 Divine Children's Clinic. All Rights Reserved.</p>
        <p>Designed with ❤️ for <span className="text-secondary font-bold">Little Ones</span></p>
      </div>
    </footer>
  );
};

// --- Section 14: Floating Elements ---

const FloatingElements = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <a 
        href={CLINIC_DATA.contact.whatsapp}
        target="_blank"
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Call Floating (Mobile Only) */}
      <a 
        href={`tel:${CLINIC_DATA.contact.phone}`}
        className="md:hidden fixed bottom-8 left-8 z-[60] w-16 h-16 gradient-primary text-white rounded-full flex items-center justify-center text-2xl shadow-2xl"
      >
        <Phone />
      </a>

      {/* Back to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-28 right-8 z-[60] w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-xl border border-gray-100 hover:-translate-y-2 transition-all"
          >
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Section 15: Service Detail Page ---

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = CLINIC_DATA.services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen py-24 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
        <Link to="/" className="text-primary font-bold">Back to Home</Link>
      </div>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-24 bg-bg-soft overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-blue-100/30 rounded-bl-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-4 transition-all uppercase tracking-widest text-sm">
            <ArrowLeft size={18} /> Back to Services
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-${service.color}-50 text-${service.color}-600 shadow-xl border border-white`}>
                <i className={`fa-solid ${service.icon}`}></i>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">{service.title}</h1>
              <p className="text-xl text-text-muted leading-relaxed">
                {service.desc}
              </p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 gradient-primary rounded-[2rem] rotate-6 scale-95 opacity-20" />
              <img src={service.image} alt={service.title} className="relative z-10 w-full h-[400px] object-cover rounded-[2rem] shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">About {service.title}</h2>
                <div className="w-20 h-1.5 gradient-primary rounded-full" />
                <p className="text-lg text-text-muted leading-relaxed">
                  {service.details}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.highlights?.map((h, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-bg-soft rounded-2xl border border-white">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary flex-shrink-0 shadow-sm border border-blue-50">
                      <CheckCircle2 size={20} />
                    </div>
                    <p className="font-bold text-text-dark pt-1">{h}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-bg-soft p-8 rounded-3xl border border-white space-y-6 shadow-sm">
                <h3 className="text-2xl font-bold">Need This Service?</h3>
                <p className="text-text-muted">Book an appointment online or call us directly for any inquiries.</p>
                <div className="space-y-4">
                  <Button className="w-full" onClick={() => {
                    window.location.href = '/#contact';
                  }}>Book Appointment</Button>
                  <a href={`tel:${CLINIC_DATA.contact.phone}`} className="flex items-center justify-center gap-2 w-full py-4 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
                    <Phone size={20} /> Call Now
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-blue-700 text-white p-8 rounded-3xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                <h3 className="text-xl font-bold relative z-10">Clinic Hours</h3>
                <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-sm opacity-80">
                    <span>Morning:</span>
                    <span className="font-bold">10:00 AM - 02:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm opacity-80">
                    <span>Evening:</span>
                    <span className="font-bold">05:00 PM - 08:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Section 16: Growth Tracker Tool ---

const GrowthTracker = () => {
  const [age, setAge] = useState<number>(12); // months
  const [weight, setWeight] = useState<number>(10); // kg
  const [height, setHeight] = useState<number>(75); // cm
  const [result, setResult] = useState<any>(null);

  // Generate reference data based on typical WHO growth standards (simplified)
  const growthData = Array.from({ length: 13 }, (_, i) => {
    const ageYrs = i + 1;
    const ageMonthsValue = ageYrs * 12;
    // Rough estimates for normal weight (kg) and height (cm)
    const refWeight = 3 + (ageYrs * 2.5); // very rough
    const refHeight = 50 + (ageYrs * 6); // very rough
    return {
      ageYrs,
      ageMonths: ageMonthsValue,
      refWeight,
      refHeight
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateGrowth = () => {
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    
    // Very simplified logic for demo (Normal BMI for toddlers is roughly 14-18)
    let status = "Normal";
    let color = "text-green-600";
    let bg = "bg-green-50";

    const bmiNum = parseFloat(bmi);
    if (bmiNum < 14) { status = "Underweight"; color = "text-amber-600"; bg = "bg-amber-50"; }
    else if (bmiNum > 19) { status = "Overweight"; color = "text-rose-600"; bg = "bg-rose-50"; }

    setResult({ bmi, status, color, bg });
  };

  return (
    <div className="min-h-screen py-24 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-4 transition-all uppercase tracking-widest text-sm">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8">
             <div className="space-y-4">
                <span className="inline-block px-4 py-1 bg-blue-100 text-primary font-bold rounded-full text-sm">
                  📊 Wellness Tool
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Child <span className="text-secondary">Growth Tracker</span></h1>
                <p className="text-text-muted text-lg">
                  Use our interactive tool to monitor your child's Body Mass Index (BMI) and physical developmental progress.
                </p>
             </div>

             <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6 border border-white">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-text-muted uppercase tracking-wider">Age (Months)</label>
                  <input 
                    type="range" min="1" max="156" value={age} 
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                  <div className="flex justify-between font-bold text-primary">
                    <span>1 Month</span>
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">{age} Months ({(age/12).toFixed(1)} Yrs)</span>
                    <span>13 Years</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Weight (kg)</label>
                    <input 
                      type="number" value={weight} 
                      onChange={(e) => setWeight(parseFloat(e.target.value))}
                      className="w-full px-6 py-4 rounded-2xl bg-bg-soft border border-gray-100 focus:border-primary outline-none font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Height (cm)</label>
                    <input 
                      type="number" value={height} 
                      onChange={(e) => setHeight(parseFloat(e.target.value))}
                      className="w-full px-6 py-4 rounded-2xl bg-bg-soft border border-gray-100 focus:border-primary outline-none font-bold" 
                    />
                  </div>
                </div>

                <Button className="w-full py-5 text-xl lg:text-2xl" onClick={calculateGrowth}>Calculate Now</Button>
             </div>

             {/* Visualization Section */}
             <div className="bg-white p-8 rounded-3xl shadow-lg border border-white space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Activity className="text-primary" size={20} />
                  Growth Comparison Chart
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRef" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="ageYrs" label={{ value: 'Age (Years)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <Tooltip />
                      <Area type="monotone" dataKey="refWeight" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRef)" name="Standard Avg Weight" />
                      {/* Current Point */}
                      <ReferenceDot 
                        x={age / 12} 
                        y={weight} 
                        r={8} 
                        fill="#EC4899" 
                        stroke="white" 
                        strokeWidth={3}
                        label={{ value: "Your Child", position: 'top', fill: '#EC4899', fontSize: 12, fontWeight: 'bold' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-text-muted text-center italic">
                  *This chart shows your child's current weight compared to general pediatric averages.
                </p>
             </div>
          </div>

          <div className="flex-1 lg:max-w-md">
             {result ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }} 
                 animate={{ opacity: 1, scale: 1 }}
                 className={`${result.bg} p-10 rounded-[3rem] border border-white h-fit flex flex-col items-center justify-center text-center space-y-6 shadow-2xl shadow-blue-100 sticky top-32`}
               >
                  <div className="w-32 h-32 rounded-full border-8 border-white bg-white flex items-center justify-center shadow-lg">
                    <span className={`text-4xl font-black ${result.color}`}>{result.bmi}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-text-muted uppercase tracking-widest">Calculated BMI</p>
                    <h2 className={`text-4xl font-black ${result.color}`}>{result.status}</h2>
                    <div className="flex justify-center gap-1">
                      {Array.from({length: 5}).map((_, i) => (
                        <Star key={i} size={16} fill={i < (result.status === "Normal" ? 5 : 3) ? "currentColor" : "none"} className={result.color} />
                      ))}
                    </div>
                    <p className="text-text-muted max-w-xs mx-auto text-sm leading-relaxed">
                      Based on age-specific growth charts for children. {result.status === "Normal" ? "Great job! Your child is growing within the healthy range." : "This suggests a need for nutritional adjustment. Consult our pediatrician for a personalized plan."}
                    </p>
                  </div>
                  <div className="w-full pt-4 space-y-3">
                    <Button className="w-full" onClick={() => {
                      if (window.location.pathname === '/') {
                         document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                         window.location.href = '/#contact';
                      }
                    }}>Book Consultation</Button>
                    <p className="text-[10px] text-text-muted">Professional medical advice should be sought for definitive health assessments.</p>
                  </div>
               </motion.div>
             ) : (
               <div className="bg-white/50 border-2 border-dashed border-gray-200 p-10 rounded-[3rem] h-[500px] flex flex-col items-center justify-center text-center text-text-muted space-y-4">
                  <Activity size={64} className="opacity-20 animate-pulse" />
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-text-dark">Ready to Analyze</p>
                    <p className="text-sm">Enter your child's age, weight, and height to generate a personalized growth report.</p>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollToAnchor = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  return null;
};

const Home = () => (
  <>
    <ScrollToAnchor />
    <Hero />
    <Services />
    <WhyChooseUs />
    <DoctorProfile />
    <HowItWorks />
    <VaccinationSchedule />
    <Testimonials />
    <Gallery />
    <AppointmentForm />
    <FAQ />
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative">
        <AnnouncementBar />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/growth-tracker" element={<GrowthTracker />} />
            <Route path="/service/:slug" element={<ServiceDetail />} />
          </Routes>
        </main>
        <Footer />
        <FloatingElements />
      </div>
    </BrowserRouter>
  );
}



