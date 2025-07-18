import React from 'react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  apiResponseTime: number;
  errorCount: number;
  crashCount: number;
}

interface PerformanceEntry {
  timestamp: number;
  screen: string;
  action: string;
  duration: number;
  metadata?: Record<string, any>;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    renderTime: 0,
    memoryUsage: 0,
    bundleSize: 0,
    apiResponseTime: 0,
    errorCount: 0,
    crashCount: 0,
  };
  private entries: PerformanceEntry[] = [];
  private timers: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Track screen render times
  startScreenRender(screenName: string): void {
    const timerId = `screen_${screenName}`;
    this.timers.set(timerId, Date.now());
  }

  endScreenRender(screenName: string): void {
    const timerId = `screen_${screenName}`;
    const startTime = this.timers.get(timerId);
    
    if (startTime) {
      const duration = Date.now() - startTime;
      this.addEntry({
        timestamp: Date.now(),
        screen: screenName,
        action: 'render',
        duration,
      });
      
      this.metrics.renderTime = (this.metrics.renderTime + duration) / 2; // Moving average
      this.timers.delete(timerId);
    }
  }

  // Track API response times
  startAPICall(endpoint: string): void {
    const timerId = `api_${endpoint}`;
    this.timers.set(timerId, Date.now());
  }

  endAPICall(endpoint: string, success: boolean = true): void {
    const timerId = `api_${endpoint}`;
    const startTime = this.timers.get(timerId);
    
    if (startTime) {
      const duration = Date.now() - startTime;
      this.addEntry({
        timestamp: Date.now(),
        screen: 'api',
        action: endpoint,
        duration,
        metadata: { success },
      });
      
      this.metrics.apiResponseTime = (this.metrics.apiResponseTime + duration) / 2;
      this.timers.delete(timerId);
      
      if (!success) {
        this.metrics.errorCount++;
      }
    }
  }

  // Track user interactions
  trackUserAction(screen: string, action: string, metadata?: Record<string, any>): void {
    this.addEntry({
      timestamp: Date.now(),
      screen,
      action,
      duration: 0,
      metadata,
    });
  }

  // Track errors
  trackError(error: Error, context?: string): void {
    this.metrics.errorCount++;
    this.addEntry({
      timestamp: Date.now(),
      screen: context || 'unknown',
      action: 'error',
      duration: 0,
      metadata: {
        message: error.message,
        stack: error.stack,
      },
    });
  }

  // Track crashes
  trackCrash(error: Error): void {
    this.metrics.crashCount++;
    this.trackError(error, 'crash');
  }

  // Get performance metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Get performance entries for analysis
  getEntries(limit: number = 100): PerformanceEntry[] {
    return this.entries.slice(-limit);
  }

  // Get entries for specific screen
  getScreenEntries(screen: string, limit: number = 50): PerformanceEntry[] {
    return this.entries
      .filter(entry => entry.screen === screen)
      .slice(-limit);
  }

  // Generate performance report
  generateReport(): {
    summary: PerformanceMetrics;
    slowestScreens: { screen: string; avgRenderTime: number }[];
    slowestAPIs: { endpoint: string; avgResponseTime: number }[];
    errorsByScreen: { screen: string; errorCount: number }[];
    recommendations: string[];
  } {
    const screenRenderTimes = this.getScreenRenderTimes();
    const apiResponseTimes = this.getAPIResponseTimes();
    const errorsByScreen = this.getErrorsByScreen();

    return {
      summary: this.getMetrics(),
      slowestScreens: Object.entries(screenRenderTimes)
        .map(([screen, times]) => ({
          screen,
          avgRenderTime: times.reduce((a, b) => a + b, 0) / times.length,
        }))
        .sort((a, b) => b.avgRenderTime - a.avgRenderTime)
        .slice(0, 5),
      slowestAPIs: Object.entries(apiResponseTimes)
        .map(([endpoint, times]) => ({
          endpoint,
          avgResponseTime: times.reduce((a, b) => a + b, 0) / times.length,
        }))
        .sort((a, b) => b.avgResponseTime - a.avgResponseTime)
        .slice(0, 5),
      errorsByScreen: Object.entries(errorsByScreen)
        .map(([screen, count]) => ({ screen, errorCount: count }))
        .sort((a, b) => b.errorCount - a.errorCount)
        .slice(0, 5),
      recommendations: this.generateRecommendations(),
    };
  }

  private addEntry(entry: PerformanceEntry): void {
    this.entries.push(entry);
    
    // Keep only last 1000 entries to prevent memory issues
    if (this.entries.length > 1000) {
      this.entries = this.entries.slice(-1000);
    }
  }

  private getScreenRenderTimes(): Record<string, number[]> {
    const screenTimes: Record<string, number[]> = {};
    
    this.entries
      .filter(entry => entry.action === 'render')
      .forEach(entry => {
        if (!screenTimes[entry.screen]) {
          screenTimes[entry.screen] = [];
        }
        screenTimes[entry.screen].push(entry.duration);
      });
    
    return screenTimes;
  }

  private getAPIResponseTimes(): Record<string, number[]> {
    const apiTimes: Record<string, number[]> = {};
    
    this.entries
      .filter(entry => entry.screen === 'api')
      .forEach(entry => {
        if (!apiTimes[entry.action]) {
          apiTimes[entry.action] = [];
        }
        apiTimes[entry.action].push(entry.duration);
      });
    
    return apiTimes;
  }

  private getErrorsByScreen(): Record<string, number> {
    const errorCounts: Record<string, number> = {};
    
    this.entries
      .filter(entry => entry.action === 'error')
      .forEach(entry => {
        errorCounts[entry.screen] = (errorCounts[entry.screen] || 0) + 1;
      });
    
    return errorCounts;
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const metrics = this.getMetrics();

    if (metrics.renderTime > 1000) {
      recommendations.push('Screen render times are slow. Consider optimizing components and reducing re-renders.');
    }

    if (metrics.apiResponseTime > 2000) {
      recommendations.push('API response times are slow. Consider implementing caching and optimizing API calls.');
    }

    if (metrics.errorCount > 10) {
      recommendations.push('High error count detected. Implement better error handling and validation.');
    }

    if (metrics.crashCount > 0) {
      recommendations.push('App crashes detected. Add error boundaries and improve error handling.');
    }

    if (recommendations.length === 0) {
      recommendations.push('Performance is good! Continue monitoring for any degradation.');
    }

    return recommendations;
  }

  // Memory monitoring
  trackMemoryUsage(): void {
    if (typeof window !== 'undefined' && (window as any).performance && (window as any).performance.memory) {
      const memory = (window as any).performance.memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize;
    }
  }

  // Clear old data
  clearOldData(olderThan: number = 24 * 60 * 60 * 1000): void {
    const cutoff = Date.now() - olderThan;
    this.entries = this.entries.filter(entry => entry.timestamp > cutoff);
  }
}

// Singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for tracking component renders
export function usePerformanceTracking(componentName: string) {
  React.useEffect(() => {
    performanceMonitor.startScreenRender(componentName);
    return () => {
      performanceMonitor.endScreenRender(componentName);
    };
  }, [componentName]);
}
