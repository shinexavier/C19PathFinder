/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';

import { Text, TouchableOpacity } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import MyRiskScreen from './MyRiskScreen';
import DashboardScreen from './DashboardScreen';


const Stack = createStackNavigator();

const TabView = () => {
  const Tab = createBottomTabNavigator();
  return (<Tab.Navigator>
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="My Risk" component={MyRiskScreen} />
  </Tab.Navigator>);
};

const DrawerView = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={TabView} />
      <Drawer.Screen name="Guide" component={TabView} />
      <Drawer.Screen name="Test Centres" component={TabView} />
      <Drawer.Screen name="Helpline Numbers" component={TabView} />
      <Drawer.Screen name="About" component={TabView} />
    </Drawer.Navigator>);
};


const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={DrawerView}
          options={({ navigation, route }) => ({
            headerLeft: props => <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Text>Menu</Text>
              </TouchableOpacity>,
          })} />
      </Stack.Navigator>
    </NavigationContainer>);
};

export default App;
