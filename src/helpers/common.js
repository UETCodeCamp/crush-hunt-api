exports.getScoreTrending = (total, age = 0, gravity = 1.8) => {
    return (total - 1) / Math.pow(age + 2, gravity);
};