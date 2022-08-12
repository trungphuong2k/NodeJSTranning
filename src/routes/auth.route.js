const { verifySignUp } = require('../middleware/verifySignup');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
    app.post(
        '/signup',
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
        ],
        controller.signup,
    );

    app.post('/signin', controller.signin);

    app.post('/signout', controller.signout);
};
