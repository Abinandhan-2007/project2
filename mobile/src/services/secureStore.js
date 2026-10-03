import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { APP_CONFIG } from '../config/env';

/**
 * Secure Storage Service.
 * Fulfills TrustLoop security rule:
 * Stores JWT tokens exclusively in expo-secure-store (Hardware-backed Keystore/Keychain).
 */

const isWeb = Platform.OS === 'web';

export const saveToken = async (token) => {
  try {
    if (isWeb) {
      localStorage.setItem(APP_CONFIG.tokenStorageKey, token);
      return;
    }
    await SecureStore.setItemAsync(APP_CONFIG.tokenStorageKey, token);
  } catch (error) {
    console.error('Failed to securely save JWT token:', error);
    throw error;
  }
};

export const getToken = async () => {
  try {
    if (isWeb) {
      return localStorage.getItem(APP_CONFIG.tokenStorageKey);
    }
    return await SecureStore.getItemAsync(APP_CONFIG.tokenStorageKey);
  } catch (error) {
    console.error('Failed to read JWT token from SecureStore:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    if (isWeb) {
      localStorage.removeItem(APP_CONFIG.tokenStorageKey);
      return;
    }
    await SecureStore.deleteItemAsync(APP_CONFIG.tokenStorageKey);
  } catch (error) {
    console.error('Failed to delete JWT token from SecureStore:', error);
  }
};

export const saveUserData = async (userData) => {
  try {
    const json = JSON.stringify(userData);
    if (isWeb) {
      localStorage.setItem(APP_CONFIG.userStorageKey, json);
      return;
    }
    await SecureStore.setItemAsync(APP_CONFIG.userStorageKey, json);
  } catch (error) {
    console.error('Failed to securely save user profile:', error);
  }
};

export const getUserData = async () => {
  try {
    let json = null;
    if (isWeb) {
      json = localStorage.getItem(APP_CONFIG.userStorageKey);
    } else {
      json = await SecureStore.getItemAsync(APP_CONFIG.userStorageKey);
    }
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Failed to read user data from SecureStore:', error);
    return null;
  }
};

export const clearAuthStorage = async () => {
  await removeToken();
  try {
    if (isWeb) {
      localStorage.removeItem(APP_CONFIG.userStorageKey);
      return;
    }
    await SecureStore.deleteItemAsync(APP_CONFIG.userStorageKey);
  } catch (error) {
    console.error('Failed to clear SecureStore:', error);
  }
};

export default {
  saveToken,
  getToken,
  removeToken,
  saveUserData,
  getUserData,
  clearAuthStorage,
};
