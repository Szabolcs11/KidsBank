import {Dimensions, TextStyle, ViewStyle} from 'react-native';
const {width, height} = Dimensions.get('window');

const unit=8;

export const palette = {
    primary: '#6423e6',
    secondary: '#f59019',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#9E9FA5',
    palegray: '#F2F7FB',
    red: '#FF0000',
};

  export const spacing = {
    half: unit/2,
    single: unit,
    singlehalf: unit*1.5,
    double: unit*2,
    doublehalf: unit*2.5,
    triple: unit*3,
    quadruple: unit*4,
    quintruple: unit*5,
    sixfold: unit*6,
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

export const ContainerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: palette.palegray,
    alignItems: 'center',
    padding: spacing.single,
    height: "100%"
};

export const TitleContainer: ViewStyle = {
  borderBottomWidth: 2,
  borderBottomColor: palette.gray,
  width,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};

export const TitleStyle: TextStyle = {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: palette.black,
    textAlign: 'center',
    padding: spacing.double,
};

export const BackIconStyle: ViewStyle = {
    position: 'absolute',
    left: spacing.single,
};

export const TextInputStyle: TextStyle = {
    fontSize: fontSize.medium,
    color: palette.black,
    padding: spacing.single,
    borderColor: palette.gray,
    borderWidth: 1,
    borderRadius: spacing.single,
    marginVertical: spacing.single,
};

export const ButtonStyle: ViewStyle = {
    backgroundColor: palette.primary,
    borderRadius: spacing.single,
    paddingHorizontal: spacing.doublehalf,
    paddingVertical: spacing.singlehalf,
    marginVertical: spacing.single,
    alignItems: 'center',
};

export const errortextStyle: TextStyle = {
    color: palette.red,
    fontSize: fontSize.small,
};

export const alignments = {
  centerBasic: {
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  flexRow: {
    flexDirection: 'row',
  } as ViewStyle,
  justifyCenter: {
    justifyContent: 'center',
  } as ViewStyle,
}