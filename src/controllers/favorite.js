const FavoriteActions = require('../actions/Favorite');
const {sendSuccess, sendError} = require('../helpers/response');

exports.addFavorite = (req, res) => {
    const {userId} = req;
    const postId = req.params['id'];

    FavoriteActions.addFavorite({userId, postId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.removeFavorite = (req, res) => {
    const {userId} = req;
    const postId = req.params['id'];
    const {favoriteId} = req.params;

    FavoriteActions.removeFavorite({userId, postId, favoriteId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};