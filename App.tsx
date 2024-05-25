import { StatusBar } from 'react-native';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { NativeBaseProvider } from 'native-base';

import { Routes } from './src/routes';

import { AppProvider } from '@hooks/index';

import { Loading } from '@components/Loading';

import { THEME } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AppProvider>{fontsLoaded ? <Routes /> : <Loading />}</AppProvider>
    </NativeBaseProvider>
  );
}
