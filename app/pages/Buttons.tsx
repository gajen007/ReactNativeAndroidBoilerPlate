import FillButton from '@/app/globalComponents/FillButton';
import RoundButton from '@/app/globalComponents/RoundButton';
import SquareButton from '@/app/globalComponents/SquareButton';
import { StyleSheet, View } from "react-native";

export default function Page() {
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        marginRight: 5,
        marginTop: 90,
        paddingTop: 10,
    },
});


  return (
    <View style={styles.container}>
        <RoundButton/>
        <SquareButton/>
        <FillButton/>
    </View>
  );
}