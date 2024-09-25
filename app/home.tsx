import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import useStorage from "@/hooks/useStorage";

type dataType = {
  id: number;
  title: string;
  content: [{ id: number; title: string; description: string }];
};

export default function Home() {
  const [data, setData] = useState<dataType[]>();
  const { getStorageItem } = useStorage();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.post(`${process.env.SERVER_URL}/themes`);
        setData(response.data);
      } catch (error) {
        console.error;
      }
    };
    fetchRequest().catch(console.error);
  }, []);

  return (
    <>
      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={({ id, title }) => id + title}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>{item.title}:</Text>
            <FlatList
              data={item.content}
              keyExtractor={({ id, title }) => id + title}
              renderItem={({ item }) => (
                <View style={{ display: "flex", alignItems: "center" }}>
                  <Text style={styles.item}>
                    {item.title}
                    <Ionicons name="trash-bin-outline" size={16} color="red" />
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 16,
  },
  title: {
    fontSize: 32,
  },
});
