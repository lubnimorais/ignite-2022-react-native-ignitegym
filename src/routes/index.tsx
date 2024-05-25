import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { Box, useTheme } from 'native-base';

import { useAuth } from '@hooks/auth';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes() {
  const themeNativeBase = useTheme();

  const { user } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = themeNativeBase.colors.gray[700];

  return (
    <Box flex={1} backgroundColor="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
