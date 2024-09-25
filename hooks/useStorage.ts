import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function useStorage() {
  const getStorageItem = async (key: string) => {
    if (Platform.OS === "android") {
      return await SecureStore.getItemAsync(key);
    }
    if (Platform.OS === "ios") {
    }
    if (Platform.OS === "macos") {
    }
    if (Platform.OS === "web") {
      return await localStorage.getItem(key);
    }
    if (Platform.OS === "windows") {
    }
  };
  const setStorageItem = async (key: string, value: string) => {
    if (Platform.OS === "android") {
      await SecureStore.setItemAsync(key, value);
    }
    if (Platform.OS === "ios") {
    }
    if (Platform.OS === "macos") {
    }
    if (Platform.OS === "web") {
      await localStorage.setItem(key, value);
    }
    if (Platform.OS === "windows") {
    }
    return true;
  };

  const deleteStorageItem = async (key: string) => {
    if (Platform.OS === "android") {
      await SecureStore.deleteItemAsync(key);
    }
    if (Platform.OS === "ios") {
    }
    if (Platform.OS === "macos") {
    }
    if (Platform.OS === "web") {
      await localStorage.removeItem(key);
    }
    if (Platform.OS === "windows") {
    }
    return true;
  };

  return { getStorageItem, setStorageItem, deleteStorageItem };
}
