import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const persistor = persistStore(store); // move outside component to avoid recreating on each render

function AppLayout() {

  return (
    <View style={styles.container} >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="/" options={{ headerShown: false }} />
        <Stack.Screen name="/pages/SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="/pages/Login" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppLayout />
      </PersistGate>
    </Provider>
  );
}