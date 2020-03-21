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
  Image,
  List,
  ListItem
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Container, Header, Content, DeckSwiper, Card, CardItem, Body, Text, H1, Left, Right, Title } from 'native-base';


const EmergencyWarningSigns: () => React$Node = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
      <Container>
      <Header>
          <Left/>
          <Body>
            <Title>Emergency Warning Signs</Title>
          </Body>
        </Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.sectionContainer}>

              <Card style={{ width: '100%' }}>
                <CardItem>
                    <Text>If you develop <Text style={{fontWeight: 'bold'}}>emergency warning signs</Text> for COVID-19 get <Text style={{fontWeight: 'bold'}}>medical attention immediately</Text>. Emergency warning signs include</Text>
                </CardItem>
                <CardItem>
                    <Text>1. Difficulty breathing or shortness of breath</Text>
                </CardItem>
                <CardItem>
                    <Text>2. Persistent pain or pressure in the chest</Text>
                </CardItem>
                <CardItem>
                    <Text>3. New confusion or inability to arouse</Text>
                </CardItem>
                <CardItem>
                    <Text>4. Bluish lips or face</Text>
                </CardItem>
                <CardItem footer>
                  <Text style={styles.answeredBy}>Disclaimer: This list is not all inclusive. Please consult your medical provider for any other symptoms that are severe or concerning.</Text>
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
    color: '#a50a18',
    fontSize: 22
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

export default EmergencyWarningSigns;
