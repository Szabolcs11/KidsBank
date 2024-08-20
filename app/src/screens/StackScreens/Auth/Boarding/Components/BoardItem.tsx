import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import {fontSize, palette, spacing} from '../../../../../style';
import {BoardItemProps} from '../../../../../types';

const {width} = Dimensions.get('window');

// const Images = [
//   require('./../../../../../assets/Images/boarding1.png'),
//   require('./../../../../../assets/Images/boarding2.png'),
//   require('./../../../../../assets/Images/boarding3.png'),
//   require('./../../../../../assets/Images/boarding4.png'),
//   require('./../../../../../assets/Images/boarding5.png'),
//   require('./../../../../../assets/Images/boarding6.png'),
//   require('./../../../../../assets/Images/boarding7.png'),
//   require('./../../../../../assets/Images/boarding8.png'),
// ];

const images: {[key: string]: any} = {
  boarding0: require('./../../../../../assets/Images/boarding1.png'),
  boarding1: require('./../../../../../assets/Images/boarding2.png'),
  boarding2: require('./../../../../../assets/Images/boarding3.png'),
  boarding3: require('./../../../../../assets/Images/boarding4.png'),
  boarding4: require('./../../../../../assets/Images/boarding5.png'),
  boarding5: require('./../../../../../assets/Images/boarding6.png'),
};

export default function BoardItem({item}: BoardItemProps) {
  console.log(item);
  return (
    <View
      style={{
        backgroundColor: palette.white,
        width,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{marginVertical: spacing.double}}>
        {item.id != 7 ? (
          <Image
            style={{width: 300, height: 200}}
            source={images[`boarding${item.id - 1}`!]}
          />
        ) : (
          <>
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
          </>
        )}
      </View>
      <View style={{marginVertical: spacing.double}}>
        {item.id != 7 ? (
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
        ) : (
          <></>
        )}
      </View>
      <View style={{paddingHorizontal: spacing.quadruple}}>
        <Text style={{fontSize: fontSize.medium, textAlign: 'center'}}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
}
