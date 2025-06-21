import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Plane, Hotel, Map, ShieldCheck, UserCheck, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Menu, X, Star, CheckCircle, ArrowRight
} from 'lucide-react';

// Reusable Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};


// Main App Component
const App = () => {
  return (
    <div className="bg-neutral-white font-sans">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PackagesSection />
        <FeaturedDestinations />
        <ContactFooterSection />
      </main>
    </div>
  );
};

// AnimatedSection Component (for scroll animations)
const AnimatedSection = ({ children, id }) => {
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
      variants={sectionVariants}
      className="py-16 md:py-24"
    >
      {children}
    </motion.section>
  );
};

// 1. Navigation Bar
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = ["Home", "About", "Services", "Packages", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">
            <h1 className="text-2xl font-serif font-bold text-primary-dark">Wanderlust</h1>
          </ScrollLink>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <ScrollLink
                key={link}
                to={link.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-neutral-gray hover:text-primary-light transition-colors duration-300 cursor-pointer font-medium"
                activeClass="text-primary-light border-b-2 border-primary-light"
              >
                {link}
              </ScrollLink>
            ))}
          </div>
          
          <div className="hidden md:block">
            <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
              <button className="px-5 py-2 bg-secondary-light text-white rounded-full font-semibold hover:bg-secondary-dark transition-transform duration-300 hover:scale-105">
                Book Now
              </button>
            </ScrollLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6 text-primary-dark" /> : <Menu className="h-6 w-6 text-primary-dark" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks.map(link => (
              <ScrollLink
                key={link}
                to={link.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="text-neutral-gray hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                activeClass="text-primary-light bg-blue-50"
              >
                {link}
              </ScrollLink>
            ))}
            <ScrollLink to="contact" smooth={true} duration={500} offset={-70} onClick={() => setIsOpen(false)}>
              <button className="w-full mt-4 px-5 py-2 bg-secondary-light text-white rounded-full font-semibold hover:bg-secondary-dark transition-colors duration-300">
                Book Now
              </button>
            </ScrollLink>
        </div>
      </motion.div>
    </nav>
  );
};


// 2. Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="h-screen w-full flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
        alt="Tropical beach with mountains"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 text-center text-neutral-white p-4">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4"
        >
          Where Will Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-light to-accent-light">Story</span> Begin?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          We curate unforgettable journeys and handcrafted experiences, turning your travel dreams into reality.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ScrollLink to="packages" smooth={true} duration={500} offset={-70}>
            <button className="bg-primary-light text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore Destinations
            </button>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

