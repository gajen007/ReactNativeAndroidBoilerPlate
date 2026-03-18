import { login } from "@/app/redux/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { ApiEndPoint } from "../globals/ApiEndPoint";
import validateEmail from "../globals/ValidateEmail";

const styles = StyleSheet.create({
  container: {
    
    flexDirection: "column",
    marginRight: 5,
    marginTop: 90,
    paddingTop: 10,
  },
  buttonContainer: {
    
    flexDirection: "column",
    marginVertical: 10,
  },
  signUpLink:{
    marginVertical: 10,
    marginLeft: 10,
  },
  inputContainer: {
    marginVertical: 10,
    marginLeft: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#466E2C",
  },
  inputStyle: {
    height: 50,
    fontSize: 20,
    padding: 5,
    marginLeft: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#466E2C",
    borderRadius: 5,
    color: "#466E2C",
  },
  loginButton: {
    borderColor: "#466E2C",
    borderWidth: 1,
    backgroundColor: "#466E2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  loadingButton:{
    borderColor: "#8d2005",
    borderWidth: 1,
    backgroundColor: "#8d2005",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  loadingButtonText: {
    color: "rgb(251, 255, 0)",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginButtonText: {
    color: "#f3e308ff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function Page() {
  const [userName, setUsername] = useState<string>("");
  const [passWord, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [clickable,setClickable] = useState<boolean>(true);
  
    const loginForm = async() => {
    if(userName!==""&&passWord!==""){
      if (validateEmail(userName)) {
            setClickable(false);
      const response = await fetch(ApiEndPoint+"login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userName,
        pwd: passWord,
      }),
    });
    const result = await response.json();
    if (result.result) {
      dispatch(login({ uEmail: userName, uName: result.name }));
      Alert.alert("Welcome "+result.name);
      router.push("/");
    } else {
      Alert.alert("Incorrect Email or Password!");
    }
  }
  else{
    Alert.alert("Not a valid Email!");
  }
    }
    else{
        Alert.alert("Empty Username and/or Password!");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.signUpLink}>
        <Pressable onPress={() => router.push("/pages/SignUp")} style={styles.loadingButton}>
          <Text style={styles.loadingButtonText}>New User ?</Text>
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          inputMode="email"
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
        <Pressable disabled={!clickable} onPress={loginForm} style={clickable?styles.loginButton:styles.loadingButton}>
          <Text style={clickable?styles.loginButtonText:styles.loadingButtonText}>
            {
              clickable?"Login":"Loading..."
            }
          </Text>
        </Pressable>
      </View>
    </View>
  );
}