import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import Loader from '../../../components/Loader';
import {ENDPOINTS, MMKV_KEYS} from '../../../constans';
import {labels} from '../../../constans/texts';
import {storage} from '../../../navigation';
import {showToast} from '../../../navigation/Toast';
import {navigate} from '../../../navigation/settings';
import {ContainerStyle, fontSize, palette, spacing} from '../../../style';
import {UserType} from '../../../types';
import Investment from './Components/Investment';

export let fetchInvestments: () => void;

export default function BankScreen() {
  let [user, setUser] = useState<UserType>(
    JSON.parse(storage.getString(MMKV_KEYS.USER)!),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [investments, setInvestments] = useState<any[]>([]);

  fetchInvestments = async () => {
    let res = await axios.post(ENDPOINTS.GET_INVESTMENTS, {
      UserId: user.Id,
    });
    if (res.data.success) {
      setIsLoading(false);
      setInvestments(res.data.investments);
    } else {
      showToast('error', res.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={[ContainerStyle]}>
      <View style={{maxHeight: '90%', width: '80%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={investments}
          renderItem={({item}) => {
            return <Investment investment={item} />;
          }}
        />
      </View>
      <TouchableOpacity
        style={style.btnContainer}
        onPress={() => {
          navigate('AddInvestment', {});
        }}>
        <Icon type={IconType.Ionicons} name="add-circle-outline" size={22} />
        <Text style={{fontSize: 16, fontWeight: '600', color: palette.black}}>
          {labels.AddNewInvestment}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    borderRadius: spacing.double,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  title: {
    fontSize: fontSize.mmmedium,
    color: palette.black,
    fontWeight: '600',
  },
  btnContainer: {
    justifyContent: 'center',
    backgroundColor: palette.secondary,
    paddingHorizontal: spacing.double,
    paddingVertical: spacing.single,
    borderRadius: spacing.single,
    flexDirection: 'row',
    gap: spacing.single,
    margin: spacing.double,
  },
});
