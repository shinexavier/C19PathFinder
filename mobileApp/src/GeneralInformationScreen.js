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

import FAQ from './FAQScreen';
import Symptoms from './SymptomsScreen';
import EmergencyWarningSigns from './EmergencyWarningSignsScreen';
import HelpLineNumbers from './HelplineNumbersScreen';
import TestCentres from './TestCentresScreen';

const GeneralInformation: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            {/* <SafeAreaView> */}
            <Container>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    <View style={styles.sectionContainer}>
                        <Tabs
                            locked={true}
                            renderTabBar={() => <ScrollableTab />}
                        >
                            <Tab heading="FAQs">
                                <FAQ />
                            </Tab>

                            <Tab heading="Symptoms">
                                <Symptoms />
                            </Tab>
                            <Tab heading="Warning Signs">
                                <EmergencyWarningSigns />
                            </Tab>

                            <Tab heading="Help Line Numbers">
                                <HelpLineNumbers />
                            </Tab>

                            <Tab heading="Test Centres">
                                <TestCentres />
                            </Tab>
                        </Tabs>
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
        marginVertical: 0,
        paddingHorizontal: 24
    }
});

export default GeneralInformation;
