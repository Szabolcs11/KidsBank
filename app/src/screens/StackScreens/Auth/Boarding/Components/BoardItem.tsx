import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import {fontSize, palette, spacing} from '../../../../../style';
import {BoardItemProps} from '../../../../../types';

const {width} = Dimensions.get('window');

export default function BoardItem({item}: BoardItemProps) {
  return (
    <View
      style={{
        backgroundColor: palette.white,
        width,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{marginVertical: spacing.double}}>
        <Image
          style={{width: 300, height: 200}}
          source={{
            uri: 'https://th.bing.com/th/id/OIG.BfmdLOGiJaiTOcZXs4wX?pid=ImgGn',
          }}
        />
      </View>
      <View style={{marginVertical: spacing.double}}>
        <Text
          style={{
            fontSize: fontSize.xlarge + 2,
            color: palette.primary,
            fontWeight: '600',
            textAlign: 'center',
            paddingHorizontal: spacing.single,
          }}>
          {item.title}
        </Text>
      </View>
      <View style={{paddingHorizontal: spacing.quadruple}}>
        <Text style={{fontSize: fontSize.medium, textAlign: 'center'}}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
}
