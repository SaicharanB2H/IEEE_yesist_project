import { Animated, Easing } from 'react-native';

/**
 * Premium Animation Library
 * Provides smooth, iOS-like animations for enhanced user experience
 */

export class AnimationManager {
  private static instance: AnimationManager;
  private animations: Map<string, Animated.Value> = new Map();

  private constructor() {}

  static getInstance(): AnimationManager {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }

  // Create or get an animated value
  getAnimatedValue(key: string, initialValue: number = 0): Animated.Value {
    if (!this.animations.has(key)) {
      this.animations.set(key, new Animated.Value(initialValue));
    }
    return this.animations.get(key)!;
  }

  // Smooth scale animation for press feedback
  createPressAnimation(scale: Animated.Value): {
    onPressIn: () => void;
    onPressOut: () => void;
  } {
    return {
      onPressIn: () => {
        Animated.spring(scale, {
          toValue: 0.95,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      },
      onPressOut: () => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      },
    };
  }

  // Smooth fade in animation
  fadeIn(opacity: Animated.Value, duration: number = 300): Promise<void> {
    return new Promise((resolve) => {
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => resolve());
    });
  }

  // Smooth fade out animation
  fadeOut(opacity: Animated.Value, duration: number = 300): Promise<void> {
    return new Promise((resolve) => {
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => resolve());
    });
  }

  // Slide in from right animation
  slideInFromRight(translateX: Animated.Value, duration: number = 400): Promise<void> {
    return new Promise((resolve) => {
      Animated.timing(translateX, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => resolve());
    });
  }

  // Slide out to right animation
  slideOutToRight(translateX: Animated.Value, screenWidth: number, duration: number = 400): Promise<void> {
    return new Promise((resolve) => {
      Animated.timing(translateX, {
        toValue: screenWidth,
        duration,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => resolve());
    });
  }

  // Bounce animation for notifications or highlights
  bounce(scale: Animated.Value): Promise<void> {
    return new Promise((resolve) => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 150,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 150,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => resolve());
    });
  }

  // Pulse animation for status indicators
  pulse(scale: Animated.Value, minScale: number = 0.9, maxScale: number = 1.1): Animated.CompositeAnimation {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: maxScale,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: minScale,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
  }

  // Shake animation for errors
  shake(translateX: Animated.Value): Promise<void> {
    return new Promise((resolve) => {
      Animated.sequence([
        Animated.timing(translateX, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start(() => resolve());
    });
  }

  // Smooth progress animation
  animateProgress(progress: Animated.Value, toValue: number, duration: number = 1000): Promise<void> {
    return new Promise((resolve) => {
      Animated.timing(progress, {
        toValue,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // Progress animations often need layout
      }).start(() => resolve());
    });
  }

  // Staggered list animation
  createStaggeredAnimation(
    items: Animated.Value[],
    staggerDelay: number = 100,
    itemDuration: number = 300
  ): Promise<void> {
    return new Promise((resolve) => {
      const animations = items.map((item, index) =>
        Animated.timing(item, {
          toValue: 1,
          duration: itemDuration,
          delay: index * staggerDelay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      );

      Animated.parallel(animations).start(() => resolve());
    });
  }

  // Parallax scroll effect
  createParallaxEffect(
    scrollY: Animated.Value,
    multiplier: number = 0.5
  ): Animated.AnimatedMultiplication<number> {
    return Animated.multiply(scrollY, multiplier);
  }

  // Floating action button animation
  createFABAnimation(scale: Animated.Value, translateY: Animated.Value): {
    show: () => Promise<void>;
    hide: () => Promise<void>;
  } {
    return {
      show: () => {
        return new Promise((resolve) => {
          Animated.parallel([
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
          ]).start(() => resolve());
        });
      },
      hide: () => {
        return new Promise((resolve) => {
          Animated.parallel([
            Animated.spring(scale, {
              toValue: 0,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
            Animated.spring(translateY, {
              toValue: 100,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
          ]).start(() => resolve());
        });
      },
    };
  }

  // Loading shimmer effect
  createShimmerAnimation(opacity: Animated.Value): Animated.CompositeAnimation {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
  }

  // Clear specific animation
  clearAnimation(key: string): void {
    this.animations.delete(key);
  }

  // Clear all animations
  clearAllAnimations(): void {
    this.animations.clear();
  }
}

export const animationManager = AnimationManager.getInstance();

// Predefined animation configurations
export const AnimationPresets = {
  // Quick and responsive
  quick: {
    duration: 200,
    easing: Easing.out(Easing.quad),
  },
  
  // Smooth and natural
  smooth: {
    duration: 300,
    easing: Easing.out(Easing.cubic),
  },
  
  // Elegant and refined
  elegant: {
    duration: 500,
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  },
  
  // Bouncy and playful
  bouncy: {
    tension: 100,
    friction: 6,
  },
  
  // Gentle and subtle
  gentle: {
    tension: 80,
    friction: 10,
  },
};
