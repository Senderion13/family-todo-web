import useStorage from "@/hooks/useStorage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { Pressable, View } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function RootLayout() {
  const { deleteStorageItem } = useStorage();
  const client = new ApolloClient({
    uri: "http://192.168.88.11:3000/graphql",
    cache: new InMemoryCache(),
    credentials: "same-origin",
  });
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Family ToDo", statusBarColor: "#2196f3" }}
        />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="home" options={{ title: "Home" }} />
      </Stack>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#2196f3",
          borderRadius: 20,
          right: 20,
          bottom: 20,
          width: 40,
          height: 40,
        }}
      >
        <Pressable
          style={{ paddingLeft: 10, paddingTop: 8 }}
          onPress={async () => {
            deleteStorageItem("authToken");
            router.replace("/");
          }}
        >
          <Ionicons name="log-out-outline" size={24} />
        </Pressable>
      </View>
    </ApolloProvider>
  );
}
