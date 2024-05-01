import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { SignInScreen } from '@screens/SignIn';
import { SignUpScreen } from '@screens/SignUp';

type IAuthRoutes = {
  signInScreen: undefined;
  signUpScreen: undefined;
};

/**
 * ESSA TIPAGEM VAMOS EXPORTAR PARA SER REUTILIZADAS
 * PARA QUANDO PRECISARMOS UTILIZAR ESSAS ROTAS
 */
export type IAuthNavigatorRoutesProps = NativeStackNavigationProp<IAuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<IAuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="signInScreen" component={SignInScreen} />
      <Screen name="signUpScreen" component={SignUpScreen} />
    </Navigator>
  );
}
