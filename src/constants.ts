export const CLINIC_DATA = {
  name: "Divine Children's Clinic",
  tagline: "Care for Cure",
  doctor: {
    name: "Dr. Aman Sharma",
    qualifications: "MBBS, MD Pediatrics (AIIMS)",
    designation: "Senior Pediatrician & Child Specialist",
    experience: "12+ Years",
    childrenTreated: "15,000+",
    hospitals: "Fortis, Max Healthcare",
    papers: "25+ Published",
    bio: "Dedicated to providing compassionate and evidence-based care for children. Specializing in newborn care, vaccinations, and developmental monitoring."
  },
  contact: {
    phone: "+91 98765 43210",
    email: "info@divinechildrensclinic.com",
    address: "Sector 12, Dwarka, New Delhi, India",
    mapsUrl: "https://maps.app.goo.gl/WmNSvUgMbZduAz128",
    timings: "Mon–Sat 10AM–2PM, 5PM–8PM",
    whatsapp: "https://wa.me/919876543210"
  },
  services: [
    { 
      slug: "general-pediatrics",
      title: "General Pediatrics", 
      desc: "Routine checkups, growth monitoring, and preventative care.", 
      icon: "fa-stethoscope", 
      color: "blue",
      details: "Comprehensive physical examinations and developmental assessments for children of all ages. We focus on preventive health, monitoring growth milestones, and early detection of potential issues. Our approach is holistic, considering physical, emotional, and social well-being.",
      highlights: ["Routine Wellness Exams", "Growth & Milestone Tracking", "Preventive Care Guidance", "School/Sports Physicals"],
      image: "https://images.unsplash.com/photo-1584362944885-1f34d1b89286?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      slug: "newborn-care",
      title: "Newborn Care", 
      desc: "Neonatal assessment and jaundice management for infants.", 
      icon: "fa-baby", 
      color: "green",
      details: "Specialized care for infants in their first few months of life. We provide neonatal jaundice management, breastfeeding support, and detailed assessments to ensure your newborn is thriving and meeting early developmental goals.",
      highlights: ["Neonatal Assessments", "Jaundice Management", "Breastfeeding Support", "Infant Growth Monitoring"],
      image: "https://images.unsplash.com/photo-1544126592-807daa215a15?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      slug: "vaccination",
      title: "Vaccination", 
      desc: "Complete NVS immunization schedule for all age groups.", 
      icon: "fa-syringe", 
      color: "amber",
      details: "Offering a complete range of vaccinations following the National Vaccination Schedule (NVS) of India. We emphasize timely immunization and provide both standard and painless options to protect children from preventable diseases.",
      highlights: ["NVS Approved Schedule", "Painless Vaccinations Available", "Digital Immunization Records", "Timely Reminders"],
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      slug: "nutritional-counseling",
      title: "Nutritional Counseling", 
      desc: "Specialized diet plans for infant growth and childhood obesity.", 
      icon: "fa-apple-whole", 
      color: "red",
      details: "Expert guidance on childhood nutrition to ensure optimal growth. We address common issues like fussy eating, nutritional deficiencies, and childhood obesity through personalized diet plans and lifestyle management strategies.",
      highlights: ["Personalized Diet Plans", "Growth Monitoring", "Obesity Management", "Managing Fussy Eaters"],
      image: "https://images.unsplash.com/photo-1490818384503-6b6272314a84?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      slug: "infection-management",
      title: "Infection Management", 
      desc: "Expert care for dengue, typhoid, and seasonal viral fevers.", 
      icon: "fa-virus-covid", 
      color: "purple",
      details: "Rapid diagnosis and effective management of common childhood infections. We specialize in treating seasonal fevers, viral illnesses, and common bacterial infections like typhoid, ensuring your child recovers quickly and safely.",
      highlights: ["Fever Management", "Viral Illness Diagnosis", "Typhoid & Dengue Care", "Infection Prevention Guidance"],
      image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      slug: "respiratory-care",
      title: "Respiratory Care", 
      desc: "Management of pediatric asthma, bronchitis, and allergies.", 
      icon: "fa-lungs", 
      color: "cyan",
      details: "Specialized treatment for respiratory conditions like pediatric asthma, bronchitis, and common seasonal allergies. We use modern diagnostic tools and management techniques to ensure your child breathes easy and stays active.",
      highlights: ["Asthma Management", "Allergy Testing", "Bronchitis Treatment", "Nebulization Services"],
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      slug: "developmental-assessment",
      title: "Developmental Assessment", 
      desc: "Milestone tracking and early screening for special needs.", 
      icon: "fa-brain", 
      color: "indigo",
      details: "Regular monitoring of developmental milestones to ensure healthy growth. Early screening for developmental delays, autism, and ADHD, allowing for timely intervention and support where needed.",
      highlights: ["Milestone Tracking", "Early Autism Screening", "ADHD Evaluation", "Behavioral Consultations"],
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      slug: "skin-conditions",
      title: "Skin Conditions", 
      desc: "Treatment for eczema, rashes, and pediatric skin allergies.", 
      icon: "fa-hand-dots", 
      color: "pink",
      details: "Management of common pediatric skin issues including eczema, dermatitis, diaper rashes, and skin allergies. We provide gentle, effective treatments tailored to a child's sensitive skin.",
      highlights: ["Eczema Management", "Dermatitis Treatment", "Rash Diagnosis", "Allergy Management"],
      image: "https://images.unsplash.com/photo-1615461066841-6116ecaabb04?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      slug: "emergency-care",
      title: "Emergency Care", 
      desc: "24/7 tele-consultation support for acute pediatric concerns.", 
      icon: "fa-ambulance", 
      color: "rose",
      details: "Dedicated support for acute pediatric concerns. While we are an OPD clinic, we provide 24/7 tele-consultation for emergencies and immediate guidance on urgent health issues and first aid.",
      highlights: ["24/7 Tele-Consultation", "Urgent Care Guidance", "First Aid Information", "Referral Services"],
      image: "https://images.unsplash.com/photo-1587350846663-00e9ee3dc630?q=80&w=2000&auto=format&fit=crop"
    }
  ],
  testimonials: [
    { name: "Meera Kapoor", age: "4yr daughter", text: "Dr. Sharma is incredibly patient. He explained everything clearly without rushing.", rating: 5 },
    { name: "Rahul Verma", age: "6m son", text: "The best pediatric clinic in Dwarka. The staff is friendly and the environment is very clean.", rating: 5 },
    { name: "Anjali Gupta", age: "2yr son", text: "Highly recommend for vaccinations. They maintain a proper record and send reminders.", rating: 5 },
    { name: "Sanjay Dixit", age: "10yr son", text: "Excellent diagnosis. My son was suffering from persistent cough for weeks, cured in 3 days.", rating: 5 },
    { name: "Priya Singh", age: "NB twins", text: "Newborn care here is exceptional. Very supportive during our first month as parents.", rating: 5 },
    { name: "Vikram Sethi", age: "8yr daughter", text: "Reasonable consultation fees and no unnecessary tests. A genuine place for kids.", rating: 5 }
  ],
  vaccinationSchedule: [
    { age: "Birth", vaccines: "BCG, Oral Polio vaccine (OPV-0), Hepatitis B (Hep-B 1)", status: "Vital" },
    { age: "6 Weeks", vaccines: "IPV-1, Hep-B 2, DTP-1, Hib-1, PCV-1, Rota-1", status: "Vital" },
    { age: "10 Weeks", vaccines: "DTP-2, Hib-2, IPV-2, Rota-2", status: "Vital" },
    { age: "14 Weeks", vaccines: "DTP-3, Hib-3, IPV-3, Rota-3, PCV-2", status: "Vital" },
    { age: "6 Months", vaccines: "OPV-1, Hep-B 3", status: "Recommended" },
    { age: "9 Months", vaccines: "Measles (MMR-1), Vitamin A", status: "Vital" },
    { age: "12 Months", vaccines: "Hepatitis A (Hep-A 1)", status: "Recommended" },
    { age: "15 Months", vaccines: "MMR-2, Varicella-1, PCV Booster", status: "Vital" },
    { age: "18 Months", vaccines: "DTP Booster-1, IPV Booster, Hib Booster", status: "Vital" },
    { age: "2 Years", vaccines: "Typhoid Booster", status: "Recommended" },
    { age: "5 Years", vaccines: "DTP Booster-2, OPV Booster-2, MMR-3", status: "Vital" }
  ],
  faq: [
    { q: "What age group does the clinic treat?", a: "We treat children from birth (newborns) up to 18 years of age." },
    { q: "Do I need an appointment or walk-ins are allowed?", a: "We prefer appointments to minimize waiting time, but walk-ins are accepted for emergencies." },
    { q: "What documents should I bring on first visit?", a: "Please bring your child's birth record and previous vaccination history if available." },
    { q: "Do you provide home visit services?", a: "Currently, we only provide in-clinic consultations and tele-consultation support." },
    { q: "Is the clinic open on Sundays?", a: "The clinic is closed on Sundays, but available for emergencies via our helpline." },
    { q: "What vaccinations are available?", a: "We stock all NVS India recommended vaccines, including painless options." },
    { q: "How do I reach the clinic from Dwarka Metro?", a: "We are located 5 minutes away from Sector 12 Metro Station by auto-rickshaw." },
    { q: "What is the consultation fee?", a: "Our standard consultation fee is ₹600. Follow-up visits within 3 days are free." }
  ]
};
