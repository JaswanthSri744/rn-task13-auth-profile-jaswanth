
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AppButton from "../components/AppButton";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/AppNavigator";
import colors from "../constants/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{user.firstName}!</Text>
        </View>

        {user.image ? (
          <Image
            source={{ uri: user.image }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {user.firstName.charAt(0)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Dashboard</Text>
        <Text style={styles.bannerSubtitle}>
          You are successfully logged in!
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Account Information</Text>

      <View style={styles.card}>
        <InfoRow label="Full Name" value={`${user.firstName} ${user.lastName}`} />
        <InfoRow label="Username" value={user.username} />
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Gender" value={user.gender || "Not available"} />
        <InfoRow label="User ID" value={String(user.id)} />
      </View>

      <Text style={styles.sectionTitle}>Account Management</Text>

      <AppButton
        title="View / Edit Profile"
        onPress={() => navigation.navigate("Profile")}
      />

      <AppButton
        title="Logout"
        onPress={handleLogout}
        variant="danger"
      />
    </ScrollView>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greeting: {
    color: colors.secondaryText,
    fontSize: 15,
  },
  name: {
    color: colors.text,
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 25,
    color: colors.white,
    fontWeight: "bold",
  },
  banner: {
    backgroundColor: colors.primary,
    padding: 23,
    borderRadius: 15,
    marginBottom: 25,
  },
  bannerTitle: {
    color: colors.white,
    fontSize: 23,
    fontWeight: "bold",
  },
  bannerSubtitle: {
    color: colors.white,
    marginTop: 8,
    fontSize: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 13,
    marginTop: 8,
  },
  card: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoRow: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    color: colors.secondaryText,
    fontSize: 12,
    marginBottom: 5,
  },
  infoValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
});

export default HomeScreen;
