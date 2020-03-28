import AsyncStorage from '@react-native-community/async-storage';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'C19PathFinder.db', location: 'default' });

const preloadStates = async () => {
    await AsyncStorage.getItem('stateLoaded', function (error, stateLoaded) {
        //let sl = JSON.parse(stateLoaded);
        if (!stateLoaded || stateLoaded === 'false') {
            console.log("sl ", JSON.parse(stateLoaded), " ", typeof (JSON.parse(stateLoaded)))
            db.transaction(function (txn) {
                txn.executeSql(
                    `INSERT INTO 'state' ('id','name') VALUES (1,'Andhra Pradesh'),
                (2,'Arunachal Pradesh'),
                (3,'Assam'),
                (4,'Bihar'),
                (5,'Chhattisgarh'),
                (6,'Goa'),
                (7,'Gujarat'),
                (8,'Haryana'),
                (9,'Himachal Pradesh'),
                (10,'Jharkhand'),
                (11,'Karnataka'),
                (12,'Kerala'),
                (13,'Madhya Pradesh'),
                (14,'Maharashtra'),
                (15,'Manipur'),
                (16,'Meghalaya'),
                (17,'Mizoram'),
                (18,'Nagaland'),
                (19,'Odisha'),
                (20,'Punjab'),
                (21,'Rajasthan'),
                (22,'Sikkim'),
                (23,'Tamil Nadu'),
                (24,'Telangana'),
                (25,'Tripura'),
                (26,'Uttarakhand'),
                (27,'Uttar Pradesh'),
                (28,'West Bengal'),
                (29,'Andaman and Nicobar Islands'),
                (30,'Chandigarh'),
                (31,'Dadra and Nagar Haveli and Daman & Diu'),
                (32,'Delhi'),
                (33,'Jammu & Kashmir'),
                (34,'Ladakh'),
                (35,'Lakshadweep'),
                (36,'Puducherry')`,
                    [],
                    function (tx, result) {
                        // success call back
                        console.log("state inserted ", result)
                        AsyncStorage.setItem('stateLoaded', JSON.stringify(true));
                    },
                    function (error) {
                        console.log("error ", error)
                        // error call back
                    }
                );
            });
        }
    });
};

