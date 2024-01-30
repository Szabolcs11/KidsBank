import axios from 'axios';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {ENDPOINTS} from '../../../../constans';
import {labels} from '../../../../constans/texts';
import {showToast} from '../../../../navigation/Toast';
import {navigate} from '../../../../navigation/settings';
import {alignments, palette, spacing} from '../../../../style';
import {ChildrenType} from '../../../../types';
import {calculateAge} from '../../../../utils';
import {fetchChildren} from '../familyMembersScreen';

interface FamilyMemberRowProps {
  isHeader?: boolean;
  children?: ChildrenType;
  isEven?: boolean;
}

const FamilyMemberRow = ({
  isHeader,
  children,
  isEven,
}: FamilyMemberRowProps) => {
  if (isHeader) {
    return (
      <View style={[styles.headerContainer]}>
        <Text style={{width: '5%', fontWeight: '600', color: palette.black}}>
          #
        </Text>
        <Text style={styles.headerColumn}>{labels.Nickname}</Text>
        <Text style={styles.headerColumn}>{labels.Age}</Text>
        <Text style={styles.headerColumn}>{labels.Points}</Text>
        <Text style={styles.headerColumn}>{labels.Actions}</Text>
      </View>
    );
  }

  let age = calculateAge(children?.BirthDate);

  const handleDeleteFamilyMember = async (id: number) => {
    let res = await axios.post(ENDPOINTS.DELETE_FAMILY_MEMBER, {
      ChildId: children?.Id,
    });
    if (res.data.success) {
      showToast('success', res.data.message);
      fetchChildren();
    } else {
      showToast('error', res.data.message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isEven ? palette.gray : palette.white,
          marginBottom: spacing.single,
        },
      ]}>
      <Text style={{width: '5%', fontWeight: '600', color: palette.black}}>
        {children?.Id}
      </Text>
      <Text style={styles.column}>{children?.Nickname}</Text>
      <Text style={styles.column}>{age}</Text>
      <Text style={styles.column}>{children?.Points}</Text>
      <View
        style={[
          styles.column,
          alignments.flexRow,
          alignments.justifyCenter,
          {gap: spacing.single},
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigate('EditFamilyMember', {
              Children: children!,
            });
          }}>
          <Icon
            type={IconType.MaterialCommunityIcons}
            name="circle-edit-outline"
            color={palette.black}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              labels.DeleteFamilyMember,
              labels.DeleteFamilyMemberMessage,
              [
                {
                  text: labels.Cancel,
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: labels.Delete,
                  onPress: () => handleDeleteFamilyMember(children!.Id),
                },
              ],
            );
          }}>
          <Icon
            type={IconType.MaterialCommunityIcons}
            name="delete-circle-outline"
            color={palette.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FamilyMemberRow;

const styles = StyleSheet.create({
  headerContainer: {
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
    width: '22%',
    textAlign: 'center',
    color: palette.black,
    fontSize: 16,
  },
});
