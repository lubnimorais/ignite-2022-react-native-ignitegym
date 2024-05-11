import { useState } from 'react';

import { Heading, SectionList, Text, VStack } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';

export function HistoryScreen() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.2022',
      data: ['Puxada Frontal', 'Remada unilateral'],
    },
    {
      title: '27.08.2022',
      data: ['Puxada Frontal'],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        paddingX={8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        renderSectionHeader={({ section }) => (
          <Heading
            fontSize="md"
            color="gray.200"
            marginTop={10}
            marginBottom={3}
          >
            {section.title}
          </Heading>
        )}
        renderItem={({ item: exercise }) => <HistoryCard />}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não ha exercícios registrados ainda.{'\n'} Vamos fazer exercícios
            hoje?
          </Text>
        )}
      />
    </VStack>
  );
}
