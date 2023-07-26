import { useEffect } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView } from "react-native";

export default function Splash({ navigation, route }) {
  useEffect(() => {
    navigation.navigate("Login");
  }, 4000);
  return (
    <SafeAreaView style={style.conttainer}>
      <Image
        source={require("../assets/logo.jpg")}
        style={{ height: 120, width: 400 }}
      />
      <Text style={{ fontWeight: 500, fontSize: 25 }}>Owner App</Text>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  conttainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
