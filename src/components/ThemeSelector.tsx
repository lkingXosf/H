import { useState } from 'react';
import { Sun, Moon, Cloud } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeSelectorProps {
  isScrolled: boolean;
}

export default function ThemeSelector({ isScrolled }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'light' as const, name: 'Light', icon: Sun },
    { id: 'dark' as const, name: 'Dark', icon: Moon },
    { id: 'somber' as const, name: 'Somber', icon: Cloud }
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-colors duration-300 ${
          isScrolled
            ? theme === 'dark' || theme === 'somber' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            : 'hover:bg-white/20'
        }`}
      >
        <CurrentIcon className={`h-5 w-5 ${
          isScrolled
            ? theme === 'dark' || theme === 'somber' ? 'text-gray-300' : 'text-gray-700'
            : 'text-white'
        }`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border z-50 overflow-hidden animate-slide-down ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' :
            theme === 'somber' ? 'bg-gray-700 border-gray-600' :
            'bg-white border-gray-200'
          }`}>
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center space-x-3 transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : theme === 'dark' || theme === 'somber'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{t.name}</span>
                  {isActive && (
                    <span className="ml-auto">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
