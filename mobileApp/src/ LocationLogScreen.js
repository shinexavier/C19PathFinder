import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'C19PathFinder.db', location: 'default' });

const LocationLogScreen = () => {
    const [locationData, setLocationData] = useState();

    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                'SELECT * FROM gpsLog ORDER BY timestampMs DESC',
                [],
                function (tx, gpsData) {
                    let log = [];
                    for (let j = 0; j < gpsData.rows.length; j++) {
                        console.log(gpsData.rows.item(j))
                        log.push(gpsData.rows.item(j));
                    }
                    setLocationData(log);
                },
                function (error) { }
            );
        })
    }, []);
    return (<>
    {locationData && locationData.map(point => {
        return (<Text key={point.timestampMs}>{`${new Date(point.timestampMs).toTimeString()} - ${point.latitudeE7} | ${point.longitudeE7}`}</Text>);
    })}
    </>);
};

export default LocationLogScreen;