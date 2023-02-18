import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token: string | null) => set((state) => ({ ...state, token, isAuthenticated: token !== null })),
            isAuthenticated: false,
        }),
        { name: 'auth-store' },
    ),
);

export default useAuthStore;
