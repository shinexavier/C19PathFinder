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

import { Container, Grid, Col, Row, Text } from 'native-base';

const PersonalContact: () => React$Node = () => {
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();

    async function getUserContacts() {
        let phone = await AsyncStorage.getItem('phone');
        let email = await AsyncStorage.getItem('email');
        let address = await AsyncStorage.getItem('address');

        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }

    useEffect(() => {
        getUserContacts();
    });
    return (
        <View style={styles.sectionContainer}>
            <Grid>
                <Col>
                    <Row>
                        <Text style={styles.label}>Phone</Text>
                    </Row>
                    <Row>
                        <Text style={styles.value}>{phone}</Text>
                    </Row>

                    <Row>
                        <Text style={styles.label}>Email</Text>
                    </Row>
                    <Row>
                        <Text style={styles.value}>{email}</Text>
                    </Row>

                    <Row>
                        <Text style={styles.label}>Address</Text>
                    </Row>
                    <Row>
                        <Text style={styles.value}>{address}</Text>
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

export default PersonalContact;
