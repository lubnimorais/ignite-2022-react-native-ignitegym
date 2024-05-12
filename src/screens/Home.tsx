import { useCallback, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { FlatList, HStack, Heading, Text, VStack } from 'native-base';

import { IAppNavigatorRoutesProps } from '@routes/app.routes';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';
import { ExerciseCard } from '@components/ExerciseCard';

export function HomeScreen() {
  const [groups, setGroups] = useState([
    'costas',
    'bíceps',
    'tríceps',
    'ombro',
  ]);
  const [groupSelected, setGroupSelected] = useState('costas');
  const [exercises, setExercises] = useState([
    'Puxada Frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terra',
  ]);

  const navigation = useNavigation<IAppNavigatorRoutesProps>();

  // FUNCTIONS
  const handleOpenExerciseDetails = useCallback(() => {
    navigation.navigate('exerciseScreen');
  }, [navigation]);
  // END FUNCTIONS

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

      <VStack flex={1} paddingX={8}>
        <HStack justifyContent="space-between" marginBottom={5}>
          <Heading fontSize="md" color="gray.200">
            Exercícios
          </Heading>

          <Text fontSize="sm" color="gray.200">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item: exercise }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
        />
      </VStack>
    </VStack>
  );
}
