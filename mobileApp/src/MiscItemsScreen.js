import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import AboutScreen from './AboutScreen';
import UserProfile from './UserProfileScreen';
import GeneralInformation from './GeneralInformationScreen';

const MiscItemsListScreen = ({ navigation }) => {
    return (<View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('About')}>
            <Icon style={{ paddingRight: 15 }}
                name="info"
                size={20}
                color="black" />
            <Text style={styles.listTitle}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Profile')}>
            <Icon style={{ paddingRight: 10 }}
                name="user-o"
                size={20}
                color="black" />
            <Text style={styles.listTitle}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('General Information')}>
            <Icon style={{ paddingRight: 10 }}
                name="book"
                size={20}
                color="black" />
            <Text style={styles.listTitle}>General Information</Text>
        </TouchableOpacity>
    </View>)
}

const MiscItemsScreen = () => {
    const Stack = createStackNavigator();
    return (<Stack.Navigator>
        <Stack.Screen name="Info" component={MiscItemsListScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Profile" component={UserProfile} />
        <Stack.Screen name="General Information" component={GeneralInformation} />
    </Stack.Navigator>);
};

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        marginHorizontal: 10,
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    listTitle: {
        fontWeight: 'bold'
    }
});

export default MiscItemsScreen;