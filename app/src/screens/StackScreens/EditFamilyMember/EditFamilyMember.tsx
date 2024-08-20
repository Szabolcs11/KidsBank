import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  BackIconStyle,
  ButtonStyle,
  ContainerStyle,
  TextInputStyle,
  TitleContainer,
  TitleStyle,
  errortextStyle,
  fontSize,
  palette,
  spacing,
} from '../../../style';
import {navigationRef} from '../../../navigation/settings';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import {labels} from '../../../constans/texts';
import axios from 'axios';
import {ENDPOINTS} from '../../../constans';
import {fetchChildren} from '../../DrawerScreens/FamilyMembers/familyMembersScreen';
import {showToast} from '../../../navigation/Toast';
import {yupResolver} from '@hookform/resolvers/yup';
import {updateFamilyMemberSchema} from '../Auth/Schemas';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigatorParamsList} from '../../../types';

interface FormData {
  nickname: string;
  birthDate: Date;
  points: number;
}

export default function EditFamilyMember({
  navigation,
  route,
}: StackScreenProps<StackNavigatorParamsList, 'EditFamilyMember'>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(updateFamilyMemberSchema),
    defaultValues: {
      birthDate: new Date(route.params.Children.BirthDate),
      nickname: route.params.Children.Nickname,
      points: route.params.Children.Points,
    },
  });
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const handleEditFamilyMember = async (data: FormData) => {
    let res = await axios.post(ENDPOINTS.UPDATE_FAMILY_MEMBER, {
      Nickname: data.nickname,
      BirthDate: data.birthDate,
      Points: data.points,
      ChildId: route.params.Children.Id,
    });
    if (res.data.success) {
      fetchChildren();
      showToast('success', res.data.message);
      navigationRef.current?.goBack();
    } else {
      showToast('error', res.data.message);
    }
  };
  return (
    <View style={ContainerStyle}>
      <View style={TitleContainer}>
        <TouchableOpacity
          onPress={() => navigationRef.current?.goBack()}
          style={BackIconStyle}>
          <Icon
            type={IconType.Ionicons}
            name="arrow-back"
            color={palette.black}
            size={fontSize.xlarge}
          />
        </TouchableOpacity>
        <Text style={TitleStyle}>Családtag módosítása</Text>
      </View>
      <View
        style={{
          width: '100%',
          marginVertical: spacing.double,
        }}>
        <Controller
          name="nickname"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={labels.Nickname}
              placeholderTextColor={palette.black}
              style={TextInputStyle}
            />
          )}
        />
        {errors.nickname ? (
          <Text style={errortextStyle}>{errors.nickname.message}</Text>
        ) : (
          <></>
        )}
        <Controller
          name="birthDate"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <DatePicker
                title={labels.SelectDate}
                cancelText={labels.Cancel}
                confirmText={labels.Save}
                modal
                mode="date"
                open={datePickerIsOpen}
                date={value}
                onConfirm={date => {
                  onChange(date);
                  setDatePickerIsOpen(false);
                }}
                onCancel={() => setDatePickerIsOpen(false)}
              />
              <TouchableOpacity
                onPress={() => setDatePickerIsOpen(true)}
                style={[
                  TextInputStyle,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: spacing.singlehalf,
                  },
                ]}>
                <Text
                  style={{
                    color: palette.black,
                  }}>
                  {value.toLocaleDateString()}
                </Text>
                <Icon
                  type={IconType.AntDesign}
                  name="calendar"
                  size={fontSize.mmedium}
                  color={palette.black}
                />
              </TouchableOpacity>
            </>
          )}
        />
        {errors.birthDate ? (
          <Text style={errortextStyle}>{errors.birthDate.message}</Text>
        ) : (
          <></>
        )}
        <Controller
          name="points"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              placeholder={labels.StarterPoints}
              keyboardType="numeric"
              style={TextInputStyle}
              placeholderTextColor={palette.black}
            />
          )}
        />
        {errors.points ? (
          <Text style={errortextStyle}>{errors.points.message}</Text>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity
        style={ButtonStyle}
        onPress={handleSubmit(handleEditFamilyMember)}>
        <Text
          style={{
            color: palette.white,
            fontSize: fontSize.mmedium,
            fontWeight: '600',
          }}>
          {labels.Modify}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
