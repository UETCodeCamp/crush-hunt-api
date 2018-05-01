const appConfig = require('../app.config');
const sgMail = require('@sendgrid/mail');

const sendGridKey = appConfig.get('/sendgrid');
sgMail.setApiKey(sendGridKey);

exports.sendMail = ({from, to, subject, html}) => {
    const mail = {
        to,
        from,
        subject,
        html,
    };

    return sgMail.send(mail);
};