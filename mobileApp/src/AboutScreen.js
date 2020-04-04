import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Config from 'react-native-config';

const renderLoadingView = () => {
    return (
        <ActivityIndicator
            color='#bc2b78'
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0, }}
            size="large"
            hidesWhenStopped={true}
        />
    );
}

const AboutAppScreen = () => {
    return (
        
        <WebView
            originWhitelist={['*']}
            source={{ uri: `${Config.API_URL}/about.html` }}
            renderLoading={renderLoadingView} startInLoadingState={true}
            scalesPageToFit={false}  />  
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginVertical: 32,
        marginHorizontal: 24,
        backgroundColor: 'white'
    }
});

export default AboutAppScreen;
