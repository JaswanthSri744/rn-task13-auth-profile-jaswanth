
import {
  LoginCredentials,
  LoginResponse,
  ProfileUpdate,
  User,
} from "../types/AuthTypes";

const BASE_URL = "https://dummyjson.com";

const getErrorMessage = (data: any, fallback: string): string => {
  return typeof data?.message === "string"
    ? data.message
    : fallback;
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials.username.trim(),
      password: credentials.password,
      expiresInMins: 30,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Invalid username or password")
    );
  }

  return data as LoginResponse;
};

export const getCurrentUser = async (
  accessToken: string
): Promise<User> => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Unable to verify your session")
    );
  }

  return data as User;
};

export const refreshAuthToken = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
      expiresInMins: 30,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Unable to refresh session")
    );
  }

  return data;
};

export const updateUserProfile = async (
  userId: number,
  accessToken: string,
  updates: ProfileUpdate
): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updates),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Unable to update profile")
    );
  }

  return data as User;
};
