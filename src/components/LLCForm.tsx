import { useState } from 'react';
import { Building2, User, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FormTranslations } from '../contexts/LanguageContext';
import { LLCFormData, ValidationErrors, sanitizeText, validateLLCForm } from '../lib/validation';

interface LLCFormProps {
  onBack: () => void;
  translations: FormTranslations;
}

export default function LLCForm({ onBack, translations }: LLCFormProps) {
  const [formData, setFormData] = useState<LLCFormData>({
    companyName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    businessType: '',
    members: '1',
    ein: 'yes',
    bankAccount: 'yes',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLLCForm(formData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSubmitStatus('error');
      setSubmitError('Please correct the highlighted fields and try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setValidationErrors({});
    setSubmitError('');

    const cleanData = {
      companyName: sanitizeText(formData.companyName, 120),
      ownerName: sanitizeText(formData.ownerName, 120),
      email: sanitizeText(formData.email, 120),
      phone: sanitizeText(formData.phone, 30),
      address: sanitizeText(formData.address, 200),
      city: sanitizeText(formData.city, 100),
      state: sanitizeText(formData.state, 100),
      zipCode: sanitizeText(formData.zipCode, 20),
      country: sanitizeText(formData.country, 100),
      businessType: formData.businessType,
      members: formData.members,
      ein: formData.ein,
      bankAccount: formData.bankAccount,
      additionalInfo: sanitizeText(formData.additionalInfo, 2000)
    };

    try {
      const { error } = await supabase.from('llc_applications').insert({
        company_name: cleanData.companyName,
        owner_name: cleanData.ownerName,
        email: cleanData.email,
        phone: cleanData.phone,
        address: cleanData.address,
        city: cleanData.city,
        state: cleanData.state,
        zip_code: cleanData.zipCode,
        country: cleanData.country,
        business_type: cleanData.businessType,
        members: cleanData.members,
        ein_needed: cleanData.ein === 'yes',
        bank_account_needed: cleanData.bankAccount === 'yes',
        additional_info: cleanData.additionalInfo || null,
        status: 'pending'
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        companyName: '',
        ownerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        businessType: '',
        members: '1',
        ein: 'yes',
        bankAccount: 'yes',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      setSubmitError('We could not submit your application right now. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{translations.backToHome}</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {translations.formTitle}
            </h1>
            <p className="text-gray-600">
              {translations.formSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.companyName} *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={translations.companyNamePlaceholder}
                  />
                </div>
                {validationErrors.companyName && <p className="mt-2 text-sm text-red-600">{validationErrors.companyName}</p>}
              </div>

              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.ownerName} *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={translations.ownerNamePlaceholder}
                  />
                </div>
                {validationErrors.ownerName && <p className="mt-2 text-sm text-red-600">{validationErrors.ownerName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.email} *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={translations.emailPlaceholder}
                  />
                </div>
                {validationErrors.email && <p className="mt-2 text-sm text-red-600">{validationErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.phone} *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={translations.phonePlaceholder}
                  />
                </div>
                {validationErrors.phone && <p className="mt-2 text-sm text-red-600">{validationErrors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.address} *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={translations.addressPlaceholder}
                />
              </div>
              {validationErrors.address && <p className="mt-2 text-sm text-red-600">{validationErrors.address}</p>}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.city} *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={translations.cityPlaceholder}
                />
                {validationErrors.city && <p className="mt-2 text-sm text-red-600">{validationErrors.city}</p>}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.state} *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={translations.statePlaceholder}
                />
                {validationErrors.state && <p className="mt-2 text-sm text-red-600">{validationErrors.state}</p>}
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.zipCode} *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={translations.zipCodePlaceholder}
                />
                {validationErrors.zipCode && <p className="mt-2 text-sm text-red-600">{validationErrors.zipCode}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.country} *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={translations.countryPlaceholder}
              />
              {validationErrors.country && <p className="mt-2 text-sm text-red-600">{validationErrors.country}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.businessType} *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">{translations.selectOption}</option>
                  <option value="ecommerce">{translations.ecommerce}</option>
                  <option value="consulting">{translations.consulting}</option>
                  <option value="technology">{translations.technology}</option>
                  <option value="real-estate">{translations.realEstate}</option>
                  <option value="other">{translations.other}</option>
                </select>
                {validationErrors.businessType && <p className="mt-2 text-sm text-red-600">{validationErrors.businessType}</p>}
              </div>

              <div>
                <label htmlFor="members" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.members} *
                </label>
                <select
                  id="members"
                  name="members"
                  value={formData.members}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ein" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.ein} *
                </label>
                <select
                  id="ein"
                  name="ein"
                  value={formData.ein}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="yes">{translations.yes}</option>
                  <option value="no">{translations.no}</option>
                </select>
              </div>

              <div>
                <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.bankAccount} *
                </label>
                <select
                  id="bankAccount"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="yes">{translations.yes}</option>
                  <option value="no">{translations.no}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.additionalInfo}
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={translations.additionalInfoPlaceholder}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg">
                {translations.successMessage}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                {submitError || translations.errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? translations.submitting : translations.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
