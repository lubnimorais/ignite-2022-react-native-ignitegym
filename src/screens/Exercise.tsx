import { useCallback, useEffect, useState } from 'react';

import { TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';

import { Feather } from '@expo/vector-icons';

import { api } from '@services/api';

import { IExerciseDTO } from '@dtos/ExerciseDTO';

import { IAppNavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { Loading } from '@components/Loading';

type IExerciseScreenRouteParams = {
  exerciseId: string;
};

export function ExerciseScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<IExerciseDTO>({} as IExerciseDTO);

  const navigation = useNavigation<IAppNavigatorRoutesProps>();

  const toast = useToast();

  const route = useRoute();

  const { exerciseId } = route.params as IExerciseScreenRouteParams;

  // FUNCTIONS
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const fetchExerciseDetails = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/${exerciseId}`);

      if (response.status === 200) {
        setExercise(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício';

      toast.show({
        title,
        placement: 'top',
        backgroundColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, exerciseId]);
  // END FUNCTIONS

  useEffect(() => {
    fetchExerciseDetails();
  }, [fetchExerciseDetails]);

  return (
    <VStack flex={1}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <VStack backgroundColor="gray.600" paddingX={8} paddingTop={12}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
              <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
            </TouchableOpacity>

            <HStack
              alignItems="center"
              justifyContent="space-between"
              marginTop={4}
              marginBottom={8}
            >
              <Heading
                flexShrink={1}
                fontFamily="heading"
                fontSize="lg"
                color="gray.100"
              >
                {exercise.name}
              </Heading>

              <HStack alignItems="center">
                <BodySvg />

                <Text
                  color="gray.200"
                  marginLeft={1}
                  textTransform="capitalize"
                >
                  {exercise.group}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <ScrollView>
            <VStack padding={8}>
              <Box marginBottom={3} rounded="lg" overflow="hidden">
                <Image
                  width="full"
                  height={80}
                  source={{
                    uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                  }}
                  alt="Imagem do exercício"
                  resizeMode="cover"
                />
              </Box>

              <Box
                backgroundColor="gray.600"
                rounded="md"
                paddingX={4}
                paddingBottom={4}
              >
                <HStack
                  alignItems="center"
                  justifyContent="space-around"
                  marginTop={5}
                  marginBottom={6}
                >
                  <HStack alignItems="center">
                    <SeriesSvg />

                    <Text color="gray.200" marginLeft="2">
                      {exercise.series} séries
                    </Text>
                  </HStack>

                  <HStack alignItems="center">
                    <RepetitionsSvg />

                    <Text color="gray.200" marginLeft="2">
                      {exercise.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button title="Marcar como realizado" />
              </Box>
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
}
