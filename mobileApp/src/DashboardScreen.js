/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';

import 'react-native-gesture-handler';

import Config from 'react-native-config';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Grid,
    Col,
    Row,
    H1,
    H2,
    H3,
    Left,
    Right,
    Title,
    Picker
} from 'native-base';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'C19PathFinder.db', location: 'default' });

import axios from 'axios';

const DashboardScreen: () => React$Node = props => {
    const [finalNumbers, setFinalNumbers] = useState();
    const [states, setStates] = useState();
    const [selectedState, setSelectedState] = useState('India');

    function getStates() {
        db.transaction(function(txn) {
            let s = [];
            txn.executeSql(
                'SELECT * FROM state',
                [],
                function(tx, res) {
                    for (let i = 0; i < res.rows.length; i++) {
                        s.push(res.rows.item(i).name);
                    }
                    setStates(s);
                },
                function(error) {}
            );
        });
    }

    function chosenState(val) {
        setSelectedState(val);
        getNumbers(val);
    }

    function getNumbers(state) {
        console.log(state);
        if (state === undefined || state === 'India') {
            axios
                .get(`${Config.API_URL}/finalnumbers`)
                .then(({ data }) => {
                    console.log(data);
                    setFinalNumbers(data);
                    //setNextTodoId(data.length);
                })
                .catch(error => console.log(error));
        } else {
            axios
                .get(`${Config.API_URL}/finalnumbers/statewise`)
                .then(({ data }) => {
                    //console.log(data.statistics)
                    let stats = data.statistics;
                    for (let i = 0; i < stats.length; i++) {
                        console.log(stats[i].state, ' ', state);
                        if (stats[i].state === state) {
                            console.log('data ', stats[i]);
                            setFinalNumbers(stats[i]);
                            break;
                        } else {
                            let fn = {
                                state: state,
                                confirmedCases: {
                                    indian: 0,
                                    foreign: 0
                                },
                                dischargedCases: 0,
                                deathCases: 0
                            };
                            setFinalNumbers(fn)
                        }
                    }
                    //setFinalNumbers(data);
                    //setNextTodoId(data.length);
                })
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        // console.log("use effect props ",props)
        getStates();
        getNumbers();
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Container>
                <Header>
                    {/*
                    <Left>
                        <Text onPress={() => props.openDrawer()}>Open</Text>
                    </Left>
                    */}

                    <Left />
                    <Body>
                        <Title>Dashboard</Title>
                    </Body>
                </Header>

                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    <View style={styles.sectionContainer}>
                        {finalNumbers && (
                            <>
                                <Grid>
                                    <Row>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Select your SIM"
                                            style={{ width: undefined }}
                                            selectedValue={selectedState}
                                            onValueChange={val =>
                                                chosenState(val)
                                            }
                                        >
                                            <Picker.Item
                                                label="India"
                                                value="India"
                                            />
                                            {states && states.map(state => (
                                                <Picker.Item
                                                    key={state}
                                                    label={state}
                                                    value={state}
                                                />
                                            ))}
                                        </Picker>
                                    </Row>
                                    <Col>
                                        
                                        <Row>
                                            <Card style={{ width: '100%' }}>
                                                <CardItem>
                                                    <Body>
                                                        <Grid>
                                                            <Col>
                                                                <Row>
                                                                    <Text
                                                                        style={[
                                                                            styles.numbers,
                                                                            {
                                                                                color:
                                                                                    '#d32f2f'
                                                                            }
                                                                        ]}
                                                                    >
                                                                        {
                                                                            finalNumbers
                                                                                .confirmedCases
                                                                                .indian
                                                                        }
                                                                    </Text>
                                                                </Row>
                                                                <Row>
                                                                    <Text>
                                                                        INDIANS
                                                                    </Text>
                                                                </Row>
                                                            </Col>
                                                            <Col>
                                                                <Row>
                                                                    <Text
                                                                        style={[
                                                                            styles.numbers,
                                                                            {
                                                                                color:
                                                                                    '#d32f2f'
                                                                            }
                                                                        ]}
                                                                    >
                                                                        {
                                                                            finalNumbers
                                                                                .confirmedCases
                                                                                .foreign
                                                                        }
                                                                    </Text>
                                                                </Row>
                                                                <Row>
                                                                    <Text>
                                                                        FOREIGNERS
                                                                    </Text>
                                                                </Row>
                                                            </Col>
                                                        </Grid>
                                                    </Body>
                                                </CardItem>
                                                <CardItem header>
                                                    <H3>CURRENTLY SICK</H3>
                                                </CardItem>
                                            </Card>
                                        </Row>
                                        <Row>
                                            <Grid>
                                                <Col>
                                                    <Card>
                                                        <CardItem>
                                                            <Body>
                                                                <Text
                                                                    style={[
                                                                        styles.numbers,
                                                                        {
                                                                            color:
                                                                                '#00796b'
                                                                        }
                                                                    ]}
                                                                >
                                                                    {
                                                                        finalNumbers.dischargedCases
                                                                    }
                                                                </Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem header>
                                                            <H3>RECOVERED</H3>
                                                        </CardItem>
                                                    </Card>
                                                </Col>
                                                <Col>
                                                    <Card>
                                                        <CardItem>
                                                            <Body>
                                                                <Text
                                                                    style={[
                                                                        styles.numbers,
                                                                        {
                                                                            color:
                                                                                '#616161'
                                                                        }
                                                                    ]}
                                                                >
                                                                    {
                                                                        finalNumbers.deathCases
                                                                    }
                                                                </Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem header>
                                                            <H3>DECEASED</H3>
                                                        </CardItem>
                                                    </Card>
                                                </Col>
                                            </Grid>
                                        </Row>
                                    </Col>
                                </Grid>
                            </>
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
    numbers: {
        fontSize: 50
    },
    danger: {
        backgroundColor: 'red',
        color: '#fff'
    }
});

export default DashboardScreen;
