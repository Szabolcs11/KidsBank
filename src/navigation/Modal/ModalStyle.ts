import {Dimensions, TextStyle, ViewStyle} from 'react-native';
import { fontSize, palette, spacing } from '../../style';
const {width, height} = Dimensions.get('window');

export const ModalContainer: ViewStyle = {
    height: '100%',
    width: '100%',
    backgroundColor: palette.white,
    marginTop: height * 0.15,
    borderTopLeftRadius: spacing.triple,
    borderTopRightRadius: spacing.triple,
    padding: spacing.double,
  };
  
  export const ModalHeader: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: palette.primary,
    borderBottomWidth: 2,
    paddingBottom: spacing.double,
  };
  
  export const ModalCloseIcon: ViewStyle = {
    position: 'absolute',
    left: 0,
    height: '100%',
    justifyContent: 'center',
  };
  
  export const ModalTitle: TextStyle = {
    textAlign: 'center',
    fontSize: fontSize.mmmedium,
    color: palette.black,
    fontWeight: '800',
  };