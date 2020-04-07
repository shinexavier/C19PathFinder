/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { WebView } from 'react-native-webview';
import 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';

import { Colors } from 'react-native/Libraries/NewAppScreen';

async function uploadFile() {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    console.log(`${res.uri},
    ${res.type}, // mime type
    ${res.name},
    ${res.size}`);
    const sourcePath = 'document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2Ftakeout-20200315T064101Z-001.zip';
    const targetPath = DocumentDirectoryPath;
    const charset = 'UTF-8';
    unzip(sourcePath, targetPath, charset)
      .then((path) => {
        console.log(`unzip completed at ${path}`)
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

const MyRiskScreen: () => React$Node = () => {
  const [isInitial, setInitial] = useState(true);
  const [isStep1, setStep1] = useState(false);
  const [isWebView, setWebView] = useState(false);
  const [isStep2, setStep2] = useState(false);
  const loadStep1 = () => {
    setInitial(false);
    setStep1(true);
  };
  const loadWebView = () => {
    setStep1(false);
    setWebView(true);
  }
  const resetStates = () => {
    setInitial(true);
    setStep1(false);
    setWebView(false)
    setStep2(false);
  };
  const renderLoadingView = () => {
    return (
      <ActivityIndicator
        color='#bc2b78'
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0, }}
        size="large"
        hidesWhenStopped={true}
      />
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
      {isInitial && <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Step 1</Text>
          <Text style={styles.sectionDescription}>We need access to your location history to be able to cross check data. Please tap on the below button to request Location History from Google</Text>
          <Button
            title="Request Location History"
            onPress={() => loadStep1()}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Step 2</Text>
          <Text style={styles.sectionDescription}>If you have completed Step 1 you will soon receive an email from Google with your data. Please follow the link in the email and download a zip file. Please tap on the below button to upload the file.</Text>

          <Button
            title="Upload Location History"
            onPress={() => uploadFile()}
          />
        </View>
      </ScrollView>}
      {isStep1 && <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>

        <View style={styles.sectionContainer}>
          <Button
            title="Back"
            onPress={() => resetStates()}
          />
          <Text style={styles.sectionTitle}>Request Location History</Text>
          <Text style={styles.sectionDescription}>
            1. Tap on the below button to load Google Takeout{"\n"}
            2. Login using your Google Account</Text>
          <Button
            title="Request Location History"
            onPress={() => loadWebView()}
          />
        </View>
      </ScrollView>}
      {isWebView && <>
        <Button
          title="Close"
          onPress={() => resetStates()}
        />
        <WebView
          source={{ uri: 'https://takeout.google.com/settings/takeout/custom/location_history' }}
          style={{ marginTop: 20 }}
          renderLoading={renderLoadingView} startInLoadingState={true}
        />
      </>}
      {/* </SafeAreaView> */}
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

export default MyRiskScreen;
