import { Dimensions, StyleSheet } from "react-native";
import { fontSize, palette, spacing } from "./../../../style";

const {width, height} = Dimensions.get('window');

export const authStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: palette.palegray,
    },
    title: {
        fontSize: fontSize.xxlarge,
        color: palette.primary,
        marginBottom: spacing.singlehalf,
    },
    subtitle: {
        fontSize: fontSize.mmmedium,
        color: palette.black,
        marginBottom: spacing.double,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagecontainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.quadruple,
        gap: spacing.double,
    },
    textinput: {
        borderColor: palette.gray,
        borderWidth: 1,
        borderRadius: spacing.single,
        width: '90%',
        color: palette.gray,
        paddingHorizontal: spacing.single,  
        marginVertical: spacing.single,
        height: spacing.quintruple
    },
    forgotpassword: {
        fontSize: fontSize.small,
        marginVertical: spacing.singlehalf,
    },
    primrarybtn: {
        backgroundColor: palette.primary,
        borderRadius: spacing.single,
        justifyContent: 'center',
        paddingHorizontal: spacing.doublehalf,
        paddingVertical: spacing.singlehalf,
        marginVertical: spacing.double
    },
    flexcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.single,
    },
    line: {
        height: 2,
        width: (width / 2)-spacing.quintruple,
        backgroundColor: palette.gray
    }
});