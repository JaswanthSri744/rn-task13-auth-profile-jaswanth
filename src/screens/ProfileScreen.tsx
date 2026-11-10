
import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import ErrorMessage from "../components/ErrorMessage";

import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/AppNavigator";
import { ProfileUpdate } from "../types/AuthTypes";
import { validateProfile } from "../utils/validation";
import colors from "../constants/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSave = async () => {
    setError("");

    const profileData: ProfileUpdate = {
      firstName,
      lastName,
      email,
      phone,
    };

    const validationError = validateProfile(profileData);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await updateProfile(profileData);

      Alert.alert(
        "Success",
        "Your profile has been updated successfully.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>My Profile</Text>

      <Text style={styles.subtitle}>
        Update your personal information
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        <AppInput
          label="First Name"
          placeholder="Enter first name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <AppInput
          label="Last Name"
          placeholder="Enter last name"
          value={lastName}
          onChangeText={setLastName}
        />

        <AppInput
          label="Email"
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <AppInput
          label="Phone Number"
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.username}>
          Username: {user.username}
        </Text>

        <ErrorMessage message={error} />

        <AppButton
          title="Save Changes"
          onPress={handleSave}
          loading={loading}
          disabled={loading}
        />

        <AppButton
          title="Cancel"
          variant="secondary"
          onPress={() => navigation.goBack()}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitle: {
    color: colors.secondaryText,
    marginTop: 6,
    marginBottom: 22,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 14,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
  username: {
    color: colors.secondaryText,
    fontSize: 13,
    marginBottom: 10,
  },
});

export default ProfileScreen;