const preloadTestingCentres = async () => {
    await AsyncStorage.getItem('testingCentresLoaded', function (
        error,
        tsLoaded
    ) {
        if (!tsLoaded) {
            db.transaction(function (txn) {
                txn.executeSql(`INSERT INTO "testingcentre" ("id","stateId","name") VALUES (1,1,'Sri Venkateswara Institute of Medical Sciences, Tirupati'),
                (2,1,'Rangaraya Medical College, Kakinada'),
                (3,1,'Sidhartha Medical College, Vijayawada'),
                (4,1,'GMC, Anantapur, AP'),
                (5,29,'Regional Medical Research Centre, Port Blair, Andaman and Nicobar'),
                (6,3,'Gauhati Medical College, Guwahati'),
                (7,3,'Regional Medical Research Center, Dibrugarh'),
                (8,3,'Silchar Medical College, Silchar'),
                (9,3,'Jorhat Medical College, Jorhat'),
                (10,4,'Rajendra Memorial Research Institute of Medical Sciences, Patna'),
                (11,30,'Post Graduate Institute of Medical Education & Research, Chandigarh'),
                (12,5,'All India Institute Medical Sciences, Raipur'),
                (13,32,'All India Institute Medical Sciences, Delhi'),
                (14,7,'BJ Medical College, Ahmedabad'),
                (15,7,'M.P.Shah Government Medical College, Jamnagar'),
                (16,8,'Pt. B.D. Sharma Post Graduate Inst. of Med. Sciences, Rohtak, Haryana'),
                (17,8,'Dr.Rajendra Prasad Govt. Med. College, Kangra, Tanda, HP'),
                (18,33,'Sher-e- Kashmir Institute of Medical Sciences, Srinagar'),
                (19,33,'Government Medical College, Jammu'),
                (20,33,'Government Medical College, Srinagar'),
                (21,10,'MGM Medical College, Jamshedpur'),
                (22,11,'Bangalore Medical College & Research Institute, Bangalore'),
                (23,11,'National Institute of Virology Field Unit Bangalore'),
                (24,11,'Mysore Medical College & Research Institute, Mysore'),
                (25,11,'Hassan Inst. of Med. Sciences, Hassan, Karnataka'),
                (26,11,'Shimoga Inst. of Med. Sciences, Shivamogga, Karnataka'),
                (27,12,'National Institute of Virology Field Unit, Kerala'),
                (28,12,'Govt. Medical College, Thriuvananthapuram, Kerala'),
                (29,12,'Govt. Medical College, Kozhikode, Kerala'),
                (30,12,'Govt. Medical College, Thrissur, Kerala'),
                (31,13,'All India Institute Medical Sciences, Bhopal'),
                (32,13,'National Institute of Research in Tribal Health (NIRTH), Jabalpur'),
                (33,16,'NEIGRI of Health and Medical Sciences, Shillong, Meghalaya'),
                (34,14,'Indira Gandhi Government Medical College, Nagpur'),
                (35,14,'Kasturba Hospital for Infectious Diseases, Mumbai'),
                (36,14,'NIV Mumbai Unit'),
                (37,15,'J N Inst. of Med. Sciences Hospital, Imphal-East, Manipur'),
                (38,15,'Regional Institute of Medical Sciences, Imphal'),
                (39,19,'Regional Medical Research Center, Bhubaneswar'),
                (40,36,'Jawaharlal Institute of Postgraduate Medical Education & Research, Puducherry'),
                (41,20,'Government Medical College, Patiala, Punjab'),
                (42,20,'Government Medical College, Amritsar'),
                (43,21,'Sawai Man Singh, Jaipur'),
                (44,21,'Dr. S.N Medical College, Jodhpur'),
                (45,21,'Jhalawar Medical College, Jhalawar, Rajasthan'),
                (46,21,'RNT Medical College, Udaipur'),
                (47,21,'SP Med. College, Bikaner, Rajasthan'),
                (48,23,'King''s Institute of Preventive Medicine & Research, Chennai'),
                (49,23,'Government Medical College, Theni'),
                (50,23,'Tirunelveli Medical College, Tirunelveli'),
                (51,23,'Govt. Medical college, Thiruvarur'),
                (52,25,'Government Medical College, Agartala'),
                (53,24,'Gandhi Medical College, Secunderabad'),
                (54,24,'Osmania Medical College, Hyderabad'),
                (55,27,'King''s George Medical University, Lucknow'),
                (56,27,'Institute of Medical Sciences, Banaras Hindu University, Varanasi'),
                (57,27,'Jawaharlal Nehru Medical College, Aligarh'),
                (58,26,'Government Medical College, Haldwani'),
                (59,28,'National Institute of Cholera and Enteric Diseases, Kolkata'),
                (60,28,'IPGMER, Kolkata')`,
                    [],
                    function (tx, result) {
                        // success call back
                        AsyncStorage.setItem('testingCentresLoaded', JSON.stringify(true));
                    },
                    function (error) {
                        // error call back
                    })
            })
        }
    });
};

export function initiateDB() {
    db.transaction(function (txn) {
        txn.executeSql(
            'CREATE TABLE IF NOT EXISTS locationPoint (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, locationPointId	TEXT, latitudeE7	INTEGER, longitudeE7	INTEGER, accuracy	INTEGER, startTimestampMs	INTEGER, endTimestampMs	INTEGER, sourceType	TEXT, isDeleted	INTEGER)',
            [],
            function (tx, result) { },
            function (error) {
            }
        );

        //txn.executeSql('DROP TABLE state');
        //txn.executeSql('DROP TABLE testingcentre');
        //AsyncStorage.setItem('stateLoaded', JSON.stringify(false));
        //AsyncStorage.setItem('testingCentresLoaded', JSON.stringify(false));
        txn.executeSql(
            'CREATE TABLE IF NOT EXISTS state (id INTEGER NOT NULL PRIMARY KEY, name TEXT)',
            [],
            function (tx, result) { },
            function (error) {
                console.log("state table creation error ", error)
            }
        );

        txn.executeSql(
            'CREATE TABLE IF NOT EXISTS testingcentre (id INTEGER NOT NULL PRIMARY KEY, stateId INTEGER, name TEXT)',
            [],
            function (tx, result) { },
            function (error) {
                //console.log("")
            }
        );
    });
    preloadStates();
    preloadTestingCentres();
}

export async function bootstrapApp(dispatch) {
    let termsAccepted;
    try {
        termsAccepted = Boolean(await AsyncStorage.getItem('TermsAccepted'));
    } catch (e) {
        termsAccepted = false;
    }
    dispatch({ type: 'TOC_ACCEPTED', tocStatus: termsAccepted });
};