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
    Form,
    Item,
    Input,
    Label,
    Picker,
    Button,
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

const EditPersonalData: () => React$Node = () => {
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();

    function setUserName(value){
        AsyncStorage.setItem('name', value);
        setName(value)
    }

    function setUserAge(value){
        AsyncStorage.setItem('age', value);
        setAge(value)
    }    

    function setSelectedGender(value) {
        console.log('setSelectedGender ', value);
        AsyncStorage.setItem('gender', value);
        setGender(value)
    }

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
        <>
            <Form>
                <Item stackedLabel>
                    <Label>Name</Label>
                    <Input onChangeText={(val) => setUserName(val)} value={name} />
                </Item>
                <Item stackedLabel>
                    <Label>Age</Label>
                    <Input onChangeText={(val) => setUserAge(val)} value={age} keyboardType = 'number-pad' />
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosHeader="Select your SIM"
                        style={{ width: undefined }}
                        selectedValue={gender}
                        onValueChange={val => setSelectedGender(val)}
                    >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                </Item>
            </Form>
        </>
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

export default EditPersonalData;
