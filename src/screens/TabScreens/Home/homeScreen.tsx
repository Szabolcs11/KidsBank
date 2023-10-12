import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {navigate} from '../../../navigation/settings';
import {fontSize, palette, spacing} from '../../../style';
import Toast from 'react-native-toast-message';
import {showToast} from '../../../navigation/Toast';

export default function HomeScreen() {
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
