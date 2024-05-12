import { useCallback } from 'react';

import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import { Feather } from '@expo/vector-icons';

import { IAppNavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { Button } from '@components/Button';

export function ExerciseScreen() {
  const navigation = useNavigation<IAppNavigatorRoutesProps>();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <VStack flex={1}>
      <VStack backgroundColor="gray.600" paddingX={8} paddingTop={12}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          alignItems="center"
          justifyContent="space-between"
          marginTop={4}
          marginBottom={8}
        >
          <Heading flexShrink={1} fontSize="lg" color="gray.100">
            Puxada frontal Puxada frontal Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" marginLeft={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack padding={8}>
          <Image
            width="full"
            height={80}
            source={{ uri: 'https://github.com/lubnimorais.png' }}
            alt="Imagem do exercício"
            resizeMode="cover"
            marginBottom={3}
            rounded="lg"
          />

          <Box
            backgroundColor="gray.600"
            rounded="md"
            paddingX={4}
            paddingBottom={4}
          >
            <HStack
              alignItems="center"
              justifyContent="space-around"
              marginTop={5}
              marginBottom={6}
            >
              <HStack alignItems="center">
                <SeriesSvg />

                <Text color="gray.200" marginLeft="2">
                  3 séries
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepetitionsSvg />

                <Text color="gray.200" marginLeft="2">
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
