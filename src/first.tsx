import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db, botToken, chatId } from './firebase';
import { UAParser } from 'ua-parser-js';
import { getUserIP } from './components/getlocip';

interface LoadingPageProps {
  onSubmit: (name: string) => void;
}

interface VisitorData {
  id: number;
  name: string;
  os: string;
  browser: string;
  ip: string;
  domain: string;
  location: {
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  FirstAccess: string;
  LastAccess: string | null;
}

interface LocationData {
  city?: string;
  region?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
}

const LoadingPage = ({ onSubmit }: LoadingPageProps) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const domain = window.location.hostname;
  const currentHour = new Date().getHours();

  const getGreeting = (hour: number): string => {
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const storedVisitorId = localStorage.getItem('visitorId');
    const storedVisitorName = localStorage.getItem('visitorName');
    const greeting = getGreeting(currentHour);

    const initialLines = [
      `${greeting}!`,
      `Welcome to ${domain}`,
      'Please enter your name:',
    ];

    let currentLine = 0;
    const timer = setInterval(() => {
      if (currentLine < initialLines.length) {
        setLines((prev) => [...prev, initialLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(timer);
        if (storedVisitorId) {
          setVisitorName(storedVisitorName);
          setLines([greeting, `Welcome back to ${domain}, ${storedVisitorName}!`]);
          setShowInput(true); 
        } else {
          setShowInput(true);
        }
      }
    }, 500);

    return () => clearInterval(timer);
  }, [currentHour, domain]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const sendTelegramNotification = async (message: string) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });
    } catch (error) {
      console.error('Error sending Telegram message:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const ip = await getUserIP();
      let locationData: LocationData = {};

      try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        locationData = (await response.json()) as LocationData;
      } catch (error) {
        locationData = {
          city: "Unknown City",
          region: "Unknown Region",
          country_name: "Unknown Country",
          latitude: 0,
          longitude: 0
        };
      }

      const parser = new UAParser();
      const os = parser.getOS().name || 'Unknown OS';
      const browser = parser.getBrowser().name || 'Unknown Browser';

      const jakartaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
      const formattedTime = new Date(jakartaTime).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      let currentVisitorId = localStorage.getItem("visitorId");
      if (!currentVisitorId) {
        const snapshot = await getDocs(collection(db, "visitors"));
        currentVisitorId = (snapshot.size + 1).toString();
        localStorage.setItem("visitorId", currentVisitorId);
      }

      const userData: VisitorData = {
        id: parseInt(currentVisitorId),
        name,
        os,
        browser,
        ip,
        domain,
        location: {
          city: locationData.city ?? "Unknown City",
          region: locationData.region ?? "Unknown Region",
          country: locationData.country_name ?? "Unknown Country",
          latitude: locationData.latitude ?? 0,
          longitude: locationData.longitude ?? 0,
        },
        FirstAccess: formattedTime,
        LastAccess: null,
      };

      const telegramMessage = `👤 New Visitor\n` +
        `🧑‍💻 Name: ${userData.name}\n` +
        `🌐 IP: ${userData.ip}\n` +
        `📍 Location: ${userData.location.city}, ${userData.location.region}, ${userData.location.country}\n` +
        `📍 Coordinates: Latitude ${userData.location.latitude}, Longitude ${userData.location.longitude}\n` +
        `💻 OS: ${userData.os}\n` +
        `🌐 Browser: ${userData.browser}\n` +
        `🔗 Domain: ${userData.domain}\n` +
        `🕒 First Access: ${userData.FirstAccess}`;

      await sendTelegramNotification(telegramMessage);
      await addDoc(collection(db, "visitors"), userData);
      
      localStorage.setItem('visitorName', name);
      setVisitorName(name);
      onSubmit(name);
    } catch (error) {
      setError((error as Error).message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReturningVisitor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jakartaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
      const formattedLastAccessTime = new Date(jakartaTime).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const currentVisitorId = localStorage.getItem("visitorId");
      if (!currentVisitorId || !visitorName) return;

      const q = query(collection(db, "visitors"), where("id", "==", parseInt(currentVisitorId)));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        await updateDoc(doc(db, "visitors", docId), { 
          LastAccess: formattedLastAccessTime 
        });

        const ip = await getUserIP();
        let locationData: LocationData = {};
        try {
          const response = await fetch(`https://ipapi.co/${ip}/json/`);
          locationData = (await response.json()) as LocationData;
        } catch (error) {
          locationData = {
            city: "Unknown City",
            region: "Unknown Region",
            country_name: "Unknown Country",
            latitude: 0,
            longitude: 0
          };
        }

        const telegramMessage = `👤 Visitor Returned\n` +
          `🧑‍💻 Name: ${visitorName}\n` +
          `🌐 IP: ${ip}\n` +
          `📍 Location: ${locationData.city ?? "Unknown City"}, ${locationData.region ?? "Unknown Region"}, ${locationData.country_name ?? "Unknown Country"}\n` +
          `📍 Coordinates: Latitude ${locationData.latitude ?? 0}, Longitude ${locationData.longitude ?? 0}\n` +
          `🔗 Domain: ${domain}\n` +
          `🕒 Last Access: ${formattedLastAccessTime}`;

        await sendTelegramNotification(telegramMessage);
      }
    } catch (error) {
      console.error("Error updating LastAccess:", error);
    } finally {
      setLoading(false);
    }

    if (!visitorName) {
      setError('Invalid visitor session');
      setLoading(false);
      return;
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 font-mono flex items-center justify-center">
      <div className="max-w-7xl w-full text-green-400 scale-95 hover:scale-100 transition-transform duration-300">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-0.5 bg-gray-800 px-4 py-2 rounded-t-lg border-b-2 border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="size-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors" />
              <div className="size-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors" />
              <div className="size-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors" />
            </div>
            <span className="text-sm text-gray-400 font-semibold ml-2">zsh — Terminal</span>
          </div>
          <div className="text-xs text-gray-500">⌘</div>
        </div>

        {/* Terminal Body */}
        <div className="bg-gray-800 p-4 rounded-b-lg shadow-2xl border border-gray-700 relative overflow-hidden">
          {/* CRT Screen Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-10" 
               style={{
                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 50%)`,
                 backgroundSize: '100% 3px'
               }} />
          
          <div className="relative z-10">
            {lines.map((line, index) => (
              <div key={index} className="flex items-center gap-2 mb-2 group">
                <span className="text-green-500 shrink-0">➜</span>
                <span className="text-gray-300 font-medium whitespace-pre-wrap break-words terminal-line">
                  {line}
                </span>
              </div>
            ))}

            {/* Input Section */}
            {showInput && (
          <form 
            ref={formRef}
            onSubmit={visitorName ? handleReturningVisitor : handleSubmit}
            className="flex items-center gap-2 mt-3"
          >
              <span className="text-green-500"></span>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  name="input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (visitorName) {
                        handleReturningVisitor(e);
                      } else {
                        handleSubmit(e);
                      }
                    }
                  }}
                  className="w-full bg-transparent text-gray-300 border-none focus:ring-0 p-0 pr-4 caret-green-500 placeholder:text-gray-600 font-medium"
                  placeholder={visitorName ? 'Press Enter to continue...' : 'Enter your name...'}
                  autoFocus
                  autoComplete="off"
                  style={{textShadow: '0 0 8px rgba(74, 222, 128, 0.3)'}}
                  disabled={loading}
                />
    </div>
  </form>
)}

            {/* Status Indicators */}
            {error && (
              <div className="flex items-center gap-2 mt-3 text-red-400 animate-pulse-fast">
                <span className="text-red-500">✗</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-2 mt-3 text-gray-400">
                <div className="flex space-x-1">
                  <div className="size-2 bg-green-500 rounded-full animate-bounce" />
                  <div className="size-2 bg-green-500 rounded-full animate-bounce delay-100" />
                  <div className="size-2 bg-green-500 rounded-full animate-bounce delay-200" />
                </div>
                <span className="font-medium">Processing...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 1s step-end infinite;
        }
        .animate-pulse-fast {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .terminal-line {
          text-shadow: 0 0 6px rgba(74, 222, 128, 0.1);
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
}

export default LoadingPage;