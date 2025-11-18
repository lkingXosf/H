import { Shield, Lock, Award, HeadphonesIcon } from 'lucide-react';

const badges = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Money-Back Guarantee',
    description: '100% refund if not satisfied',
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: 'Secure & Confidential',
    description: 'Your data is protected',
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: 'IRS Approved',
    description: 'Authorized EIN provider',
  },
  {
    icon: <HeadphonesIcon className="h-8 w-8" />,
    title: '24/7 Support',
    description: 'Always here to help',
  },
];

export default function TrustBadges() {
  return (
    <div className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white p-4 rounded-full mb-3 group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110 shadow-md">
                <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                  {badge.icon}
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{badge.title}</h4>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
