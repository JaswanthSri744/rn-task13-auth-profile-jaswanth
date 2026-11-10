
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthSession } from "../types/AuthTypes";

const AUTH_STORAGE_KEY = "task13_auth_session";

export const saveAuthSession = async (
  session: AuthSession
): Promise<void> => {
  await AsyncStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(session)
  );
};

export const getAuthSession = async (): Promise<AuthSession | null> => {
  const storedSession = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  return JSON.parse(storedSession) as AuthSession;
};

export const clearAuthSession = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
};
