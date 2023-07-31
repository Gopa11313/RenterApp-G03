import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { db } from "../../utlis/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { AntDesign } from "@expo/vector-icons";
export default function ManageBooking({ navigation, route }) {
  const [listing, setListing] = useState([]);
  useEffect(() => {
    retrieveFromDb();
  }, []);

  const retrieveFromDb = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      const id = value ? JSON.parse(value) : null;
      const q = query(collection(db, "Booking"), where("id", "==", id));
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

  const approveBooking = async (itemData) => {
    let documentId = "";
    try {
      const value = await AsyncStorage.getItem("id");
      const id = value ? JSON.parse(value) : null;
      const q = query(
        collection(db, "Booking"),
        where("uniqueId", "==", itemData.uniqueId)
      );
      const querySnapshot = await getDocs(q);
      const resultsFromFirestore = [];
      querySnapshot.forEach((doc) => {
        const itemToAdd = {
          id: doc.id,
          ...doc.data(),
        };
        documentId = doc.id;
      });
      const dataToUpdate = {
        status: "Approved",
        confirmationCode: generateConfirmationCode(7),
      };
      const collectionRef = collection(db, "Booking");
      const documentRef = doc(collectionRef, documentId);
      updateDoc(documentRef, dataToUpdate)
        .then(() => {
          console.log("Document successfully updated!");
          retrieveFromDb;
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const rejectbooking= async(itemData)=>{
    let documentId = "";
    try {
      const value = await AsyncStorage.getItem("id");
      const id = value ? JSON.parse(value) : null;
      const q = query(
        collection(db, "Booking"),
        where("uniqueId", "==", itemData.uniqueId)
      );
      const querySnapshot = await getDocs(q);
      const resultsFromFirestore = [];
      querySnapshot.forEach((doc) => {
        const itemToAdd = {
          id: doc.id,
          ...doc.data(),
        };
        documentId = doc.id;
      });
      const dataToUpdate = {
        status: "Rejected",
        confirmationCode: generateConfirmationCode(7),
      };
      const collectionRef = collection(db, "Booking");
      const documentRef = doc(collectionRef, documentId);
      updateDoc(documentRef, dataToUpdate)
        .then(() => {
          console.log("Document successfully updated!");
          retrieveFromDb;
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function generateConfirmationCode(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <FlatList
        data={item.images}
        horizontal
        keyExtractor={(image, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.thumbnail} />
        )}
      />
      <Text style={styles.makeModel}>
        {item.make} {item.model}
      </Text>
      <Text style={{ fontWeight: 500, fontSize: 20 }}>Renter Information</Text>
      <View style={styles.renterContainer}>
        <Image source={{ uri: item.userImage }} style={styles.renterPhoto} />
        <Text style={styles.text}>{item.userName}</Text>
      </View>
      <Text style={styles.text}>License Plate: {item.licensePlate}</Text>
      <Text style={styles.text}>Price: ${item.price}</Text>

      <Text style={styles.bookingDate}>Booking Date: {item.bookingDate}</Text>
      <Text style={styles.bookingStatus}>
        Booking Status: {item.bookingStatus}
      </Text>
      <Text style={styles.confirmationCode}>
        Booking Date: {item.bookingDate}
      </Text>
      {item.status === "Approved" && (
        <Text style={styles.confirmationCode}>
          Booking Confirmation Code: {item.confirmationCode}
        </Text>
      )}
      {item.status === "Rejected" && (
        <Text style={styles.confirmationCode}>
          Rejected
        </Text>
      )}
      {item.status === "Pending" && (
        <View style={styles.btns}>
          <Pressable
            onPress={() => approveBooking(item)}
            style={styles.approveBtn}
          >
            <Text style={{ color: "white" }}>Approve</Text>
          </Pressable>

          <Pressable
            onPress={() => rejectbooking(item)}
            style={styles.rejectBtn}
          >
            <Text style={{ color: "white" }}>Rejected</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
  const logout = () => {
    getAuth().signOut;
    navigation.replace("Splash");
  };

  return (
    <View>
      <View style={styles.topbar}>
        <Text style={{ fontSize: 20, fontWeight: 400 }}>
          Manage your Booking
        </Text>
        <Pressable onPress={() => logout()}>
          <AntDesign name="logout" size={26} color="red" />
        </Pressable>
      </View>
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
    marginBottom:50
  },
  topbar: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  thumbnail: {
    width: 300,
    height: 200,
    marginTop: 10,
  },
  makeModel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
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
  rejected:{
    fontSize: 16,
    fontFamily:"red"
  },
  approveBtn: {
    backgroundColor: "green",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  rejectBtn: {
    backgroundColor: "red",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  btns:{
    flexDirection:"row",
    marginLeft:10
  }
});
