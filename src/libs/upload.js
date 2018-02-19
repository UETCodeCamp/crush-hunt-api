const Multer = require('multer');
const upload = Multer({dest: './tmp'});

module.exports = upload;