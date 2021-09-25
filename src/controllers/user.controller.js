import { respondSuccess } from '../helpers';

import { createUser } from '../services/user.service';

export async function create(req, res) {
    try {
        const user = req.body;
        const users = createUser(user);
        return res.json(respondSuccess(users));
    } catch (error) {
        return res.json();
    }
}
