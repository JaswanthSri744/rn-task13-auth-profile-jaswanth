
import { ProfileUpdate } from "../types/AuthTypes";

export const validateLogin = (
  username: string,
  password: string
): string | null => {
  if (!username.trim()) {
    return "Username is required";
  }

  if (!password.trim()) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must contain at least 6 characters";
  }

  return null;
};

export const validateProfile = (
  profile: ProfileUpdate
): string | null => {
  if (!profile.firstName.trim()) {
    return "First name is required";
  }

  if (!profile.lastName.trim()) {
    return "Last name is required";
  }

  if (!profile.email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(profile.email)) {
    return "Please enter a valid email address";
  }

  if (profile.phone.trim() && !/^[+\d\s()-]{7,20}$/.test(profile.phone)) {
    return "Please enter a valid phone number";
  }

  return null;
};
