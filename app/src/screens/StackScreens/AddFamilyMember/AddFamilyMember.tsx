import {View, Text, TouchableOpacity, TextInput} from 'react-native';
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
import DatePicker from 'react-native-date-picker';
import {labels} from '../../../constans/texts';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {familyMembersSchema} from '../Auth/Schemas';
import axios from 'axios';
import {ENDPOINTS} from '../../../constans';
import {StackNavigatorParamsList, UserType} from '../../../types';
import {StackScreenProps} from '@react-navigation/stack';
import {showToast} from '../../../navigation/Toast';
import {fetchChildren} from '../../DrawerScreens/FamilyMembers/familyMembersScreen';

interface FormData {
  nickname: string;
  birthDate: Date;
  points: number;
}

interface AddFamilyMemberProps {
  user: UserType;
}

// export default function AddFamilyMember({user}: AddFamilyMemberProps) {
export default function AddFamilyMember({
  route,
  navigation,
}: StackScreenProps<StackNavigatorParamsList, 'AddFamilyMember'>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(familyMembersSchema),
    defaultValues: {
      birthDate: new Date(),
    },
  });
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);

  const handleAddFamilyMember = async (data: FormData) => {
    const res = await axios.post(ENDPOINTS.ADD_FAMILY_MEMBER, {
      nickname: data.nickname,
      birthDate: data.birthDate,
      points: data.points,
      //@ts-ignore
      userId: route.params.Id,
    });
    if (res.data.success) {
      fetchChildren();
      showToast('success', 'Sikeresen hozzáadva');
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
        <Text style={TitleStyle}>Családtag hozzáadása</Text>
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
        onPress={handleSubmit(handleAddFamilyMember)}>
        <Text
          style={{
            color: palette.white,
            fontSize: fontSize.mmedium,
            fontWeight: '600',
          }}>
          {labels.Save}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
