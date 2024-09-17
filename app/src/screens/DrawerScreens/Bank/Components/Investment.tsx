import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {InvestmentType} from '../../../../types';
import {alignments, fontSize, palette, spacing} from '../../../../style';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {formatDate} from '../../../../utils';
import axios from 'axios';
import {ENDPOINTS} from '../../../../constans';
import {showToast} from '../../../../navigation/Toast';
import {labels} from '../../../../constans/texts';
import {fetchInvestments} from '../BankScreen';
import {fetchChildren} from '../../FamilyMembers/familyMembersScreen';
import {fetchDatas} from '../../Home/homeScreen';

type InvestmentsProps = {
  investment: InvestmentType;
};

export default function Investment({investment}: InvestmentsProps) {
  const handleDeleteInvestment = async () => {
    const res = await axios.post(ENDPOINTS.DELETE_INVESTMENT, {
      InvestmentId: investment.Id,
    });
    if (res.data.success) {
      showToast('success', res.data.message);
      fetchChildren();
      fetchInvestments();
      fetchDatas();
    } else {
      showToast('error', res.data.message);
    }
  };
  return (
    <View style={style.container}>
      <View style={{marginVertical: spacing.half}}>
        <Text style={style.title}>{investment.Name}</Text>
      </View>
      <View>
        <Text style={style.subtitle}>{investment.ChildName}</Text>
      </View>
      <View
        style={[
          alignments.flexRowCenter,
          {gap: spacing.single, marginVertical: spacing.half},
        ]}>
        <Icon type={IconType.AntDesign} name="calendar" size={22} />
        <Text>{`${formatDate(investment.Date)} - ${formatDate(
          investment.ExpireAt,
        )} (${investment.Days} nap)`}</Text>
      </View>
      <View>
        <Text>{'Pontok: ' + investment.Points}</Text>
      </View>
      <View>
        <Text>
          {`Befektetés után:  ${Math.round(
            investment.Points * (1 + investment.Interest),
          )} ( +${investment.Interest * 100}%)`}
        </Text>
      </View>
      <TouchableOpacity
        style={style.deletestyle}
        onPress={() => {
          // handleDeleteInvestment();
          Alert.alert(
            labels.DeleteInvestment,
            labels.DeleteFamilyMemberMessage,
            [
              {
                text: labels.Cancel,
                onPress: () => {},
                style: 'cancel',
              },
              {text: labels.Delete, onPress: handleDeleteInvestment},
            ],
            {cancelable: false},
          );
        }}>
        <Icon type={IconType.AntDesign} name="delete" size={22} />
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
  subtitle: {
    fontSize: fontSize.medium,
    color: palette.black,
    // fontWeight: '600',
  },
  deletestyle: {
    position: 'absolute',
    right: spacing.double,
    bottom: spacing.double,
  },
});
