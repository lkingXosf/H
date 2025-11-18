interface LogoProps {
  variant?: 'light' | 'dark' | 'colored';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'colored', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { text: 'text-xl' },
    md: { text: 'text-3xl' },
    lg: { text: 'text-5xl' }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'light':
        return 'text-white';
      case 'dark':
        return 'text-gray-900';
      case 'colored':
        return 'text-blue-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="flex items-center group cursor-pointer relative">
      <span
        className={`${sizes[size].text} font-black tracking-tight uppercase ${getTextColor()} transition-all duration-300 group-hover:scale-105`}
        style={{
          textShadow: variant === 'light' ? '0 2px 8px rgba(0,0,0,0.3)' :
                      variant === 'colored' ? '0 2px 12px rgba(37, 99, 235, 0.3)' : 'none',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        OGS SOLUTION
      </span>

      {/* Animated glow effect for colored variant */}
      {variant === 'colored' && (
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-600/20 rounded-lg blur-xl animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
