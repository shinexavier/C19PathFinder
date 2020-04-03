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

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'C19PathFinder.db', location: 'default' });

function Item({ title, data }) {
    return (
        <Card key={title}>
            <CardItem header style={styles.cardTitle}>
                <H1 style={styles.cardTitleText}>{title}</H1>
            </CardItem>
            {data.map(item => (
                <CardItem key={item}>
                    <Text>{item}</Text>
                </CardItem>
            ))}
        </Card>
    );
}

const TestCentres: () => React$Node = () => {
    const [testingSites, setTestingSites] = useState();

    useEffect(() => {
        let tcData = [];
        db.transaction(function(txn) {
            txn.executeSql(
                'SELECT * FROM state',
                [],
                function(tx, states) {
                    for (let i = 0; i < states.rows.length; i++) {
                        let stateData = {};
                        stateData.state = states.rows.item(i).name;
                        let tcQuery =
                            'select * from testingcentre WHERE stateId = ' +
                            states.rows.item(i).id;

                        txn.executeSql(
                            tcQuery,
                            [],
                            function(tx, tcs) {
                                let centres = [];
                                for (let j = 0; j < tcs.rows.length; j++) {
                                    centres.push(tcs.rows.item(j).name);
                                }
                                stateData.data = centres;

                                if (centres.length > 0) tcData.push(stateData);

                                if (i + 1 === states.rows.length) {
                                    setTestingSites(tcData);
                                }
                            },
                            function(tcserror) {}
                        );
                    }
                },
                function(error) {}
            );
        });
        /*
        axios
            .get(`${Config.API_URL}/testingsites`)
            .then(({ data }) => {
                //console.log(data.sites);
                //setTestingSites(data.sites);
            })
            .catch(error => console.log(error));
            */
    }, []);

    return (
        <View>
            {testingSites.map(item => (
                <Item title={item.state} data={item.data} />
            ))}
        </View>
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
    }
});

export default TestCentres;
