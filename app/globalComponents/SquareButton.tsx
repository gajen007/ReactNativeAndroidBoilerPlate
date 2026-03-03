import { Pressable, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    squareButton:{
        borderColor:'#000000',
        borderWidth:1,
        width: 125,
        height: 125,
        justifyContent: "center",
        alignItems: "center",
        margin:20,
    }
});

export default function SquareButton() {
  return (
    <Pressable style={({ pressed }) => [{backgroundColor:pressed ? '#F54927' : '#ffffff'},styles.squareButton]}>
        {({ pressed }) => (<Text style={{ color: pressed ? '#ffffff' : '#000000'}}>Click Here</Text>)}
    </Pressable>
  );
}