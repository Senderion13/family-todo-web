import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{"Please Log in to use this App\n\n"}</Text>

      <Button title="Log In" onPress={() => router.navigate("/login")} />
    </View>
  );
}
