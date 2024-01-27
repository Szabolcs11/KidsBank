import {View, Text} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {palette, spacing} from '../../style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {drawerItemStyle} from './style';

const CustomDrawer = (props: any) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        {
          flex: 1,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View
          style={{
            marginVertical: spacing.double,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              width: '100%',
            }}>
            KidsBank
          </Text>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
          onPress={() => {
            props?.navigation?.closeDrawer?.();
          }}></TouchableOpacity>
      </View>

      <View style={[{paddingVertical: 20, paddingHorizontal: 10, flexGrow: 1}]}>
        <View style={{flexGrow: 1}}>
          <DrawerItemList {...props} />
        </View>
        <View
          style={{
            borderBottomColor: palette.gray,
            borderTopColor: palette.gray,
            borderBottomWidth: 2,
            alignSelf: 'center',
            width: '95%',
          }}></View>
        <DrawerItem
          label="Kilépés"
          onPress={() => {}}
          inactiveTintColor={palette.black}
          labelStyle={drawerItemStyle.drawerLabelStyle as any}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
