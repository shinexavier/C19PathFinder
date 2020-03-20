/*
Test Centres across the Country

Andhra Pradesh

Sri Venkateswara Institute of Medical Sciences in Tirupati
GMC, Anantapur
Siddhartha Medical College, Vijayawada
Ranagaraya Medical College, Kakinada
Andaman and Nicobar

Regional Medical Research Centre, Port Blair
Assam

Gauhati Medical College, Guwahati
Regional Medical Research Centre, Dibrugarh
Silchar Medical College, Silchar
Jorhat Medical College, Jorhat
Bihar

Rajendra Memorial Research Institute of Medical Sciences, Patna
Chandigarh

Post Graduate Institute of Medical Education & Research
Chhattisgarh

AIIMS, Raipur
Delhi

AIIMS
Gujarat

BJ Medical College, Ahmedabad
M P Shah Government Medical College, Jamnagar
Haryana

Pt B D Sharma Post Graduate Institute of Medical Sciences, Rohtak
BPS Government Medical College, Sonipat
Himachal Pradesh

Indira Gandhi Medical College, Shimla
Dr Rajendra Prasad Government Medical College, Kangra, Tanda
Jammu-Kashmir

Sher-I-Kashmir Institute of Medical Sciences, Srinagar
Government Medical College, Jammu
Government Medical College, Srinagar
Jharkhand

MGM Medical College, Jamshedpur
Karnataka

Bangalore Medical College & Research Institute, Bengaluru
National Institute of Virology Field Unit, Bengaluru
Mysore Medical College & Research Institute, Mysore
Hassan Institute of Medical Sciences, Hassan
Shimoga Institute of Medical Sciences, Shivamoga
Kerala

National Institute of Virology Field, Kerala Unit
Government Medical College, Thriuvananthapuram
Government Medical College, Kozhikhode
Government Medical College, Thrissur
Madhya Pradesh

AIIMS, Bhopal
National Institute of Research in Tribal Health (NIRTH), Jabalpur
Maharashtra

Indira Gandhi Government Medical College, Nagpur
Kasturba Hospital for Infectious Diseases, Mumbai
NIV Mumbai Unit
Manipur

JN Institute of Medical Sciences Hospital, Imphal
Regional Institute of Medical Science, Imphal
Meghalaya

North Eastern Indira Gandhi Institute of Health and Medical Sciences, Shillong
Odisha

Regional Medical Research Centre, Bhubaneswar
Puducherry

Jawaharlal Institute of Postgraduate Medical Education & Research, Puducherry
Punjab

Government Medical College, Patiala
Government Medical College, Amritsar
Rajasthan

Sawai Man Singh Hospital, Jaipur
Dr S N Medical College, Jodhpur
Jhalawar Medical College, Jhalawar
SP Medical College, Bikaner
RNT Medical college, Udaipur
Tamil Nadu

King’s Institute of Preventive Medicine & Research, Chennai
Government Medical College, Theni
Tirunelveli Medical College, Tirunelveli
Government Medical College, Thiruvarur
Telangana

Gandhi Medical College, Secunderabad
Osmania Medical college, Hyderabad
Tripura

Government Medical College, Agartala
Uttar Pradesh

King George Medical University, Lucknow
Institute of Medical Sciences, Banaras Hindu University, Varanasi
Jawaharlal Nehru Medical College, Aligarh
Uttarakhand

Government Medical College, Haldwani
West Bengal

National Institute of Cholera and Enteric Diseases, Kolkata
IPGMER, Kolkata
Sources: Indian Council of Medical Research https://icmr.nic.in/sites/default/files/upload_documents/COVID_19_Testing_Laboratories.pdf 
*/

import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, StyleSheet, SectionList, View, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import axios from "axios";

function Item({title}) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

const TestCentresScreen: () => React$Node = () => {
    const [testingSites, setTestingSites] = useState();

    useEffect(() => {
        console.log("use effect")
        axios
            .get(
                "http://192.168.225.29:8080/testingsites"
            )
            .then(({ data }) => {
                console.log(data.sites)
                setTestingSites(data.sites);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            {testingSites && <SectionList
                sections={testingSites}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { state } }) => (
                    <Text style={styles.header}>{state}</Text>
                )}
            />}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
      },
      header: {
        fontSize: 32,
      },
      title: {
        fontSize: 24,
      },
});

export default TestCentresScreen;