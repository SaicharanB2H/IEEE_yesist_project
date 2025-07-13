import React, { useEffect, useRef, useCallback } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onGetStarted: () => void;
}

export default function SplashScreen({ onGetStarted }: SplashScreenProps) {
  const colorScheme = useColorScheme();
  
  // Animation values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const logoGlow = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleSlideY = useRef(new Animated.Value(50)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleSlideY = useRef(new Animated.Value(30)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const particleAnimations = useRef(
    Array.from({ length: 8 }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(height + 100),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.5),
      rotation: new Animated.Value(0),
    }))
  ).current;

  const startAnimationSequence = useCallback(() => {
    // Start particle animations
    particleAnimations.forEach((particle, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 300),
          Animated.parallel([
            Animated.timing(particle.y, {
              toValue: -100,
              duration: 5000 + Math.random() * 3000,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0.8,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: 1.2,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(particle.rotation, {
              toValue: 1,
              duration: 5000,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(particle.opacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      // Reset particle position when it goes off screen
      setTimeout(() => {
        particle.x.setValue(Math.random() * width);
        particle.y.setValue(height + 100);
      }, (index * 300) + 6000);
    });

    // Main animation sequence
    Animated.sequence([
      // Logo entrance with bounce
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }),
      ]),
      
      // Title slide in
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(titleSlideY, {
          toValue: 0,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      
      // Subtitle slide in
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(subtitleSlideY, {
          toValue: 0,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      
      // Button entrance with pulse
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 50,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Continuous logo pulse animation with glow
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(logoScale, {
              toValue: 1.1,
              duration: 2000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(logoGlow, {
              toValue: 1,
              duration: 2000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(logoScale, {
              toValue: 1,
              duration: 2000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(logoGlow, {
              toValue: 0,
              duration: 2000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }, 2000);
  }, [logoScale, logoRotation, logoGlow, titleOpacity, titleSlideY, subtitleOpacity, subtitleSlideY, buttonOpacity, buttonScale, particleAnimations]);

  useEffect(() => {
    startAnimationSequence();
  }, [startAnimationSequence]);

  const logoRotationInterpolate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const logoGlowInterpolate = logoGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const particleRotationInterpolate = (rotation: Animated.Value) => rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const gradientColors: readonly [string, string, ...string[]] = colorScheme === 'dark' 
    ? ['#0F172A', '#1E293B', '#334155']
    : ['#3B82F6', '#1D4ED8', '#1E40AF'];

  const particleColor = colorScheme === 'dark' ? '#60A5FA' : '#93C5FD';

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Animated Particles */}
        {particleAnimations.map((particle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                transform: [
                  { translateX: particle.x },
                  { translateY: particle.y },
                  { scale: particle.scale },
                  { rotate: particleRotationInterpolate(particle.rotation) },
                ],
                opacity: particle.opacity,
              },
            ]}
          >
            <IconSymbol 
              name={index % 3 === 0 ? "bolt.fill" : index % 3 === 1 ? "lightbulb.fill" : "leaf.fill"} 
              size={index % 2 === 0 ? 24 : 16} 
              color={particleColor}
            />
          </Animated.View>
        ))}

        {/* Main Content */}
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [
                    { scale: logoScale },
                    { rotate: logoRotationInterpolate },
                  ],
                  shadowRadius: logoGlowInterpolate,
                  shadowOpacity: logoGlow.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.8],
                  }),
                },
              ]}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F0F9FF']}
                style={styles.logoBackground}
              >
                <IconSymbol 
                  name="bolt.fill" 
                  size={80} 
                  color="#3B82F6"
                />
              </LinearGradient>
            </Animated.View>

            {/* App Title */}
            <Animated.View
              style={{
                opacity: titleOpacity,
                transform: [{ translateY: titleSlideY }],
              }}
            >
              <ThemedText style={[styles.appTitle, { color: '#FFFFFF' }]}>
                WePower
              </ThemedText>
              <ThemedText style={[styles.appSubtitle, { color: '#E2E8F0' }]}>
                IOT
              </ThemedText>
            </Animated.View>

            {/* Tagline */}
            <Animated.View
              style={{
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleSlideY }],
              }}
            >
              <ThemedText style={[styles.tagline, { color: '#CBD5E1' }]}>
                Smart Energy Management
              </ThemedText>
              <ThemedText style={[styles.description, { color: '#94A3B8' }]}>
                Monitor, control, and optimize your power consumption
              </ThemedText>
            </Animated.View>
          </View>

          {/* Get Started Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: buttonOpacity,
                transform: [{ scale: buttonScale }],
              },
            ]}
          >
            <PremiumButton
              title="Get Started"
              onPress={onGetStarted}
              variant="primary"
              style={styles.getStartedButton}
              textStyle={styles.buttonText}
            />
            
            {/* Feature Highlights */}
            <View style={styles.featuresContainer}>
              <View style={styles.feature}>
                <IconSymbol name="chart.bar.fill" size={16} color="#E2E8F0" />
                <ThemedText style={styles.featureText}>Real-time Analytics</ThemedText>
              </View>
              <View style={styles.feature}>
                <IconSymbol name="gear" size={16} color="#E2E8F0" />
                <ThemedText style={styles.featureText}>Smart Automation</ThemedText>
              </View>
              <View style={styles.feature}>
                <IconSymbol name="leaf.fill" size={16} color="#E2E8F0" />
                <ThemedText style={styles.featureText}>Energy Savings</ThemedText>
              </View>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'relative',
  },
  particle: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  appTitle: {
    fontSize: 52,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -2,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  appSubtitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 6,
    marginBottom: 40,
    opacity: 0.9,
  },
  tagline: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 30,
    opacity: 0.8,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  getStartedButton: {
    paddingHorizontal: 56,
    paddingVertical: 18,
    borderRadius: 32,
    minWidth: 220,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3B82F6',
    letterSpacing: 0.5,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 48,
    paddingHorizontal: 20,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12,
  },
  featureText: {
    fontSize: 13,
    color: '#E2E8F0',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
