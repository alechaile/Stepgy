import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Header from './Header';
import Hero from './Hero';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Zap, 
  RefreshCw, 
  TrendingUp, 
  Battery, 
  Cpu, 
  ArrowUp,
  Mail,
  MapPin,
  Instagram,
  ChevronRight,
  Users,
  Lightbulb,
  Settings,
  Award,
  Loader2
} from 'lucide-react';
import { stepgyData } from '../data/mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      // Call the backend API
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        setSubmitMessage(response.data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitError('Error al enviar el mensaje. Por favor intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      if (error.response?.data?.detail) {
        setSubmitError(error.response.data.detail);
      } else if (error.response?.status === 422) {
        setSubmitError('Por favor revisa que todos los campos estén completados correctamente.');
      } else {
        setSubmitError('Error de conexión. Por favor intenta nuevamente más tarde.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const iconMap = {
    'Zap': Zap,
    'RefreshCw': RefreshCw,
    'TrendingUp': TrendingUp,
    'Battery': Battery,
    'Cpu': Cpu,
    'ArrowUp': ArrowUp
  };

  // Section component with intersection observer
  const Section = ({ children, id, className = '' }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        id={id}
        className={className}
      >
        {children}
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div id="home">
        <Hero data={stepgyData.hero} />
      </div>

      {/* About Section */}
      <Section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 text-gray-900 mb-8">{stepgyData.about.title}</h2>
            <p className="body-lg text-gray-600 leading-relaxed">
              {stepgyData.about.content}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Problem Section */}
      <Section id="problem" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 text-gray-900 mb-8">{stepgyData.problem.title}</h2>
            <p className="body-lg text-gray-600 leading-relaxed">
              {stepgyData.problem.content}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Solution Section */}
      <Section id="solution" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.solution.title}</h2>
            <p className="body-lg text-gray-600">{stepgyData.solution.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stepgyData.solution.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="design-card text-center h-full">
                    <CardHeader>
                      <div className="card-icon mx-auto bg-green-600 text-white">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <CardTitle className="card-title">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="card-description">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Technology Section */}
      <Section id="technology" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.technology.title}</h2>
            <p className="body-lg text-gray-600 mb-8">{stepgyData.technology.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {stepgyData.technology.components.map((component, index) => {
              const IconComponent = iconMap[component.icon];
              return (
                <Card key={index} className="design-card">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{component.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Badge className="bg-green-100 text-green-800 text-lg px-6 py-2">
              {stepgyData.technology.performance}
            </Badge>
          </div>
        </div>
      </Section>

      {/* Prototype Section */}
      <Section id="prototype" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 text-gray-900 mb-8">{stepgyData.prototype.title}</h2>
            <p className="body-lg text-gray-600 mb-12 leading-relaxed">
              {stepgyData.prototype.content}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {stepgyData.prototype.images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={image} 
                    alt={`Prototipo ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.team.title}</h2>
            <p className="body-lg text-gray-600">{stepgyData.team.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stepgyData.team.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="design-card text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge className="bg-green-100 text-green-800">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.gallery.title}</h2>
            <p className="body-lg text-gray-600">{stepgyData.gallery.subtitle}</p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {stepgyData.gallery.categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="heading-3 text-gray-900 mb-6 text-center">{category.name}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.images.map((image, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-lg overflow-hidden shadow-lg"
                    >
                      <img 
                        src={image} 
                        alt={`${category.name} ${imageIndex + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.contact.title}</h2>
              <p className="body-lg text-gray-600">{stepgyData.contact.subtitle}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Instagram</p>
                    <p className="text-gray-600">{stepgyData.contact.info.instagram}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">{stepgyData.contact.info.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ubicación</p>
                    <p className="text-gray-600">{stepgyData.contact.info.location}</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Tu email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tu mensaje"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
                
                {/* Success Message */}
                {submitMessage && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">{submitMessage}</p>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{submitError}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    stepgyData.contact.form.submitText
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Stepgy</span>
            </div>
            <p className="text-gray-400 mb-4">{stepgyData.footer.text}</p>
            <p className="text-gray-500">{stepgyData.footer.year}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

  const iconMap = {
    'Zap': Zap,
    'RefreshCw': RefreshCw,
    'TrendingUp': TrendingUp,
    'Battery': Battery,
    'Cpu': Cpu,
    'ArrowUp': ArrowUp
  };

  // Section component with intersection observer
  const Section = ({ children, id, className = '' }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        id={id}
        className={className}
      >
        {children}
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div id="home">
        <Hero data={stepgyData.hero} />
      </div>

      {/* About Section */}
      <Section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 text-gray-900 mb-8">{stepgyData.about.title}</h2>
            <p className="body-lg text-gray-600 leading-relaxed">
              {stepgyData.about.content}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Problem Section */}
      <Section id="problem" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 text-gray-900 mb-8">{stepgyData.problem.title}</h2>
            <p className="body-lg text-gray-600 leading-relaxed">
              {stepgyData.problem.content}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Solution Section */}
      <Section id="solution" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.solution.title}</h2>
            <p className="body-lg text-gray-600">{stepgyData.solution.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stepgyData.solution.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="design-card text-center h-full">
                    <CardHeader>
                      <div className="card-icon mx-auto bg-green-600 text-white">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <CardTitle className="card-title">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="card-description">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Technology Section */}
      <Section id="technology" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.technology.title}</h2>
            <p className="body-lg text-gray-600 mb-8">{stepgyData.technology.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {stepgyData.technology.components.map((component, index) => {
              const IconComponent = iconMap[component.icon];
              return (
                <Card key={index} className="design-card">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{component.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Badge className="bg-green-100 text-green-800 text-lg px-6 py-2">
              {stepgyData.technology.performance}
            </Badge>
          </div>
        </div>
      </Section>

      {/* Prototype Section */}
      <Section id="prototype" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 text-gray-900 mb-8">{stepgyData.prototype.title}</h2>
            <p className="body-lg text-gray-600 mb-12 leading-relaxed">
              {stepgyData.prototype.content}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {stepgyData.prototype.images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={image} 
                    alt={`Prototipo ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.team.title}</h2>
            <p className="body-lg text-gray-600">{stepgyData.team.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stepgyData.team.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="design-card text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge className="bg-green-100 text-green-800">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.gallery.title}</h2>
            <p className="body-lg text-gray-600">{stepgyData.gallery.subtitle}</p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {stepgyData.gallery.categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="heading-3 text-gray-900 mb-6 text-center">{category.name}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.images.map((image, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-lg overflow-hidden shadow-lg"
                    >
                      <img 
                        src={image} 
                        alt={`${category.name} ${imageIndex + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-1 text-gray-900 mb-4">{stepgyData.contact.title}</h2>
              <p className="body-lg text-gray-600">{stepgyData.contact.subtitle}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Instagram</p>
                    <p className="text-gray-600">{stepgyData.contact.info.instagram}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">{stepgyData.contact.info.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ubicación</p>
                    <p className="text-gray-600">{stepgyData.contact.info.location}</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Tu email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tu mensaje"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                >
                  {stepgyData.contact.form.submitText}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Stepgy</span>
            </div>
            <p className="text-gray-400 mb-4">{stepgyData.footer.text}</p>
            <p className="text-gray-500">{stepgyData.footer.year}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;