import { useCallback, useEffect, useState } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base';

import { api } from '@services/api';

import { AppError } from '@utils/AppError';

import { IExerciseDTO } from '@dtos/ExerciseDTO';

import { IAppNavigatorRoutesProps } from '@routes/app.routes';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';
import { ExerciseCard } from '@components/ExerciseCard';
import { Loading } from '@components/Loading';

export function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState('');
  const [exercises, setExercises] = useState<IExerciseDTO[]>([]);

  const navigation = useNavigation<IAppNavigatorRoutesProps>();

  const toast = useToast();

  // FUNCTIONS
  const handleOpenExerciseDetails = useCallback(
    (exerciseId: string) => {
      navigation.navigate('exerciseScreen', { exerciseId });
    },
    [navigation],
  );

  const fetchGroups = useCallback(async () => {
    try {
      const response = await api.get('/groups');

      if (response.status === 200) {
        const groupData = response.data;

        setGroups(groupData);
        setGroupSelected(groupData[0]);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares.';

      toast.show({
        title,
        placement: 'top',
        background: 'red.500',
      });
    }
  }, []);

  const fetchExerciseByGroup = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${groupSelected}`);

      if (response.status === 200) {
        setExercises(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios.';

      toast.show({
        title,
        placement: 'top',
        backgroundColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }, [groupSelected]);
  // END FUNCTIONS

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  useFocusEffect(
    useCallback(() => {
      fetchExerciseByGroup();
    }, [fetchExerciseByGroup]),
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ paddingX: 8 }}
        marginY={10}
        minHeight={10}
        maxHeight={10}
        renderItem={({ item: group }) => (
          <Group
            name={group}
            isActive={
              groupSelected.toLocaleUpperCase() === group.toLocaleUpperCase()
            }
            onPress={() => {
              setGroupSelected(group);
            }}
          />
        )}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} paddingX={8}>
          <HStack justifyContent="space-between" marginBottom={5}>
            <Heading fontFamily="heading" fontSize="md" color="gray.200">
              Exercícios
            </Heading>

            <Text fontSize="sm" color="gray.200">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item: exercise }) => (
              <ExerciseCard
                exercise={exercise}
                onPress={() => {
                  handleOpenExerciseDetails(exercise.id);
                }}
              />
            )}
          />
        </VStack>
      )}
    </VStack>
  );
}
