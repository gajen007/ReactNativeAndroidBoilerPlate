import { Pressable, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    fillButton:{
    borderColor: "#000000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop:20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    }
});

export default function FillButton() {
  return (
    <Pressable style={({ pressed }) => [{backgroundColor:pressed ? '#F54927' : '#000000'},styles.fillButton]}>
        {({ pressed }) => (<Text style={{ color: pressed ? '#000000' : '#ffffff'}}>Click Here</Text>)}
    </Pressable>
  );
}