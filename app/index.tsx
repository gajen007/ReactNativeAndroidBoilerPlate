import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft:10
  },
  linkButton:{
    borderWidth:1,
    borderRadius:5,
    borderColor:'#000000',
    margin:10,
    padding:5,
  }
});

export default function Index() {
  return (
    <View style={styles.container}>
        <Pressable style={styles.linkButton}onPress={()=>{router.push("/pages/LoginScreen")}}><Text>Login Screen</Text></Pressable>
        <Pressable style={styles.linkButton}onPress={()=>{router.push("/pages/Buttons")}}><Text>Buttons Page</Text></Pressable>
        <Pressable style={styles.linkButton}onPress={()=>{router.push("/pages/Timeline")}}><Text>Timeline Example</Text></Pressable>
    </View>
  );
}