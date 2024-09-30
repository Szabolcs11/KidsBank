import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {DropdownChildernType, StackNavigatorParamsList} from '../../../types';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {rewardsSchema} from '../Auth/Schemas';
import axios from 'axios';
import {ENDPOINTS} from '../../../constans';
import {showToast} from '../../../navigation/Toast';
import {fetchRewards} from '../../DrawerScreens/ReedemPoints/ReedemPointsScreen';
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
import {TextInput} from 'react-native-gesture-handler';
import {labels} from '../../../constans/texts';
import DropDownPicker from 'react-native-dropdown-picker';
import {fetchDatas} from '../../DrawerScreens/Home/homeScreen';

interface FormData {
  ChildId: number;
  Name: string;
  Points: number;
}

export default function AddReward({
  route,
  navigation,
}: StackScreenProps<StackNavigatorParamsList, 'AddReward'>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(rewardsSchema),
  });
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

  const [children, setChildren] = useState<DropdownChildernType[]>([]);

  const fetchChildren = async () => {
    let res = await axios.post(ENDPOINTS.GET_FAMILY_MEMBERS, {
      //@ts-ignore
      userId: route.params.Id,
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

  const handleAddTask = async (data: FormData) => {
    let res = await axios.post(ENDPOINTS.ADD_REWARD, {
      Name: data.Name,
      Points: data.Points,
      ChildId: data.ChildId,
      //@ts-ignore
      UserId: route.params.Id,
    });
    if (res.data.success) {
      fetchRewards();
      fetchDatas();
      showToast('success', res.data.message);
      navigation.goBack();
    } else {
      showToast('error', res.data.message);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);
  return (
    <View style={[ContainerStyle, {width: '100%'}]}>
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
        <Text style={TitleStyle}>Jutalom hozzáadása</Text>
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
              placeholder={labels.RewardName}
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
          name="Points"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              placeholder={labels.RewardValue}
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
        onPress={handleSubmit(handleAddTask)}>
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
