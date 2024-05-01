import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base';

import { IAuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignInScreen() {
  const navigation = useNavigation<IAuthNavigatorRoutesProps>();

  const handleNewAccountNavigate = useCallback(() => {
    navigation.navigate('signUpScreen');
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} paddingX={10} paddingBottom={16}>
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
            Acesse sua conta
          </Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" />
        </Center>

        <Center marginTop={24}>
          <Text
            fontFamily="body"
            fontSize="sm"
            color="gray.100"
            marginBottom={3}
          >
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccountNavigate}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
