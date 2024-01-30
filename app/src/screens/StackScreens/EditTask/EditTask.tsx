import {yupResolver} from '@hookform/resolvers/yup';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
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
import {DropdownChildernType, StackNavigatorParamsList} from '../../../types';
import {fetchTasks} from '../../DrawerScreens/Tasks/TasksScreen';
import {tasksSchema} from '../Auth/Schemas';

interface FormData {
  ChildId: number;
  Name: string;
  Deadline: Date;
  Points: number;
}

export default function EditTask({
  navigation,
  route,
}: StackScreenProps<StackNavigatorParamsList, 'EditTask'>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(tasksSchema),
    defaultValues: {
      Deadline: new Date(route.params.Task.Deadline),
      Name: route.params.Task.Name,
      Points: route.params.Task.Points,
      ChildId: route.params.Task.ChildId,
    },
  });

  const [datePickerIsOpen, setDatePickerIsOpen] = useState<boolean>(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

  const [children, setChildren] = useState<DropdownChildernType[]>([]);

  const handleEditTask = async (data: FormData) => {
    let res = await axios.post(ENDPOINTS.UPDATE_TASK, {
      TaskName: data.Name,
      Deadline: data.Deadline,
      Points: data.Points,
      ChildId: data.ChildId,
      TaskId: route.params.Task.Id,
    });
    if (res.data.success) {
      showToast('success', res.data.message);
      fetchTasks();
      navigationRef.current?.goBack();
    } else {
      showToast('error', res.data.message);
    }
  };

  const fetchChildren = async () => {
    let res = await axios.post(ENDPOINTS.GET_FAMILY_MEMBERS, {
      //@ts-ignore
      userId: route.params.user.Id,
    });
    if (res.data.success) {
      res.data.children.forEach((child: DropdownChildernType) => {
        child.label = child.Nickname;
        child.value = child.Id;
      });
      setChildren(res.data.children);
    } else {
      showToast('error', res.data.message);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

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
        <Text style={TitleStyle}>Feladat módosítása</Text>
      </View>
      <View
        style={{
          width: '100%',
          marginVertical: spacing.double,
        }}>
        <Controller
          name="Name"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              placeholder={labels.TaskName}
              style={TextInputStyle}
              placeholderTextColor={palette.black}
            />
          )}
        />
        {errors.Name ? (
          <Text style={errortextStyle}>{errors.Name.message}</Text>
        ) : (
          <></>
        )}
        <Controller
          name="ChildId"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <DropDownPicker
              placeholder="Válassz gyermeket"
              placeholderStyle={{
                fontSize: fontSize.medium,
              }}
              style={TextInputStyle}
              open={dropdownIsOpen}
              value={value}
              items={children}
              setOpen={setDropdownIsOpen}
              setValue={(callback: any) => onChange(callback())}
            />
          )}
        />
        {errors.ChildId ? (
          <Text style={errortextStyle}>{errors.ChildId.message}</Text>
        ) : (
          <></>
        )}
        <Controller
          name="Deadline"
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
        {errors.Deadline ? (
          <Text style={errortextStyle}>{errors.Deadline.message}</Text>
        ) : (
          <></>
        )}

        <Controller
          name="Points"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              placeholder={labels.TaskValue}
              keyboardType="numeric"
              style={TextInputStyle}
              placeholderTextColor={palette.black}
            />
          )}
        />
        {errors.Points ? (
          <Text style={errortextStyle}>{errors.Points.message}</Text>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity
        style={ButtonStyle}
        onPress={handleSubmit(handleEditTask)}>
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
