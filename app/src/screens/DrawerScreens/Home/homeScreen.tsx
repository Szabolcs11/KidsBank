import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Loader from '../../../components/Loader';
import {ENDPOINTS, MMKV_KEYS} from '../../../constans';
import {labels} from '../../../constans/texts';
import {handleSuccessfullyLogout, storage} from '../../../navigation';
import {showToast} from '../../../navigation/Toast';
import {fontSize, palette, spacing} from '../../../style';
import {
  ChildrenType,
  DrawerNavigatorParamsList,
  RewardType,
  TaskType,
  UserType,
} from '../../../types';
import Investment from '../Bank/Components/Investment';
import FamilyMemberRow from '../FamilyMembers/Components/FamilyMemberRow';
import Reward from '../ReedemPoints/Components/Reward';
import Task from '../Tasks/Components/Task';
import WeeklyMeeting from '../WeeklyMeetings/Components/WeeklyMeeting';

export let fetchDatas: () => void;

export default function HomeScreen() {
  let [user, setUser] = useState<UserType>(
    JSON.parse(storage.getString(MMKV_KEYS.USER)!),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [children, setChildren] = useState<ChildrenType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [weeklyMeetings, setWeeklyMeetings] = useState<any[]>([]);
  const [rewards, setRewards] = useState<RewardType[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);

  const navigator =
    useNavigation<DrawerNavigationProp<DrawerNavigatorParamsList>>();
  const handleLogout = () => {
    axios.post(ENDPOINTS.LOGOUT, {}, {withCredentials: true}).then(res => {
      if (res.data.success) {
        handleSuccessfullyLogout();
        showToast('success', res.data.message);
      } else {
        showToast('error', res.data.message);
      }
    });
  };

  const fetchTasks = async () => {
    let res = await axios.post(ENDPOINTS.GET_TASKS, {UserId: user.Id});
    if (res.data.success) {
      setIsLoading(false);
      setTasks(res.data.tasks);
    } else {
      showToast('error', res.data.message);
      setIsLoading(false);
    }
  };

  const fetchChildren = async () => {
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

  const fetchMeetings = async () => {
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

  const fetchRewards = async () => {
    let res = await axios.post(ENDPOINTS.GET_REWARDS, {UserId: user.Id});
    if (res.data.success) {
      setIsLoading(false);
      setRewards(res.data.rewards);
    } else {
      showToast('error', res.data.message);
      setIsLoading(false);
    }
  };

  const fetchInvestments = async () => {
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

  fetchDatas = async () => {
    fetchChildren();
    fetchTasks();
    fetchMeetings();
    fetchRewards();
    fetchInvestments();
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    // <SectionList
    //   sections={sections}
    //   keyExtractor={(item, index) => index.toString()}
    //   renderSectionHeader={({section: {title}}) => (
    //     <View style={style.section}>
    //       <Text style={style.title}>{title}</Text>
    //     </View>
    //   )}
    //   renderItem={({item, index, section}) =>
    //     section!.renderItem({item, index})
    //   }
    //   stickySectionHeadersEnabled={false} // Adjust as needed
    //   contentContainerStyle={{gap: spacing.double, alignItems: 'center'}}
    //   style={{marginBottom: spacing.double}}
    // />
    <ScrollView
      contentContainerStyle={{
        gap: spacing.double,
        alignItems: 'center',
        marginVertical: spacing.double,
      }}
      style={{marginBottom: spacing.double, flex: 1}}
      nestedScrollEnabled={true}>
      <View style={style.section}>
        <Text style={style.title}>{labels.FamilyMembers}</Text>
        <FlatList
          scrollEnabled={true}
          nestedScrollEnabled={true}
          data={children}
          ListHeaderComponent={() => {
            return <FamilyMemberRow isHeader />;
          }}
          renderItem={({item, index}) => {
            return <FamilyMemberRow children={item} isEven={index % 2 === 0} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={style.section}>
        <Text style={style.title}>{labels.TaskList}</Text>
        <FlatList
          scrollEnabled={true}
          nestedScrollEnabled={true}
          data={tasks}
          ListHeaderComponent={() => {
            return <Task isHeader />;
          }}
          renderItem={({item, index}) => {
            return (
              <Task isEven={index % 2 === 0} task={item} isHeader={false} />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={style.section}>
        <Text style={style.title}>{labels.Reward}</Text>
        <FlatList
          scrollEnabled={true}
          nestedScrollEnabled={true}
          data={rewards}
          ListHeaderComponent={() => <Reward isHeader />}
          renderItem={({item}) => {
            return <Reward reward={item} />;
          }}
        />
      </View>
      <View style={style.section}>
        <Text style={style.title}>{labels.WeeklyMeetings}</Text>
        <FlatList
          scrollEnabled={true}
          nestedScrollEnabled={true}
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
      <View style={style.section}>
        <Text style={style.title}>{labels.Bank}</Text>
        <FlatList
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={investments}
          renderItem={({item}) => {
            return <Investment investment={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
}

const ModalContent = () => {
  return (
    <View>
      <Text style={{color: palette.black, fontSize: fontSize.medium}}>
        asdasd
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  section: {
    width: '95%',
    padding: spacing.single,
    backgroundColor: palette.white,
    borderRadius: spacing.single,
    // elevation: 2,
    marginHorizontal: spacing.double,
    maxHeight: 250,
  },
  title: {
    fontSize: fontSize.mmmedium,
    color: palette.black,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.single,
  },
});
