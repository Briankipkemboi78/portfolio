import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Database, Brain, Users, Target, Mail, Phone, MapPin, ArrowRight, CheckCircle, Menu, X, Award, Zap, Shield, Globe, BookOpen, Code, Presentation as PresentationChart, FileText, Palette, Type, Layout } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'portfolio', 'team', 'style-guide', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">DataVision Analytics</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Services', 'About', 'Portfolio', 'Team', 'Style Guide', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    activeSection === item.toLowerCase().replace(' ', '-') ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'Services', 'About', 'Portfolio', 'Team', 'Style Guide', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="block w-full text-left text-gray-300 hover:text-blue-400 py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 pb-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Transform Your Business with 
                  <span className="text-blue-400"> Data-Driven Insights</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  We help companies unlock the power of their data through advanced analytics, 
                  compelling data storytelling, and comprehensive SQL training to make smarter decisions 
                  and accelerate growth.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-500 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-lg hover:bg-blue-400 hover:text-gray-900 transition-all"
                >
                  View Our Work
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg" 
                alt="Data Analytics Dashboard"
                className="rounded-2xl shadow-2xl border border-gray-700"
              />
              <div className="absolute -bottom-6 -left-6 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="font-semibold text-white">Revenue Growth</div>
                    <div className="text-green-400 font-bold">+47%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Analytics Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From data strategy to storytelling and SQL mastery, we provide comprehensive 
              analytics solutions that drive measurable business results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Data Strategy & Architecture",
                description: "Design robust data infrastructure and governance frameworks that scale with your business needs and ensure data quality."
              },
              {
                icon: Brain,
                title: "Advanced Analytics & AI",
                description: "Implement machine learning models and predictive analytics to forecast trends, automate decisions, and unlock hidden insights."
              },
              {
                icon: BarChart3,
                title: "Business Intelligence",
                description: "Create interactive dashboards and reports that provide real-time insights for better decision-making across all levels."
              },
              {
                icon: PresentationChart,
                title: "Data Storytelling",
                description: "Transform complex data into compelling narratives that drive action and communicate insights effectively to stakeholders."
              },
              {
                icon: Code,
                title: "SQL Coaching & Training",
                description: "Comprehensive SQL training programs from beginner to advanced levels, including query optimization and database design."
              },
              {
                icon: TrendingUp,
                title: "Performance Analytics",
                description: "Measure and optimize key business metrics to improve efficiency, reduce costs, and drive sustainable growth."
              },
              {
                icon: Target,
                title: "Customer Analytics",
                description: "Understand customer behavior, preferences, and lifetime value to enhance marketing ROI and customer experience."
              },
              {
                icon: Shield,
                title: "Data Security & Compliance",
                description: "Ensure data privacy and regulatory compliance while maintaining analytical capabilities and business continuity."
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-700 p-8 rounded-xl hover:shadow-lg transition-all hover:bg-gray-600 group border border-gray-600">
                <service.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Featured Services Highlight */}
          <div className="mt-20 grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl text-white border border-blue-500">
              <PresentationChart className="w-16 h-16 mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">Data Storytelling Mastery</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Learn to transform raw data into compelling narratives that inspire action. 
                Our data storytelling workshops teach visualization best practices, narrative 
                structure, and presentation techniques that make complex insights accessible.
              </p>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Visual design principles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Narrative frameworks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Executive presentation skills</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-2xl text-white border border-green-500">
              <Code className="w-16 h-16 mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">SQL Coaching Programs</h3>
              <p className="text-green-100 mb-6 leading-relaxed">
                Master SQL from fundamentals to advanced optimization techniques. 
                Our personalized coaching programs are designed for analysts, developers, 
                and business professionals who want to unlock the full power of their data.
              </p>
              <ul className="space-y-2 text-green-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Beginner to advanced levels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Query optimization techniques</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Real-world project practice</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg" 
                alt="Team collaboration"
                className="rounded-2xl shadow-xl border border-gray-700"
              />
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Why Choose DataVision Analytics?
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We're not just consultants – we're your strategic partners in digital transformation. 
                  Our team combines deep technical expertise with storytelling mastery and educational 
                  excellence to deliver solutions that create lasting value.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Award,
                    title: "Proven Expertise",
                    description: "15+ years of experience across industries with a track record of successful implementations and satisfied clients."
                  },
                  {
                    icon: Zap,
                    title: "Rapid Deployment",
                    description: "Agile methodologies ensure fast time-to-value with iterative improvements and continuous optimization."
                  },
                  {
                    icon: Globe,
                    title: "Scalable Solutions",
                    description: "Future-proof architectures and training programs that grow with your business needs and team capabilities."
                  },
                  {
                    icon: BookOpen,
                    title: "Educational Excellence",
                    description: "Comprehensive training programs that empower your team with lasting skills in analytics and data storytelling."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-900 p-3 rounded-lg border border-blue-700">
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how we've helped companies transform their operations and achieve 
              remarkable results through data-driven strategies, compelling storytelling, and SQL mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Revenue Optimization",
                industry: "Retail",
                result: "47% increase in revenue",
                image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
                description: "Implemented customer segmentation and predictive analytics with compelling data stories that drove executive buy-in."
              },
              {
                title: "Supply Chain Analytics",
                industry: "Manufacturing",
                result: "32% cost reduction",
                image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg",
                description: "Built real-time monitoring system and trained team in advanced SQL for autonomous data analysis."
              },
              {
                title: "Healthcare Patient Analytics",
                industry: "Healthcare",
                result: "25% improvement in outcomes",
                image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
                description: "Developed predictive models with clear data narratives that improved clinical decision-making processes."
              },
              {
                title: "Financial Risk Assessment",
                industry: "Banking",
                result: "60% faster processing",
                image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg",
                description: "Created automated risk scoring system with executive dashboards and comprehensive SQL training program."
              },
              {
                title: "Marketing Campaign Analytics",
                industry: "Technology",
                result: "85% improvement in ROI",
                image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
                description: "Developed attribution modeling with data storytelling framework that transformed marketing strategy."
              },
              {
                title: "Operations Efficiency Program",
                industry: "Logistics",
                result: "40% productivity gain",
                image: "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg",
                description: "Implemented comprehensive analytics platform with team training in SQL and data visualization best practices."
              }
            ].map((project, index) => (
              <div key={index} className="bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-600">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-blue-400 font-medium">{project.industry}</span>
                    <span className="text-sm text-green-400 font-bold">{project.result}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our diverse team of data scientists, storytelling experts, SQL masters, and consultants 
              brings together decades of experience across multiple industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Chief Data Officer",
                image: "https://images.pexels.com/photos/3760259/pexels-photo-3760259.jpeg",
                expertise: "AI/ML Strategy & Data Storytelling"
              },
              {
                name: "Michael Rodriguez",
                role: "Senior Data Scientist",
                image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
                expertise: "Predictive Analytics & SQL Optimization"
              },
              {
                name: "Emily Johnson",
                role: "Data Storytelling Lead",
                image: "https://images.pexels.com/photos/3760259/pexels-photo-3760259.jpeg",
                expertise: "Visualization & Executive Communication"
              },
              {
                name: "David Park",
                role: "SQL Training Director",
                image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
                expertise: "Database Architecture & Performance Tuning"
              }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow border-2 border-gray-600"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-400">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Guide Section */}
      <section id="style-guide" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Brand Style Guide
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive brand guidelines ensure consistent, professional communication 
              across all touchpoints and deliverables.
            </p>
          </div>

          {/* Color Palette */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Palette className="w-8 h-8 text-blue-400 mr-3" />
              Color Palette
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-24 bg-blue-600 rounded-lg mb-3 shadow-lg border border-gray-600"></div>
                <h4 className="font-semibold text-white">Primary Blue</h4>
                <p className="text-sm text-gray-300">#2563EB</p>
                <p className="text-xs text-gray-400">Trust, Professionalism</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-blue-400 rounded-lg mb-3 shadow-lg border border-gray-600"></div>
                <h4 className="font-semibold text-white">Accent Blue</h4>
                <p className="text-sm text-gray-300">#60A5FA</p>
                <p className="text-xs text-gray-400">Highlights, Links</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-green-400 rounded-lg mb-3 shadow-lg border border-gray-600"></div>
                <h4 className="font-semibold text-white">Success Green</h4>
                <p className="text-sm text-gray-300">#4ADE80</p>
                <p className="text-xs text-gray-400">Growth, Achievement</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-gray-700 rounded-lg mb-3 shadow-lg border border-gray-600"></div>
                <h4 className="font-semibold text-white">Dark Gray</h4>
                <p className="text-sm text-gray-300">#374151</p>
                <p className="text-xs text-gray-400">Cards, Sections</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Type className="w-8 h-8 text-blue-400 mr-3" />
              Typography
            </h3>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">Heading 1</h4>
                  <p className="text-sm text-gray-400">Font: Inter Bold, Size: 36-64px, Line Height: 1.1</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white mb-2">Heading 2</h4>
                  <p className="text-sm text-gray-400">Font: Inter Bold, Size: 30-48px, Line Height: 1.2</p>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-2">Heading 3</h4>
                  <p className="text-sm text-gray-400">Font: Inter Semibold, Size: 24-32px, Line Height: 1.3</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-lg text-gray-300 mb-2">Body Large - Used for introductory paragraphs and important content that needs emphasis.</p>
                  <p className="text-sm text-gray-400">Font: Inter Regular, Size: 18-20px, Line Height: 1.6</p>
                </div>
                <div>
                  <p className="text-base text-gray-300 mb-2">Body Regular - Standard body text for most content, ensuring optimal readability across all devices.</p>
                  <p className="text-sm text-gray-400">Font: Inter Regular, Size: 16px, Line Height: 1.5</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Body Small - Used for captions, metadata, and secondary information.</p>
                  <p className="text-sm text-gray-400">Font: Inter Regular, Size: 14px, Line Height: 1.4</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo Usage */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Layout className="w-8 h-8 text-blue-400 mr-3" />
              Logo Usage
            </h3>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-8 rounded-xl text-center border border-gray-600">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <BarChart3 className="w-12 h-12 text-blue-400" />
                  <span className="text-2xl font-bold text-white">DataVision</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Primary Logo</h4>
                <p className="text-sm text-gray-300">Use on dark backgrounds with adequate spacing</p>
              </div>
              <div className="bg-blue-600 p-8 rounded-xl text-center border border-blue-500">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <BarChart3 className="w-12 h-12 text-white" />
                  <span className="text-2xl font-bold text-white">DataVision</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Brand Logo</h4>
                <p className="text-sm text-blue-100">Use on brand colored backgrounds</p>
              </div>
              <div className="bg-gray-700 p-8 rounded-xl text-center border border-gray-600">
                <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Icon Only</h4>
                <p className="text-sm text-gray-300">Use when space is limited or as a favicon</p>
              </div>
            </div>
          </div>

          {/* Design Principles */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <FileText className="w-8 h-8 text-blue-400 mr-3" />
              Design Principles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Clarity",
                  description: "Every element serves a purpose and communicates clearly without ambiguity."
                },
                {
                  title: "Consistency",
                  description: "Uniform application of colors, typography, and spacing across all materials."
                },
                {
                  title: "Professionalism",
                  description: "Sophisticated design that builds trust and credibility with enterprise clients."
                },
                {
                  title: "Accessibility",
                  description: "Inclusive design that ensures content is accessible to all users and devices."
                }
              ].map((principle, index) => (
                <div key={index} className="bg-gray-700 p-6 rounded-xl border border-gray-600">
                  <h4 className="font-semibold text-white mb-3">{principle.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-gray-700 p-8 rounded-2xl border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-6">Usage Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-400 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Do's
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Maintain consistent spacing and alignment</li>
                  <li>• Use approved color combinations</li>
                  <li>• Ensure sufficient contrast ratios</li>
                  <li>• Keep logo proportions intact</li>
                  <li>• Use high-quality images and graphics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-4 flex items-center">
                  <X className="w-5 h-5 mr-2" />
                  Don'ts
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Don't stretch or distort the logo</li>
                  <li>• Don't use unauthorized color variations</li>
                  <li>• Don't place logo on busy backgrounds</li>
                  <li>• Don't use low-resolution images</li>
                  <li>• Don't mix different font families</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's discuss how our data analytics expertise, storytelling mastery, and SQL training 
              can help you achieve your business goals. Contact us for a free consultation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    info: "hello@datavisionanalytics.com",
                    description: "Get a response within 24 hours"
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    info: "+1 (555) 123-4567",
                    description: "Mon-Fri 9AM-6PM EST"
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    info: "123 Business District, Tech City, TC 12345",
                    description: "Schedule an in-person meeting"
                  }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-900 p-3 rounded-lg border border-blue-700">
                      <contact.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{contact.title}</h3>
                      <p className="text-blue-400 font-medium mb-1">{contact.info}</p>
                      <p className="text-sm text-gray-400">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="john@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service Interest
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                    <option>Select a service...</option>
                    <option>Data Strategy & Architecture</option>
                    <option>Advanced Analytics & AI</option>
                    <option>Business Intelligence</option>
                    <option>Data Storytelling</option>
                    <option>SQL Coaching & Training</option>
                    <option>Performance Analytics</option>
                    <option>Customer Analytics</option>
                    <option>Data Security & Compliance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details
                  </label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tell us about your data analytics needs, storytelling goals, or SQL training requirements..."
                  ></textarea>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-500 transition-colors font-medium">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">DataVision Analytics</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transforming businesses through data-driven insights, compelling storytelling, 
                and comprehensive SQL training. Your trusted partner in digital transformation.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Data Strategy</li>
                <li>Advanced Analytics</li>
                <li>Business Intelligence</li>
                <li>Data Storytelling</li>
                <li>SQL Coaching</li>
                <li>Performance Analytics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Case Studies</li>
                <li>Style Guide</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 DataVision Analytics. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400 text-sm mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;