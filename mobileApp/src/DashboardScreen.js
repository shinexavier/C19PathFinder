/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import 'react-native-gesture-handler';

import Config from "react-native-config";

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Container, Header, Content, Card, CardItem, Body, Text, Grid, Col, Row, H1, H2, H3 } from 'native-base';

import axios from "axios";

const DashboardScreen: () => React$Node = () => {

  const [finalNumbers, setFinalNumbers] = useState();

  useEffect(() => {
    console.log("use effect")
    axios
      .get(
        `${Config.API_URL}/finalnumbers`
      )
      .then(({ data }) => {
        console.log(data)
        setFinalNumbers(data);
        //setNextTodoId(data.length);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.sectionContainer}>
          {
            finalNumbers &&
            <>
              <Grid>
                <Col>
                  <Row>
                    <Card style={{ width: '100%' }}>
                      <CardItem>
                        <Body>
                          <Text style={[styles.numbers, {color:'#1976d2'}]}>{finalNumbers.passengersScreened.airport}</Text>
                        </Body>
                      </CardItem>
                      <CardItem header>
                        <H3>PASSENGERS SCREENED</H3>
                      </CardItem>
                    </Card>
                  </Row>
                  <Row>
                    <Card style={{ width: '100%' }}>
                      <CardItem>
                        <Body>
                          <Grid>
                            <Col>
                              <Row>
                                <Text style={[styles.numbers, {color:'#d32f2f'}]}>{finalNumbers.confirmedCases.indian}</Text>
                              </Row>
                              <Row>
                                <Text>INDIANS</Text>
                              </Row>
                            </Col>
                            <Col>
                              <Row>
                                <Text style={[styles.numbers, {color:'#d32f2f'}]}>{finalNumbers.confirmedCases.foreign}</Text>
                              </Row>
                              <Row>
                                <Text>FOREIGNERS</Text>
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
                              <Text style={[styles.numbers, {color:'#00796b'}]}>{finalNumbers.dischargedCases}</Text>
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
                              <Text style={[styles.numbers, {color:'#616161'}]}>{finalNumbers.deathCases}</Text>
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
          }
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    paddingTop: 10,
  },
  sectionDescription: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  numbers: {
    fontSize: 50,
  },
  danger: {
    backgroundColor: 'red',
    color: '#fff',
  }
});

export default DashboardScreen;
