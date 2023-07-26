import { useEffect } from "react";
import { View,Image, StyleSheet ,Text} from "react-native";

export default function Splash({navigation,route}){
    useEffect(()=>{
        navigation.navigate("")
    },4000)
    return(
        <View style={style.conttainer}>
            <Image source={require("../assets/logo.jpg")} style={{height:120,width:400}}/>
            <Text>Rental App</Text>
        </View>
    )
} 
const style = StyleSheet.create({
    conttainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white"
    }
})