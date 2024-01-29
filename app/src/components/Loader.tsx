import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {palette} from '../style';

export default function Loader() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={palette.primary} />
    </View>
  );
}
