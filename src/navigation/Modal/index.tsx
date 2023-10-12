import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {palette} from '../../style';
import {StackNavigatorParamsList} from '../../types';
import {
  ModalCloseIcon,
  ModalContainer,
  ModalHeader,
  ModalTitle,
} from './ModalStyle';

export default function Modal({
  route,
  navigation,
}: StackScreenProps<StackNavigatorParamsList, 'Modal'>) {
  const {content, title} = route.params;
  return (
    <View style={ModalContainer}>
      <View style={ModalHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={ModalCloseIcon}>
          <Icon
            name="arrow-back-ios"
            type={IconType.MaterialIcons}
            size={24}
            color={palette.primary}
            style={{transform: [{rotate: '-90deg'}]}}
          />
        </TouchableOpacity>
        <Text style={ModalTitle}>{title}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{height: '85%'}}
        style={{width: '100%', height: '100%'}}>
        {content()}
      </ScrollView>
    </View>
  );
}
