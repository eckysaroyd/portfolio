import { useState, useEffect, useRef } from 'react';
import { MdClose, MdEmail, MdPerson, MdMessage, MdSend } from 'react-icons/md';
import emailjs from '@emailjs/browser';

const ContactModal = ({ isOpen, onClose }) => {
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
  const modalRef = useRef(null);

  // Prevent body scroll and scroll to top when modal opens
  useEffect(() => {
    if (isOpen) {
      // Smooth scroll to top for extra positioning reliability
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    }

    return () => {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

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
    /* TW Elements Modal Structure - Exact Pattern */
    <div
      className={`fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none ${isOpen ? 'block' : 'hidden'} bg-black/60 backdrop-blur-sm`}
      tabIndex="-1"
      aria-labelledby="modal-title"
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <div
        className={`pointer-events-none relative w-auto transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-2xl ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-50px] opacity-0'
        }`}
      >
        <div
          ref={modalRef}
          className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-clip-padding text-current shadow-4 outline-none bg-gradient-to-br from-[#000428] to-[#004e92] border-2 border-[#00d4ff]/50 rounded-2xl shadow-2xl shadow-[#00d4ff]/30 backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-2xl border-b border-white/10 p-6">
            <div>
              <h2 id="modal-title" className="text-2xl font-bold text-white mb-1">Let's Start a Project</h2>
              <p className="text-white/70 text-sm">Tell me about your project and I'll get back to you within 24 hours</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors p-2"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>

          {/* Modal body */}
          <div className="relative p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

              {/* Submit Buttons */}
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
                  disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
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
      </div>
    </div>
  );
};

export default ContactModal;