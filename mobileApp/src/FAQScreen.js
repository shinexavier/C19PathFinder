/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, StatusBar, Linking } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Grid,
    Col,
    Row,
    H1,
    Left,
    Right,
    Title
} from 'native-base';

const FAQ: () => React$Node = () => {
    return (
        <Grid>
            <Col>
                <Card style={{ width: '100%' }}>
                    <CardItem header style={styles.cardTitle}>
                        <H1 style={styles.cardTitleText}>
                            Will wearing masks prevent the spreading of
                            COVID-19?
                        </H1>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                If you are travelling to places where the
                                probability of catching the infection is high,
                                say hospitals, you need to wear masks. If you
                                are using public transport system, where you
                                cannot know if somebody will sneeze or cough,
                                you can use a mask. But the main prevention
                                mechanism is to frequently wash your hands and
                                refrain from shaking other people’s hands or
                                hugging them. Follow cough etiquette when you
                                are travelling or outside.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>
                            Dr. P. Kuganantham, founder-chairman, Indian Public
                            Health Foundation, and former Chennai City Health
                            Officer
                        </Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>Collated from </Text>
                        <Text
                            style={styles.referenceLink}
                            onPress={() =>
                                Linking.openURL(
                                    'https://www.thehindu.com/sci-tech/health/main-prevention-method-is-to-frequently-wash-your-hands-your-covid-19-queries-answered/article31105010.ece'
                                )
                            }
                        >
                            The Hindu
                        </Text>
                    </CardItem>
                </Card>

                <Card style={{ width: '100%' }}>
                    <CardItem header>
                        <H1 style={styles.cardTitleText}>
                            Should people avoid eating meat-based food to
                            prevent transmission?
                        </H1>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                Coronavirus has nothing to do with food or pet
                                animals or eating chicken and mutton. People can
                                eat whatever they want and how much ever they
                                want.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>
                            Dr. V. Ramasubramanian, consultant, Infectious
                            Diseases, Apollo Hospitals
                        </Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>Collated from </Text>
                        <Text
                            style={styles.referenceLink}
                            onPress={() =>
                                Linking.openURL(
                                    'https://www.thehindu.com/sci-tech/health/main-prevention-method-is-to-frequently-wash-your-hands-your-covid-19-queries-answered/article31105010.ece'
                                )
                            }
                        >
                            The Hindu
                        </Text>
                    </CardItem>
                </Card>

                <Card style={{ width: '100%' }}>
                    <CardItem header>
                        <H1 style={styles.cardTitleText}>
                            How soon can a vaccine be developed?
                        </H1>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                Novel viruses happen due to reassortment. They
                                remain for a short period and mutate depending
                                on factors like geography. A vaccine for
                                COVID-19 is likely to be developed in another
                                three to six months because the trials are on at
                                the moment. Like H1N1, a vaccine can be
                                developed for COVID-19 too.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>
                            Dr. P. Kuganantham
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                In the case of a hit-and-run virus like SARS, no
                                vaccine was developed because after six months
                                it did not come back. If COVID-19 too
                                disappears, then there wouldn’t be a need for
                                one.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>
                            Dr. K.K. Aggarwal, president, Confederation of
                            Medical Associations of Asia and Oceania, and former
                            president of Indian Medical Association
                        </Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>Collated from </Text>
                        <Text
                            style={styles.referenceLink}
                            onPress={() =>
                                Linking.openURL(
                                    'https://www.thehindu.com/sci-tech/health/main-prevention-method-is-to-frequently-wash-your-hands-your-covid-19-queries-answered/article31105010.ece'
                                )
                            }
                        >
                            The Hindu
                        </Text>
                    </CardItem>
                </Card>

                <Card style={{ width: '100%' }}>
                    <CardItem header>
                        <H1 style={styles.cardTitleText}>
                            Is there a link between a person’s immunity and
                            COVID-19 transmission?
                        </H1>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                Coronavirus is one of the weakest family of
                                viruses. People affected so far could have been
                                ones with less immunity like children or the
                                elderly. It does not affect everybody. Yes, 100%
                                immuno-compromised people like those with HIV,
                                people with cancer, those who have undergone
                                transplant surgeries or people with diabetes are
                                at risk. Children and elderly are at risk as
                                well. If you take the history of all who died in
                                China or Iran, 90% of them would have been
                                suffering from an illness that compromises their
                                immunity.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>
                            Dr. P. Kuganantham
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                The average age of virus death is 59. The
                                mortality rate for people aged 60 and above
                                after contracting a viral infection is 3.4%;
                                above 70 years is 8% and 80 and above is 15%.
                                Generally, if the immunity is good, you can
                                tolerate any viral infection but there is no
                                specific evidence as it pertains to COVID-19.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>Dr. K.K. Aggarwal</Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>Collated from </Text>
                        <Text
                            style={styles.referenceLink}
                            onPress={() =>
                                Linking.openURL(
                                    'https://www.thehindu.com/sci-tech/health/main-prevention-method-is-to-frequently-wash-your-hands-your-covid-19-queries-answered/article31105010.ece'
                                )
                            }
                        >
                            The Hindu
                        </Text>
                    </CardItem>
                </Card>

                <Card style={{ width: '100%' }}>
                    <CardItem header>
                        <H1 style={styles.cardTitleText}>
                            If I have symptoms of COVID-19, should I approach
                            the hospital directly?
                        </H1>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                You are not supposed to visit a hospital
                                directly. In Delhi, you must call a hospital or
                                doctor. There are designated centres to give
                                your samples. Depending on your symptoms, a call
                                will be made on what needs to be done, and they
                                will come and collect a sample at your home. You
                                cannot go to a hospital and infect others.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>Dr. K.K. Aggarwal</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                There are helpline numbers to contact. At the
                                Rajiv Gandhi Government General Hospital (RGGGH)
                                in Chennai, there is a separate outpatient
                                section for coronavirus cases. You can visit
                                here and consult a doctor and leave samples for
                                testing. No other patient will be permitted to
                                access this entrance. RGGGH is the only place in
                                Chennai where samples will be collected for
                                testing.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>
                            Dr. J. Euphrasia Latha
                        </Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>Collated from </Text>
                        <Text
                            style={styles.referenceLink}
                            onPress={() =>
                                Linking.openURL(
                                    'https://www.thehindu.com/sci-tech/health/main-prevention-method-is-to-frequently-wash-your-hands-your-covid-19-queries-answered/article31105010.ece'
                                )
                            }
                        >
                            The Hindu
                        </Text>
                    </CardItem>
                </Card>

                <Card style={{ width: '100%' }}>
                    <CardItem header>
                        <H1 style={styles.cardTitleText}>
                            Are there any home remedies?
                        </H1>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                Home remedies and treatment other than allopathy
                                is not proven science. The best thing is
                                precaution only. You must keep away from a
                                patient who coughs and sneezes. If you are
                                coughing, you need to cover your face with a
                                mask and not spread the droplets around.
                                COVID-19 spreads through droplets.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>
                            Dr. J. Euphrasia Latha
                        </Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>Collated from </Text>
                        <Text
                            style={styles.referenceLink}
                            onPress={() =>
                                Linking.openURL(
                                    'https://www.thehindu.com/sci-tech/health/main-prevention-method-is-to-frequently-wash-your-hands-your-covid-19-queries-answered/article31105010.ece'
                                )
                            }
                        >
                            The Hindu
                        </Text>
                    </CardItem>
                </Card>

                <Card style={{ width: '100%' }}>
                    <CardItem header>
                        <H1 style={styles.cardTitleText}>
                            Is India equipped to battle coronavirus?
                        </H1>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                We have started late. There are two steps in
                                case of a viral outbreak — preparedness and
                                containment. If you cannot contain, you delay
                                and if you cannot delay, you research and
                                mitigate the circumstances. Preparedness phased
                                cannot be considered now when there already is
                                infection. After 43 cases, now we are going
                                through preparedness. It is a bit of a delayed
                                response. You need both preparedness and
                                containment tactics at the moment. At least, in
                                India, community spread has not happened so far.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>Dr. K.K. Aggarwal</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                We must change the focus of our battle to
                                personal hygiene. For example, during the Ebola
                                outbreak in Africa, the governments there were
                                was able to contain not because of drugs and
                                treatment but by improving personal hygiene.
                                They mandated hand-washing frequently at schools
                                and industries, which helped bring down the
                                cases. For COVID-19, the management is only by
                                handling patients with travel history. They need
                                to be isolated for the incubation period and
                                kept under observation.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.answeredBy}>
                            Dr. P. Kuganantham
                        </Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>Collated from </Text>
                        <Text
                            style={styles.referenceLink}
                            onPress={() =>
                                Linking.openURL(
                                    'https://www.thehindu.com/sci-tech/health/main-prevention-method-is-to-frequently-wash-your-hands-your-covid-19-queries-answered/article31105010.ece'
                                )
                            }
                        >
                            The Hindu
                        </Text>
                    </CardItem>
                </Card>
            </Col>
        </Grid>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter
    },
    engine: {
        position: 'absolute',
        right: 0
    },
    body: {
        backgroundColor: Colors.white
    },
    sectionContainer: {
        marginVertical: 0,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        textAlign: 'center',
        paddingTop: 10
    },
    sectionDescription: {
        marginVertical: 20,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark
    },
    highlight: {
        fontWeight: '700'
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right'
    },
    card: {},
    cardTitle: {
        borderBottomWidth: 1,
        borderColor: '#a50a18'
    },
    cardTitleText: {
        color: '#a50a18'
    },
    cardBody: {},
    answeredBy: {
        color: '#a50a18'
    },
    cardFooter: {},
    referenceLink: {
        color: '#1c20c2',
        fontSize: 18
    }
});

export default FAQ;
