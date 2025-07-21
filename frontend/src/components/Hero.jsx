import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = ({ data, onCTAClick }) => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section bg-gradient-to-b from-green-50 to-white min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main title */}
          <motion.h1 
            className="display-xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {data.title}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="body-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {data.subtitle}
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-16"
          >
            <Button 
              onClick={scrollToAbout}
              className="btn-primary text-lg px-8 py-4 bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
            >
              {data.cta}
            </Button>
          </motion.div>

          {/* Energy visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center items-center space-x-8 mb-12"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-3 animate-pulse">
                <span className="text-2xl">👟</span>
              </div>
              <span className="text-sm text-gray-600">Pisada</span>
            </div>
            
            <div className="flex items-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-green-600 text-2xl"
              >
                →
              </motion.div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-3 animate-pulse">
                <span className="text-2xl">⚡</span>
              </div>
              <span className="text-sm text-gray-600">Energía</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer"
            onClick={scrollToAbout}
          >
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;