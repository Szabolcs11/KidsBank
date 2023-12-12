import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useState} from 'react';
import {labels} from '../../../../constans/texts';
import {navigate} from '../../../../navigation/settings';
import {palette} from '../../../../style';
import {authStyle} from '../authStyle';

export default function RegisterScreen() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const handleRegister = () => {
    console.log('Register', username, email, password, passwordConfirm);
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
      <TextInput
        onChangeText={e => setUsername(e)}
        placeholder={labels.Username}
        style={authStyle.textinput}
      />
      <TextInput
        onChangeText={e => setEmail(e)}
        placeholder={labels.Email}
        style={authStyle.textinput}
      />
      <TextInput
        secureTextEntry
        onChangeText={e => setPassword(e)}
        placeholder={labels.Password}
        style={authStyle.textinput}
      />
      <TextInput
        secureTextEntry
        onChangeText={e => setPasswordConfirm(e)}
        placeholder={labels.PasswordConfirm}
        style={authStyle.textinput}
      />
      <TouchableOpacity
        onPress={() => handleRegister()}
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
