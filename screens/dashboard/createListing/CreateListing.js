import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";

import { db } from "../../../utlis/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function CreateListing({ navigation, route }) {
  const { item } = route.params;
  const [name, setName] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [hoursePower, setHoursePower] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [price, setPrice] = useState("");

  const [images, setImages] = useState([]);
  const [geocodedCoordinates, setGeocodedCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  useEffect(() => {
    setName(item.make + " " + item.model + " " + item.trim);
    setSeatingCapacity(item.seats_min);
    setHoursePower(item.horsepower);
    setVehicleType(item.form_factor);
    requestLocationPermission();
    const imageUrls = item.images.map(element => element.url_thumbnail);
    setImages(imageUrls)
    console.log(images)
  }, []);
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert(`Permission to access location was denied`);
      return;
    }
  };

  const onPlus = () => {
    setSeatingCapacity(parseInt(seatingCapacity) + 1);
  };

  const onMinus = () => {
    if (seatingCapacity > 0) {
      setSeatingCapacity(parseInt(seatingCapacity) - 1);
    }
  };
  const addData = async () => {
    if(pickUpLocation !="" && licensePlate != ""){
    try {
      const value = await AsyncStorage.getItem("id");
      const id = value ? JSON.parse(value) : null;

      const geocodedLocation = await Location.geocodeAsync(pickUpLocation);
      const result = geocodedLocation[0];
      if (result === undefined) {
        alert("No coordinates found, Please provide a valid address");
        return;
      }
      setGeocodedCoordinates({ lat: result.latitude, lng: result.longitude });
      console.log("cordinates"+setGeocodedCoordinates)
      if(setGeocodedCoordinates.lat !== "0" && setGeocodedCoordinates.lng !=="0"){
      const listingItem = {
        id: id,
        name: name,
        seatingCapacity: seatingCapacity,
        horsepower: hoursePower,
        vehicleType: vehicleType,
        licensePlate: licensePlate,
        pickUpLocation: pickUpLocation,
        price: price,
        images: images,
        geocodedCoordinates: geocodedCoordinates,
      };

      const insertedDocument = await addDoc(
        collection(db, "Listing"),
        listingItem
      );
      alert(`SuccessFully Added`);
      }else{
        alert("Please provide a valid address")
      }
    } catch (err) {
      console.log(err);
    }
  }else{
    alert("Please Provide all requried data")
  }
  };

  return (
    <View style={style.continer}>
      <View style={{ width: "80%", alignSelf: "center" }}>
        <FlatList
          data={item.images}
          horizontal
          keyExtractor={(image, index) => index.toString()}
          renderItem={({ item }) => (
            // setImages(images.push(item.url_thumbnail))
            <Image
              source={{ uri: item.url_thumbnail }}
              style={style.thumbnail}
            />
          )}
        />
      </View>

      <View style={style.insideView}>
        <Text>Vehicle Name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter Vehicle Name"
        />
      </View>
      <View style={style.insideView}>
        <Text>Seating Capacity:</Text>
        <View style={style.seatCap}>
          <AntDesign
            name="minuscircleo"
            size={24}
            color="black"
            onPress={onMinus}
          />

          <Text style={{ marginLeft: 7, marginRight: 7 }}>
            {seatingCapacity}
          </Text>
          <AntDesign
            name="pluscircleo"
            size={24}
            color="black"
            onPress={onPlus}
          />
        </View>
      </View>

      <View style={style.insideView}>
        <Text>Horsepower:</Text>
        <Text>{hoursePower}</Text>
      </View>

      <View style={style.insideView}>
        <Text>Vehicle Type:</Text>
        <Text>{vehicleType}</Text>
      </View>

      <View style={style.insideView}>
        <Text>License Plate No:</Text>
        <TextInput
          value={licensePlate}
          onChangeText={setLicensePlate}
          placeholder="Please Enter your license plate"
          textAlign="right"
          writingDirection="rtl"
        />
      </View>
      <View style={style.insideView}>
        <Text> Pickup location:</Text>
        <TextInput
          value={pickUpLocation}
          onChangeText={setPickUpLocation}
          placeholder="Please Enter the car pick up location"
          textAlign="right"
          writingDirection="rtl"
        />
      </View>
      <View style={style.insideView}>
        <Text> Rental Price:</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="Please Enter the car pick up location"
          textAlign="right"
          writingDirection="rtl"
          keyboardType="numeric"
        />
      </View>
      <Pressable onPress={addData}>
        <Text style={style.btn}>Create Listing</Text>
      </Pressable>
    </View>
  );
}
const style = StyleSheet.create({
  continer: {
    flex: 1,
  },
  insideView: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thumbnail: {
    width: 300,
    height: 200,
  },
  seatCap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",

    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
