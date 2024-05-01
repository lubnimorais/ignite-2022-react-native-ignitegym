import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignUpScreen() {
  const navigation = useNavigation();

  const handleGoBackNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <VStack flex={1} paddingX={10} paddingBottom={14}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center marginY={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            fontFamily="heading"
            fontSize="xl"
            color="gray.100"
            marginBottom={6}
          >
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          marginTop={24}
          onPress={handleGoBackNavigation}
        />
      </VStack>
    </ScrollView>
  );
}
