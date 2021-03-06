const Favorite = require('../models/Favorite');

exports.isAdded = ({userId, postId}) => {
    return Favorite.findOne({
        post: postId,
        owner: userId
    }).then(favorite => {
        return Promise.resolve(!!favorite);
    });
};

exports.addFavorite = ({userId, postId}) => {
    return Favorite.findOne({
        post: postId,
        owner: userId
    }).then(favorite => {
        if (favorite) {
            throw new Error('You added to your favorites.');
        }

        const newFavorite = new Favorite({
            post: postId,
            owner: userId
        });

        return newFavorite.save();
    });
};

exports.removeFavorite = ({userId, postId}) => {
    return Favorite.findOne({
        post: postId,
        owner: userId
    }).then(favorite => {
        if (!favorite) {
            throw new Error('You have not added to your favorites.');
        }

        return favorite.remove();
    });
};