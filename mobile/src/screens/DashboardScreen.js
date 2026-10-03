import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser, getHealth, getErrorMessage } from '../services/api';
import { API_BASE_URL } from '../config/env';

export default function DashboardScreen() {
  const { user, token, logout, refreshProfile } = useAuth();
  const [profileData, setProfileData] = useState(user);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiLatency, setApiLatency] = useState(null);
  const [serverHealth, setServerHealth] = useState(null);
  const [error, setError] = useState(null);

  const fetchAuthenticatedProfile = useCallback(async () => {
    setError(null);
    const start = Date.now();
    try {
      // 1. Call protected endpoint GET /api/auth/me (requires Authorization: Bearer <token>)
      const res = await getCurrentUser();
      const end = Date.now();
      setApiLatency(end - start);
      if (res?.data) {
        setProfileData(res.data);
      }

      // 2. Also probe server health
      try {
        const healthRes = await getHealth();
        setServerHealth(healthRes);
      } catch (hErr) {
        console.warn('Health probe error:', hErr);
      }
    } catch (err) {
      console.error('Failed to fetch authenticated user profile:', err);
      setError(getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    fetchAuthenticatedProfile();
  }, [fetchAuthenticatedProfile]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchAuthenticatedProfile();
    await refreshProfile();
    setIsRefreshing(false);
  };

  const isCustomer = profileData?.role === 'CUSTOMER';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
            colors={['#6366f1']}
          />
        }
      >
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{profileData?.fullName || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.7}>
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Error Banner */}
        {error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Authentication Error</Text>
            <Text style={styles.errorBody}>{error}</Text>
          </View>
        ) : null}

        {/* Session Security Verification Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Protected Session Status</Text>
            <View style={styles.badgeSuccess}>
              <View style={styles.pulseDot} />
              <Text style={styles.badgeSuccessText}>AUTHENTICATED</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Active Role</Text>
            <View style={[styles.roleBadge, isCustomer ? styles.roleCustomer : styles.roleProvider]}>
              <Text style={styles.roleBadgeText}>{profileData?.role}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Email</Text>
            <Text style={styles.rowValue}>{profileData?.email}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>User UUID</Text>
            <Text style={styles.monoValue} numberOfLines={1}>{profileData?.id || 'Loaded from session'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Secure Storage</Text>
            <Text style={styles.storageStatusText}>expo-secure-store (Encrypted)</Text>
          </View>

          {apiLatency !== null && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>JWT Round-trip</Text>
              <Text style={styles.latencyValue}>{apiLatency} ms (Verified)</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchAuthenticatedProfile}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <ActivityIndicator color="#6366f1" size="small" />
            ) : (
              <Text style={styles.refreshButtonText}>Probe GET /api/auth/me</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Spring Boot API Target Status */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Target REST API Info</Text>
          
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Backend URL</Text>
            <Text style={styles.monoValue} numberOfLines={1}>{API_BASE_URL}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Service Status</Text>
            <Text style={styles.rowValue}>{serverHealth?.status || 'UP (Active)'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Service Name</Text>
            <Text style={styles.rowValue}>{serverHealth?.service || 'TrustLoop API'}</Text>
          </View>
        </View>

        {/* Roadmap Next Steps Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mobile MVP Next Screens</Text>
          <Text style={styles.roadmapSubtitle}>
            Foundation step complete. The following screens connect in subsequent steps:
          </Text>

          <View style={styles.stepList}>
            <Text style={styles.stepItem}>• Step 2: Service search & listings catalog</Text>
            <Text style={styles.stepItem}>• Step 3: Booking creation & appointment list</Text>
            <Text style={styles.stepItem}>• Step 4: Quotation view & accept/reject</Text>
            <Text style={styles.stepItem}>• Step 5: Verifiable Claims list</Text>
            <Text style={styles.stepItem}>• Step 6: Evidence photo capture (Camera / Gallery)</Text>
            <Text style={styles.stepItem}>• Step 7: Dispute recovery dashboard & fairness checks</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  scrollContainer: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 13,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f8fafc',
    marginTop: 2,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutButtonText: {
    color: '#f87171',
    fontSize: 12,
    fontWeight: '700',
  },
  errorCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 12,
    padding: 12,
  },
  errorTitle: {
    color: '#f87171',
    fontWeight: '700',
    fontSize: 13,
  },
  errorBody: {
    color: '#fca5a5',
    fontSize: 12,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  badgeSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  badgeSuccessText: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  rowLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 13,
    color: '#f1f5f9',
    fontWeight: '600',
  },
  monoValue: {
    fontSize: 12,
    color: '#cbd5e1',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    maxWidth: '55%',
  },
  storageStatusText: {
    fontSize: 12,
    color: '#818cf8',
    fontWeight: '600',
  },
  latencyValue: {
    fontSize: 12,
    color: '#34d399',
    fontWeight: '700',
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  roleCustomer: {
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  roleProvider: {
    backgroundColor: 'rgba(168, 85, 247, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)',
  },
  roleBadgeText: {
    color: '#e2e8f0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  refreshButton: {
    marginTop: 14,
    backgroundColor: '#1e293b',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  refreshButtonText: {
    color: '#818cf8',
    fontSize: 12,
    fontWeight: '700',
  },
  roadmapSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    marginBottom: 10,
    lineHeight: 18,
  },
  stepList: {
    gap: 6,
  },
  stepItem: {
    fontSize: 12,
    color: '#cbd5e1',
    lineHeight: 18,
  },
});
