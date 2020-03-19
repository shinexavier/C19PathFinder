'''
Program to test Geopandas location crosschecking capabilities
'''

import json
import datetime
from shapely.geometry import Point
import geopandas as gpd

FILE_NAME_VAISAKH = '/mnt/c/Users/vaisa/workspace/C19PathFinder/repo/Location-History-Vaisakh.json'
FILE_NAME_SHINE = '/mnt/c/Users/vaisa/workspace/C19PathFinder/repo/Location-History-Shine.json'


def read_file(file_path):
    '''Method to read JSON file
    '''
    with open(file_path, 'r') as _fh:
        data = json.loads(_fh.read())
    return data


def format_locations(locations):
    '''Create a new dictionary that will contain the transformed data,
    which we will use to create the new GeoDataFrame
    '''
    for location in locations:
        # Create a shapely point object from the latitude / longitude
        # coordinates
        location['longitude'] = location['longitudeE7'] * 0.0000001
        location['latitude'] = location['latitudeE7'] * 0.0000001
        # location['geometry'] = Point(location['longitude'],
        # location['latitude']).buffer(1)
        location['geometry'] = Point(
            location['longitude'], location['latitude'])

        # Convert timestamp from ms to s, create datetime object
        location['timestamp_sec'] = int(location['timestampMs']) * 0.001
        location['datetime'] = datetime.datetime.fromtimestamp(
            location['timestamp_sec']).strftime('%Y-%m-%d %H:%M:%S')

        # If activity is present, assign most likely activity to timestamp
        try:
            activities = location['activity'][0]['activity']

        # Pick the activity with the highest probability
            max_confidence_activity = max(
                activities, key=lambda x: x['confidence'])
            location['conf'] = max_confidence_activity['confidence']
            location['activity'] = max_confidence_activity['type']
        except KeyError:
            location['conf'] = None
            location['activity'] = None

        # Filter location points of last 15 days
        if ((datetime.datetime.now().timestamp() -
             location['timestamp_sec']) < (15 * 24 * 60 * 60)):
            yield location


def create_geo_data_frame(locations):
    '''Method to create Geopandas dataframe
    '''
    gdf = gpd.GeoDataFrame(locations)
    gdf = gdf.drop(['velocity', 'latitudeE7', 'longitudeE7',
                    'timestampMs', 'heading'], axis=1)
    gdf.crs = {'init': 'epsg:4326'}

    return gdf


def main():
    '''main method
    '''
    location_history_json_vai = read_file(FILE_NAME_VAISAKH)
    location_history_json_shine = read_file(FILE_NAME_SHINE)

    locations_vai = location_history_json_vai['locations']
    print(
        '{} contains {} points'.format(
            FILE_NAME_VAISAKH,
            len(locations_vai)))

    locations_shine = location_history_json_shine['locations']
    print(
        '{} contains {} points'.format(
            FILE_NAME_SHINE,
            len(locations_shine)))

    geo_data_frame_vai = create_geo_data_frame(format_locations(locations_vai))
    print('Vaisakh\'s location geo data frame info:')
    print('Contains {} filtered location points'.format(len(geo_data_frame_vai)))
    print(geo_data_frame_vai.head())

    geo_data_frame_shine = create_geo_data_frame(
        format_locations(locations_shine))
    print('Shine\'s location geo data frame info:')
    print(
        'Contains {} filtered location points'.format(
            len(geo_data_frame_shine)))
    print(geo_data_frame_shine.head())

    crosspoints = gpd.sjoin(geo_data_frame_vai, geo_data_frame_shine, how='inner', op='intersects')
    print(crosspoints.head())


if __name__ == '__main__':
    main()
