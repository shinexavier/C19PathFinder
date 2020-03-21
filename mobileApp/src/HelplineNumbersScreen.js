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
    List,
    ListItem
} from 'native-base';

const HelpLineNumbers: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            {/* <SafeAreaView> */}
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Help Line Numbers</Title>
                    </Body>
                </Header>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    <View style={styles.sectionContainer}>
                        <Card style={{ width: '100%' }}>
                            <CardItem header style={styles.cardTitle}>
                                <H1 style={styles.cardTitleText}>
                                    CENTRAL HELP LINE NUMBER
                                </H1>
                            </CardItem>
                            <CardItem>
                                <Text
                                    style={{ fontWeight: 'bold' }}
                                    onPress={() =>
                                        Linking.openURL('tel:+91-11-23978046')
                                    }
                                >
                                    +91-11-23978046
                                </Text>
                            </CardItem>
                        </Card>

                        <Card style={{ width: '100%' }}>
                            <CardItem header style={styles.cardTitle}>
                                <H1 style={styles.cardTitleText}>
                                    STATE HELP LINE NUMBERS
                                </H1>
                            </CardItem>
                            <CardItem>
                                <Text>Andhra Pradesh</Text>
                                <Right>
                                    <Text onPress={() =>
                                        Linking.openURL('tel:+91-866-2410978')
                                    }>+91-866-2410978</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Text>Arunachal Pradesh</Text>
                                <Right>
                                    <Text onPress={() =>
                                        Linking.openURL('tel:+91-9436055743')
                                    }>+91-9436055743</Text>
                                </Right>
                            </CardItem>
                        </Card>
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
    card: {},
    cardTitle: {
        borderBottomWidth: 1,
        borderColor: '#a50a18'
    },
    cardTitleText: {
        color: '#a50a18',
        fontSize: 22
    },
    cardBody: {},
    answeredBy: {
        color: '#a50a18'
    },
    cardFooter: {},
    referenceLink: {
        color: '#1c20c2',
        fontSize: 18
    }
});

export default HelpLineNumbers;
