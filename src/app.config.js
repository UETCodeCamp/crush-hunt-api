const Confidence = require('confidence');

const config = {
    jwt: {
        $filter: "env",
        $default: {
            key: '_uet_code_camp_',
            expires: '7 days'
        },
        staging: {
            key: process.env.GH_SECRET_KEY || '_uet_code_camp_',
            expires: '7 days'
        },
        production: {
            key: process.env.GH_SECRET_KEY || '_uet_code_camp_',
            expires: '7 days'
        }
    },
    port: {
        $filter: "env",
        $default: 6001,
        staging: process.env.GH_PORT_APP || 6002,
        production: process.env.PORT || process.env.GH_PORT_APP || 6001
    },
    mongodb: {
        $filter: "env",
        $default: 'mongodb://localhost:27017/girl_hunt_app',
        staging: process.env.GH_MONGODB_URI || 'mongodb://localhost:27017/girl_hunt_app_dev',
        production: process.env.GH_MONGODB_URI || 'mongodb://localhost:27017/girl_hunt_app',
    },
    sendgrid: {
        $filter: "env",
        $default: process.env.SG_API_KEY || '',
        staging: process.env.SG_API_KEY || '',
        production: process.env.SG_API_KEY || '',
    }
};

const store = new Confidence.Store(config);
const criteria = {
    env: process.env.NODE_ENV || 'development'
};

module.exports.get = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue;
};

module.exports.meta = function (key) {
    return store.meta(key, criteria);
};