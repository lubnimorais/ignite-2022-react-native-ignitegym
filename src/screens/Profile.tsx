import { useState } from 'react';

import { TouchableOpacity } from 'react-native';

import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function ProfileScreen() {
  const [photIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        _contentContainerStyle={{ paddingBottom: 36 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Center marginTop={6} paddingX={10}>
          {photIsLoading ? (
            <Skeleton
              width={PHOTO_SIZE}
              height={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: 'https://github.com/lubnimorais.png' }}
              alt="Imagem do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity activeOpacity={0.7}>
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
          <Heading fontSize="md" color="gray.200" marginBottom={2}>
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
