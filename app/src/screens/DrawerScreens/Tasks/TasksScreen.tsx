import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ContainerStyle, palette, spacing} from '../../../style';
import axios from 'axios';
import {ENDPOINTS, MMKV_KEYS} from '../../../constans';
import {showToast} from '../../../navigation/Toast';
import Loader from '../../../components/Loader';
import {TaskType, UserType} from '../../../types';
import {storage} from '../../../navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {navigate} from '../../../navigation/settings';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {labels} from '../../../constans/texts';
import Task from './Components/Task';

export let fetchTasks: () => void;

export default function TasksScreen() {
  let [user, setUser] = useState<UserType>(
    JSON.parse(storage.getString(MMKV_KEYS.USER)!),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  fetchTasks = async () => {
    let res = await axios.post(ENDPOINTS.GET_TASKS, {UserId: user.Id});
    if (res.data.success) {
      setIsLoading(false);
      setTasks(res.data.tasks);
    } else {
      showToast('error', res.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (tasks.length === 0) {
    return (
      <View style={[ContainerStyle, {justifyContent: 'center'}]}>
        <View style={{maxHeight: 400}}>
          <Text>Nem található feladat</Text>
        </View>
        <TouchableOpacity
          style={style.btnContainer}
          onPress={() => {
            navigate('AddTask', {});
          }}>
          <Icon type={IconType.AntDesign} name="adduser" size={22} />
          <Text style={{fontSize: 16, fontWeight: '600', color: palette.black}}>
            {labels.AddNewTask}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[ContainerStyle, {justifyContent: 'center'}]}>
      <View style={{maxHeight: 400}}>
        <FlatList
          data={tasks}
          ListHeaderComponent={() => {
            return <Task isHeader />;
          }}
          renderItem={({item, index}) => {
            return (
              <Task isEven={index % 2 === 0} task={item} isHeader={false} />
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={style.btnContainer}
        onPress={() => {
          navigate('AddTask', {});
        }}>
        <Icon type={IconType.AntDesign} name="adduser" size={22} />
        <Text style={{fontSize: 16, fontWeight: '600', color: palette.black}}>
          {labels.AddNewTask}
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
