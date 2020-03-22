import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    Linking,
    Image
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

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
    return (
        <Container>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
            >
                <View style={styles.sectionContainer}>
                    <Grid>
                        <Col>
                            <Row>
                                <Text style={styles.label}>Name</Text>
                            </Row>
                            <Row>
                                <Text style={styles.value}>Jacob Nelson</Text>
                            </Row>

                            <Row>
                                <Text style={styles.label}>Age</Text>
                            </Row>
                            <Row>
                                <Text style={styles.value}>40 years</Text>
                            </Row>

                            <Row>
                                <Text style={styles.label}>Sex</Text>
                            </Row>
                            <Row>
                                <Text style={styles.value}>Male</Text>
                            </Row>                 
                        </Col>

                    </Grid>
                </View>
            </ScrollView>
        </Container>
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
        fontSize: 20,
    },
    value: {
        color: '#656565',
        fontSize: 30,
        paddingBottom: 35
    },
    fieldSet:{
        borderBottomWidth: 1,
        borderColor: '#a50a18'
    }
});

export default PersonalData;
