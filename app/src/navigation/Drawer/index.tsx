import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import BankScreen from '../../screens/Bank/BankScreen';
import FamilyMembersScreen from '../../screens/TabScreens/FamilyMembers/familyMembersScreen';
import HomeScreen from '../../screens/TabScreens/Home/homeScreen';
import ReedemPointsScreen from '../../screens/TabScreens/ReedemPoints/ReedemPointsScreen';
import TasksScreen from '../../screens/TabScreens/Tasks/TasksScreen';
import WeeklyMeetings from '../../screens/TabScreens/WeeklyMeetings/WeeklyMeetings';
import {palette, spacing} from '../../style';
import {DrawerNavigatorParamsList} from '../../types';
import CustomDrawer from './CustomDrawer';
import {drawerItemStyle} from './style';

const Drawer = createDrawerNavigator<DrawerNavigatorParamsList>();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      screenOptions={{
        headerTintColor: palette.white,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: palette.primary,
        },
        headerTitleStyle: {
          color: palette.white,
        },
        drawerStyle: {
          borderTopRightRadius: spacing.double,
          borderBottomRightRadius: spacing.double,
          width: '70%',
        },
        drawerActiveTintColor: palette.secondary,
        drawerActiveBackgroundColor: 'transparent',
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{...(drawerItemStyle as any)}}
      />
      <Drawer.Screen
        name="FamilyMembers"
        component={FamilyMembersScreen}
        options={{...(drawerItemStyle as any)}}
      />
      <Drawer.Screen
        name="Tasks"
        component={TasksScreen}
        options={{...(drawerItemStyle as any)}}
      />
      <Drawer.Screen
        name="WeeklyMeetings"
        component={WeeklyMeetings}
        options={{...(drawerItemStyle as any)}}
      />
      <Drawer.Screen
        name="RedeemPoints"
        component={ReedemPointsScreen}
        options={{...(drawerItemStyle as any)}}
      />
      <Drawer.Screen
        name="Bank"
        component={BankScreen}
        options={{...(drawerItemStyle as any)}}
      />
    </Drawer.Navigator>
  );
}
