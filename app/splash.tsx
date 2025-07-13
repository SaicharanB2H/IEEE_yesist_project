import React, { useState } from 'react';
import { Redirect } from 'expo-router';
import SplashScreen from '@/components/SplashScreen';

export default function SplashScreenPage() {
  const [showSplash, setShowSplash] = useState(true);

  const handleGetStarted = () => {
    setShowSplash(false);
  };

  if (!showSplash) {
    return <Redirect href="/(tabs)" />;
  }

  return <SplashScreen onGetStarted={handleGetStarted} />;
}
