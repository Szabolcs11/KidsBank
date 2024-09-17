import {yupResolver} from '@hookform/resolvers/yup';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {ENDPOINTS} from '../../../constans';
import {labels} from '../../../constans/texts';
import {showToast} from '../../../navigation/Toast';
import {navigationRef} from '../../../navigation/settings';
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
import {StackNavigatorParamsList} from '../../../types';
import {fetchMeetings} from '../../DrawerScreens/WeeklyMeetings/WeeklyMeetings';
import {weeklyMeetingsSchema} from '../Auth/Schemas';
import {fetchDatas} from '../../DrawerScreens/Home/homeScreen';

interface FormData {
  Title: string;
  Text: string;
  Date: Date;
}

export default function AddWeeklyMeeting({
  route,
  navigation,
}: StackScreenProps<StackNavigatorParamsList, 'AddWeeklyMeeting'>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(weeklyMeetingsSchema),
    defaultValues: {
      Date: new Date(),
    },
  });
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);

  const handleAddWeeklyMeeting = async (data: FormData) => {
    const res = await axios.post(ENDPOINTS.ADD_WEEKLY_MEETING, {
      Title: data.Title,
      Text: data.Text,
      Date: data.Date,
      //@ts-ignore
      UserId: route.params.Id,
    });
    if (res.data.success) {
      fetchMeetings();
      fetchDatas();
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
        <Text style={TitleStyle}>Heti megbeszélés hozzáadása</Text>
      </View>
      <View
        style={{
          width: '100%',
          marginVertical: spacing.double,
        }}>
        <Controller
          name="Title"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={labels.Title}
              placeholderTextColor={palette.black}
              style={TextInputStyle}
            />
          )}
        />
        {errors.Title ? (
          <Text style={errortextStyle}>{errors.Title.message}</Text>
        ) : (
          <></>
        )}
        <Controller
          name="Text"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={labels.Text}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={4}
              placeholderTextColor={palette.black}
              style={TextInputStyle}
            />
          )}
        />
        {errors.Text ? (
          <Text style={errortextStyle}>{errors.Text.message}</Text>
        ) : (
          <></>
        )}
        <Controller
          name="Date"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <DatePicker
                title={labels.Meeting_Date}
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
        {errors.Date ? (
          <Text style={errortextStyle}>{errors.Date.message}</Text>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity
        style={ButtonStyle}
        onPress={handleSubmit(handleAddWeeklyMeeting)}>
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
