/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'C19PathFinder.db', location: 'default' });

import {
    Container,
    Header,
    Button,
    Body,
    Text,
    Left,
    Right,
    Title,
    Tab,
    Tabs,
    ScrollableTab,
    Grid,
    Col
} from 'native-base';

//import Tab1 from './contact';
import PersonalData from './personalData';
import PersonalContact from './personalContact';
import EditPersonalData from './editPersonalData';
import EditPersonalContact from './editPersonalContact';

const UserProfile: () => React$Node = () => {
    const [isProfileCompleted, profileStatus] = useState(false);
    const [editMode, toggleEditMode] = useState();

    let profileKeys = ['name', 'phone'];
    // tem - toggle edit mode
    async function getProfileStatus(tem) {
        var notNull = true;
        for (let i = 0; i < profileKeys.length; i++) {
            let key = profileKeys[i];
            let value = await AsyncStorage.getItem(key);
            
            if (value === null) {
                notNull = false;
                profileStatus(false);
            }
        }
        
        if (notNull) {
            profileStatus(true);
            AsyncStorage.setItem('profileCompleted', 'true');
        }
    }

    function saveUserProfile() {
/*
        db.transaction(function(txn) {
            console.log("inside transaction user profile screen ***")
  
              txn.executeSql(
                'SELECT * FROM locationPoint', [], 
                function(tx, result) {
                    console.log('SELECT result ', result.rows.item(0).latitudeE7, result.rows.length);
                }
                , 
                function(error) {
                    console.log('error ', error);
                    //console.log("tx ", tx)
                }
            );
  
          });
*/
        getProfileStatus(true);
        setEditMode(false)
    }

    function setEditMode(mode) {
        AsyncStorage.setItem('profileEdit', mode + '');
        toggleEditMode(mode);
    }

// https://css-tricks.com/run-useeffect-only-once/

    useEffect(() => {
        console.log('use effect');
        getProfileStatus();
    }, [editMode]);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            {/* <SafeAreaView> */}
            <Container>
                <Header hasTabs>
                    <Left />
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    <View style={styles.sectionContainer}>
                    {isProfileCompleted && !editMode ? (
                                    <PersonalData />
                                ) : (
                                    <EditPersonalData />
                                )}
                        {/*
                        <Tabs renderTabBar={() => <ScrollableTab />}>
                            <Tab heading="Basic Info">
                                {isProfileCompleted && !editMode ? (
                                    <PersonalData />
                                ) : (
                                    <EditPersonalData />
                                )}
                            </Tab>
                            
                            <Tab heading="Contact">
                                {isProfileCompleted && !editMode ? (
                                    <PersonalContact />
                                ) : (
                                    <EditPersonalContact />
                                )}
                            </Tab>
                                
                        </Tabs>
                        */}
                        {isProfileCompleted && !editMode && (
                            <Grid style={{ marginTop: 20 }}>
                                <Col>
                                    <Button block light>
                                        <Text>Close</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        full
                                        onPress={() => setEditMode(true)}
                                    >
                                        <Text>Edit</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        )}
                        {(!isProfileCompleted || editMode) && (
                            <Grid style={{ marginTop: 20 }}>
                                <Col>
                                    <Button block light>
                                        <Text>Skip</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        full
                                        onPress={() => saveUserProfile()}
                                    >
                                        <Text>Save</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        )}
                    </View>
                </ScrollView>
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter
    },
    engine: {
        position: 'absolute',
        right: 0
    },
    body: {
        backgroundColor: Colors.white
    },
    sectionContainer: {
        marginVertical: 32,
        paddingHorizontal: 24
    }
});

export default UserProfile;
