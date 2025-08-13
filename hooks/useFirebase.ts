import { auth, database } from '@/config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { onValue, push, ref, remove, set } from 'firebase/database';
import { useEffect, useState } from 'react';

// Auth hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}

// Realtime Database hook
export function useRealtimeData<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dbRef = ref(database, path);
    
    const unsubscribe = onValue(dbRef, 
      (snapshot) => {
        const value = snapshot.val();
        setData(value);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
}

// Relay control hook
export function useRelayControl(deviceId: string = 'esp32-1') {
  const { data: relayOn, loading, error } = useRealtimeData<boolean>(`devices/${deviceId}/relayOn`);
  
  const toggleRelay = async (newState?: boolean) => {
    const targetState = newState !== undefined ? newState : !relayOn;
    const result = await firebaseService.writeData(`devices/${deviceId}/relayOn`, targetState);
    
    if (!result.success) {
      console.error('Failed to toggle relay:', result.error);
    }
    
    return result;
  };

  return {
    relayOn: relayOn ?? false,
    loading,
    error,
    toggleRelay
  };
}

// Database write functions
export const firebaseService = {
  // Write data
  async writeData(path: string, data: any) {
    try {
      await set(ref(database, path), data);
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  },

  // Push new data (auto-generated key)
  async pushData(path: string, data: any) {
    try {
      const newRef = push(ref(database, path));
      await set(newRef, data);
      return { success: true, key: newRef.key };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  },

  // Remove data
  async removeData(path: string) {
    try {
      await remove(ref(database, path));
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  },

  // Relay specific functions
  async setRelayState(deviceId: string, state: boolean) {
    return this.writeData(`devices/${deviceId}/relayOn`, state);
  },

  async getRelayState(deviceId: string) {
    try {
      const snapshot = await import('firebase/database').then(({ get, ref }) => 
        get(ref(database, `devices/${deviceId}/relayOn`))
      );
      return { success: true, data: snapshot.val() ?? false };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
};
