export interface ValidationErrors {
  [key: string]: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9()\-\s]{7,20}$/;
const ZIP_REGEX = /^[A-Za-z0-9\-\s]{3,12}$/;

export const sanitizeText = (value: string, maxLength = 500): string => {
  const trimmed = value.replace(/\s+/g, ' ').trim();
  const sanitized = trimmed.replace(/[<>]/g, '');
  return sanitized.slice(0, maxLength);
};

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email.trim());

export const isValidPhone = (phone: string): boolean => PHONE_REGEX.test(phone.trim());

export const isValidZipCode = (zipCode: string): boolean => ZIP_REGEX.test(zipCode.trim());

export const validateContactForm = (formData: {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!sanitizeText(formData.name, 80)) {
    errors.name = 'Please enter your full name.';
  }

  if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (formData.company && sanitizeText(formData.company, 120).length < 2) {
    errors.company = 'Company name must be at least 2 characters.';
  }

  if (sanitizeText(formData.message, 2000).length < 10) {
    errors.message = 'Please provide at least 10 characters in your message.';
  }

  return errors;
};

export interface LLCFormData {
  companyName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  businessType: string;
  members: string;
  ein: string;
  bankAccount: string;
  additionalInfo: string;
}

export const validateLLCForm = (formData: LLCFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!sanitizeText(formData.companyName, 120)) {
    errors.companyName = 'Company name is required.';
  }

  if (!sanitizeText(formData.ownerName, 120)) {
    errors.ownerName = 'Owner name is required.';
  }

  if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!sanitizeText(formData.address, 200)) {
    errors.address = 'Address is required.';
  }

  if (!sanitizeText(formData.city, 100)) {
    errors.city = 'City is required.';
  }

  if (!sanitizeText(formData.state, 100)) {
    errors.state = 'State or province is required.';
  }

  if (!isValidZipCode(formData.zipCode)) {
    errors.zipCode = 'Please enter a valid ZIP or postal code.';
  }

  if (!sanitizeText(formData.country, 100)) {
    errors.country = 'Country is required.';
  }

  if (!formData.businessType) {
    errors.businessType = 'Please select a business type.';
  }

  return errors;
};
