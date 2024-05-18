import { HStack, Heading, Icon, Text, VStack } from 'native-base';

import { MaterialIcons } from '@expo/vector-icons';

import { UserPhoto } from './UserPhoto';
import { TouchableOpacity } from 'react-native';

export function HomeHeader() {
  return (
    <HStack
      backgroundColor="gray.600"
      paddingTop={16}
      paddingBottom={5}
      paddingX={8}
      alignItems="center"
    >
      <UserPhoto
        size={16}
        alt="Imagem do usuário"
        source={{ uri: 'https://avatars.githubusercontent.com/u/66881343?v=4' }}
        marginRight={4}
      />

      <VStack flex={1}>
        <Text fontSize="md" color="gray.100">
          Olá,
        </Text>

        <Heading fontFamily="heading" fontSize="md" color="gray.100">
          Lubni Morais
        </Heading>
      </VStack>

      <TouchableOpacity activeOpacity={0.7}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
