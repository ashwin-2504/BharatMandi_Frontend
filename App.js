import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [role, setRole] = useState("Farmer");

  const handleContinue = () => {
    setScreen("register");
  };

  const handleRegister = () => {
    // In a real app, this would handle account creation logic
    console.log("Registering as", role);
  };

  const handleBackToLogin = () => {
    setScreen("login");
  };

  return (
    <>
      <StatusBar style="dark" />
      {screen === "login" ? (
        <LoginScreen
          role={role}
          setRole={setRole}
          onContinue={handleContinue}
        />
      ) : (
        <RegisterScreen
          role={role}
          setRole={setRole}
          onRegister={handleRegister}
          onBackToLogin={handleBackToLogin}
        />
      )}
    </>
  );
}
