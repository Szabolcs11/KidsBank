import React from 'react';
import {ActivityIndicator, View} from 'react-native';
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
