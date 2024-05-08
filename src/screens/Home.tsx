import { HStack, VStack } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';

export function HomeScreen() {
  return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack>
        <Group name="costa" />
        <Group name="ombro" />
      </HStack>
    </VStack>
  );
}
