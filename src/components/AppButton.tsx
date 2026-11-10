
import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" && styles.secondary,
        variant === "danger" && styles.danger,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "secondary" && styles.secondaryText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.error,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryText: {
    color: colors.primary,
  },
});

export default AppButton;
