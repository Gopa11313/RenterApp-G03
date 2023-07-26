import { Text, View } from "react-native";
import { db } from "../../utlis/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
// 2. Import the relevant functions from firestore
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ManageBooking() {
  const [listing, setListing] = useState([]);
  useEffect(() => {
    retrieveFromDb();
  }, []);
  const retrieveFromDb = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      const id = value ? JSON.parse(value) : null;
      const q = query(collection(db, "Listing"), where("id", "==", id));
      const querySnapshot  = await getDocs(q);
      const resultsFromFirestore = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const itemToAdd = {
          id: doc.id,
          ...doc.data(),
        };
        resultsFromFirestore.push(itemToAdd);
      });
      console.log("What is in our final array");
      console.log(resultsFromFirestore);

      setListing(resultsFromFirestore);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Text>ManageBooking</Text>
    </View>
  );
}
