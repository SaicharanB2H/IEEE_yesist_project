# WePower IoT - Smart Power Regulation System 🔌⚡

A **premium-grade** React Native mobile application for monitoring and controlling IoT-enabled smart devices with **Apple & Samsung-level UI standards**.

## 🎨 **Premium Design Standards**

WePower IoT is built with the highest UI/UX standards, following:
- **Apple Human Interface Guidelines** for iOS-quality design
- **Samsung One UI** principles for intuitive interactions  
- **Material Design 3** for Android platform consistency
- **WCAG 2.1 AA** accessibility compliance
- **8-point grid system** for pixel-perfect layouts

> **Design Quality**: This app delivers a user experience comparable to top-tier applications from Apple, Samsung, and Google.

## ✨ **Premium Features**ower IoT - Smart Power Regulation System 🔌⚡

A comprehensive React Native mobile application for monitoring and controlling IoT-enabled smart devices to optimize energy consumption and reduce costs.

## � Project Overview

WePower IoT is a full-featured mobile app that enables users to:

- **Monitor device energy usage in real-time**
- **Manually toggle device states (ON/OFF)**
- **Set up smart automation rules**
- **View detailed analytics and cost projections**
- **Receive notifications and alerts**
- **Track carbon footprint and get eco-friendly tips**

## 🛠️ **Premium Tech Stack**

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React Native (Expo), TypeScript | Cross-platform mobile development |
| **Design System** | Custom design tokens, Apple HIG compliance | Premium UI standards |
| **State Management** | Redux Toolkit | Predictable state management |
| **Navigation** | Expo Router | File-based routing |
| **UI Components** | Custom premium components | Apple/Samsung-quality UI |
| **Styling** | NativeWind + StyleSheet | Tailwind CSS + native performance |
| **Charts & Analytics** | React Native Chart Kit | Beautiful data visualization |
| **Network** | Axios | HTTP client |
| **Authentication** | JWT/OAuth ready | Secure user management |
| **Notifications** | Expo Notifications | Push notification system |
| **Real-time** | WebSocket/MQTT ready | Live device updates |
| **Testing** | Jest, React Native Testing Library | Quality assurance |

## 🎯 **Design System Highlights**

### **Typography** (iOS HIG Compliant)
- **11 text styles** from Caption to Large Title
- **Dynamic Type** support for accessibility
- **San Francisco Pro** font characteristics
- **Perfect letter spacing** and line heights

### **Color System**
- **Semantic color palette** with success, warning, error states
- **11-step neutral scale** for perfect contrast
- **System colors** matching iOS and Android
- **Full dark mode** support with adaptive colors

### **Component Library**
- **PremiumButton**: 5 variants, 3 sizes, loading states
- **PremiumCard**: Elevated, outlined, filled variants  
- **PremiumInput**: Advanced form controls with validation
- **ThemedText**: Complete typography system
- **DeviceCard**: Premium IoT device management UI

### **Spacing & Layout**
- **8-point grid system** for consistent spacing
- **Responsive layouts** for all screen sizes
- **Safe area handling** for modern devices
- **Touch targets** meeting 44px minimum (Apple HIG)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Studio

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wepower-iot.git
   cd wepower-iot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS (Premium experience recommended)
   npm run ios
   
   # Android
   npm run android
   
   # Web (For development and testing)
   npm run web
   ```

## 🏗️ **Premium Architecture**

### **Component Architecture**
```
components/
├── ui/                    # Premium UI Components
│   ├── PremiumButton.tsx  # Apple-quality buttons
│   ├── PremiumCard.tsx    # Elevated card containers
│   └── PremiumInput.tsx   # Advanced form controls
├── ThemedText.tsx         # Complete typography system
├── DeviceCard.tsx         # Business logic components
└── ...

constants/
├── DesignSystem.ts        # Core design tokens
├── Colors.ts              # Premium color system
└── ...
```

### **Design Token Usage**
```tsx
import { DesignSystem, createShadow } from '@/constants/DesignSystem';

