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
import CustomInput from "../components/CustomInput";
import RoleSelector from "../components/RoleSelector";

const RegisterScreen = ({ role, setRole, onRegister, onBackToLogin }) => {
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
          <View style={[styles.card, SHADOWS.medium]}>
            <Text style={styles.cardTitle}>Create Account</Text>
            <Text style={styles.instruction}>Join India's largest farming community</Text>

            <RoleSelector selectedRole={role} onRoleChange={setRole} />

            <CustomInput label="Full Name" placeholder="Enter your full name" />
            <CustomInput label="Email" placeholder="Enter your email" keyboardType="email-address" />
            <CustomInput label="Phone" placeholder="Enter your phone number" keyboardType="phone-pad" />
            <CustomInput label="Address" placeholder="Enter your full address" multiline />
            <CustomInput label="Password" placeholder="Create a password" secureTextEntry />

            <PrimaryButton
              title="Create Account"
              onPress={onRegister}
              style={styles.button}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBackToLogin}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.linkTextBold}>Login</Text>
              </Text>
            </TouchableOpacity>
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
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    width: "100%",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  instruction: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  button: {
    marginTop: SPACING.lg,
  },
  linkButton: {
    marginTop: SPACING.lg,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  linkTextBold: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});

export default RegisterScreen;
