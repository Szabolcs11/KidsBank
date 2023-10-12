import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {palette} from '../../../../../style';
import {BoardItemType} from '../../../../../types';

const {width, height} = Dimensions.get('window');

type BoardItemProps = {
  item: BoardItemType;
};

export default function BoardItem({item}: BoardItemProps) {
  return (
    <View
      style={{
        backgroundColor: palette.secondary,
        width,
        borderWidth: 2,
      }}>
      <Text>{item.title}</Text>
    </View>
  );
}
