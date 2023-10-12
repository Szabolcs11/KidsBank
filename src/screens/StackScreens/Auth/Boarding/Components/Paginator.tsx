import {View, Text} from 'react-native';
import React from 'react';
import {palette} from '../../../../../style';

export default function Paginator({data}: any) {
  return (
    <View style={{flexDirection: 'row', height: 64}}>
      {data.map((_, i: number) => {
        return (
          <View
            key={i.toString()}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: palette.primary,
            }}
          />
        );
      })}
    </View>
  );
}
