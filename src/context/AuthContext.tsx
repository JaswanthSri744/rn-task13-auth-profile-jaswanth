
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  AuthSession,
  LoginCredentials,
  ProfileUpdate,
  User,
} from "../types/AuthTypes";

import {
  loginUser,
  getCurrentUser,
  refreshAuthToken,
  updateUserProfile,
} from "../services/authService";

import {
  saveAuthSession,
  getAuthSession,
  clearAuthSession,
} from "../storage/authStorage";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: ProfileUpdate) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!accessToken;

  const logout = useCallback(async () => {
    await clearAuthSession();
    setUser(null);
    setAccessToken(null);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await loginUser(credentials);

    const session: AuthSession = {
      user: {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image,
      },
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };

    await saveAuthSession(session);

    setUser(session.user);
    setAccessToken(session.accessToken);
  };

  const updateProfile = async (updates: ProfileUpdate) => {
    if (!user || !accessToken) {
      throw new Error("You are not authenticated");
    }

    const updatedUser = await updateUserProfile(
      user.id,
      accessToken,
      updates
    );

    const newUser: User = {
      ...user,
      ...updatedUser,
      ...updates,
    };

    const currentSession = await getAuthSession();

    if (!currentSession) {
      throw new Error("Authentication session not found");
    }

    const updatedSession: AuthSession = {
      ...currentSession,
      user: newUser,
    };

    await saveAuthSession(updatedSession);
    setUser(newUser);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedSession = await getAuthSession();

        if (!savedSession) {
          return;
        }

        let activeToken = savedSession.accessToken;
        let currentUser: User;

        try {
          currentUser = await getCurrentUser(activeToken);
        } catch {
          const refreshed = await refreshAuthToken(
            savedSession.refreshToken
          );

          activeToken = refreshed.accessToken;

          const updatedSession: AuthSession = {
            ...savedSession,
            accessToken: refreshed.accessToken,
            refreshToken: refreshed.refreshToken,
          };

          currentUser = await getCurrentUser(activeToken);

          await saveAuthSession({
            ...updatedSession,
            user: {
              ...savedSession.user,
              ...currentUser,
            },
          });
        }

        const restoredUser = {
          ...savedSession.user,
          ...currentUser,
        };

        setUser(restoredUser);
        setAccessToken(activeToken);

        await saveAuthSession({
          ...savedSession,
          user: restoredUser,
          accessToken: activeToken,
        });
      } catch (error) {
        console.log("Session restoration failed:", error);
        await clearAuthSession();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
