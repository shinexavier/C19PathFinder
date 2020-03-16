function getPathList(json) {
    const pathList = [];

    function getType(value) {
        if (Array.isArray(value)) {
            return 'array';
        } else if (typeof value === 'object' && value !== null) {
            return 'object';
        }
    }

    function walkObject(path, object) {
        const objectPath = path;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                const value = object[key];
                const keyPath = `${objectPath}.${key}`;

                switch (getType(value)) {
                    case 'array':
                        walkObject(keyPath, value);
                        break;
                    case 'object':
                        walkObject(keyPath, value);
                        break;
                    default:
                        pathList.push(`${keyPath}.${value}`);
                }
            }
        }
    }

    walkObject('root', json);
    return pathList.sort();
}

function getKeySet(json) {
    let keySets = {};
    const pathList = getPathList(json);

    for (let i = 0; i < pathList.length; i++) {        
        const path = pathList[i];
        const pathArray = path.split('.');
        for (let j = 0; j < pathArray.length; j++) {
            if (keySets[j] == null) {
                keySets[j] = [];
            }
            if (keySets[j].indexOf(pathArray[j]) < 0) {
                keySets[j].push(pathArray[j]);
            }
            
        }
    }

    return keySets;
}

module.exports = {
    getKeySet: getKeySet,
    getPathList: getPathList
}