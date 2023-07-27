import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { db } from "../../utlis/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      const querySnapshot = await getDocs(q);
      const resultsFromFirestore = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const itemToAdd = {
          id: doc.id,
          ...doc.data(),
        };
        resultsFromFirestore.push(itemToAdd);
      });
      setListing(resultsFromFirestore);
      console.log("my listing " + listing);
    } catch (err) {
      console.log(err);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <FlatList
        data={item.images}
        horizontal
        keyExtractor={(image, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.thumbnail}
          />
        )}
      />
      <Text style={styles.makeModel}>
        {item.make} {item.model}
      </Text>
      <Text style={styles.licensePlate}>
        License Plate: {item.licensePlate}
      </Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <View style={styles.renterContainer}>
        <Image source={{ uri: item.renterPhoto }} style={styles.renterPhoto} />
        <Text style={styles.renterName}>{item.renterName}</Text>
      </View>
      <Text style={styles.bookingDate}>Booking Date: {item.bookingDate}</Text>
      <Text style={styles.bookingStatus}>
        Booking Status: {item.bookingStatus}
      </Text>
      {item.bookingStatus === "Approved" && (
        <Text style={styles.confirmationCode}>
          Booking Confirmation Code: {item.confirmationCode}
        </Text>
      )}
    </View>);

  return (
    <View>
      <Text>My Listing</Text>
      <FlatList
        data={listing}
        renderItem={renderItem}
        keyExtractor={(item) => item.handle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  thumbnail: {
    width: 300,
    height: 200,
    marginTop: 10
  },
  makeModel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  licensePlate: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
  },
  renterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  renterPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  renterName: {
    fontSize: 16,
  },
  bookingDate: {
    fontSize: 16,
  },
  bookingStatus: {
    fontSize: 16,
  },
  confirmationCode: {
    fontSize: 16,
  },
});
