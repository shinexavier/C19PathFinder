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

import { Form, Item, Input, Label, Textarea } from 'native-base';

setPhone = value => {
    AsyncStorage.setItem('phone', value);
};

setEmail = value => {
    AsyncStorage.setItem('email', value);
};

setAddress = value => {
    console.log("address ", value)
    AsyncStorage.setItem('address', value);
};


const EditPersonalContact: () => React$Node = () => {

    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();

    function setUserPhone(value){
        AsyncStorage.setItem('phone', value);
        setPhone(value)
    }

    function setUserEmail(value){
        AsyncStorage.setItem('email', value);
        setEmail(value)
    }    

    function setUserAddress(value) {
        AsyncStorage.setItem('address', value);
        setAddress(value)
    }

    async function getUserContacts() {
        let phone = await AsyncStorage.getItem('phone');
        let email = await AsyncStorage.getItem('email');
        let address = await AsyncStorage.getItem('address');
        //userProfile();
        console.log("phoneeee ", phone)
        setPhone(phone)
        setEmail(email)
        setAddress(address)
        
    }

    useEffect(() => {
        getUserContacts()
      });

    return (
        <>
            <Form>
                <Item stackedLabel>
                    <Label>Phone</Label>
                    <Input keyboardType = 'phone-pad' onChangeText={(val) => setUserPhone(val)} value={phone} />
                </Item>
                <Item stackedLabel>
                    <Label>Email</Label>
                    <Input keyboardType = 'email-address' onChangeText={(val) => setUserEmail(val)} value={email} />
                </Item>

                <Item stackedLabel>
                    <Label>Address</Label>
                    <Textarea rowSpan={5} bordered style={{ width: '100%' }} onChangeText={() => setUserAddress(val)} value={address} />
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

export default EditPersonalContact;
