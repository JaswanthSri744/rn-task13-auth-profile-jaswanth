
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import colors from "../constants/colors";

interface AppInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  style,
  ...inputProps
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error ? styles.errorInput : null, style]}
        placeholderTextColor={colors.secondaryText}
        {...inputProps}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 7,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    color: colors.text,
    backgroundColor: colors.white,
    fontSize: 15,
  },
  errorInput: {
    borderColor: colors.error,
  },
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },
});

export default AppInput;
