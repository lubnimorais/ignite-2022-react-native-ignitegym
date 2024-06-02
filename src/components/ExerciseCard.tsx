import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';

import { Entypo } from '@expo/vector-icons';

import { IExerciseDTO } from '@dtos/ExerciseDTO';

import { api } from '@services/api';

interface IExerciseCardProps extends TouchableOpacityProps {
  exercise: IExerciseDTO;
}

export function ExerciseCard({ exercise, ...rest }: IExerciseCardProps) {
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
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
          }}
          alt="Imagem do exercício"
          resizeMode="cover"
          rounded="md"
          marginRight={4}
        />

        <VStack flex={1}>
          <Heading fontFamily="heading" fontSize="lg" color="white">
            {exercise.name}
          </Heading>

          <Text fontSize="sm" color="gray.200" marginTop={1} numberOfLines={2}>
            {exercise.series} séries x {exercise.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
