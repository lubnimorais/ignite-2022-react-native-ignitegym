import { useCallback, useState } from 'react';

import { TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import * as FileSystem from 'expo-file-system';

import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function ProfileScreen() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    'http://github.com/lubnimorais.png',
  );

  const toast = useToast();

  // FUNCTIONS
  const handleUserPhotoSelect = useCallback(async () => {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        );

        if (photoInfo.exists) {
          if (photoInfo.size) {
            const photoSizeMegabyte = photoInfo.size / 1024 / 1024;

            if (photoSizeMegabyte > 5)
              return toast.show({
                title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
                placement: 'top',
                backgroundColor: 'red.500',
              });
          }
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }, [toast]);
  // END FUNCTIONS

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        _contentContainerStyle={{ paddingBottom: 36 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Center marginTop={6} paddingX={10}>
          {photoIsLoading ? (
            <Skeleton
              width={PHOTO_SIZE}
              height={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Imagem do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity activeOpacity={0.7} onPress={handleUserPhotoSelect}>
            <Text
              fontSize="md"
              fontWeight="bold"
              color="green.500"
              marginTop={2}
              marginBottom={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input backgroundColor="gray.600" placeholder="Nome" />

          <Input backgroundColor="gray.600" placeholder="E-mail" isDisabled />
        </Center>

        <VStack paddingX={10} marginTop={12} marginBottom={9}>
          <Heading
            fontFamily="heading"
            fontSize="md"
            color="gray.200"
            marginBottom={2}
          >
            Alterar Senha
          </Heading>

          <Input
            backgroundColor="gray.600"
            placeholder="Senha antiga"
            secureTextEntry
          />

          <Input
            backgroundColor="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />

          <Input
            backgroundColor="gray.600"
            placeholder="Confirme nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" marginTop={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
