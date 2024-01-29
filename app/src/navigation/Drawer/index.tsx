import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import BankScreen from '../../screens/DrawerScreens/Bank/BankScreen';
import FamilyMembersScreen from '../../screens/DrawerScreens/FamilyMembers/familyMembersScreen';
import HomeScreen from '../../screens/DrawerScreens/Home/homeScreen';
import ReedemPointsScreen from '../../screens/DrawerScreens/ReedemPoints/ReedemPointsScreen';
import TasksScreen from '../../screens/DrawerScreens/Tasks/TasksScreen';
import WeeklyMeetings from '../../screens/DrawerScreens/WeeklyMeetings/WeeklyMeetings';
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
          borderBottomLeftRadius: spacing.double,
          borderBottomRightRadius: spacing.double,
          backgroundColor: palette.primary,
        },
        headerTitleStyle: {
          color: palette.white,
        },
        drawerStyle: {
          borderTopRightRadius: spacing.double,
          borderBottomRightRadius: spacing.double,
          width: '70%',
          backgroundColor: palette.primary,
        },
        drawerInactiveTintColor: palette.white,
        drawerActiveTintColor: palette.white,
        drawerActiveBackgroundColor: palette.secondary,
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{...(drawerItemStyle as any), title: 'Főoldal'}}
      />
      <Drawer.Screen
        name="FamilyMembers"
        component={FamilyMembersScreen}
        options={{...(drawerItemStyle as any), title: 'Családtagok'}}
      />
      <Drawer.Screen
        name="Tasks"
        component={TasksScreen}
        options={{...(drawerItemStyle as any), title: 'Feladatlista'}}
      />
      <Drawer.Screen
        name="WeeklyMeetings"
        component={WeeklyMeetings}
        options={{...(drawerItemStyle as any), title: 'Heti megbeszélés'}}
      />
      <Drawer.Screen
        name="RedeemPoints"
        component={ReedemPointsScreen}
        options={{...(drawerItemStyle as any), title: 'Pont beváltás'}}
      />
      <Drawer.Screen
        name="Bank"
        component={BankScreen}
        options={{...(drawerItemStyle as any), title: 'Bank'}}
      />
    </Drawer.Navigator>
  );
}
