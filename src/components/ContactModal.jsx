import { useState, useEffect, useRef } from 'react';
import { MdClose, MdEmail, MdPerson, MdMessage, MdSend } from 'react-icons/md';
import emailjs from '@emailjs/browser';

const ContactModal = ({ isOpen, onClose, buttonRef }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: '',
    projectType: '',
    budget: '',
    timeline: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);

  // Calculate modal position based on button position
  useEffect(() => {
    if (isOpen && buttonRef?.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      setModalPosition({
        top: buttonRect.top + scrollY - 480, // Position well above the button to avoid footer
        left: buttonRect.left + (buttonRect.width / 2) - 300, // Center horizontally relative to button
      });
    }
  }, [isOpen, buttonRef]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && 
          buttonRef?.current && !buttonRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Initialize EmailJS with your public key
      emailjs.init('5TU3vEpdsLSCDy_3G');
      
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        project_type: formData.projectType || 'Not specified',
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified'
      };

      // Send email to you (main contact form)
      const response = await emailjs.send(
        'service_qo0ohq1', // Your service ID
        'template_4cgzljh', // Your main template ID
        templateParams
      );

      // Send auto-reply to user (don't fail if this fails)
      try {
        const autoReplyParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          to_email: formData.email // Try adding this
        };

        await emailjs.send(
          'service_qo0ohq1', // Your service ID
          'template_qqljtcc', // Auto-reply template ID
          autoReplyParams
        );
      } catch (autoReplyError) {
        console.log('Auto-reply failed, but main email sent successfully:', autoReplyError);
      }

      if (response.status === 200) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setFormData({
            name: '',
            email: '',
            subject: 'Project Inquiry',
            message: '',
            projectType: '',
            budget: '',
            timeline: ''
          });
          setSubmitStatus(null);
        }, 3000);
      }
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className={`fixed z-50 transition-all duration-300 ${isOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}
      style={{ 
        top: `${modalPosition.top}px`,
        left: `${Math.max(10, Math.min(modalPosition.left, window.innerWidth - 620))}px`, // Keep within viewport
        width: '600px'
      }}
    >
      <div className="bg-gradient-to-br from-[#000428] to-[#004e92] border-2 border-[#00d4ff]/50 rounded-2xl shadow-2xl shadow-[#00d4ff]/30 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Let's Start a Project</h2>
            <p className="text-white/70 text-sm">Tell me about your project and I'll get back to you within 24 hours</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                <MdPerson className="inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                <MdEmail className="inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20"
            >
              <option value="Project Inquiry">Project Inquiry</option>
              <option value="Consultation Request">Consultation Request</option>
              <option value="Partnership Opportunity">Partnership Opportunity</option>
              <option value="Job Opportunity">Job Opportunity</option>
              <option value="General Question">General Question</option>
            </select>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Project Type
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20"
              >
                <option value="">Select type</option>
                <option value="Web Application">Web Application</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Mobile App">Mobile App</option>
                <option value="API Development">API Development</option>
                <option value="Consulting">Consulting</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20"
              >
                <option value="">Select budget</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000+">$25,000+</option>
                <option value="Let's discuss">Let's discuss</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20"
              >
                <option value="">Select timeline</option>
                <option value="ASAP">ASAP</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2-3 months">2-3 months</option>
                <option value="3+ months">3+ months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <MdMessage className="inline mr-2" />
              Project Description *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20 resize-none"
              placeholder="Please describe your project, goals, and any specific requirements..."
            />
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300 text-sm">
              ✅ Message sent successfully! I'll get back to you within 24 hours.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm">
              ❌ There was an error sending your message. Please try again or email me directly.
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
              className="flex-1 px-6 py-3 bg-[#00d4ff] text-black font-semibold rounded-lg hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <MdSend />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;