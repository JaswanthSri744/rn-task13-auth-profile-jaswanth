
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../constants/colors";

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Please wait...",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  message: {
    marginTop: 12,
    fontSize: 15,
    color: colors.secondaryText,
  },
});

export default LoadingState;
