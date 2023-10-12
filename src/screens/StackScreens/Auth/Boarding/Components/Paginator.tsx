import React from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {palette, spacing} from '../../../../../style';
import {BoardingPaginatorProps} from '../../../../../types';

const {width} = Dimensions.get('window');

export default function Paginator({data, scrollX}: BoardingPaginatorProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 48,
        backgroundColor: palette.white,
        justifyContent: 'center',
        gap: spacing.single,
      }}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i.toString()}
            style={{
              width: dotWidth,
              height: 12,
              borderRadius: 6,
              opacity,
              backgroundColor: palette.primary,
            }}
          />
        );
      })}
    </View>
  );
}
