import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, SectionList, View, Text } from 'react-native';

import axios from "axios";
import Config from "react-native-config";

function Item({title}) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

const TestCentresScreen: () => React$Node = () => {
    const [testingSites, setTestingSites] = useState();

    useEffect(() => {
        console.log("use effect")
        axios
            .get(
                `${Config.API_URL}/testingsites`
            )
            .then(({ data }) => {
                console.log(data.sites)
                setTestingSites(data.sites);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {testingSites && <SectionList
                sections={testingSites}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { state } }) => (
                    <Text style={styles.header}>{state}</Text>
                )}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 10,
      },
      item: {
        padding: 5,
        marginVertical: 4,
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold'
      },
      title: {
        fontSize: 24,
      },
});

export default TestCentresScreen;