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

import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
  },
});

let points = [
  { latitude: 6.83646681, longitude: 79.77121907, weight: 1 },
  { latitude: 6.82776681, longitude: 79.871319, weight: 2 },
  { latitude: 6.82176681, longitude: 79.871319, weight: 3 },
  { latitude: 6.83776681, longitude: 79.871319, weight: 4 },
  { latitude: 6.8317, longitude: 79.8713, weight: 5 },
  // { latitude: 6.83976681, longitude: 79.861319, weight: 5 },
  // { latitude: 6.83076681, longitude: 79.861319, weight: 4 },
  // { latitude: 6.82776681, longitude: 79.861319, weight: 4 },
  // { latitude: 6.82076681, longitude: 79.871319, weight: 4 },
  // { latitude: 6.82076681, longitude: 79.861319, weight: 4 },
  // { latitude: 6.81076681, longitude: 79.861319, weight: 4 },
  // { latitude: 6.83776681, longitude: 79.869319, weight: 3 },
  // { latitude: 6.83276681, longitude: 79.869319, weight: 3 },
  // { latitude: 6.81976681, longitude: 79.869319, weight: 3 },
  // { latitude: 6.83776681, longitude: 79.867319, weight: 3 },
  // { latitude: 6.83776681, longitude: 79.865319, weight: 3 },
  // { latitude: 6.83646681, longitude: 79.77121907, weight: 2 },
  // { latitude: 6.82776681, longitude: 79.871319, weight: 2 },
  // { latitude: 6.82176681, longitude: 79.871319, weight: 2 },
  // { latitude: 6.83776681, longitude: 79.871319, weight: 2 },
  // { latitude: 6.83176681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.83976681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.83076681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.82776681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.82076681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.82076681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.81076681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.83276681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.81976681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.867319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.865319, weight: 1 },
  // { latitude: 6.84076681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.83646681, longitude: 79.77121907, weight: 1 },
  // { latitude: 6.82776681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.82176681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.83176681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.83976681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.83076681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.82776681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.82076681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.82076681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.81076681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.83276681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.81976681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.867319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.865319, weight: 1 },
  // { latitude: 6.84076681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.841776681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.83646681, longitude: 79.77121907, weight: 1 },
  // { latitude: 6.82776681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.82176681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.83176681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.83976681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.83076681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.82776681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.82076681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.82076681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.81076681, longitude: 79.861319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.83276681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.81976681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.867319, weight: 1 },
  // { latitude: 6.83776681, longitude: 79.865319, weight: 1 },
  // { latitude: 6.84076681, longitude: 79.871319, weight: 1 },
  // { latitude: 6.841776681, longitude: 79.869319, weight: 1 },
  // { latitude: 6.84076681, longitude: 79.871319, weight: 1 },

];

const HeatMapScreen = () => (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 6.82776681,
        longitude: 79.871319,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      <Heatmap
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        points={points}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        gradient={{
          colors: ["#79BC6A", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
          startPoints: [0.01, 0.25, 0.50, 0.75, 1],
        }}
      ></Heatmap>
    </MapView>
    <Button style={{marginBottom:20}} title="Show my Data"></Button>
  </View>
);

export default HeatMapScreen;
