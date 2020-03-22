/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    Linking,
    Image
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import {
    Container,
    Header,
    Content,
    DeckSwiper,
    Card,
    CardItem,
    Body,
    Text,
    H1,
    Left,
    Right,
    Title,
    Tab,
    Tabs,
    ScrollableTab
} from 'native-base';

//import Tab1 from './contact';
import PersonalData from './personalData';
import PersonalContact from './personalContact';
import EditPersonalData from './editPersonalData';
import EditPersonalContact from './editPersonalContact';

const UserProfile: () => React$Node = () => {
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
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    <Tab heading="Basic Info">
                        <EditPersonalData />
                    </Tab>
                    <Tab heading="Contact">
                        <EditPersonalContact />
                    </Tab>
                </Tabs>
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
