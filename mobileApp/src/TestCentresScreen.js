import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    ScrollView,
    SectionList,
    FlatList,
    View
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Left,
    Title,
    Body,
    Icon,
    Right,
    H1
} from 'native-base';

import axios from 'axios';
import Config from 'react-native-config';

function Item({ title, data }) {
    return (
        <Card key={title}>
            <CardItem header style={styles.cardTitle}>
            <H1 style={styles.cardTitleText}>
            {title}
                                </H1>
                
            </CardItem>
            {data.map(item => (
                <CardItem key={item}>
                    <Text>{item}</Text>
                </CardItem>
            ))}
        </Card>
    );
}

const TestCentresScreen: () => React$Node = () => {
    const [testingSites, setTestingSites] = useState();

    useEffect(() => {
        console.log('use effect');
        axios
            .get(`${Config.API_URL}/testingsites`)
            .then(({ data }) => {
                console.log(data.sites);
                setTestingSites(data.sites);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Testing Centres</Title>
                    </Body>
                </Header>
                {testingSites && (
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}
                    >
                        <View style={styles.sectionContainer}>
                            {testingSites.map(item => (
                                <Item title={item.state} data={item.data} />
                            ))}
                        </View>
                    </ScrollView>
                )}
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    header: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    scrollView: {
        backgroundColor: Colors.lighter
    },
    sectionContainer: {
        marginVertical: 32,
        paddingHorizontal: 24
    },

    cardTitle: {
        borderBottomWidth: 1,
        borderColor: '#a50a18'
    },
    cardTitleText: {
        color: '#a50a18',
        fontSize: 22
    },
});

export default TestCentresScreen;
