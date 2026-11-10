
import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return <Text style={styles.error}>{message}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    fontSize: 13,
    marginVertical: 8,
    textAlign: "center",
  },
});

export default ErrorMessage;
