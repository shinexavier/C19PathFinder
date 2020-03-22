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
    Textarea,
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
                    <Form>
                        <Item stackedLabel>
                            <Label>Phone</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input />
                        </Item>

                        <Item stackedLabel>
                            <Label>Address</Label>
                            <Textarea rowSpan={5} bordered style={{width: '100%'}} />
                        </Item>
                    </Form>
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
