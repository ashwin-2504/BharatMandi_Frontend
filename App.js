import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Alert } from "react-native";

export default function App() {
  const handlePress = () => {
    Alert.alert("Success", "Expo Go is working correctly!");
  };

  return (
    <View style={styles.container}>
      <Button title="Click me" onPress={handlePress} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
