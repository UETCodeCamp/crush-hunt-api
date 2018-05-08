const PublicUserActions = require('../actions/PublicUser');

exports.getAvatar = (req, res) => {
    const {userId} = req.params;

    PublicUserActions.getAvatar(userId)
        .then(avatarUrl => {
            res.redirect(avatarUrl);
        })
        .catch(error => {
            res.send(404);
        });
};