# PharmAssist

A comprehensive medication management system that helps users organize, track, and monitor their medication schedules with real-time updates and historical insights.

## 🎯 Project Overview

PharmAssist is a Vue 3 + Vite web application designed to simplify medication management. It provides users with:

- **Medication Scheduling**: Set up daily and weekly medication schedules across 4 compartmentalized boxes
- **Real-time Monitoring**: Temperature and humidity monitoring via MQTT integration
- **Medication History**: Track medication intake history with date-based filtering
- **User Profile Management**: Register and manage user profiles with authentication
- **Dashboard View**: Visual dashboard displaying current medication status and upcoming schedules
- **Weekly Progress Tracking**: Monitor medication compliance over the last 7 days

## 🚀 Features

### Core Features
- **Multi-Box Medication Management**: Organize medications across 4 separate compartments
- **Dual Scheduling**: Support for both daily and weekly medication schedules
- **Real-time Data Sync**: Firebase integration for instant data updates
- **MQTT Communication**: IoT device integration for temperature and humidity monitoring
- **Responsive UI**: Mobile-friendly interface built with Vue 3 and Bootstrap

### User Features
- User authentication (Login/Register)
- Edit medication schedules
- View medication history by date
- Dashboard with upcoming medication alerts
- Track medication compliance status (Completed/Incomplete/Missed)
- Temperature and humidity readings from connected devices

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with `<script setup>` syntax
- **Build Tool**: Vite
- **State Management**: Pinia
- **Database**: Firebase Realtime Database
- **IoT Communication**: MQTT
- **UI Components**: Bootstrap 5
- **Date Picker**: VuePic Vue Datepicker
- **Routing**: Vue Router

## 📁 Project Structure

```
PharmAssist/
├── src/
│   ├── components/
│   │   ├── dashboard.vue          # Dashboard view
│   │   ├── home.vue               # Main home page
│   │   ├── homeExtension.vue      # Extended home with telemetry
│   │   ├── login.vue              # Login page
│   │   ├── register.vue           # Registration page
│   │   ├── medhistory.vue         # Medication history view
│   │   ├── editmedication.vue     # Edit medication schedules
│   │   ├── editProfile.vue        # Edit user profile
│   │   └── navbar.vue             # Navigation bar
│   ├── JS/
│   │   ├── firebase.js            # Firebase configuration
│   │   ├── handlelogin.js         # Login logic
│   │   ├── handleregister.js      # Registration logic
│   │   ├── handlemedicine.js      # Medicine state management
│   │   ├── handlerecord.js        # Record management
│   │   ├── handleschedule.js      # Schedule management
│   │   └── handletemphum.js       # Temperature/Humidity handling
│   ├── assets/                    # Images and icons
│   ├── App.vue                    # Root component
│   ├── main.js                    # Application entry point
│   └── style.css                  # Global styles
├── package.json
├── vite.config.js
└── index.html
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup
- MQTT broker (optional, for IoT features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/PharmAssist.git
   cd PharmAssist
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Update `src/JS/firebase.js` with your Firebase project credentials

4. **Configure MQTT (Optional)**
   - Update MQTT connection settings in `src/JS/handletemphum.js`

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📊 Database Structure

### Firebase Realtime Database Schema

```
medicine/
├── daily/
│   ├── box1/
│   │   ├── medicine: string
│   │   ├── time: string (HH:MM)
│   │   ├── dose: number
│   │   └── lastTaken: timestamp
│   ├── box2/
│   ├── box3/
│   └── box4/
├── weekly/
│   ├── box1/
│   ├── box2/
│   ├── box3/
│   └── box4/

records/
├── 2026-01-16/
│   ├── box1/
│   │   ├── medicine: string
│   │   ├── time: string
│   │   ├── dose: number
│   │   └── lastTaken: timestamp
│   ├── box2/
│   ├── box3/
│   └── box4/
├── 2026-01-17/
│   └── ...
```

## 📝 Usage Guide

### Adding Medications
1. Navigate to the home page
2. Click "Edit Medications" or access via the dashboard
3. Select a compartment box (1-4)
4. Enter medication details (name, dose, scheduled time)
5. Choose daily or weekly frequency
6. Save changes

### Viewing History
1. Go to "Medication History"
2. Select a date using the date picker
3. View all medications taken on that date with timestamps
4. Each entry shows the compartment box, medicine name, dose, and time

### Monitoring Real-time Data
1. Visit the home extension dashboard
2. View current temperature and humidity readings
3. Check upcoming scheduled medication alerts
4. Review weekly medication compliance progress

## 🔐 Authentication

- User registration with email verification
- Secure login with Firebase authentication
- Session management via authentication tokens
- User profile data stored in Firebase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

## 👥 Authors

- **PharmAssist Team** - Initial development

## 🙏 Acknowledgments

- Vue 3 and Vite documentation
- Firebase team for backend services
- Bootstrap for UI components
- All contributors and testers
