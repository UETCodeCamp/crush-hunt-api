const Imgur = require('imgur');
const fs = require('fs');

exports.upload = ({pathFile}) => {
    if (!fs.existsSync(pathFile)) {
        throw new Error('File not found.');
    }

    return Imgur.uploadFile(pathFile).then(result => {
        const {data} = result;

        return Promise.resolve(data.link);
    });
};