import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RewardType, UserType} from '../../../types';
import {ENDPOINTS, MMKV_KEYS} from '../../../constans';
import {storage} from '../../../navigation';
import axios from 'axios';
import {showToast} from '../../../navigation/Toast';
import {navigate} from '../../../navigation/settings';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {labels} from '../../../constans/texts';
import {ContainerStyle, palette, spacing} from '../../../style';
import Loader from '../../../components/Loader';
import Reward from './Components/Reward';

export let fetchRewards: () => void;

export default function ReedemPointsScreen() {
  let [user, setUser] = useState<UserType>(
    JSON.parse(storage.getString(MMKV_KEYS.USER)!),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rewards, setRewards] = useState<RewardType[]>([]);

  fetchRewards = async () => {
    let res = await axios.post(ENDPOINTS.GET_REWARDS, {UserId: user.Id});
    if (res.data.success) {
      setIsLoading(false);
      setRewards(res.data.rewards);
    } else {
      showToast('error', res.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (rewards.length === 0) {
    return (
      <View style={[ContainerStyle, {justifyContent: 'center'}]}>
        <View style={{maxHeight: 400}}>
          <Text>Nem található jutalom</Text>
        </View>
        <TouchableOpacity
          style={style.btnContainer}
          onPress={() => {
            navigate('AddReward', {});
          }}>
          <Icon type={IconType.FontAwesome} name="tasks" size={22} />
          <Text style={{fontSize: 16, fontWeight: '600', color: palette.black}}>
            {labels.AddNewReward}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[ContainerStyle, {justifyContent: 'center'}]}>
      <View style={style.labelContainer}>
        <Text style={{textAlign: 'center'}}>
          A gyerekek a kemény munkával megkeresett pontjukat beválthatják
          különféle tárgyakra. A csokitól a játékokig bármire, természetesen
          amit a szülő is jóváhagy.
        </Text>
      </View>
      <View style={{maxHeight: 400}}>
        <FlatList
          data={rewards}
          ListHeaderComponent={() => <Reward isHeader />}
          renderItem={({item}) => {
            return <Reward reward={item} />;
          }}
        />
      </View>
      <TouchableOpacity
        style={style.btnContainer}
        onPress={() => {
          navigate('AddReward', {});
        }}>
        <Icon type={IconType.FontAwesome} name="tasks" size={22} />
        <Text style={{fontSize: 16, fontWeight: '600', color: palette.black}}>
          {labels.AddNewReward}
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
  labelContainer: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: 25,
  },
});
