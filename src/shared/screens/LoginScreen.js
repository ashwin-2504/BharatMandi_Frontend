import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS } from "../theme/theme";
import PrimaryButton from "../components/PrimaryButton";
import CustomInput from "../components/CustomInput";
import RoleSelector from "../components/RoleSelector";

const LoginScreen = ({ navigation }) => {
  const [role, setRole] = useState("Farmer");

  const handleLogin = () => {
    // Navigate to Dashboard with selected role
    console.log("Entering dashboard as", role);
    if (role === "Farmer") {
      navigation.navigate("SellerDashboard");
    } else {
      navigation.navigate("BuyerDashboard");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to BharatMandi</Text>
            <Text style={styles.subtitle}>Empowering India's Agriculture</Text>
          </View>

          <View style={[styles.card, SHADOWS.medium]}>
            <Text style={styles.cardTitle}>View Dashboards</Text>
            <Text style={styles.instruction}>
              Select a user type to continue
            </Text>

            <RoleSelector selectedRole={role} onRoleChange={setRole} />

            <PrimaryButton
              title="Enter Dashboard"
              onPress={handleLogin}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: SPACING.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontWeight: "500",
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    width: "100%",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  instruction: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
  },
  button: {
    marginTop: SPACING.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.lg,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 14,
  },
});

export default LoginScreen;
