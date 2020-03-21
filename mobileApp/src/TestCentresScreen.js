import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, SectionList, FlatList, View } from 'react-native';

import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';


import axios from "axios";
import Config from "react-native-config";

function Item({ title, data }) {
  return (
    <Card key={title}>
      <CardItem header styles={styles.header}>
        <Text>{title}</Text>
      </CardItem>
      {data.map(item => <CardItem key={item}><Text>{item}</Text></CardItem>)}
    </Card>
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
    <Container>
      <StatusBar barStyle="dark-content" />
      {/* {testingSites && <SectionList
        sections={testingSites}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { state } }) => (
          <Text style={styles.header}>{state}</Text>
        )}
      />} */}
      {testingSites &&
        <Content>
          {testingSites.map(item => <Item title={item.state} data={item.data} />)}
          {/* <FlatList
            data={testingSites}
            renderItem={({ item }) => <Item title={item.state} />}
            keyExtractor={item => item.state} /> */}
        </Content>
      }
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
  },
});

export default TestCentresScreen;