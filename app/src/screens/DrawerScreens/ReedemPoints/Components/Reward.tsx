import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {RewardType} from '../../../../types';
import {ENDPOINTS} from '../../../../constans';
import axios from 'axios';
import {showToast} from '../../../../navigation/Toast';
import {fetchRewards} from '../ReedemPointsScreen';
import {
  ButtonStyle,
  alignments,
  fontSize,
  palette,
  spacing,
} from '../../../../style';
import {labels} from '../../../../constans/texts';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {navigate} from '../../../../navigation/settings';
import {fetchChildren} from '../../FamilyMembers/familyMembersScreen';

type RewardProps = {
  reward?: RewardType;
  isHeader?: boolean;
  isEven?: boolean;
};

export default function Reward({reward, isHeader, isEven}: RewardProps) {
  const handleDeleReward = async (id: number) => {
    let res = await axios.post(ENDPOINTS.DELETE_REWARD, {
      RewardId: id,
    });
    if (res.data.success) {
      showToast('success', res.data.message);
      fetchRewards();
    } else {
      showToast('error', res.data.message);
    }
  };

  const handleReedemReward = async (id: number) => {
    let res = await axios.post(ENDPOINTS.REDEEM_REWARD, {
      RewardId: id,
    });
    if (res.data.success) {
      showToast('success', res.data.message);
      fetchRewards();
      fetchChildren();
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
        <Text style={styles.headerColumn}>{labels.Nickname}</Text>
        <Text style={styles.headerColumn}>{labels.Reward}</Text>
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
            {reward?.Id}
          </Text>
          <Text style={styles.column}>{reward?.Name}</Text>
          <Text style={styles.column}>{reward?.ChildName}</Text>
          <Text style={styles.column}>{reward?.Points}</Text>
        </View>
        <View
          style={[
            styles.column,
            alignments.flexRow,
            alignments.justifyCenter,
            {gap: spacing.single, width: '100%', marginTop: spacing.single},
          ]}>
          <TouchableOpacity
            style={style.ReedemBtn}
            onPress={() => {
              handleReedemReward(reward!.Id);
            }}>
            <Text
              style={{
                color: palette.white,
                fontSize: fontSize.medium,
              }}>
              {labels.Reedem}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate('EditReward', {
                Reward: reward!,
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
              Alert.alert(labels.DeleteReward, labels.DeleteRewardMessage, [
                {
                  text: labels.Cancel,
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: labels.Delete,
                  onPress: () => handleDeleReward(reward!.Id),
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
    width: '100%',
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
    width: '33%',
    textAlign: 'center',
    color: palette.black,
    fontSize: 16,
  },
});

const style = StyleSheet.create({
  ReedemBtn: {
    backgroundColor: palette.primary,
    borderRadius: spacing.single,
    paddingHorizontal: spacing.half,
    paddingVertical: spacing.single,
    marginVertical: spacing.single,
    alignItems: 'center',
  },
});
