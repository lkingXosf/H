import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sanitizeText, validateContactForm, ValidationErrors } from '../lib/validation';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateContactForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setStatus('error');
      setErrorMessage('Please fix the highlighted fields and submit again.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');
    setValidationErrors({});

    const cleanData = {
      name: sanitizeText(formData.name, 80),
      email: sanitizeText(formData.email, 120),
      phone: sanitizeText(formData.phone, 30),
      company: sanitizeText(formData.company, 120),
      message: sanitizeText(formData.message, 2000)
    };

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: cleanData.name,
        email: cleanData.email,
        phone: cleanData.phone || null,
        company: cleanData.company || null,
        message: cleanData.message
      });

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
      setErrorMessage('We could not send your message right now. Please try again in a moment.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h3>
        <p className="text-gray-600">Fill out the form below, and we will get back to you within 24 hours.</p>
      </div>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3 animate-fade-in">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <p className="text-green-800">Message sent successfully! We'll be in touch soon.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 animate-fade-in">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
              placeholder="John Doe"
            />
            {validationErrors.name && <p className="mt-2 text-sm text-red-600">{validationErrors.name}</p>}
          </div>

          <div className="group">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
              placeholder="john@example.com"
            />
            {validationErrors.email && <p className="mt-2 text-sm text-red-600">{validationErrors.email}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
              placeholder="+1 (555) 123-4567"
            />
            {validationErrors.phone && <p className="mt-2 text-sm text-red-600">{validationErrors.phone}</p>}
          </div>

          <div className="group">
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
              placeholder="Your Company"
            />
            {validationErrors.company && <p className="mt-2 text-sm text-red-600">{validationErrors.company}</p>}
          </div>
        </div>

        <div className="group">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300 resize-none"
            placeholder="Tell us about your business needs..."
          />
          {validationErrors.message && <p className="mt-2 text-sm text-red-600">{validationErrors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {status === 'sending' ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
