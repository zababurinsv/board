const path = require('path');
require('dotenv').config()
module.exports = env => {
    console.log('~~~bundle~~~: ',process.env.BUNDLE);
    return {
        mode: 'development',
        entry: {
            index: `${__dirname}/app.${process.env.BUNDLE}.mjs`
        },
        output: {
            path: path.resolve(__dirname, 'temp'),
            filename: `${process.env.BUNDLE}.mjs`,
            chunkFilename: `${process.env.BUNDLE}.mjs`,
            library: `${process.env.BUNDLE}`
        },
    };
};