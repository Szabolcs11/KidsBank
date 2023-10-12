import {
  CardStyleInterpolators,
  StackCardInterpolationProps,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {StackNavigatorParamsList, TabNavigatorParamsList} from '../types';

export const navigationRef =
  React.createRef<NavigationContainerRef<StackNavigatorParamsList>>();

export function navigate<T extends keyof StackNavigatorParamsList>(
  name: T,
  params: StackNavigatorParamsList[T],
) {
  // @ts-ignore
  navigationRef.current?.navigate(name, params);
}

export const modalOption = {
  headerShown: false,
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
  ...TransitionPresets.ModalSlideFromBottomIOS,
  cardStyleInterpolator: (props: StackCardInterpolationProps) => ({
    ...CardStyleInterpolators.forVerticalIOS(props),
    overlayStyle: {
      opacity: props.current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
      }),
    },
  }),
} as StackNavigationOptions;

export const basicScreenPreset = {
  textAlign: 'center',
  drawerInactiveTintColor: 'white',
  gestureEnabled: true,
  headerShown: false,
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  cardStyleInterpolator: (props: StackCardInterpolationProps) => ({
    ...CardStyleInterpolators.forHorizontalIOS(props),
    overlayStyle: {
      opacity: props.current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
      }),
    },
  }),
} as StackNavigationOptions;
