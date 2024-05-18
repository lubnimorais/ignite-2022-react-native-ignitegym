import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';

import { Entypo } from '@expo/vector-icons';

interface IExerciseCardProps extends TouchableOpacityProps {}

export function ExerciseCard({ ...rest }: IExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        backgroundColor="gray.500"
        alignItems="center"
        padding={4}
        paddingRight={4}
        marginBottom={3}
        rounded="md"
      >
        <Image
          width={16}
          height={16}
          source={{ uri: 'https://github.com/lubnimorais.png' }}
          alt="Imagem do exercício"
          resizeMode="cover"
          rounded="md"
          marginRight={4}
        />

        <VStack flex={1}>
          <Heading fontFamily="heading" fontSize="lg" color="white">
            Remada unilateral
          </Heading>

          <Text fontSize="sm" color="gray.200" marginTop={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
