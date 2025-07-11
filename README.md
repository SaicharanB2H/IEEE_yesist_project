# WePower IoT - Smart Power Regulation System 🔌⚡

A comprehensive React Native mobile application for monitoring and controlling IoT-enabled smart devices to optimize energy consumption and reduce costs.

## � Project Overview

WePower IoT is a full-featured mobile app that enables users to:

- **Monitor device energy usage in real-time**
- **Manually toggle device states (ON/OFF)**
- **Set up smart automation rules**
- **View detailed analytics and cost projections**
- **Receive notifications and alerts**
- **Track carbon footprint and get eco-friendly tips**

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React Native (Expo), TypeScript |
| **State Management** | Redux Toolkit |
| **Navigation** | Expo Router |
| **UI Styling** | NativeWind (Tailwind CSS for RN) |
| **Charts & Analytics** | React Native Chart Kit, Victory Native |
| **Network** | Axios |
| **Authentication** | JWT/OAuth support ready |
| **Push Notifications** | Expo Notifications |
| **Real-time Updates** | WebSocket/MQTT ready |
| **Testing** | Jest, React Native Testing Library |

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
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📁 Project Structure

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
