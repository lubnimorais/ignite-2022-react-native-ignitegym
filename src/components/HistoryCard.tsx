import { HStack, Heading, Text, VStack } from 'native-base';

export function HistoryCard() {
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
      <VStack marginRight={5}>
        <Heading fontSize="md" color="white" textTransform="capitalize">
          Costas
        </Heading>

        <Text fontSize="lg" color="gray.100" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text fontSize="md" color="gray.300">
        10:00
      </Text>
    </HStack>
  );
}
