import { Pressable, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    roundButton:{
        borderColor:'#000000',
        borderWidth:1,
        borderRadius:'50%',
        width: 125,
        height: 125,
        justifyContent: "center",
        alignItems: "center",
        margin:20,
    }
});

export default function RoundButton() {
  return (
    <Pressable style={({ pressed }) => [{backgroundColor:pressed ? '#F54927' : '#ffffff'},styles.roundButton]}>
        {({ pressed }) => (<Text style={{ color: pressed ? '#ffffff' : '#000000'}}>Click Here</Text>)}
    </Pressable>
  );
}