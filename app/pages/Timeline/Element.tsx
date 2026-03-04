import { StyleSheet, Text, View } from "react-native";

interface elementProps {
  elementID: number;
  elementName: string;
  elementDescription: string;
}

const styles = StyleSheet.create({
    elementStyle:{
        borderRadius:10,
        borderColor:'#000000',
        borderWidth:1,
        width: 'auto',
        height: 125,
        justifyContent: "center",
        alignItems: "center",
        margin:20,
    }
});

export default function Element({elementID,elementName,elementDescription}: elementProps) {
  return (
    <View style={styles.elementStyle}>
        <View style={{marginTop:10}}><Text>{elementName}</Text></View>
        <View style={{marginTop:10}}><Text>{elementDescription}</Text></View>
    </View>
  );
}