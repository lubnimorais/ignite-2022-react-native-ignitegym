import { Image, VStack } from "native-base";

import backgroundImg from '@assets/background.png'

export function SignInScreen() {
  return (
    <VStack flex={1} backgroundColor="gray.700">
      <Image
        source={backgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />

    </VStack>
  )
}