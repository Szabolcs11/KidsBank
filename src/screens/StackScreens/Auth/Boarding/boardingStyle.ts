import { StyleSheet } from "react-native";
import { fontSize, palette, spacing } from "../../../../style";

export const boardingStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    fillbackground: {
        width: '100%',
        backgroundColor: palette.white,
    },
    buttoncontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: spacing.double,
        paddingHorizontal: spacing.quadruple,
    },
    button: {
        backgroundColor: palette.primary,
        padding: spacing.double,
        paddingVertical: spacing.singlehalf,
        borderRadius: spacing.singlehalf,
    },
    buttontext: {
        color: palette.white,
        fontWeight: '600',
        fontSize: fontSize.medium,
    }
})