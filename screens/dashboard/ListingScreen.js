import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity ,
} from "react-native";
import React, { useEffect, useState } from "react";
export default function ListingScreen({navigation,route}) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://gopa11313.github.io/project_group03/vehicles.json"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const filteredData = data.filter((item) =>
    item.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onItemPress = (item) => {
    navigation.navigate('CreateListing', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
    <View style={styles.itemContainer} >
      <FlatList
        data={item.images}
        horizontal
        keyExtractor={(image, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url_thumbnail }}
            style={styles.thumbnail}
          />
        )}
      />

      <Text style={styles.title}>
        Name: {item.make} {item.model} { item.trim}
      </Text>
      <Text>MSRP: {item.msrp}</Text>
      <Text>Electric Range: {item.electric_range}</Text>
      <Text>Seating Capacity: {item.seats_min} seats</Text>
      <Text>Drivetrain: {item.drivetrain}</Text>
    </View>
    </TouchableOpacity >
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by make"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.handle}
    
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#ebebeb",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  itemContainer: {
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  thumbnail: {
    width: 300,
    height: 200,
    marginTop: 10,
  },
});
