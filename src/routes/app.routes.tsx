import { Platform } from 'react-native';

import { useTheme } from 'native-base';

import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { HomeScreen } from '@screens/Home';
import { ExerciseScreen } from '@screens/Exercise';
import { HistoryScreen } from '@screens/History';
import { ProfileScreen } from '@screens/Profile';

type IAppRoutes = {
  homeScreen: undefined;
  historyScreen: undefined;
  profileScreen: undefined;
  exerciseScreen: undefined;
};

export type IAppNavigatorRoutesProps = BottomTabNavigationProp<IAppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<IAppRoutes>();

export function AppRoutes() {
  const theme = useTheme();

  /**
   * Queremos utilizar o mesmo tamanho de altura e largura
   * para todos os ícones
   */
  const iconSize = theme.sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.green[500],
        tabBarInactiveTintColor: theme.colors.gray[200],
        tabBarStyle: {
          height: Platform.OS === 'android' ? 'auto' : 96,
          backgroundColor: theme.colors.gray[600],
          borderTopWidth: 0,
          paddingTop: theme.sizes[6],
          paddingBottom: theme.sizes[10],
        },
      }}
    >
      <Screen
        name="homeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="historyScreen"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="profileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="exerciseScreen"
        component={ExerciseScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
