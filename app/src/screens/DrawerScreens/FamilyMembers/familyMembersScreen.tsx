import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ContainerStyle, palette, spacing} from '../../../style';
import FamilyMemberRow from './Components/FamilyMemberRow';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {labels} from '../../../constans/texts';
import {navigate} from '../../../navigation/settings';
import {ChildrenType, UserType} from '../../../types';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {ENDPOINTS, MMKV_KEYS} from '../../../constans';
import {storage} from '../../../navigation';
import {showToast} from '../../../navigation/Toast';

export let fetchChildren: () => void;

export default function FamilyMembersScreen() {
  const [children, setChildren] = useState<ChildrenType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let [user, setUser] = useState<UserType>(
    JSON.parse(storage.getString(MMKV_KEYS.USER)!),
  );

  fetchChildren = async () => {
    let res = await axios.post(ENDPOINTS.GET_FAMILY_MEMBERS, {
      userId: user.Id,
    });
    if (res.data.success) {
      setChildren(res.data.children);
    } else {
      showToast('error', res.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={[ContainerStyle, {justifyContent: 'center'}]}>
      <View style={{maxHeight: 400}}>
        <FlatList
          data={children}
          ListHeaderComponent={() => {
            return <FamilyMemberRow isHeader />;
          }}
          renderItem={({item, index}) => {
            return <FamilyMemberRow children={item} isEven={index % 2 === 0} />;
          }}
        />
      </View>
      <TouchableOpacity
        style={style.btnContainer}
        onPress={() => {
          navigate('AddFamilyMember', {});
        }}>
        <Icon type={IconType.AntDesign} name="adduser" size={22} />
        <Text style={{fontSize: 16, fontWeight: '600', color: palette.black}}>
          {labels.AddNewFamilyMember}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  btnContainer: {
    backgroundColor: palette.secondary,
    paddingHorizontal: spacing.double,
    paddingVertical: spacing.single,
    borderRadius: spacing.single,
    flexDirection: 'row',
    gap: spacing.single,
    margin: spacing.double,
  },
});
