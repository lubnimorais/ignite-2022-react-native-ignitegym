import { useCallback, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';

import { IAuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { useAuth } from '@hooks/auth';

import { AppError } from '@utils/AppError';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type IFormData = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

export function SignInScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const navigation = useNavigation<IAuthNavigatorRoutesProps>();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(signInSchema),
  });

  const handleNewAccountNavigate = useCallback(() => {
    navigation.navigate('signUpScreen');
  }, [navigation]);

  const handleSignIn = useCallback(
    async ({ email, password }: IFormData) => {
      try {
        setIsLoading(true);

        await signIn({ email, password });
      } catch (error) {
        const isAppError = error instanceof AppError;

        const title = isAppError
          ? error.message
          : 'Não foi possível entrar. Tente novamente mais tarde.';

        setIsLoading(false);

        toast.show({
          title,
          placement: 'top',
          backgroundColor: 'red.500',
        });
      }
    },
    [signIn, toast],
  );

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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Acessar"
            isLoading={isLoading}
            onPress={handleSubmit(handleSignIn)}
          />
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
