const FavoriteActions = require('../actions/Favorite');
const {sendSuccess, catchError} = require('../helpers/response');

exports.addFavorite = (req, res) => {
    const {userId} = req;
    const postId = req.params['id'];

    FavoriteActions.addFavorite({userId, postId})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.removeFavorite = (req, res) => {
    const {userId} = req;
    const postId = req.params['id'];
    const {favoriteId} = req.params;

    FavoriteActions.removeFavorite({userId, postId, favoriteId})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};