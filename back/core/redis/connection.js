const redis = require("redis");
const config = require("../../config/index").getConfig();

/**
* Redis RedisConnection
*/
let RedisConnection = (() => {
    let client;
    return {
        getInstance: () => {
            if (client == null) {
                let createClientObj = {port: config.REDIS.PORT, host: config.REDIS.HOST};
                if(config.REDIS.PASSWORD) createClientObj = {...createClientObj, password:config.REDIS.PASSWORD};
                client = redis.createClient(createClientObj);
                client.on("error", (err) => {
                    console.error("Error in redis:", err);
                });
            }
            return client;
        },
        
        initialize: () => {
            return RedisConnection.getInstance();
        }
    };
})();

module.exports = RedisConnection;
