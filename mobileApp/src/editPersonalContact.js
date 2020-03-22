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
    Form,
    Item,
    Input,
    Label,
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

const EditPersonalContact: () => React$Node = () => {
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
                                <Text style={styles.label}>Phone</Text>
                            </Row>
                            <Row>
                                <Text style={styles.value}>
                                    +91 90374 28984
                                </Text>
                            </Row>

                            <Row>
                                <Text style={styles.label}>Email</Text>
                            </Row>
                            <Row>
                                <Text style={styles.value}>
                                    jacobnelson79@gmail.com
                                </Text>
                            </Row>

                            <Row>
                                <Text style={styles.label}>Address</Text>
                            </Row>
                            <Row>
                                <Text style={styles.value}>
                                    Hallelujah, 102 B, Oceanus Serenity,
                                    Arasummoodu, Kulathoor P O, 695583
                                </Text>
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

export default EditPersonalContact;
