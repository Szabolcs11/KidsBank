import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {alignments, fontSize, palette, spacing} from '../../../../style';
import {labels} from '../../../../constans/texts';
import {navigate, navigationRef} from '../../../../navigation/settings';
import {TaskType} from '../../../../types';
import axios from 'axios';
import {ENDPOINTS} from '../../../../constans';
import {showToast} from '../../../../navigation/Toast';
import {fetchTasks} from '../TasksScreen';
import {formatDate} from '../../../../utils';

interface TaskProps {
  isHeader?: boolean;
  task?: TaskType;
  isEven?: boolean;
}

export default function Task({isEven, isHeader, task}: TaskProps) {
  const handleDeleteTask = async (id: number) => {
    let res = await axios.post(ENDPOINTS.DELETE_TASK, {
      TaskId: id,
    });
    if (res.data.success) {
      showToast('success', res.data.message);
      fetchTasks();
    } else {
      showToast('error', res.data.message);
    }
  };

  if (isHeader) {
    return (
      <View style={styles.headerContainer}>
        <Text style={{width: '5%', fontWeight: '600', color: palette.black}}>
          #
        </Text>
        <Text style={styles.headerColumn}>{labels.TaskName}</Text>
        <Text style={styles.headerColumn}>{labels.Child}</Text>
        <Text style={styles.headerColumn}>{labels.Deadline}</Text>
        <Text style={styles.headerColumn}>{labels.Points}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isEven ? palette.gray : palette.white,
          marginBottom: spacing.single,
        },
      ]}>
      <View>
        <View style={alignments.flexRow}>
          <Text style={{width: '5%', fontWeight: '600', color: palette.black}}>
            {task?.Id}
          </Text>
          <Text style={styles.column}>{task?.Name}</Text>
          <Text style={styles.column}>{task?.ChildName}</Text>
          <Text style={styles.column}>
            {formatDate(new Date(task!.Deadline))}
          </Text>
          <Text style={styles.column}>{task?.Points}</Text>
        </View>
        <View
          style={[
            styles.column,
            alignments.flexRow,
            alignments.justifyCenter,
            {gap: spacing.single, width: '100%', marginTop: spacing.single},
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigate('EditTask', {
                Task: task!,
              });
            }}>
            <Icon
              type={IconType.MaterialCommunityIcons}
              name="circle-edit-outline"
              size={fontSize.xlarge}
              color={palette.black}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(labels.DeleteTask, labels.DeleteTaskMessage, [
                {
                  text: labels.Cancel,
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: labels.Delete,
                  onPress: () => handleDeleteTask(task!.Id),
                },
              ]);
            }}>
            <Icon
              type={IconType.MaterialCommunityIcons}
              name="delete-circle-outline"
              color={palette.black}
              size={fontSize.xlarge}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.half,
    marginBottom: spacing.singlehalf,
    borderBottomColor: palette.black,
    borderBottomWidth: 2,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: palette.gray,
    paddingVertical: spacing.half,
    paddingHorizontal: spacing.half,
    borderRadius: spacing.half,
  },
  headerColumn: {
    width: '23%',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: palette.black,
  },
  column: {
    width: '24%',
    textAlign: 'center',
    color: palette.black,
    fontSize: 16,
  },
});
