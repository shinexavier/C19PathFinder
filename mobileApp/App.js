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

import Icon from 'react-native-vector-icons/FontAwesome';

import MyRiskScreen from './src/MyRiskScreen'
import DashboardScreen from './DashboardScreen';

const TabView = () => {
  const Tab = createBottomTabNavigator();
  return (<Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Dashboard') {
        iconName = focused
          ? 'chart-line'
          : 'chart-line';
      } else if (route.name === 'My Risk') {
        iconName = focused ? 'exclamation-triangle' : 'exclamation-triangle';
      }

      // You can return any component that you like here!
      return <Icon name={iconName} size={size} color={color} />;
    },
  })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="My Risk" component={MyRiskScreen} />
  </Tab.Navigator>);
};

const DrawerView = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Path Finder">
      <Drawer.Screen name="Path Finder" component={TabView} />
      <Drawer.Screen name="Guide" component={TabView} />
      <Drawer.Screen name="Test Centres" component={TabView} />
      <Drawer.Screen name="Helpline Numbers" component={TabView} />
      <Drawer.Screen name="About" component={TabView} />
    </Drawer.Navigator>);
};


const App: () => React$Node = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={DrawerView}
          options={({ navigation, route }) => ({
            headerLeft: props => <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Icon style={{ paddingLeft: 20 }} name="bars" size={30} color="black" />
            </TouchableOpacity>,
          })} />
      </Stack.Navigator>
    </NavigationContainer>);
};

export default App;
