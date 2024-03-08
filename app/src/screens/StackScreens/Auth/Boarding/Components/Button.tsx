import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BoardingButtonProps} from '../../../../../types';
import {boardingStyle} from '../boardingStyle';
import {palette, spacing} from '../../../../../style';
import {labels} from '../../../../../constans/texts';

export default function Button({
  last,
  scrollToNext,
  endOfBoarding,
  handleNavigateToLogin,
}: BoardingButtonProps) {
  return (
    <View style={boardingStyle.buttoncontainer}>
      {last ? (
        <View
          style={{
            flexDirection: 'row',
            gap: spacing.half,
            position: 'absolute',
            top: -100,
          }}>
          <Text>{labels.AlreadyHaveAnAccount}</Text>
          <TouchableOpacity onPress={() => handleNavigateToLogin()}>
            <Text style={{color: palette.secondary}}>{labels.SignIn}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <TouchableOpacity
        onPress={() => {
          last ? endOfBoarding() : scrollToNext();
        }}
        style={boardingStyle.button}>
        <Text style={boardingStyle.buttontext}>
          {last ? labels.SignUp : labels.Next}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
