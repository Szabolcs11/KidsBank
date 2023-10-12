import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BoardingButtonProps} from '../../../../../types';
import {boardingStyle} from '../boardingStyle';

export default function Button({
  last,
  scrollToNext,
  endOfBoarding,
}: BoardingButtonProps) {
  return (
    <View style={boardingStyle.buttoncontainer}>
      <TouchableOpacity
        onPress={() => {
          last ? endOfBoarding() : scrollToNext();
        }}
        style={boardingStyle.button}>
        <Text style={boardingStyle.buttontext}>
          {last ? 'Sing Up' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
