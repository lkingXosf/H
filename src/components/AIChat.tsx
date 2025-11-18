import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatProps {
  translations: any;
}

export default function AIChat({ translations }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getWelcomeMessage = () => {
    return translations.language === 'fr'
      ? 'Bonjour! Je suis votre assistant IA. Comment puis-je vous aider avec la formation de votre LLC aujourd\'hui?'
      : 'Hello! I\'m your AI assistant. How can I help you with your LLC formation today?';
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getWelcomeMessage(),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: getWelcomeMessage(),
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, [translations.language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const isFrench = translations.language === 'fr';

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('prix') || lowerMessage.includes('coût')) {
      return isFrench
        ? 'Notre service de formation de LLC coûte 499$ (frais uniques). Cela inclut tout: enregistrement LLC, numéro EIN, agent enregistré pendant 1 an, assistance pour le compte bancaire, et bien plus encore!'
        : 'Our LLC formation service costs $499 (one-time fee). This includes everything: LLC registration, EIN number, 1-year registered agent, bank account assistance, and more!';
    }

    if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('temps') || lowerMessage.includes('combien de temps')) {
      return isFrench
        ? 'Nous pouvons former votre LLC en seulement 48 heures! Notre processus simplifié garantit que votre entreprise est opérationnelle rapidement.'
        : 'We can form your LLC in just 48 hours! Our streamlined process ensures your business is up and running quickly.';
    }

    if (lowerMessage.includes('document') || lowerMessage.includes('paper') || lowerMessage.includes('need')) {
      return isFrench
        ? 'Vous aurez besoin de: 1) Informations sur le propriétaire (nom, adresse, e-mail), 2) Nom de l\'entreprise souhaité, 3) Type d\'entreprise, 4) Nombre de membres. Nous nous occupons de tous les documents et dépôts!'
        : 'You\'ll need: 1) Owner information (name, address, email), 2) Desired company name, 3) Business type, 4) Number of members. We handle all the paperwork and filings!';
    }

    if (lowerMessage.includes('ein') || lowerMessage.includes('tax')) {
      return isFrench
        ? 'Oui! Nous obtenons votre numéro EIN (Employer Identification Number) dans le cadre de notre service. C\'est votre numéro d\'identification fiscale fédéral nécessaire pour les opérations commerciales et l\'ouverture de comptes bancaires.'
        : 'Yes! We obtain your EIN (Employer Identification Number) as part of our service. This is your federal tax ID number required for business operations and opening bank accounts.';
    }

    if (lowerMessage.includes('bank') || lowerMessage.includes('account') || lowerMessage.includes('banque') || lowerMessage.includes('compte')) {
      return isFrench
        ? 'Nous fournissons une assistance complète pour l\'ouverture de compte bancaire. Nous vous aidons avec la documentation et vous guidons tout au long du processus d\'ouverture d\'un compte bancaire professionnel américain.'
        : 'We provide full bank account setup assistance. We help with documentation and guide you through the process of opening a US business bank account.';
    }

    if (lowerMessage.includes('state') || lowerMessage.includes('where') || lowerMessage.includes('état') || lowerMessage.includes('où')) {
      return isFrench
        ? 'Nous pouvons former votre LLC dans n\'importe quel État américain. Les choix populaires incluent le Delaware, le Wyoming et le Nevada pour leurs lois favorables aux entreprises. Nous vous aiderons à choisir le meilleur État pour vos besoins!'
        : 'We can form your LLC in any US state. Popular choices include Delaware, Wyoming, and Nevada for their business-friendly laws. We\'ll help you choose the best state for your needs!';
    }

    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('commencer') || lowerMessage.includes('démarrer')) {
      return isFrench
        ? 'C\'est facile de commencer! Cliquez simplement sur le bouton "Commencer maintenant" pour remplir notre formulaire de demande. Cela ne prend que 10 minutes et nous vous contacterons dans les 24 heures!'
        : 'It\'s easy to get started! Just click the "Get Started Now" button to fill out our application form. It takes just 10 minutes, and we\'ll contact you within 24 hours!';
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('bonjour') || lowerMessage.includes('salut')) {
      return isFrench
        ? 'Bonjour! Comment puis-je vous aider avec la formation de votre LLC américaine aujourd\'hui?'
        : 'Hello! How can I help you with your US LLC formation today?';
    }

    return isFrench
      ? 'Merci pour votre question! Pour des informations détaillées, je vous recommande de remplir notre formulaire de demande ou de contacter notre équipe directement. Nous sommes là pour vous aider 24/7!'
      : 'Thanks for your question! For detailed information, I recommend filling out our application form or contacting our team directly. We\'re here to help 24/7!';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 z-50 group"
          aria-label="Open AI Chat"
        >
          <MessageCircle className="h-6 w-6 group-hover:animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-up border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-semibold">{translations.title}</h3>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white dark:bg-gray-800 text-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={translations.placeholder}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
