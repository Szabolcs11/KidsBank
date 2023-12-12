import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {palette} from '../../../../style';
import {labels} from '../../../../constans/texts';
import {navigate} from '../../../../navigation/settings';
import {authStyle} from '../authStyle';

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = () => {
    console.log('Login', username, password);
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
      <TextInput
        onChangeText={e => setUsername(e)}
        placeholder={labels.Username}
        style={authStyle.textinput}
      />
      <TextInput
        secureTextEntry
        onChangeText={e => setPassword(e)}
        placeholder={labels.Password}
        style={authStyle.textinput}
      />
      <TouchableOpacity
        onPress={() => navigate('ForgotPassword', {})}
        style={authStyle.forgotpassword}>
        <Text style={{color: palette.secondary}}>{labels.ForgotPassword}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleLogin()}
        style={authStyle.primrarybtn}>
        <Text style={{color: palette.white, fontWeight: '600'}}>
          {labels.SignIn}
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
        onPress={() => navigate('Register', {})}
        style={authStyle.primrarybtn}>
        <Text style={{color: palette.white, fontWeight: '600'}}>
          {labels.SignUp}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
