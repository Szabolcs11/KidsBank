import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {Controller, set, useForm} from 'react-hook-form';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {labels} from '../../../../constans/texts';
import {navigate} from '../../../../navigation/settings';
import {palette} from '../../../../style';
import {loginSchema} from '../Schemas';
import {authStyle} from '../authStyle';
import axios from 'axios';
import {ENDPOINTS} from '../../../../constans';
import {successfullyLogin} from '../../../../navigation';
import {showToast} from '../../../../navigation/Toast';

interface FormData {
  username: string;
  password: string;
}

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: FormData) => {
    const res = await axios.post(ENDPOINTS.LOGIN, data, {
      withCredentials: true,
    });
    if (res.data.success) {
      successfullyLogin(res.data.user);
      showToast('success', res.data.message);
    } else {
      showToast('error', res.data.message);
    }
  };

  return (
    <View style={authStyle.container}>
      <View style={authStyle.header}>
        <View style={authStyle.imagecontainer}>
          <Image source={require('./../../../../assets/Images/logo.png')} />
          <Text style={authStyle.title}>{labels.AppName}</Text>
        </View>
        <Text style={authStyle.subtitle}>{labels.SignIn}</Text>
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

      <TouchableOpacity
        onPress={handleSubmit(handleLogin)}
        style={authStyle.primrarybtn}>
        <Text style={{color: palette.white, fontWeight: '600'}}>
          {labels.SignIn}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('ForgotPassword', {})}
        style={authStyle.forgotpassword}>
        <Text style={{color: palette.secondary}}>{labels.ForgotPassword}</Text>
      </TouchableOpacity>
      <View style={authStyle.flexcontainer}>
        <View style={authStyle.line}></View>
        <Text style={{color: palette.gray, fontWeight: '600'}}>
          {labels.or}
        </Text>
        <View style={authStyle.line}></View>
      </View>
      <TouchableOpacity
        onPress={() => navigate('Register', {})}
        style={authStyle.primrarybtn}>
        <Text style={{color: palette.white, fontWeight: '600'}}>
          {labels.SignUp}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
