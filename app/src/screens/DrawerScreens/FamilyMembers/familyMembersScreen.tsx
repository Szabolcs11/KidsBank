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
import {ContainerStyle, palette, spacing} from '../../../style';
import {ChildrenType, UserType} from '../../../types';
import FamilyMemberRow from './Components/FamilyMemberRow';

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
      <View style={{maxHeight: "86%"}}>
      <View style={style.labelContainer}>
        <Text style={{textAlign: 'center'}}>
          A Kölyök Bankban a szülők létrehozhatnak különféle feladatokat és
          pontokkal jutalmazhatják gyermekeiket. Ez a rendszer megtanítja a
          gyerekeket a felelősségvállalásra és a pénzzel való gazdálkodásra.
        </Text>
      </View>
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
    justifyContent: 'center',
    backgroundColor: palette.secondary,
    paddingHorizontal: spacing.double,
    paddingVertical: spacing.single,
    borderRadius: spacing.single,
    flexDirection: 'row',
    gap: spacing.single,
    margin: spacing.double,
  },
  labelContainer: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 14
  },
});
