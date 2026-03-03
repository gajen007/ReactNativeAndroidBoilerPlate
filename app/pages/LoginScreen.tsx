import { useState } from "react";
import {
    //Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginRight: 5,
    marginTop: 90,
    paddingTop: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 10,
  },
  inputContainer: {
    marginVertical: 10,
    marginLeft: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#000000",
  },
  inputStyle: {
    height: 50,
    fontSize: 20,
    padding: 5,
    marginLeft: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    color: "#000000",
  },
  loginButton: {
    borderColor: "#000000",
    borderWidth: 1,
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function Page() {
  const [userName, setUsername] = useState<string>("");
  const [passWord, setPassword] = useState<string>("");

  const loginForm = () => {
    /*
    const toServer = new FormData();
    toServer.append("userName", userName);
    toServer.append("passWord", passWord);
    fetch("ApiEndPoint", {
      method: "POST",
      body: toServer,
      mode: "cors",
      cache: "no-cache",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          Alert.alert("Backend Error..!");
        }
      })
      .then((data) => {
        if (data.result) {
        //Successfull login
          Alert.alert(data.message);
        } else {
          Alert.alert("Incorrect Email or Password");
        }
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("CORS Error");
      });
      */
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          inputMode="text"
          value={userName}
          onChangeText={(uN) => setUsername(uN)}
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          secureTextEntry={true}
          value={passWord}
          onChangeText={(pW) => setPassword(pW)}
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => loginForm()} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}