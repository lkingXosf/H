import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How long does the LLC formation process take?',
    answer: 'Most LLCs are formed within 48 hours. However, processing times can vary by state. We expedite the process whenever possible and keep you updated throughout.',
  },
  {
    question: 'Do I need to be a US citizen to form an LLC?',
    answer: 'No! You do not need to be a US citizen or resident to form an LLC in the United States. We help entrepreneurs from over 150 countries establish their US business presence.',
  },
  {
    question: 'What is included in the $499 package?',
    answer: 'Our package includes complete LLC registration, EIN (Tax ID) application, 1 year of registered agent service, operating agreement template, US business address, bank account setup assistance, and ongoing compliance support.',
  },
  {
    question: 'Which state should I form my LLC in?',
    answer: 'We typically recommend Delaware, Wyoming, or your business operating state. Each has unique benefits. Delaware offers strong legal protections, Wyoming has low fees and privacy, while forming in your operating state can simplify compliance.',
  },
  {
    question: 'Can I open a US bank account with my LLC?',
    answer: 'Yes! We provide guidance and support for opening US bank accounts. We work with banks that accept international founders and help you through the application process.',
  },
  {
    question: 'What ongoing compliance is required?',
    answer: 'Requirements vary by state but typically include an annual report and franchise tax. We provide ongoing compliance support to help you stay in good standing and never miss important deadlines.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about forming your US LLC
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300 hover:shadow-md animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
          >
            Contact our team
            <ChevronDown className="h-4 w-4 ml-2 rotate-[-90deg]" />
          </a>
        </div>
      </div>
    </section>
  );
}
