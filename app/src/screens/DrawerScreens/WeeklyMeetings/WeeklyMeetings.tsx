import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UserType} from '../../../types';
import {ENDPOINTS, MMKV_KEYS} from '../../../constans';
import {storage} from '../../../navigation';
import {showToast} from '../../../navigation/Toast';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {ContainerStyle, alignments, palette, spacing} from '../../../style';
import {navigate} from '../../../navigation/settings';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {labels} from '../../../constans/texts';
import WeeklyMeeting from './Components/WeeklyMeeting';

export let fetchMeetings: () => void;

export default function WeeklyMeetings() {
  let [user, setUser] = useState<UserType>(
    JSON.parse(storage.getString(MMKV_KEYS.USER)!),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weeklyMeetings, setWeeklyMeetings] = useState<any[]>([]);

  fetchMeetings = async () => {
    let res = await axios.post(ENDPOINTS.GET_WEEKLY_MEETINGS, {
      UserId: user.Id,
    });
    if (res.data.success) {
      setIsLoading(false);
      setWeeklyMeetings(res.data.meetings);
    } else {
      showToast('error', res.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <View style={[ContainerStyle]}>
      <View style={{maxHeight: '90%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={weeklyMeetings}
          renderItem={({item}) => {
            return (
              <WeeklyMeeting
                Date={new Date(item.Date)}
                Text={item.Text}
                Title={item.Title}
              />
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={style.btnContainer}
        onPress={() => {
          navigate('AddWeeklyMeeting', {});
        }}>
        <Icon type={IconType.AntDesign} name="adduser" size={22} />
        <Text style={{fontSize: 16, fontWeight: '600', color: palette.black}}>
          {labels.AddNewWeeklyMeeting}
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
});
