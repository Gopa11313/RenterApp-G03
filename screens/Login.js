import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../utlis/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
export default function Login({ navigation, route }) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (email != "" && password != "") {
      try {
        const auth = getAuth(); // Initialize the auth object
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        getUser();
        console.log("User logged in successfully!", userCredential.user.uid);
      } catch (error) {
        alert(error);
        console.error("Error during login:", error);
      }
    } else {
      alert("Please provide all the data");
    }
  };
  const getUser = async () => {
    const q = query(collection(db, "users"), where("email", "==", email));
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs[0].data().type);
      if (querySnapshot.docs[0].data().type == "owner") {
        try {
          await AsyncStorage.setItem("name", JSON.stringify(querySnapshot.docs[0].data().name));
          await AsyncStorage.setItem("email", JSON.stringify(querySnapshot.docs[0].data().email));
          await AsyncStorage.setItem("image", JSON.stringify(querySnapshot.docs[0].data().image));
          await AsyncStorage.setItem("id", JSON.stringify(querySnapshot.docs[0].id));
        } catch (error) {
          console.error('Error saving data:', error);
        }
        navigation.navigate("Dashboard");
      } else {
        alert("Sorry you are not a owner");
      }
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      <Text style={styles.appName}>Your App Name</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setemail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 300,
    height: 130,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
  },
  loginButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
