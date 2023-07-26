import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Splash from './screens/Splash';
import Login from './screens/Login';
import Dashboard from './screens/dashboard/Dashborad';
import CreateListing from './screens/dashboard/createListing/CreateListing';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='CreateListing' component={CreateListing} ></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

