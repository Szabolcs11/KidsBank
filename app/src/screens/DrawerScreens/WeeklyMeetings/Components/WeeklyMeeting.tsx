import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {alignments, fontSize, palette, spacing} from '../../../../style';
import {formatDate} from '../../../../utils';

type WeeklyMeetingProps = {
  Title: string;
  Text: string;
  Date: Date;
};

export default function WeeklyMeeting(props: WeeklyMeetingProps) {
  return (
    <View style={style.container}>
      <View style={{marginVertical: spacing.half}}>
        <Text style={style.title}>{props.Title}</Text>
      </View>
      <View
        style={[
          alignments.flexRowCenter,
          {gap: spacing.single, marginVertical: spacing.half},
        ]}>
        <Icon type={IconType.AntDesign} name="calendar" size={22} />
        <Text>{formatDate(props.Date)}</Text>
      </View>
      <View>
        <Text>{props.Text}</Text>
      </View>
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
});
