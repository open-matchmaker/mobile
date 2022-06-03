import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  storeData: async <T>(key: string, value: T) => {
    return AsyncStorage.setItem(`@matchmaker-${key}`, JSON.stringify(value));
  },

  getData: async <T>(key: string): Promise<T | null> => {
    const value = await AsyncStorage.getItem(`@matchmaker-${key}`);
    return JSON.parse(value || 'null');
  },

  removeData: async (key: string) => {
    return AsyncStorage.removeItem(`@matchmaker-${key}`);
  }
}
