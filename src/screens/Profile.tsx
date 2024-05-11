import { VStack } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';

export function ProfileScreen() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
    </VStack>
  );
}
