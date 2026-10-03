import { Platform } from 'react-native';

/**
 * TrustLoop Mobile Environment Configuration.
 *
 * IMPORTANT NETWORKING RULES FOR EXPO GO:
 * 1. Physical Phone via Expo Go:
 *    A physical device cannot reach 'localhost' on your computer.
 *    You must provide your computer's local Wi-Fi / LAN IP (e.g., http://192.168.137.215:8080).
 * 2. Android Emulator:
 *    The Android emulator maps the host machine loopback to 10.0.2.2.
 * 3. iOS Simulator / Web:
 *    Can reach http://localhost:8080 directly.
 */

const getDevApiUrl = () => {
  // 1. Explicit environment variable takes precedence
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // 2. Platform-specific defaults
  if (Platform.OS === 'android') {
    // 10.0.2.2 is the default gateway for Android emulators to reach host localhost
    return 'http://10.0.2.2:8080';
  }

  // 3. iOS Simulator and Web fallback
  return 'http://localhost:8080';
};

export const API_BASE_URL = getDevApiUrl();

export const APP_CONFIG = {
  appName: 'TrustLoop Mobile',
  version: '1.0.0',
  apiBaseUrl: API_BASE_URL,
  tokenStorageKey: 'trustloop_secure_jwt',
  userStorageKey: 'trustloop_user_profile',
};

export default APP_CONFIG;
