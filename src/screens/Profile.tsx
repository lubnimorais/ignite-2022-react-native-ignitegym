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

import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { api } from '@services/api';

import { AppError } from '@utils/AppError';

import { useAuth } from '@hooks/auth';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

type IFormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos')
    .nullable()
    .transform((value) => value || null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (field: any) => field,
      then: (schema) =>
        schema
          .nullable()
          .required('Informe a confirmação da senha.')
          .transform((value) => value || null),
    }),
});

export function ProfileScreen() {
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const { user, updateUserProfile } = useAuth();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

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

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        const userPhotUploadForm = new FormData();
        userPhotUploadForm.append('avatar', photoFile);

        const avatarUpdatedResponse = await api.patch(
          '/users/avatar',
          userPhotUploadForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (avatarUpdatedResponse.status === 200) {
          const userUpdated = user;
          userUpdated.avatar = avatarUpdatedResponse.data.avatar;

          updateUserProfile(userUpdated);

          toast.show({
            title: 'Foto atualizada!',
            placement: 'top',
            backgroundColor: 'green.500',
          });
          // setUserPhoto(photoSelected.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }, []);

  const handleProfileUpdate = useCallback(async (data: IFormDataProps) => {
    try {
      setIsUpdateLoading(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      const response = await api.put('/users', data);

      if (response.status === 200) {
        await updateUserProfile(userUpdated);

        toast.show({
          title: 'Perfil atualizado com sucesso',
          placement: 'top',
          backgroundColor: 'green.500',
        });
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        backgroundColor: 'red.500',
      });
    } finally {
      setIsUpdateLoading(false);
    }
  }, []);
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
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : defaultUserPhotoImg
              }
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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                backgroundColor="gray.600"
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <Input
                backgroundColor="gray.600"
                placeholder="E-mail"
                isDisabled
                value={value}
              />
            )}
          />
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

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                backgroundColor="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                backgroundColor="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                backgroundColor="gray.600"
                placeholder="Confirme nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            marginTop={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdateLoading}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