const styles = StyleSheet.create({
  premiumCard: {
    padding: DesignSystem.spacing.lg,
    borderRadius: DesignSystem.borderRadius.xl,
    backgroundColor: colors.surface,
    ...createShadow('lg'),
  },
});
```

## 📁 **Project Structure**

```
WePower_IOT/
├── app/
│   ├── (tabs)/           # Tab navigation screens
│   │   ├── index.tsx     # Dashboard (Home)
│   │   ├── analytics.tsx # Analytics & Insights
│   │   ├── automation.tsx# Smart Automation
│   │   └── explore.tsx   # Settings/Profile
│   ├── screens/          # Screen components
│   │   ├── DashboardScreen.tsx
│   │   ├── AnalyticsScreen.tsx
│   │   └── AutomationScreen.tsx
│   ├── _layout.tsx       # Root layout
│   └── +not-found.tsx   # 404 screen
├── components/
│   ├── DeviceCard.tsx    # Device display component
│   ├── DeviceList.tsx    # List of devices
│   ├── EnergyBar.tsx     # Power usage visualization
│   ├── ToggleSwitch.tsx  # Custom toggle component
│   └── ui/               # Shared UI components
├── store/
│   ├── index.ts          # Redux store configuration
│   └── slices/           # Redux slices
│       ├── devicesSlice.ts
│       ├── analyticsSlice.ts
│       ├── automationSlice.ts
│       ├── userSlice.ts
│       └── notificationsSlice.ts
├── api/
│   ├── deviceAPI.ts      # Device management API
│   ├── analyticsAPI.ts   # Analytics data API
│   ├── automationAPI.ts  # Automation rules API
│   └── authAPI.ts        # Authentication API
├── types/
│   └── index.ts          # TypeScript type definitions
├── utils/
│   └── index.ts          # Utility functions
├── constants/
│   └── index.ts          # App constants
└── assets/               # Images, fonts, etc.
```

## 🎯 Core Features Implemented

### ✅ Phase 1: Setup & Scaffolding
- [x] Expo project setup with TypeScript
- [x] Folder structure organized
- [x] Navigation configured (stack + tab)
- [x] NativeWind/Tailwind CSS integrated
- [x] Redux Toolkit state management

### ✅ Phase 2: Device Dashboard UI
- [x] `<DeviceCard />` - displays device data with status, power usage, WiFi strength
- [x] `<ToggleSwitch />` - custom animated toggle control
- [x] `<EnergyBar />` - visual power usage indicator
- [x] `<DeviceList />` - fetches and displays devices with filtering
- [x] Real-time status updates
- [x] Room and status filtering

### ✅ Phase 3: Analytics & Insights UI
- [x] Interactive charts (Line, Bar, Pie charts)
- [x] Usage trends visualization
- [x] Cost analysis and projections
- [x] Device usage breakdown
- [x] Eco-friendly tips integration
- [x] Period selection (hourly, daily, weekly, monthly)

### ✅ Phase 4: Smart Automation
- [x] Automation rules management
- [x] Rule creation interface
- [x] Condition and action builders
- [x] Quick rule templates
- [x] Rule activation/deactivation
- [x] Automation history tracking

### 🔄 Phase 5: Authentication & Notifications (Ready for Implementation)
- [x] API structure for auth (JWT/OTP)
- [x] User profile management
- [x] Notification system architecture
- [ ] Firebase Auth integration
- [ ] Push notifications setup

### 🔄 Phase 6-8: Advanced Features (Architecture Ready)
- [x] Settings & profile screens
- [x] Real-time WebSocket architecture
- [x] Offline sync capabilities
- [x] Testing setup structure

## 🔧 API Integration

The app is designed to work with a REST API backend. Configure your API base URL in:

```typescript
// constants/index.ts
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  // ... other config
};
```

### Required API Endpoints

```
GET    /devices              - List all devices
POST   /devices/:id/toggle   - Toggle device state
GET    /devices/:id/metrics  - Get device metrics
GET    /analytics            - Get analytics data
POST   /automation/rules     - Create automation rule
GET    /automation/rules     - List automation rules
POST   /auth/login          - User authentication
```

## 🎨 UI/UX Features

- **Dark/Light Mode Support** - Automatically adapts to system preferences
- **Responsive Design** - Works on phones and tablets
- **Smooth Animations** - Native-feeling interactions
- **Accessibility** - Screen reader support and proper contrast
- **Color-Coded Status** - Green (active), Red (off), Gray (idle)
- **Real-time Updates** - Live power usage and status changes

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test DeviceCard
```

## 📱 Building for Production

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_BASE_URL=https://your-api-server.com/api
EXPO_PUBLIC_WEBSOCKET_URL=wss://your-websocket-server.com
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native and Expo teams for the excellent framework
- Redux Toolkit for state management
- NativeWind for Tailwind CSS integration
- Victory Native for charting capabilities

## 📞 Support

For support, email support@wepower-iot.com or join our Slack channel.

---

**Built with ❤️ for a smarter, more energy-efficient future** 🌱⚡
# WePower_IOT_Project
