import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useState} from 'react';
import {labels} from '../../../../constans/texts';
import {navigate} from '../../../../navigation/settings';
import {palette} from '../../../../style';
import {authStyle} from '../authStyle';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {loginSchema, registerSchema} from '../Schemas';
import axios from 'axios';
import {ENDPOINTS} from '../../../../constans';
import {showToast} from '../../../../navigation/Toast';

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordagain: string;
}

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async (data: FormData) => {
    const res = await axios
      .post(ENDPOINTS.REGISTER, data, {
        withCredentials: true,
      })
      .catch(err => {
        console.log(err);
      });
    if (res?.data.success) {
      navigate('Login', {});
      showToast('success', res.data.message);
    } else {
      showToast('error', res?.data.message);
    }
  };

  return (
    <View style={authStyle.container}>
      <View style={authStyle.header}>
        <View style={authStyle.imagecontainer}>
          <Image source={require('./../../../../assets/Images/logo.png')} />
          <Text style={authStyle.title}>{labels.AppName}</Text>
        </View>
        <Text style={authStyle.subtitle}>{labels.SignUp}</Text>
      </View>
      <Controller
        name="username"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={labels.Username}
            style={authStyle.textinput}
          />
        )}
      />
      {errors.username ? (
        <Text style={authStyle.errortext}>{errors.username.message}</Text>
      ) : (
        <></>
      )}
      <Controller
        name="email"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={labels.Email}
            style={authStyle.textinput}
          />
        )}
      />
      {errors.email ? (
        <Text style={authStyle.errortext}>{errors.email.message}</Text>
      ) : (
        <></>
      )}
      <Controller
        name="password"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={labels.Password}
            style={authStyle.textinput}
            secureTextEntry
          />
        )}
      />
      {errors.password ? (
        <Text style={authStyle.errortext}>{errors.password.message}</Text>
      ) : (
        <></>
      )}
      <Controller
        name="passwordagain"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={labels.PasswordConfirm}
            style={authStyle.textinput}
            secureTextEntry
          />
        )}
      />
      {errors.password ? (
        <Text style={authStyle.errortext}>{errors.password.message}</Text>
      ) : (
        <></>
      )}
      <TouchableOpacity
        onPress={handleSubmit(handleRegister)}
        style={authStyle.primrarybtn}>
        <Text style={{color: palette.white, fontWeight: '600'}}>
          {labels.SignUp}
        </Text>
      </TouchableOpacity>
      <View style={authStyle.flexcontainer}>
        <View style={authStyle.line}></View>
        <Text style={{color: palette.gray, fontWeight: '600'}}>
          {labels.or}
        </Text>
        <View style={authStyle.line}></View>
      </View>
      <TouchableOpacity
        onPress={() => navigate('Login', {})}
        style={authStyle.primrarybtn}>
        <Text style={{color: palette.white, fontWeight: '600'}}>
          {labels.SignIn}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
