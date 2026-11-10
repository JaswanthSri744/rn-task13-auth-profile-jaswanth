
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import ErrorMessage from "../components/ErrorMessage";

import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validation";
import colors from "../constants/colors";

const LoginScreen: React.FC = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError("");

    const validationError = validateLogin(username, password);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await login({
        username,
        password,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>TA</Text>
          </View>

          <Text style={styles.title}>Welcome Back!</Text>

          <Text style={styles.subtitle}>
            Sign in to continue to your account
          </Text>

          <View style={styles.form}>
            <AppInput
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <AppInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <Text
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide password" : "Show password"}
            </Text>

            <ErrorMessage message={error} />

            <AppButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
            />

            <Text style={styles.demoTitle}>Demo Credentials</Text>

            <Text style={styles.demoText}>
              Username: emilys
            </Text>

            <Text style={styles.demoText}>
              Password: emilyspass
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: 25,
  },
  logoContainer: {
    width: 75,
    height: 75,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 25,
  },
  logo: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 35,
  },
  form: {
    backgroundColor: colors.white,
    padding: 22,
    borderRadius: 15,
    elevation: 3,
  },
  passwordToggle: {
    color: colors.primary,
    textAlign: "right",
    marginTop: -8,
    marginBottom: 12,
    fontWeight: "600",
  },
  demoTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    color: colors.text,
  },
  demoText: {
    textAlign: "center",
    marginTop: 5,
    color: colors.secondaryText,
    fontSize: 13,
  },
});

export default LoginScreen;
