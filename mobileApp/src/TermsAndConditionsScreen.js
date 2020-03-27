import React from 'react';
import { Button } from 'react-native';
import { WebView } from 'react-native-webview';

const terms = require('./terms.html')

const { setTOCStatus } = React.useContext(AuthContext);

const TermsAndConditionsScreen = ({ navigation }) => {
    return (<>
        <WebView
            originWhitelist={['*']}
            source={terms}/>
        <Button
        title='Accept'
        onPress={async () => {
            navigation.navigate("C19 Path Finder")}} />
    </>);
}

export default TermsAndConditionsScreen;