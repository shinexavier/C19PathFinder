/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

import 'react-native-gesture-handler';

import MapView, { Heatmap, PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { takeoutData, patient_pkd } from './data/MockData';
import { Aubergine } from './data/MapConfig';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
  },
});

let points = [
  { latitude: 6.83646681, longitude: 79.77121907, weight: 1 },
  { latitude: 6.82776681, longitude: 79.871319, weight: 2 },
  { latitude: 6.82176681, longitude: 79.871319, weight: 3 },
  { latitude: 6.83776681, longitude: 79.871319, weight: 4 },
  { latitude: 6.8317, longitude: 79.8713, weight: 5 },
];

const HeatMapScreen = ({navigation}) => (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: takeoutData[0].latitudeE7 / 1e7,
        longitude: takeoutData[0].longitudeE7 / 1e7,
        latitudeDelta: 3,
        longitudeDelta: 3,
      }}
      customMapStyle={Aubergine}
    >
      <Heatmap
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        points={patient_pkd.map(point => { return { latitude: point.latitudeE7 / 1e7, longitude: point.longitudeE7 / 1e7, weight: 3 } })}
        // region={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.015,
        //   longitudeDelta: 0.0121,
        // }}
        gradient={{
          colors: ["#79BC6A", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
          startPoints: [0.01, 0.25, 0.50, 0.75, 1],
        }}
      ></Heatmap>
      {takeoutData.map((marker, index) => (
        <Marker
          key={`${index}${marker.latitudeE7}${marker.longitudeE7}`}
          coordinate={{ latitude: marker.latitudeE7 / 1e7, longitude: marker.longitudeE7 / 1e7 }}
          // image={require('./images/blue-marker-smaller.png')}
          title={"Your Location"}
          description={`From ${new Date(marker.startTimestampMs)} \nto ${new Date(marker.endTimestampMs)} `}
        />
      ))}
      {/* {patient_pkd.map(marker => (
        <Marker
          key={`${marker.latitudeE7}${marker.longitudeE7}`}
          coordinate={{ latitude: marker.latitudeE7 / 1e7, longitude: marker.longitudeE7 / 1e7 }}
          title={"Patient Location"}
          description={`From ${new Date(marker.startTimestampMs)} \nto ${new Date(marker.endTimestampMs)} `}
        />
      ))} */}
    </MapView>
    <View style={{ marginBottom: 20 }}>
      <Button title="Show my Risk" onPress={() => navigation.navigate('My Risk')}></Button>
    </View>
  </View>
);

export default HeatMapScreen;
