import { Text, View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingScreen from "./ListingScreen";
import ManageBooking from "./ManageBooking";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
export default function Dashboard({ navigation, route }) {
  return (
    <SafeAreaView style={style.constianer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "ListingScreen") {
              iconName = focused ? "ios-list" : "ios-list";
            } else if (route.name === "ManageBooking") {
              iconName = focused ? "ios-bookmarks" : "ios-bookmarks-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="ListingScreen"
          component={ListingScreen}
          options={{ headerShown: false }}
        ></Tab.Screen>
        <Tab.Screen
          name="ManageBooking"
          component={ManageBooking}
          options={{ headerShown: false }}
        ></Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  constianer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
