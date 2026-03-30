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
        return 'text-emerald-600';
      default:
        return 'text-emerald-600';
    }
  };

  return (
    <div className="flex items-center group cursor-pointer relative">
      <span
        className={`${sizes[size].text} font-black tracking-tight uppercase ${getTextColor()} transition-all duration-300 group-hover:scale-105`}
        style={{
          textShadow: variant === 'light' ? '0 2px 8px rgba(0,0,0,0.3)' :
                      variant === 'colored' ? '0 2px 12px rgba(5, 150, 105, 0.35)' : 'none',
          fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
          letterSpacing: '0.03em'
        }}
      >
        MYLLC
      </span>

      {/* Animated glow effect for colored variant */}
      {variant === 'colored' && (
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-amber-400/20 to-emerald-600/20 rounded-lg blur-xl animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
