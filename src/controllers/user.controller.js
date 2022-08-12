import { respondSuccess } from '../helpers';

exports.create = (req, res) => {
    try {
        const user = req.body;
        const users = createUser(user);
        return res.json(respondSuccess(users));
    } catch (error) {
        return res.json(error);
    }
};

exports.deleteUser = (req, res) => {
    try {
        const user = req.body;
        const users = createUser(user);
        return res.json(respondSuccess(users));
    } catch (error) {
        return res.json(error);
    }
};

