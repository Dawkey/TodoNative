import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (key, value) => {
  return await AsyncStorage.setItem(key, value);
};

export const load = async key => {
  return await AsyncStorage.getItem(key);
};
