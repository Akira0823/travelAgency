import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Plane, Hotel, Map, ShieldCheck, UserCheck, Phone, Mail, MapPin, 
  Instagram, Facebook, Twitter, Menu, X, Star, CheckCircle, ArrowRight,
  Globe, Camera, Heart, Award, Users, Calendar
} from 'lucide-react';

// Theme Configuration
const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      900: '#0c4a6e'
    },
    secondary: {
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48'
    },
    accent: {
      400: '#fbbf24',
      500: '#f59e0b'
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      400: '#a3a3a3',
      600: '#525252',
      800: '#262626',
      900: '#171717'
    }
  },
  gradients: {
    primary: 'from-blue-600 via-purple-600 to-pink-500',
    secondary: 'from-pink-500 to-orange-400',
    hero: 'from-blue-900/80 via-purple-800/60 to-pink-700/40'
  }
};

// Animation Variants
const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  },
  fadeInScale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Reusable Components
const AnimatedSection = ({ children, id, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations.fadeInUp}
      className={`py-20 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const GlassCard = ({ children, className = "", hover = true }) => (
  <motion.div
    className={`
      relative bg-white/10 backdrop-blur-lg border border-white/20 
      rounded-3xl p-8 shadow-2xl ${hover ? 'hover:bg-white/20' : ''}
      transition-all duration-500 ${className}
    `}
    whileHover={hover ? { y: -8, scale: 1.02 } : {}}
  >
    {children}
  </motion.div>
);

const GradientText = ({ children, gradient = theme.gradients.primary, className = "" }) => (
  <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Services", to: "services" },
    { name: "Destinations", to: "destinations" },
    { name: "Contact", to: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <ScrollLink to="home" smooth duration={800} className="cursor-pointer">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Wanderlust
              </h1>
            </motion.div>
          </ScrollLink>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <ScrollLink
                key={link.name}
                to={link.to}
                spy
                smooth
                offset={-80}
                duration={800}
                className="relative text-gray-600 hover:text-blue-600 font-medium cursor-pointer transition-colors duration-300"
                activeClass="text-blue-600"
              >
                {link.name}
              </ScrollLink>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <ScrollLink to="contact" smooth duration={800} offset={-80}>
              <motion.button 
                className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Book Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </ScrollLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button 
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white/90 backdrop-blur-xl border-t border-white/20"
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map(link => (
            <ScrollLink
              key={link.name}
              to={link.to}
              smooth
              offset={-80}
              duration={800}
              onClick={() => setIsOpen(false)}
              className="block text-gray-600 hover:text-blue-600 py-2 cursor-pointer"
            >
              {link.name}
            </ScrollLink>
          ))}
          <ScrollLink to="contact" smooth duration={800} offset={-80} onClick={() => setIsOpen(false)}>
            <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold">
              Book Journey
            </button>
          </ScrollLink>
        </div>
      </motion.div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const heroFeatures = [
    { icon: <Award className="h-5 w-5" />, text: "Award Winning" },
    { icon: <Users className="h-5 w-5" />, text: "50K+ Travelers" },
    { icon: <Globe className="h-5 w-5" />, text: "200+ Destinations" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradients.hero}`} />
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 text-white/20"
        animate={animations.float}
      >
        <Camera size={40} />
      </motion.div>
      <motion.div 
        className="absolute bottom-32 right-16 text-white/20"
        animate={{ ...animations.float, transition: { ...animations.float.transition, delay: 1 } }}
      >
        <Heart size={36} />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center space-x-6 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
            {heroFeatures.map((feature, i) => (
              <div key={i} className="flex items-center space-x-2 text-white text-sm">
                {feature.icon}
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
        >
          Discover Your Next
          <br />
          <GradientText gradient="from-yellow-400 via-pink-400 to-blue-400" className="block">
            Adventure
          </GradientText>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Embark on extraordinary journeys crafted just for you. From hidden gems to iconic wonders, 
          we turn your travel dreams into unforgettable memories.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <ScrollLink to="destinations" smooth duration={800} offset={-80}>
            <motion.button 
              className="relative px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg shadow-xl overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                Explore Destinations
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </ScrollLink>
          
          <ScrollLink to="about" smooth duration={800} offset={-80}>
            <motion.button 
              className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const stats = [
    { value: "15+", label: "Years Experience", icon: <Calendar className="h-8 w-8" /> },
    { value: "50K+", label: "Happy Travelers", icon: <Users className="h-8 w-8" /> },
    { value: "200+", label: "Destinations", icon: <Globe className="h-8 w-8" /> },
    { value: "98%", label: "Satisfaction", icon: <Heart className="h-8 w-8" /> },
  ];

  return (
    <AnimatedSection id="about" className="bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          variants={animations.fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Why Choose <GradientText>Wanderlust</GradientText>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We don't just plan trips; we craft life-changing experiences that connect you 
            with the world's most extraordinary places and cultures.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div 
            className="relative"
            variants={animations.fadeInScale}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035&auto=format&fit=crop" 
                alt="Travel planning" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div 
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Premium Quality</p>
                  <p className="text-sm text-gray-600">Guaranteed</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <motion.div variants={animations.stagger}>
            <motion.h3 
              className="text-3xl font-bold text-gray-900 mb-6"
              variants={animations.fadeInUp}
            >
              Crafting Your Perfect Journey
            </motion.h3>
            <motion.p 
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              variants={animations.fadeInUp}
            >
              At Wanderlust, every journey is a masterpiece. Our expert travel designers work 
              closely with you to understand your dreams, preferences, and desires, creating 
              bespoke itineraries that exceed expectations and create memories to last a lifetime.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 gap-8"
              variants={animations.stagger}
            >
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center group"
                  variants={animations.fadeInScale}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    { 
      icon: <Plane size={32} />, 
      title: "Flight Booking", 
      description: "Premium flight deals with exclusive partnerships worldwide.",
      color: "from-blue-500 to-cyan-400"
    },
    { 
      icon: <Hotel size={32} />, 
      title: "Luxury Accommodations", 
      description: "Handpicked hotels, resorts, and unique stays globally.",
      color: "from-purple-500 to-pink-400"
    },
    { 
      icon: <Map size={32} />, 
      title: "Custom Itineraries", 
      description: "Personalized travel experiences crafted by experts.",
      color: "from-green-500 to-teal-400"
    },
    { 
      icon: <ShieldCheck size={32} />, 
      title: "Travel Protection", 
      description: "Comprehensive insurance and 24/7 emergency support.",
      color: "from-orange-500 to-red-400"
    },
    { 
      icon: <UserCheck size={32} />, 
      title: "Local Experiences", 
      description: "Authentic cultural immersion with local guides.",
      color: "from-indigo-500 to-purple-400"
    },
    { 
      icon: <Phone size={32} />, 
      title: "Concierge Service", 
      description: "Round-the-clock personal travel assistance.",
      color: "from-pink-500 to-rose-400"
    },
  ];

  return (
    <AnimatedSection id="services">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          variants={animations.fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Our <GradientText>Premium</GradientText> Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From conception to completion, we handle every detail of your journey 
            with unmatched expertise and care.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={animations.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, i) => (
            <motion.div 
              key={i}
              variants={animations.fadeInScale}
              className="group"
            >
              <GlassCard className="relative h-full border-2 border-transparent hover:border-white/30 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} text-white mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

// Destinations Section
const DestinationsSection = () => {
  const destinations = [
    { 
      name: "Santorini, Greece", 
      price: 2800, 
      rating: 4.9, 
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2070&auto=format&fit=crop",
      description: "Iconic white villages and stunning sunsets"
    },
    { 
      name: "Kyoto, Japan", 
      price: 3200, 
      rating: 4.8, 
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop",
      description: "Ancient temples and cherry blossoms"
    },
    { 
      name: "Maldives", 
      price: 4500, 
      rating: 5.0, 
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop",
      description: "Overwater villas and pristine beaches"
    },
  ];

  return (
    <AnimatedSection id="destinations" className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          variants={animations.fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Featured <GradientText>Destinations</GradientText>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover breathtaking destinations that will ignite your wanderlust 
            and create memories to last a lifetime.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={animations.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {destinations.map((dest, i) => (
            <motion.div 
              key={i}
              variants={animations.fadeInScale}
              className="group cursor-pointer"
            >
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-sm">{dest.rating}</span>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold text-gray-600">From </span>
                    <span className="text-lg font-bold text-blue-600">${dest.price}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{dest.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      Explore Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

// Contact Section
const ContactSection = () => {
  const contactInfo = [
    { 
      icon: <MapPin className="h-6 w-6" />, 
      title: "Visit Us", 
      details: "123 Wanderlust Ave, Travel City, TC 12345" 
    },
    { 
      icon: <Phone className="h-6 w-6" />, 
      title: "Call Us", 
      details: "+1 (555) 123-4567" 
    },
    { 
      icon: <Mail className="h-6 w-6" />, 
      title: "Email Us", 
      details: "hello@wanderlust.com" 
    },
  ];

  return (
    <AnimatedSection id="contact" className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          variants={animations.fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready for Your Next <GradientText gradient="from-yellow-400 to-pink-400">Adventure</GradientText>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let's create something extraordinary together. Our travel experts are ready 
            to turn your dreams into your next great adventure.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div variants={animations.stagger}>
            <h3 className="text-3xl font-bold mb-12">Get in Touch</h3>
            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <motion.div 
                  key={i}
                  variants={animations.fadeInUp}
                  className="flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{info.title}</h4>
                    <p className="text-gray-300">{info.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Social Links */}
            <motion.div 
              className="mt-12"
              variants={animations.fadeInUp}
            >
              <h4 className="text-xl font-semibold mb-6">Follow Our Journey</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <Instagram className="h-6 w-6" />, color: "from-pink-500 to-purple-600" },
                  { icon: <Facebook className="h-6 w-6" />, color: "from-blue-600 to-blue-700" },
                  { icon: <Twitter className="h-6 w-6" />, color: "from-blue-400 to-blue-600" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg`}
                    whileHover={{ y: -2 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Newsletter Signup */}
          <motion.div variants={animations.fadeInScale}>
            <GlassCard className="bg-white/5 border-white/10">
              <h3 className="text-3xl font-bold mb-6">Stay Inspired</h3>
              <p className="text-gray-300 mb-8">
                Join our community of adventurers and get exclusive travel deals, 
                insider tips, and destination inspiration delivered to your inbox.
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                />
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join the Adventure
                </motion.button>
              </form>
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </GlassCard>
          </motion.div>
        </div>
        
        {/* Footer */}
        <motion.div 
          className="border-t border-white/10 mt-20 pt-12 text-center"
          variants={animations.fadeInUp}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">Wanderlust</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <ScrollLink to="home" smooth duration={800} className="hover:text-white cursor-pointer transition-colors">
                Home
              </ScrollLink>
              <ScrollLink to="about" smooth duration={800} className="hover:text-white cursor-pointer transition-colors">
                About
              </ScrollLink>
              <ScrollLink to="services" smooth duration={800} className="hover:text-white cursor-pointer transition-colors">
                Services
              </ScrollLink>
              <ScrollLink to="destinations" smooth duration={800} className="hover:text-white cursor-pointer transition-colors">
                Destinations
              </ScrollLink>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Wanderlust. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="font-sans antialiased bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DestinationsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default App;