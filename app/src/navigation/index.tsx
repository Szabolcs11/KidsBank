import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ENDPOINTS, MMKV_KEYS} from '../constans';
import BoardingScreen from '../screens/StackScreens/Auth/Boarding/boardingScreen';
import ForgotPassword from '../screens/StackScreens/Auth/ForgotPassword/forgotPassword';
import LoginScreen from '../screens/StackScreens/Auth/Login/loginScreen';
import RegisterScreen from '../screens/StackScreens/Auth/Register/registerScreen';
import AddFamilyMember from '../screens/StackScreens/AddFamilyMember/AddFamilyMember';
import {palette} from '../style';
import {StackNavigatorParamsList, UserType} from '../types';
import MainDrawer from './Drawer/index';
import Modal from './Modal';
import {basicScreenPreset, modalOption, navigationRef} from './settings';
import Loader from '../components/Loader';
import EditFamilyMember from '../screens/StackScreens/EditFamilyMember/EditFamilyMember';
import AddTask from '../screens/StackScreens/AddTask/AddTask';
import EditTask from '../screens/StackScreens/EditTask/EditTask';

export const storage = new MMKV();
const Stack = createStackNavigator<StackNavigatorParamsList>();

export let successfullyLogin: (user: UserType) => void;
export let handleSuccessfullyLogout: () => void;

export default function index() {
  const [user, setUser] = useState<UserType | false>(false);
  const [watechedBoarding, setWatchedBoarding] = useState<boolean>(
    Boolean(storage.getString(MMKV_KEYS.WATCHEDLANDINGPAGE) || false),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(ENDPOINTS.AUTH, {withCredentials: true}).then(res => {
      if (res.data.success) {
        setUser(res.data.user);
        storage.set(MMKV_KEYS.USER, JSON.stringify(res.data.user));
      } else {
        setUser(false);
      }
      setIsLoading(false);
    });
  }, []);

  successfullyLogin = (user: UserType) => {
    setUser(user);
  };

  handleSuccessfullyLogout = () => {
    setUser(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {user ? (
          <Stack.Navigator screenOptions={basicScreenPreset}>
            <Stack.Screen
              name="MainDrawer"
              component={MainDrawer}
              initialParams={{user}}
            />
            <Stack.Screen
              options={{gestureEnabled: false}}
              name="AddFamilyMember"
              initialParams={user}
              component={AddFamilyMember}
            />
            <Stack.Screen
              options={{gestureEnabled: false}}
              name="EditFamilyMember"
              component={EditFamilyMember}
            />
            <Stack.Screen
              options={{gestureEnabled: false}}
              name="AddTask"
              initialParams={user}
              component={AddTask}
            />
            <Stack.Screen
              options={{gestureEnabled: false}}
              name="EditTask"
              component={EditTask}
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
