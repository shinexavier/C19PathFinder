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

import { Container, Header, Content, DeckSwiper, Card, CardItem, Body, Text, H1, Left } from 'native-base';

const cards = [
    {
      text: 'Cough',
      name: 'One',
      image: require('./images/symptoms-fever.jpg'),
    },
  ];

const Symptoms: () => React$Node = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.sectionContainer}>

              <Card style={{ width: '100%' }}>
                <CardItem header style={styles.cardTitle}>
                  <H1 style={styles.cardTitleText}>FEVER</H1>
                </CardItem>
                <CardItem cardBody style={{paddingTop: 10, paddingBottom: 10}}>
                  <Image style={{height: 200, width: null, flex: 1}} source={require('./images/symptoms-fever.jpg')} />
                </CardItem>
              </Card>

              <Card style={{ width: '100%' }}>
                <CardItem header style={styles.cardTitle}>
                  <H1 style={styles.cardTitleText}>COUGH</H1>
                </CardItem>
                <CardItem cardBody style={{paddingTop: 10, paddingBottom: 10}}>
                  <Image style={{height: 200, width: null, flex: 1}} source={require('./images/symptoms-cough.jpg')} />
                </CardItem>
              </Card>

              <Card style={{ width: '100%' }}>
                <CardItem header style={styles.cardTitle}>
                  <H1 style={styles.cardTitleText}>SHORTNESS OF BREATH</H1>
                </CardItem>
                <CardItem cardBody style={{paddingTop: 10, paddingBottom: 10}}>
                  <Image style={{height: 200, width: null, flex: 1}} source={require('./images/symptoms-shortness-breath.jpg')} />
                </CardItem>
              </Card>

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
  card: {

  },
  cardTitle: {
    borderBottomWidth: 1,
    borderColor: '#a50a18'
  },
  cardTitleText: {
    color: '#a50a18'
  },
  cardBody: {

  },
  answeredBy: {
    color: '#a50a18'
  },
  cardFooter: {

  },
  referenceLink: {
    color: '#1c20c2',
    fontSize: 18,
  }
});

export default Symptoms;
