import { IHistoryDTO } from '@dtos/HistoryDTO';
import { HStack, Heading, Text, VStack } from 'native-base';

interface IHistoryCardProps {
  history: IHistoryDTO;
}

export function HistoryCard({ history }: IHistoryCardProps) {
  return (
    <HStack
      width="full"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="gray.600"
      paddingX={5}
      paddingY={4}
      marginBottom={3}
      rounded="md"
    >
      <VStack flex={1} marginRight={5}>
        <Heading
          fontFamily="heading"
          fontSize="md"
          color="white"
          textTransform="capitalize"
          numberOfLines={1}
        >
          {history.group}
        </Heading>

        <Text fontSize="lg" color="gray.100" numberOfLines={1}>
          {history.name}
        </Text>
      </VStack>

      <Text fontSize="md" color="gray.300">
        {history.hour}
      </Text>
    </HStack>
  );
}
