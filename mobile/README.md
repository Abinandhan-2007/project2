# TrustLoop Mobile App

> **React Native + Expo (Managed Workflow) Client for TrustLoop Local Services Marketplace.**

TrustLoop Mobile provides on-the-go access for **Customers** and **Service Providers**. It connects directly to the existing Spring Boot REST API, stores authentication tokens in hardware-backed secure storage (`expo-secure-store`), and prepares for subsequent mobile steps (verifiable claims, camera evidence capture, and dispute recovery reviews).

---

## Architecture & Security Rules

- **Shared Backend:** Uses the exact same Spring Boot REST API (`/api/auth/*`, `/api/health`, etc.).
- **Hardware-Backed JWT:** All access tokens are stored in `expo-secure-store` (iOS Keychain / Android Keystore), **never** AsyncStorage or plain text.
- **Client Roles:** Restricted to `CUSTOMER` and `PROVIDER` only (`ADMIN` is web-only).
- **Backend Authorization:** Role and ownership verification is strictly enforced by Spring Boot Security filters; the mobile client never decides permissions.
- **Network Agnostic:** Dynamically resolves `EXPO_PUBLIC_API_URL` based on whether the app is running on a physical phone, Android emulator, or iOS simulator.

---

## Directory Structure

```
mobile/
├── src/
│   ├── config/
│   │   └── env.js                 # Dynamic API base URL & platform defaults
│   ├── context/
│   │   └── AuthContext.js         # Central auth state & session manager
│   ├── navigation/
│   │   ├── AppNavigator.js        # Root navigator with auth switch & splash loader
│   │   ├── AuthNavigator.js       # Stack for Login & Register screens
│   │   └── MainNavigator.js       # Stack for authenticated protected screens
│   ├── screens/
│   │   ├── LoginScreen.js         # Login view with quick-fill demo buttons
│   │   ├── RegisterScreen.js      # CUSTOMER / PROVIDER account registration
│   │   └── DashboardScreen.js     # Protected screen calling GET /api/auth/me
│   └── services/
│       ├── api.js                 # Axios instance with Bearer JWT interceptors
│       └── secureStore.js         # expo-secure-store wrapper
├── .env.example                   # Environment configuration template
├── .env                           # Local environment file
├── app.json                       # Expo configuration
├── package.json
└── App.js                         # Root entry point
```

---

## Prerequisites

1. **Spring Boot Backend Running:**
   ```powershell
   cd E:\project2\backend
   .\mvnw.cmd spring-boot:run
   ```
2. **Node.js (18+) and npm** installed.
3. **Expo Go App** installed on your Android or iPhone (free on Google Play Store and Apple App Store).

---

## Running the App

### Option A: Physical Phone (via Expo Go)

1. Make sure your phone and your computer are connected to the **SAME Wi-Fi network**.
2. Note your computer's local Wi-Fi IP address (detected as `192.168.137.215`).
3. Verify that `mobile/.env` contains:
   ```properties
   EXPO_PUBLIC_API_URL=http://192.168.137.215:8080
   ```
4. Start the Expo development server:
   ```powershell
   cd E:\project2\mobile
   npx expo start
   ```
5. Scan the terminal QR code:
   - **Android:** Scan using the **Expo Go** app.
   - **iOS:** Scan using the native **Camera** app (opens Expo Go).

> **Tip (Windows Firewall):** If Expo Go fails to connect to the backend, ensure Windows Firewall permits inbound connections on port 8080 or select "Allow" when the Windows prompt appears.

---

### Option B: Android Emulator

1. Start your Android Emulator in Android Studio.
2. In `mobile/.env`, set:
   ```properties
   EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
   ```
   *(Android emulators use `10.0.2.2` to access `localhost` on the host machine).*
3. Run:
   ```powershell
   cd E:\project2\mobile
   npx expo start --android
   ```

---

### Option C: Web Preview (Fast Verification)

To test the mobile screens and authentication directly in a desktop browser:
```powershell
cd E:\project2\mobile
npx expo start --web
```
Press `w` in the terminal to launch the web preview.

---

## End-to-End Verification

### 1. Test Login with Pre-seeded Demo Accounts
Launch the app and use the one-tap **Quick-fill Demo Credentials** buttons on the Login screen:
- **Demo Customer:** `customer@trustloop.com` / `password123` (Role: `CUSTOMER`)
- **Demo Provider:** `provider@trustloop.com` / `password123` (Role: `PROVIDER`)

Tap **"Sign In"**:
1. The app issues `POST /api/auth/login` to the Spring Boot backend.
2. Upon receiving the signed JWT, the token is saved into `expo-secure-store`.
3. The app transitions immediately into the protected **DashboardScreen**.

### 2. Verify Protected Authenticated Endpoint
On the **DashboardScreen**:
1. The screen automatically calls `GET /api/auth/me` with `Authorization: Bearer <token>`.
2. Inspect the **Protected Session Status**:
   - Status badge: `AUTHENTICATED`
   - Active Role: `CUSTOMER` or `PROVIDER`
   - User UUID: verified from database
   - Storage confirmation: `expo-secure-store (Encrypted)`
   - Measured round-trip latency (e.g. `24 ms`)
3. Tap **"Probe GET /api/auth/me"** to trigger a real-time authenticated call and verify that the backend continues to accept and validate the JWT.

### 3. Test Registration
1. Tap **"Sign Out"** on the dashboard.
2. On the Login screen, tap **"Create account"**.
3. Select your role (**"I'm a Customer"** or **"I'm a Provider"**).
4. Enter name, email, password, and tap **"Sign Up"**.
5. The backend validates constraints, creates the user, issues a JWT, and immediately authenticates you into the protected dashboard.