// 3. About Us Section
const AboutSection = () => {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "10k+", label: "Happy Travelers" },
    { value: "200+", label: "Destinations" },
    { value: "98%", label: "Satisfaction Rate" },
  ];
  return (
    <AnimatedSection id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark">Why Choose Wanderlust?</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">Your journey is our passion. We combine deep expertise with a personal touch to create the perfect trip for you.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            variants={cardVariants}
          >
            <img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop" alt="Traveler looking at a map" className="rounded-lg shadow-xl w-full h-auto object-cover"/>
          </motion.div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">Crafting Your Perfect Escape</h3>
            <p className="mb-6">
              At Wanderlust, we believe travel is more than just visiting a new place; it's about creating lasting memories. Our team of seasoned travel experts is dedicated to understanding your unique desires and crafting a personalized itinerary that exceeds your expectations. From hidden gems to iconic landmarks, we handle every detail so you can focus on the experience.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-secondary-dark">{stat.value}</p>
                  <p className="text-sm text-neutral-gray">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// 4. Services Section
const ServicesSection = () => {
  const services = [
    { icon: <Plane size={36} />, title: "Flight Booking", description: "Best deals on domestic and international flights." },
    { icon: <Hotel size={36} />, title: "Hotel Reservations", description: "Luxury to budget accommodations worldwide." },
    { icon: <Map size={36} />, title: "Custom Itineraries", description: "Personalized travel planning and experiences." },
    { icon: <ShieldCheck size={36} />, title: "Travel Insurance", description: "Comprehensive coverage for peace of mind." },
    { icon: <UserCheck size={36} />, title: "Local Tours & Guides", description: "Expert-led cultural experiences." },
    { icon: <Phone size={36} />, title: "24/7 Support", description: "Round-the-clock customer assistance." },
  ];

  return (
    <AnimatedSection id="services">
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark">Our Services</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto">We offer a complete suite of services to ensure your travel is seamless from start to finish.</p>
          </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
                variants={cardVariants}
              >
                <div className="text-primary-light inline-block mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// 5. Packages Section
const PackagesSection = () => {
  const packages = [
    { name: "Explorer", price: "999", features: ["Economy flights", "3-star hotels", "Basic itinerary", "Group tours"], popular: false },
    { name: "Adventurer", price: "1,999", features: ["Premium economy", "4-star hotels", "Custom itinerary", "Private tours mix"], popular: true },
    { name: "Luxury", price: "3,499", features: ["Business class", "5-star resorts", "Personalized itinerary", "Private guides"], popular: false },
    { name: "Ultimate", price: "5,000+", features: ["First-class", "Luxury villas", "Bespoke experiences", "Personal concierge"], popular: false },
  ];

  return (
    <AnimatedSection id="packages">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark">Our Travel Packages</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">Choose a package that suits your style, or let us create a completely custom adventure for you.</p>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              className={`relative bg-white rounded-lg shadow-lg p-8 border-2 transition-transform duration-300 ${pkg.popular ? 'border-secondary-light transform md:scale-105' : 'border-gray-200'}`}
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              {pkg.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-secondary-light text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-center text-primary-dark mb-2">{pkg.name}</h3>
              <p className="text-center text-4xl font-bold text-primary-dark mb-6">
                <span className="text-xl align-top">$</span>{pkg.price}
              </p>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-bold transition-colors duration-300 ${pkg.popular ? 'bg-secondary-light text-white hover:bg-secondary-dark' : 'bg-primary-light text-white hover:bg-primary-dark'}`}>
                Book Now
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};


// 6. Featured Destinations Section
const FeaturedDestinations = () => {
  const destinations = [
    { name: "Santorini, Greece", price: 1800, rating: 4.9, image: "https://images.unsplash.com/photo-1579979119565-5f6e8b2dd34b?q=80&w=1974&auto=format&fit=crop" },
    { name: "Kyoto, Japan", price: 2200, rating: 4.8, image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop" },
    { name: "Maldives", price: 3500, rating: 5.0, image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1975&auto=format&fit=crop" },
  ];

  return (
    <AnimatedSection id="destinations">
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark">Featured Destinations</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto">Get inspired by some of our most sought-after travel spots.</p>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {destinations.map((dest, i) => (
              <motion.div 
                key={i} 
                className="bg-white rounded-lg shadow-lg overflow-hidden group"
                variants={cardVariants}
              >
                <div className="relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-500"/>
                  <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-secondary-dark fill-current"/>
                    <span className="font-bold text-sm text-primary-dark">{dest.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-dark">{dest.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-semibold">From <span className="text-secondary-dark">${dest.price}</span></p>
                    <a href="#" className="text-primary-light font-semibold flex items-center group-hover:text-secondary-dark transition-colors">
                      Explore <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"/>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// 7. Contact & Footer Section
const ContactFooterSection = () => {
  return (
    <AnimatedSection id="contact">
      <footer className="bg-primary-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Ready for an Adventure?</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-300">Contact us today to start planning your dream vacation. Our experts are ready to assist you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-serif text-secondary-light">Contact Us</h3>
              <p className="flex items-center"><MapPin className="h-5 w-5 mr-3 text-secondary-light"/>123 Wanderlust Ave, Travel City, 12345</p>
              <p className="flex items-center"><Phone className="h-5 w-5 mr-3 text-secondary-light"/>
                <a href="tel:+1234567890" className="hover:text-secondary-light transition-colors">+1 (234) 567-890</a>
              </p>
              <p className="flex items-center"><Mail className="h-5 w-5 mr-3 text-secondary-light"/>
                <a href="mailto:hello@wanderlust.com" className="hover:text-secondary-light transition-colors">hello@wanderlust.com</a>
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-4">
               <h3 className="text-xl font-bold font-serif text-secondary-light">Quick Links</h3>
               <ul className="space-y-2">
                 {["Home", "About", "Services", "Packages"].map(link => (
                    <li key={link}>
                        <ScrollLink 
                            to={link.toLowerCase()} 
                            smooth={true} 
                            duration={500} 
                            offset={-70}
                            className="hover:text-secondary-light transition-colors cursor-pointer"
                        >
                            {link}
                        </ScrollLink>
                    </li>
                 ))}
               </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold font-serif text-secondary-light">Join Our Newsletter</h3>
              <p className="text-gray-300 mt-4 mb-4">Get the latest travel deals and inspiration straight to your inbox.</p>
              <form className="flex">
                <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary-light"/>
                <button type="submit" className="bg-secondary-light px-4 py-2 rounded-r-md hover:bg-secondary-dark transition-colors">Subscribe</button>
              </form>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="hover:text-secondary-light transition-colors"><Instagram size={24}/></a>
                <a href="#" className="hover:text-secondary-light transition-colors"><Facebook size={24}/></a>
                <a href="#" className="hover:text-secondary-light transition-colors"><Twitter size={24}/></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Wanderlust Travel Agency. All Rights Reserved.</p>
            <p className="mt-2">
                <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
};


export default App;