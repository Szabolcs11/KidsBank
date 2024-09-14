import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {palette} from '../style';
import {ENDPOINTS} from '../constans';

export default function Loader() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{ENDPOINTS.AUTH}</Text>
      <ActivityIndicator size="large" color={palette.primary} />
    </View>
  );
}
