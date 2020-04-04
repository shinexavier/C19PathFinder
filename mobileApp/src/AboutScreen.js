import React from 'react';
import { View, Text } from 'react-native';

const AboutAppScreen = () => {
    return (<View>
        <Text>
            This project is an earnest attempt by a group of passionate software engineers to leverage technology and throw some light on the recent onset of Covid-19 (Corono) virus which has turned out to be a serious pandemic.
            {'\n\n'}
            To contain this virus outbreak, it is absolutely critical to understand the path of it's transmission so that safety and preventive measures can be taken. The project intends to capture the path of virus through an infected person or potential vectors (virus carriers). At this point the authorities are desperately trying to find, isolate and help the victims plus more importantly find potential vectors.
            {'\n\n'}
            The sad or scariest thing is that people are unaware of their pathway crossings (location co-ordinates) with any victims (making them potential vectors) and thus are unable to prevent further transmission to others including their near and loved ones.
            {'\n\n'}
            This critical information that the project intends to unearth would be of grave help to everyone (including Govt. and Health authorities) in terms of forming an understanding on the following:{'\n'}
            {'\n'}
            * Virus transmission path{'\n'}
            * Potential vectors{'\n'}
            * Geographically affected zones{'\n'}
            * Geographically safe zones
        </Text>
    </View>);
}

export default AboutAppScreen;