import React, { useState } from 'react';
import {
    StyleSheet,
    AsyncStorage,
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

// function setGender(){
//     console.log("setGender called")
// }

setName = (value) => {
    console.log(value)
    AsyncStorage.setItem('name', value);
    //this.setState({ 'name': value });
 }

 setAge = (value) => {
    console.log(value)
    AsyncStorage.setItem('age', value);
    //this.setState({ 'name': value });
 }

const EditPersonalData: () => React$Node = () => {
    const [gender, setGender] = useState();



    return (
        <>
                    <Form>
                        <Item stackedLabel>
                            <Label>Name</Label>
                            <Input onChangeText = {setName} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Age</Label>
                            <Input onChangeText = {setAge}  />
                        </Item>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select your SIM"
                                style={{ width: undefined }}
                                selectedValue={gender}
                                onValueChange={(val) => setGender(val)}
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
