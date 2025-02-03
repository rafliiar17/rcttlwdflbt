import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import LoadingPage from './first';
import Container from './container';
import { Button, Card } from 'flowbite-react';
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
// Main App Component
const App  = () => {
  const [isFirstAccess, setIsFirstAccess] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  useEffect(() => {
    const storedIsDesktop = localStorage.getItem('isDesktop');
    if (storedIsDesktop !== null) {
      setIsDesktop(JSON.parse(storedIsDesktop));
    } else {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (!navigator.onLine) setIsOffline(true);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleFirstAccessSubmit = (name: string) => {
    localStorage.setItem('userName', name);
    setIsFirstAccess(false);
  };

  const handleRetry = () => {
    setIsDesktop(true);
    localStorage.setItem('isDesktop', 'true');
    window.location.reload();
  };

  if (isOffline) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-200">
        <Card className="animate-fade-in-up bg-red-100 p-6">
          <HiExclamation className="mx-auto mb-4 size-12 text-red-600" />
          <h1 className="mb-2 text-center text-xl font-bold text-red-600">
            Tidak Ada Koneksi Internet
          </h1>
          <p className="text-center text-gray-600">
            Silakan cek koneksi Anda dan coba lagi.
          </p>
        </Card>
      </div>
    );
  }

  if (!isDesktop) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-200">
        <Card className="animate-fade-in-up bg-yellow-100 p-6">
          <HiComputerDesktop className="mx-auto mb-4 size-12 text-yellow-600" />
          <h1 className="mb-2 text-center text-xl font-bold text-yellow-600">
            Tampilan Desktop Diperlukan
          </h1>
          <p className="mb-4 text-center text-gray-600">
            Gunakan perangkat dengan layar lebih besar untuk pengalaman optimal.
          </p>
          <Button
            gradientMonochrome="warning"
            onClick={handleRetry}
            className="w-full"
          >
            Coba Tetap Lanjut
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      {isFirstAccess ? (
        <LoadingPage onSubmit={handleFirstAccessSubmit} />
      ) : (
        <Container />
      )}
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);