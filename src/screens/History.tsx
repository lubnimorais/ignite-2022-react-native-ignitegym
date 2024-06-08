import { useCallback, useState } from 'react';

import { Heading, SectionList, Text, VStack, useToast } from 'native-base';

import { AppError } from '@utils/AppError';

import { api } from '@services/api';

import { IHistoryByDayDTO } from '@dtos/HistoryByDayDTO';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';
import { useFocusEffect } from '@react-navigation/native';
import { Loading } from '@components/Loading';

export function HistoryScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<IHistoryByDayDTO[]>([]);

  const toast = useToast();

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get('/history');

      if (response.status === 200) {
        setExercises(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o histórico';

      toast.show({
        title,
        placement: 'top',
        backgroundColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [fetchHistory]),
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          paddingX={8}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          renderSectionHeader={({ section }) => (
            <Heading
              fontFamily="heading"
              fontSize="md"
              color="gray.200"
              marginTop={10}
              marginBottom={3}
            >
              {section.title}
            </Heading>
          )}
          renderItem={({ item: exercise }) => (
            <HistoryCard history={exercise} />
          )}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não ha exercícios registrados ainda.{'\n'} Vamos fazer exercícios
              hoje?
            </Text>
          )}
        />
      )}
    </VStack>
  );
}
