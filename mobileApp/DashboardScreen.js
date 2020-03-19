/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { WebView } from 'react-native-webview';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import axios from "axios";

async function uploadFile() {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    Alert.alert(
      `${res.uri},
      ${res.type}, // mime type
      ${res.name},
      ${res.size}`
    );
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

const DashboardScreen: () => React$Node = () => {

  const [finalNumbers, setFinalNumbers] = useState();

  useEffect(() => {
    console.log("use effect")
    axios
      .get(
        "http://192.168.0.12:8080/finalnumbers"
      )
      .then(({ data }) => {
        console.log(data.confirmedCases)
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
          <Text style={styles.sectionTitle}>Dashboard</Text>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   //Your text here
                </Text>
              </Body>
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
});

export default DashboardScreen;
