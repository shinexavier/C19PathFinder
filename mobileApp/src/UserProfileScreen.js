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

    let profileKeys = ['address', 'age', 'gender', 'phone', 'address', 'email'];
    async function getProfileStatus() {
        var notNull = true;
        for (let i = 0; i < profileKeys.length; i++) {
            let key = profileKeys[i];
            let value = await AsyncStorage.getItem(key);
            console.log(key, ' ', value);
            if (value === null) {
                notNull = false;
                profileStatus(false);
            }
        }
        console.log(notNull);
        if (notNull) {
            profileStatus(true);
            AsyncStorage.setItem('profileCompleted', 'true');
        }
    }

    function saveUserProfile() {
        getProfileStatus();
    }

    useEffect(() => {
        getProfileStatus();
    });

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
                        <Tabs renderTabBar={() => <ScrollableTab />}>
                            <Tab heading="Basic Info">
                                {isProfileCompleted ? (
                                    <PersonalData />
                                ) : (
                                    <EditPersonalData />
                                )}
                            </Tab>
                            <Tab heading="Contact">
                                {isProfileCompleted ? (
                                    <PersonalContact />
                                ) : (
                                    <EditPersonalContact />
                                )}
                            </Tab>
                        </Tabs>
                        {isProfileCompleted && (
                            <Grid style={{ marginTop: 20 }}>
                                <Col>
                                    <Button block light>
                                        <Text>Close</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        full
                                    >
                                        <Text>Edit</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        )}
                        {!isProfileCompleted && (
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
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        textAlign: 'center',
        paddingTop: 10
    },
    sectionDescription: {
        marginVertical: 20,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark
    },
    highlight: {
        fontWeight: '700'
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right'
    },
    cardTitle: {
        borderBottomWidth: 1,
        borderColor: '#a50a18'
    },
    cardTitleText: {
        color: '#a50a18',
        fontSize: 22
    },
    state: {
        borderBottomWidth: 1,
        borderColor: '#c9c8cd'
    },
    stateName: {
        width: '50%'
    },
    referenceLink: {
        color: '#1c20c2',
        fontSize: 18
    }
});

export default UserProfile;
