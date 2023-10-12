import {Dimensions, TextStyle, ViewStyle} from 'react-native';
const {width, height} = Dimensions.get('window');

const unit=8;

export const palette = {
    primary: '#2596BE',
    secondary: '#f59019',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#9E9FA5',
    palegray: '#F2F7FB',
};

  export const spacing = {
    half: unit/2,
    single: unit,
    singlehalf: unit*1.5,
    double: unit*2,
    doublehalf: unit*2.5,
    triple: unit*3,
    quadruple: unit*4,
  };
  export const fontSize = {
    small: 12,
    ssmall: 14,
    medium: 16,
    mmedium: 18,
    mmmedium: 20,
    large: 24,
    xlarge: 26,
    xxlarge: 32,
    xxxlarge: 68,
  };