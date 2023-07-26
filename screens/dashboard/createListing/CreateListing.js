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
import { AntDesign } from "@expo/vector-icons";
import * as Location from 'expo-location';
export default function CreateListing({ navigation, route }) {
  const { item } = route.params;
  const [name, setName] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [hoursePower, setHoursePower] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [pickUpLocation,setPickUpLocation] =useState("")
  const [price,setPrice] =useState("")
  const [geocodedCoordinates, setGeocodedCoordinates] = useState({lat:0, lng:0});
  useEffect(() => {
    setName(item.make + " " + item.model + " " + item.trim);
    setSeatingCapacity(item.seats_min);
    setHoursePower(item.horsepower);
    setVehicleType(item.form_factor);
  }, []);
  const requestLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      // Location permission granted, call your geocoding function here
      doForwardGeocode();
    } else {
      alert('Permission to access location denied.');
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
  const doForwardGeocode = async () => {
    alert("forward geocode button clicked")                  
    try {
        console.log(`Attempting to geocode: ${pickUpLocation}`)
        const geocodedLocation = await Location.geocodeAsync(pickUpLocation)
        const result = geocodedLocation[0]
        if (result === undefined) {
            alert("No coordinates found")
            return
        }
        // 3. do something with results 
        console.log(result)           
        alert(JSON.stringify(result))
        // update state variable to an object that contains the lat/lng
        // (alternatively you could have created 2 separate state variables)
        setGeocodedCoordinates({lat: result.latitude, lng: result.longitude})
console.Console(geocodedCoordinates)
    } catch (err) {
        console.log(err)
    }
}

  return (
    <View style={style.continer}>
      <View style={{ width: "80%", alignSelf: "center" }}>
        <FlatList
          data={item.images}
          horizontal
          keyExtractor={(image, index) => index.toString()}
          renderItem={({ item }) => (
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
    <Pressable onPress={doForwardGeocode}>
      <Text style ={style.btn}>Create Listing</Text>
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
  btn:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"black",
    color:'white',

    borderRadius:10,
    padding:10,
    margin:10,
  }
});
