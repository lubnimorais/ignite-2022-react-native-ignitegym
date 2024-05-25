import AsyncStorage from '@react-native-async-storage/async-storage';

import { IUserDTO } from '@dtos/UserDTO';

import { USER_STORAGE } from './storageConfig';

export async function storageUserSave(user: IUserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet(): Promise<IUserDTO> {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: IUserDTO = storage ? JSON.parse(storage) : {};

  return user;
}
