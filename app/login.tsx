import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Platform } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import useStorage from "@/hooks/useStorage";
import { gql, useQuery } from "@apollo/client";

export default function Login() {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [token, setToken] = useState("");
  const { getStorageItem, setStorageItem } = useStorage();
  const { data } = useQuery(
    gql`
      query getUser {
        id
        username
        password
      }
    `
  );
  useEffect(() => {
    const autoLogin = async () => {
      let authToken = await getStorageItem("authToken");
      if (authToken) {
        router.replace("/home");
      }
    };
    autoLogin().catch(console.error);
  }, []);

  useEffect(() => {
    (async () => {
      if (token) {
        await setStorageItem("authToken", token);
        router.replace("/home");
      }
    })();
  }, [token]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.paragraph}>{Platform.OS.toUpperCase()} Login</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => (text ? onChangeUsername(text) : "")}
          value={username}
          placeholder="username"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => (text ? onChangePassword(text) : "")}
          value={password}
          placeholder="********"
        />
        <View style={{ ...styles.textInput, backgroundColor: "#2196f3" }}>
          <Pressable
            onPress={async () => {
              try {
                router.navigate("/home");
              } catch (error) {
                console.error;
              }
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Login</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    gap: 10,
  },
  paragraph: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 4,
    borderRadius: 8,
    justifyContent: "center",
  },
});
