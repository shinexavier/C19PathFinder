/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';

import { Text, TouchableOpacity, View, Button } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';

import MyRiskScreen from './src/MyRiskScreen';
import DashboardScreen from './src/DashboardScreen';
import TestCentresScreen from './src/TestCentresScreen';
import HelplineNumbersScreen from './src/HelplineNumbersScreen';
import FAQ from './src/FAQScreen';
import Symptoms from './src/SymptomsScreen';
import EmergencyWarningSigns from './src/EmergencyWarningSignsScreen';
import AboutScreen from './src/AboutScreen';
import UserProfile from './src/UserProfileScreen';
import HeatMapScreen from './src/HeatMapScreen';

import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'C19PathFinder.db' });

const AuthContext = React.createContext();

const SplashScreen = () => {
    return (<View><Text>Beyond Thoughts</Text></View>);
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
            <Tab.Screen name="HeatMap" component={HeatMapScreen} />
            <Tab.Screen name="My Risk" component={MyRiskScreen} />
        </Tab.Navigator>
    );
};

const DrawerView = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={TabView} />
            <Drawer.Screen name="Guide" component={FAQ} />
            <Drawer.Screen name="Test Centres" component={TestCentresScreen} />
            <Drawer.Screen
                name="Helpline Numbers"
                component={HelplineNumbersScreen}
            />
            <Drawer.Screen name="FAQ" component={FAQ} />
            <Drawer.Screen name="Watch for symptoms" component={Symptoms} />
            <Drawer.Screen
                name="Emergency Warning Signs"
                component={EmergencyWarningSigns}
            />
            <Drawer.Screen name="About" component={AboutScreen} />
            <Drawer.Screen name="Profile" component={UserProfile} />
        </Drawer.Navigator>
    );
};

const terms = require('./src/terms.html')

const TermsAndConditionsScreen = ({ navigation }) => {
    const { setTOCStatus } = React.useContext(AuthContext);
    return (<>
        <WebView
            originWhitelist={['*']}
            source={terms} />
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

    function initiateDB() {
        db.transaction(function (txn) {
            console.log("inside transaction")
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS locationPoint (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, locationPointId	TEXT, latitudeE7	INTEGER, longitudeE7	INTEGER, accuracy	INTEGER, startTimestampMs	INTEGER, endTimestampMs	INTEGER, sourceType	TEXT, isDeleted	INTEGER)', [],
                function (tx, result) {
                    console.log('result ', result);
                    console.log("tx ", tx)
                }
                ,
                function (error) {
                    console.log('error ', error);
                    //console.log("tx ", tx)
                }
            );

            txn.executeSql(
                'INSERT INTO locationPoint (locationPointId, latitudeE7, longitudeE7, accuracy, startTimestampMs, endTimestampMs, sourceType, isDeleted) VALUES (1, 762364, 98367736, 10, 234324, 32243, "app", 1)', [],
                function (tx, result) {
                    console.log('result ', result);
                    console.log("tx ", tx)
                }
                ,
                function (error) {
                    console.log('error ', error);
                    //console.log("tx ", tx)
                }
            );

        });
    }

    useEffect(() => {
        bootstrapAsync();
        userProfile();
        initiateDB();
    }, []);

    async function userProfile() {
        let gender = await AsyncStorage.getItem('gender');
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        //result.map(req => JSON.parse(req)).forEach(console.log);
        console.log(result);
    }

    /* Check if First time user for displaying TOC */
    const bootstrapAsync = async () => {
        let termsAccepted;
        try {
            termsAccepted = Boolean(await AsyncStorage.getItem('TermsAccepted'));
        } catch (e) {
            termsAccepted = false;
        }
        dispatch({ type: 'TOC_ACCEPTED', tocStatus: termsAccepted });
    };

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
