import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (data.token) {
            set({
              token: data.token,
              user: data.user,
              isAuthenticated: true
            });
            localStorage.setItem('token', data.token);
            return { success: true };
          }

          return { success: false, error: data.error };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },

      register: async (email, password, name) => {
        try {
          const response = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
          });

          const data = await response.json();

          if (data.token) {
            set({
              token: data.token,
              user: data.user,
              isAuthenticated: true
            });
            localStorage.setItem('token', data.token);
            return { success: true };
          }

          return { success: false, error: data.error };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false
        });
        localStorage.removeItem('token');
      },

      initializeAuth: () => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          set({
            token: savedToken,
            isAuthenticated: true
          });
        }
      }
    }),
    {
      name: 'auth-store'
    }
  )
);
