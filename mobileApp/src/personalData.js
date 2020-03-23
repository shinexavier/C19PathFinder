import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    Linking,
    Image
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';

import {
    Container,
    Grid,
    Col,
    Row,
    Header,
    Content,
    DeckSwiper,
    Card,
    CardItem,
    Body,
    Text,
    H1,
    Left,
    Right,
    Title,
    List,
    ListItem
} from 'native-base';

const PersonalData: () => React$Node = () => {
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();

    async function getUserData() {
        let name = await AsyncStorage.getItem('name');
        let age = await AsyncStorage.getItem('age');
        let gender = await AsyncStorage.getItem('gender');
        
        setName(name)
        setAge(age)
        setGender(gender)
        
    }

    useEffect(() => {
        getUserData()
      });

    return (
        <View style={styles.sectionContainer}>
            <Grid>
                <Col>
                    <Row>
                        <Text style={styles.label}>Name</Text>
                    </Row>
                    <Row>
                        <Text style={styles.value}>{name}</Text>
                    </Row>

                    <Row>
                        <Text style={styles.label}>Age</Text>
                    </Row>
                    <Row>
                        <Text style={styles.value}>{age} years</Text>
                    </Row>

                    <Row>
                        <Text style={styles.label}>Gender</Text>
                    </Row>
                    <Row>
                        <Text style={styles.value}>{gender}</Text>
                    </Row>
                </Col>
            </Grid>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter
    },
    sectionContainer: {
        marginVertical: 32,
        paddingHorizontal: 24
    },
    label: {
        color: '#afbabd',
        fontSize: 20
    },
    value: {
        color: '#656565',
        fontSize: 30,
        paddingBottom: 35
    },
    fieldSet: {
        borderBottomWidth: 1,
        borderColor: '#a50a18'
    }
});

export default PersonalData;
