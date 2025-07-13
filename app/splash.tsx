import SplashScreen from '@/components/SplashScreen';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';

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
