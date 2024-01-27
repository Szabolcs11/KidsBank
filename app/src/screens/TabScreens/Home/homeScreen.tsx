import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ENDPOINTS} from '../../../constans';
import {handleSuccessfullyLogout} from '../../../navigation';
import {showToast} from '../../../navigation/Toast';
import {navigate} from '../../../navigation/settings';
import {fontSize, palette, spacing} from '../../../style';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamsList} from '../../../types';

export default function HomeScreen() {
  const navigator =
    useNavigation<DrawerNavigationProp<DrawerNavigatorParamsList>>();
  const handleLogout = () => {
    axios.post(ENDPOINTS.LOGOUT, {}, {withCredentials: true}).then(res => {
      if (res.data.success) {
        handleSuccessfullyLogout();
        showToast('success', res.data.message);
      } else {
        showToast('error', res.data.message);
      }
    });
  };
  return (
    <View style={{gap: spacing.single, alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <TouchableOpacity
        style={{
          width: 200,
          height: 125,
          backgroundColor: palette.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigate('Test', {test: 'asd'})}>
        <Text>Stack Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 200,
          height: 125,
          backgroundColor: palette.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() =>
          navigate('Modal', {
            content: () => <ModalContent />,
            title: 'Modal Title',
          })
        }>
        <Text>Modal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 200,
          height: 125,
          backgroundColor: palette.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => showToast('error', 'asd')}>
        <Text>Toast</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 200,
          height: 125,
          backgroundColor: palette.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => handleLogout()}>
        <Text>Kijelentkezés</Text>
      </TouchableOpacity>
    </View>
  );
}

const ModalContent = () => {
  return (
    <View>
      <Text style={{color: palette.black, fontSize: fontSize.medium}}>
        asdasd
      </Text>
    </View>
  );
};
