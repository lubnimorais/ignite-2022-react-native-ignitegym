import { TouchableOpacity } from 'react-native';

import { HStack, Heading, Icon, Text, VStack } from 'native-base';

import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '@hooks/auth';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';

import { UserPhoto } from './UserPhoto';

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack
      backgroundColor="gray.600"
      paddingTop={16}
      paddingBottom={5}
      paddingX={8}
      alignItems="center"
    >
      <UserPhoto
        source={
          user.avatar
            ? { uri: 'https://avatars.githubusercontent.com/u/66881343?v=4' }
            : defaultUserPhotoImg
        }
        alt="Imagem do usuário"
        size={16}
        marginRight={4}
      />

      <VStack flex={1}>
        <Text fontSize="md" color="gray.100">
          Olá,
        </Text>

        <Heading fontFamily="heading" fontSize="md" color="gray.100">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity activeOpacity={0.7} onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
