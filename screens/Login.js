import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Login({navigation,route}){
    const onPressLogin=()=>{
            navigation.navigate("Dashboard")
    }
    return(
        <View style={styles.container}>

        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logo}
        />
        <Text style={styles.appName}>Your App Name</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
  
        <TouchableOpacity style={styles.loginButton} onPress={onPressLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
      },
      logo: {
        width: 300,
        height: 130,

      },
      appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      inputContainer: {
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
      },
      input: {
        height: 40,
      },
      loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#4285F4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
})