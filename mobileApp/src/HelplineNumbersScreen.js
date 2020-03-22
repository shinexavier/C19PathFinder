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

function Item({ state, numbers }) {
    return (
        <CardItem style={styles.state}>
            <Text style={styles.stateName}>{state}</Text>
            <Right>
            {numbers.map(number => (
                                        <Text onPress={() => Linking.openURL(`tel:${number}`)}>
                                        {number}
                                    </Text>
                    ))}

            </Right>
        </CardItem>
    );
}

const hln = [
  {
    "state": "Andhra Pradesh",
    "numbers": ["0866-2410978"]
  },
  {
    "state": "Arunachal Pradesh",
    "numbers": ["9436055743"]
  },
  {
    "state": "Assam",
    "numbers": ["6913347770"]
  },
  {
    "state": "Bihar",
    "numbers": ["104"]
  },
  {
    "state": "Chhattisgarh",
    "numbers": ["104"]
  },
  {
    "state": "Goa",
    "numbers": ["104"]
  },
  {
    "state": "Gujarat",
    "numbers": ["104"]
  },
  {
    "state": "Haryana",
    "numbers": ["8558893911"]
  },
  {
    "state": "Himachal Pradesh",
    "numbers": ["104"]
  },
  {
    "state": "Jharkhand",
    "numbers": ["104"]
  },
  {
    "state": "Karnataka",
    "numbers": ["104"]
  },
  {
    "state": "Kerala",
    "numbers": ["0471-2552056"]
  },
  {
    "state": "Madhya Pradesh",
    "numbers": ["0755-2527177"]
  },
  {
    "state": "Maharashtra",
    "numbers": ["020-26127394"]
  },
  {
    "state": "Manipur",
    "numbers": ["3852411668"]
  },
  {
    "state": "Meghalaya",
    "numbers": ["108"]
  },
  {
    "state": "Mizoram",
    "numbers": ["102"]
  },
  {
    "state": "Nagaland",
    "numbers": ["7005539653"]
  },
  {
    "state": "Odisha",
    "numbers": ["9439994859"]
  },
  {
    "state": "Punjab",
    "numbers": ["104"]
  },
  {
    "state": "Rajasthan",
    "numbers": ["0141-2225624"]
  },
  {
    "state": "Sikkim",
    "numbers": ["104"]
  },
  {
    "state": "Tamil Nadu",
    "numbers": ["044-29510500"]
  },
  {
    "state": "Telangana",
    "numbers": ["104"]
  },
  {
    "state": "Tripura",
    "numbers": ["0381-2315879"]
  },
  {
    "state": "Uttarakhand",
    "numbers": ["104"]
  },
  {
    "state": "Uttar Pradesh",
    "numbers": ["18001805145"]
  },
  {
    "state": "West Bengal",
    "numbers": ["1800313444222"]
  },
  {
    "state": "Andaman and Nicobar Islands",
    "numbers": ["03192-232102"]
  },
  {
    "state": "Chandigarh",
    "numbers": ["9779558282"]
  },
  {
    "state": "Dadra and Nagar Haveli and Daman & Diu",
    "numbers": ["104"]
  },
  {
    "state": "Delhi",
    "numbers": ["011-22307145"]
  },
  {
    "state": "Jammu & Kashmir",
    "numbers": ["01912520982"]
  },
  {
    "state": "Ladakh",
    "numbers": ["01982256462"]
  },
  {
    "state": "Lakshadweep",
    "numbers": ["104"]
  },
  {
    "state": "Puducherry",
    "numbers": ["104"]
  },
]

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
                            {
                                hln.map(item => (
                                  <Item state={item.state} numbers={item.numbers} />
                              ))
                            }
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

export default HelpLineNumbers;
