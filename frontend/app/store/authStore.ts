import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  
  // Actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
  
  // Async Actions
  login: (email: string, password: string) => Promise<void>;
  refreshTokens: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,

      setAuth: (user, accessToken, refreshToken) => 
        set({ user, accessToken, refreshToken }),

      setAccessToken: (accessToken) => 
        set({ accessToken }),

      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null });
        // Optional: window.location.href = "/login";
      },

      login: async (email, password) => {
        set({ loading: true });
        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Login failed");

          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      refreshTokens: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          get().logout();
          return null;
        }

        try {
          const res = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          set({ accessToken: data.accessToken });
          return data.accessToken;
        } catch (error) {
          console.error("Token refresh failed:", error);
          get().logout();
          return null;
        }
      },
    }),
    {
      name: "twoleaf-services-auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({ 
        user: state.user, 
        accessToken: state.accessToken, 
        refreshToken: state.refreshToken 
      }),
    }
  )
);

// Utility: API Fetch with auto-refresh
export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const state = useAuthStore.getState();
  const token = state.accessToken;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    const newToken = await state.refreshTokens();
    if (newToken) {
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };
      res = await fetch(url, { ...options, headers: retryHeaders });
    }
  }

  return res;
};
