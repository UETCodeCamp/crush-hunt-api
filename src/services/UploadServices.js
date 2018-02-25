const Imgur = require('imgur');
const fs = require('fs');

exports.upload = ({pathFile, unLink = false}) => {
    if (!fs.existsSync(pathFile)) {
        throw new Error('File not found.');
    }

    return Imgur.uploadFile(pathFile).then(result => {
        const {data} = result;

        return Promise.resolve(data.link);
    }).then(publicUrl => {
        if (unLink) {
            fs.unlinkSync(pathFile);
        }

        return Promise.resolve(publicUrl);
    });
};