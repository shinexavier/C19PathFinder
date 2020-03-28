/**
 * This is an optimization to prevent unnecessary DB reads.
 * 
 * Cache Invalidation is expected to be called whenever an
 * associted POST API is invoked. 
 * 
 * Time To Live can be made infinite in place of 15 minutes.
 */

const NodeCache = require('node-cache')

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({
    stdTTL: 15 * 60
})

function getCacheKey(req) {
    const key = req.protocol + '://' + req.headers.host + req.originalUrl
    return key
}

function set(req, res, next) {
    const key = getCacheKey(req)
    const val = res.locals.data
    cache.set(key, val)
    console.log('Updated Cache - {0}):{1}', key, val)
    return next()
}
/**
 * Function to set Cache Value Directly
 * using a key - Write Behind Mode
 * @param  {} key
 * @param  {} val
 */
function setD(key, val) {
    cache.set(key, val)
    console.log('Updated Cache in WB Mode - {0}):{1}', key, val)
}

function get(req, res, next) {
    const key = getCacheKey(req)
    const content = cache.get(key)
    if (content) {
        console.log('Read from Cache - {0}):{1}', key, content)
        return res.status(200).send(content)
    }
    return next()
}

function getD(key) {
    const val = cache.get(key)
    console.log('Direct Read from Cache - {0}):{1}', key, val)
    return val
}

function clear(req, res, next) {
    cache.keys(function (err, keys) {
        if (!err) {
            let resourceUrl = req.baseUrl;
            const resourceKeys = keys.filter(k => k.includes(resourceUrl));
            cache.del(resourceKeys);
            console.log('Cache Cleared!!!')
        }
    });
    return next()
}

function evict(key) {
    const val = cache.get(key)
    cache.del(key)
    console.log('Cache Evicted - {0}:{1}', key, val)
}

module.exports = {
    get,
    getD,
    set,
    setD,
    clear,
    evict,
    getCacheKey
}