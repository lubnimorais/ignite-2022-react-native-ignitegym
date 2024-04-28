import { StatusBar } from 'react-native';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { NativeBaseProvider } from 'native-base';

// import { SignInScreen } from '@screens/SignIn';
import { SignUpScreen } from '@screens/SignUp';

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

      {fontsLoaded ? <SignUpScreen /> : <Loading />}
    </NativeBaseProvider>
  );
}
