import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {DropdownChildernType, StackNavigatorParamsList} from '../../../types';
import {showToast} from '../../../navigation/Toast';
import {ENDPOINTS} from '../../../constans';
import axios from 'axios';
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
import {yupResolver} from '@hookform/resolvers/yup';
import {investmentsSchema} from '../Auth/Schemas';
import {labels} from '../../../constans/texts';
import DropDownPicker from 'react-native-dropdown-picker';
import {fetchInvestments} from '../../DrawerScreens/Bank/BankScreen';

interface FormData {
  ChildId: number;
  Name: string;
  Points: number;
  Days: number;
}

const InvestmentLengths = [
  {
    label: '7 nap',
    value: 7,
  },
  {
    label: '14 nap',
    value: 14,
  },
  {
    label: '31 nap',
    value: 31,
  },
];

export default function AddInvestment({
  route,
  navigation,
}: StackScreenProps<StackNavigatorParamsList, 'AddInvestment'>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(investmentsSchema),
  });
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
  const [daysDropdownIsOpen, setDaysDropdownIsOpen] = useState<boolean>(false);

  const [children, setChildren] = useState<DropdownChildernType[]>([]);

  async function handleAddInvestment(data: FormData) {
    let res = await axios.post(ENDPOINTS.ADD_INVESTMENT, {
      ...data,
      //@ts-ignore
      UserId: route.params.user.Id,
    });
    if (res.data.success) {
      fetchChildren();
      fetchInvestments();
      showToast('success', res.data.message);
      navigationRef.current?.goBack();
    } else {
      showToast('error', res.data.message);
    }
  }

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
    <View style={[ContainerStyle, {alignItems: 'center'}]}>
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
        <Text style={TitleStyle}>Befektetés hozzáadása</Text>
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
              placeholder={labels.InvestmentName}
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
              placeholder={labels.Chose_Child}
              placeholderStyle={{
                fontSize: fontSize.medium,
              }}
              style={[TextInputStyle, {zIndex: 99999}]}
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
              placeholder={labels.InvestedPoints}
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

        <Controller
          name="Days"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <DropDownPicker
              placeholder={labels.Chose_Investment_Lenght}
              placeholderStyle={{
                fontSize: fontSize.medium,
              }}
              style={[TextInputStyle, {zIndex: 0}]}
              open={daysDropdownIsOpen}
              value={value}
              items={InvestmentLengths}
              setOpen={setDaysDropdownIsOpen}
              setValue={(callback: any) => onChange(callback())}
            />
          )}
        />
        {errors.Days ? (
          <Text style={errortextStyle}>{errors.Days.message}</Text>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity
        style={ButtonStyle}
        onPress={handleSubmit(handleAddInvestment)}>
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
