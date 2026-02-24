import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS } from "../theme/theme";
import PrimaryButton from "../components/PrimaryButton";
import RoleSelector from "../components/RoleSelector";

const LoginScreen = ({ role, setRole, onContinue }) => {
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
            <Text style={styles.cardTitle}>Login to your account</Text>
            <Text style={styles.instruction}>Select your role to continue</Text>

            <RoleSelector selectedRole={role} onRoleChange={setRole} />

            <PrimaryButton
              title="Continue"
              onPress={onContinue}
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
    marginBottom: SPACING.xl * 1.5,
  },
  title: {
    fontSize: 32,
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
  },
  button: {
    marginTop: SPACING.md,
  },
});

export default LoginScreen;
