/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect, Component } from 'react';

import { Text, TouchableOpacity, View, ActivityIndicator, ImageBackground, Button, DeviceEventEmitter, NativeModules } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';

import MyRiskScreen from './src/MyRiskScreen';
import DashboardScreen from './src/DashboardScreen';
import AboutScreen from './src/AboutScreen';
import UserProfile from './src/UserProfileScreen';
import HeatMapScreen from './src/HeatMapScreen';
import GeneralInformation from './src/GeneralInformationScreen';

import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

import { initiateDB, bootstrapApp, initiateLocation } from './src/SetupTasks';

// import { Drawer } from 'native-base';
// import SideBar from "./SideBar.js";

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'C19PathFinder.db', location: 'default' });

const AuthContext = React.createContext();

const splashImage = require('./src/images/mask-image2.jpg')

// TODO:- Design splashscreen
const SplashScreen = () => {
    return (<ImageBackground source={splashImage} style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }}></ImageBackground>);
}

const MapStackView = () => {
    const Stack = createStackNavigator();
    return (<Stack.Navigator>
        <Stack.Screen
            name="Map View"
            component={HeatMapScreen}
        />
        <Stack.Screen
            name="My Risk"
            component={MyRiskScreen}
        />
    </Stack.Navigator>);
}

const TabView = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'bar-chart' : 'bar-chart';
                    } else if (route.name === 'My Risk') {
                        iconName = focused
                            ? 'exclamation-triangle'
                            : 'exclamation-triangle';
                    } else if (route.name === 'HeatMap') {
                        iconName = focused ? 'map-o' : 'map-o';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray'
            }}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="HeatMap" component={MapStackView} />
            {/* <Tab.Screen name="My Risk" component={MyRiskScreen} /> */}
        </Tab.Navigator>
    );
};

const DrawerView = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={TabView} />
            <Drawer.Screen name="General Information" component={GeneralInformation} />
            <Drawer.Screen name="About" component={AboutScreen} />
            <Drawer.Screen name="Profile" component={UserProfile} />
        </Drawer.Navigator>
    );
};

const terms = require('./src/terms.html');

const renderLoadingView = () => {
    return (
        <ActivityIndicator
            color='#bc2b78'
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0, }}
            size="large"
            hidesWhenStopped={true}
        />
    );
}

const TermsAndConditionsScreen = ({ navigation }) => {
    const { setTOCStatus } = React.useContext(AuthContext);
    return (<>
        <WebView
            originWhitelist={['*']}
            source={{ uri: `${Config.API_URL}/terms.html` }}
            renderLoading={renderLoadingView} startInLoadingState={true} />
        <Button
            title='Accept'
            onPress={async () => {
                console.log("Accepted");
                setTOCStatus(true)
            }} />
    </>);
}

/*
CREATE TABLE IF NOT EXISTS "locationPoint" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"locationPointId"	TEXT,
	"latitudeE7"	INTEGER,
	"longitudeE7"	INTEGER,
	"accuracy"	INTEGER,
	"startTimestampMs"	INTEGER,
	"endTimestampMs"	INTEGER,
	"sourceType"	TEXT,
	"isDeleted"	INTEGER
);
*/

const App: () => React$Node = () => {
    const [isProfileCompleted, profileStatus] = useState();

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'TOC_ACCEPTED':
                    return {
                        ...prevState,
                        tocStatus: action.tocStatus,
                        isLoading: false,
                    };
            }
        },
        {
            isLoading: true,
            tocStatus: null,
        }
    );

    useEffect(() => {
        bootstrapApp(dispatch);
        //userProfile();
        initiateDB();
        initiateLocation();
        const subscription = DeviceEventEmitter.addListener(
            NativeModules.LocationManager.JS_LOCATION_EVENT_NAME,
            (e) => {
                console.log(
                    `Received Coordinates from native side at ${new Date(
                        e.timestamp,
                    ).toTimeString()}: `,
                    e.latitude,
                    e.longitude,
                );
                db.transaction(function (txn) {
                    txn.executeSql(
                        `INSERT INTO "gpsLog" ("latitudeE7","longitudeE7",timestampMs) VALUES (${e.latitude},${e.longitude},${e.timestamp})`,
                        [],
                        function (tx, result) { },
                        function (error) {
                        }
                    );
                });
            },
        );
        return function cleanup() {
            subscription.remove();
        }
    }, []);

    async function userProfile() {
        let gender = await AsyncStorage.getItem('gender');
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
    }

    /* Reducer for Auth Context */
    const authContext = React.useMemo(
        () => ({
            setTOCStatus: async tocStatus => {
                await AsyncStorage.setItem('TermsAccepted', 'true');
                dispatch({ type: 'TOC_ACCEPTED', tocStatus });
            },
        }),
        []
    );

    const Stack = createStackNavigator();
    if (state.isLoading) {
        return <SplashScreen />;
    }
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.tocStatus ?
                        <Stack.Screen
                            name="C19 Path Finder"
                            component={DrawerView}
                            options={({ navigation, route }) => ({
                                headerLeft: props => (
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.dispatch(
                                                DrawerActions.toggleDrawer()
                                            )
                                        }
                                    >
                                        <Icon
                                            style={{ paddingLeft: 20 }}
                                            name="bars"
                                            size={30}
                                            color="black"
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        /> :
                        <Stack.Screen
                            name="Terms and Conditions"
                            component={TermsAndConditionsScreen}
                        />}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};
export default App;

/*
export default class App extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    console.log("openDrawer")
    this.drawer._root.open()
  };
  render() {
    return (
       <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar/>}
        panOpenMask={0.80}
        onClose={this.closeDrawer}
        onOpen={this.openDrawe}
        captureGestures="open"
        side="left"
        >
        <DashboardScreen openDrawer={this.openDrawer}/>
        </Drawer>
    );
  }
}
*/
