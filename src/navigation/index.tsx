import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {MMKV} from 'react-native-mmkv';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {SCREENS} from '../constans';
import LoginScreen from '../screens/StackScreens/Auth/Login/loginScreen';
import RegisterScreen from '../screens/StackScreens/Auth/Register/registerScreen';
import TestScreen from '../screens/StackScreens/Test/testScreen';
import HomeScreen from '../screens/TabScreens/Home/homeScreen';
import SampleScreen from '../screens/TabScreens/Sample/sampleScreen';
import SettingsScreen from '../screens/TabScreens/Settings/settingsScreen';
import {palette} from '../style';
import {StackNavigatorParamsList, TabNavigatorParamsList} from '../types';
import Modal from './Modal';
import {basicScreenPreset, modalOption, navigationRef} from './settings';
import BoardingScreen from '../screens/StackScreens/Auth/Boarding/boardingScreen';
import ForgotPassword from '../screens/StackScreens/Auth/ForgotPassword/forgotPassword';

export const storage = new MMKV();
const Tab = createBottomTabNavigator<TabNavigatorParamsList>();
const Stack = createStackNavigator<StackNavigatorParamsList>();

export default function index() {
  const [user, setUser] = useState(false);
  const [watechedBoarding, setWatchedBoarding] = useState<boolean>(false);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = '';
    let iconType = IconType.AntDesign;
    switch (route.name) {
      case SCREENS.HOME:
        iconName = 'home';
        break;
      case SCREENS.SAMPLE:
        iconName = 'info';
        break;
      case SCREENS.SETTINGS:
        iconName = 'settings';
        iconType = IconType.Feather;
        break;
      default:
        iconName = 'error';
        iconType = IconType.MaterialIcons;
        break;
    }
    return (
      <Icon
        type={iconType}
        color={focused ? palette.primary : palette.gray}
        name={iconName}
      />
    );
  };

  const renderTabNavigation = useCallback((a: any) => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name={'Home'} component={HomeScreen} />
        <Tab.Screen
          name={'Sample'}
          component={SampleScreen}
          initialParams={{user: a.route.params.user}}
        />
        <Tab.Screen
          name={'Settings'}
          component={SettingsScreen}
          initialParams={{user: a.route.params.user}}
        />
      </Tab.Navigator>
    );
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {user ? (
          <Stack.Navigator screenOptions={basicScreenPreset}>
            <Stack.Screen
              name="TabNavigator"
              component={renderTabNavigation}
              initialParams={{user}}
            />
            <Stack.Screen
              options={{gestureEnabled: false}}
              name="Test"
              component={TestScreen}
            />
            <Stack.Screen
              name="Modal"
              options={modalOption}
              component={Modal}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={basicScreenPreset}>
            {watechedBoarding ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Boarding" component={BoardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
              </>
            )}
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast />
    </>
  );
}
