import { useCallback } from 'react';

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

import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { api } from '@services/api';

import { AppError } from '@utils/AppError';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type IFormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup
    .string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password'), null], 'A confirmação da senha não confere.'),
});

export function SignUpScreen() {
  const navigation = useNavigation();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  // FUNCTIONS
  const handleGoBackNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignUp = useCallback(
    async ({ name, email, password }: IFormDataProps) => {
      try {
        const response = await api.post('/users', {
          name,
          email,
          password,
        });

        console.log(response.data);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError
          ? error.message
          : 'Não foi possível criar a conta. Tente novamente mais tarde.';

        toast.show({
          title,
          placement: 'top',
          backgroundColor: 'red.500',
        });
      }
    },
    [toast],
  );

  // END FUNCTIONS

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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Confirmar a senha"
                secureTextEntry
                returnKeyType="send"
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          marginTop={12}
          onPress={handleGoBackNavigation}
        />
      </VStack>
    </ScrollView>
  );
}
